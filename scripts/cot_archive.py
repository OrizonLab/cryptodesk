#!/usr/bin/env python3
"""Archive publique CFTC TFF Futures Only pour CryptoDesk.

- Source: CFTC Socrata dataset gpe5-46if, sans clé ni données privées.
- SQLite canonique locale, avec journal des changements de lignes.
- Export JSON statique destiné au build Astro; aucune API publique.
- Chaque sync refait le backfill des marchés autorisés, de façon idempotente.

Usage:
  python3 scripts/cot_archive.py sync
  python3 scripts/cot_archive.py export
  python3 scripts/cot_archive.py check
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import sqlite3
import sys
import tempfile
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DATASET_ID = "gpe5-46if"
SOURCE_URL = f"https://publicreporting.cftc.gov/resource/{DATASET_ID}.json"
ABOUT_URL = f"https://publicreporting.cftc.gov/Commitments-of-Traders/TFF-Futures-Only/{DATASET_ID}/about_data"
REPORT_TYPE = "Traders in Financial Futures - Futures Only"
DEFAULT_DB = Path(__file__).resolve().parents[1] / "data" / "cot-archive.sqlite3"
DEFAULT_BACKUP_DIR = Path("/opt/data/backups/cryptodesk-cot")
DEFAULT_EXPORT = Path(__file__).resolve().parents[1] / "public" / "cot-history.json"
PAGE_SIZE = 5000
MAX_EXPORT_BYTES = 5 * 1024 * 1024
MAX_LOCAL_BACKUPS = 52
USER_AGENT = "CryptoDesk-COT-archive/1.0 (public data; contact: publicreporting@cftc.gov)"

# Whitelist by both CFTC code and market name: some codes are shared by
# different venues (e.g. Coinbase Derivatives and LMX Labs).
def norm_name(value: str) -> str:
    return " ".join(value.split()).casefold()


MARKET_ROWS = [
    ("133741", "BITCOIN - CHICAGO MERCANTILE EXCHANGE", "BTC", "Bitcoin · CME", "CME", "standard", True),
    ("133742", "MICRO BITCOIN - CHICAGO MERCANTILE EXCHANGE", "BTC", "Micro Bitcoin · CME", "CME", "micro", True),
    ("146021", "ETHER CASH SETTLED - CHICAGO MERCANTILE EXCHANGE", "ETH", "Ether · CME", "CME", "standard", True),
    ("146022", "MICRO ETHER  - CHICAGO MERCANTILE EXCHANGE", "ETH", "Micro Ether · CME", "CME", "micro", True),
    ("133LM1", "Nano Bitcoin  - COINBASE DERIVATIVES, LLC", "BTC", "Nano Bitcoin · Coinbase", "Coinbase Derivatives", "nano", False),
    ("133LM4", "NANO BITCOIN PERP STYLE - COINBASE DERIVATIVES, LLC", "BTC", "Nano Bitcoin perp-style · Coinbase", "Coinbase Derivatives", "perp-style", False),
    ("146LM1", "NANO ETHER - COINBASE DERIVATIVES, LLC", "ETH", "Nano Ether · Coinbase", "Coinbase Derivatives", "nano", False),
    ("146LM3", "NANO ETHER PERP STYLE - COINBASE DERIVATIVES, LLC", "ETH", "Nano Ether perp-style · Coinbase", "Coinbase Derivatives", "perp-style", False),
]
MARKETS: dict[tuple[str, str], dict[str, Any]] = {}
for code, market_name, asset, label, venue, kind, core in MARKET_ROWS:
    key = (code, norm_name(market_name))
    if key in MARKETS:
        raise RuntimeError(f"Whitelist contains duplicate market key: {key}")
    MARKETS[key] = {
        "code": code,
        "market_name": market_name,
        "asset": asset,
        "label": label,
        "venue": venue,
        "contract_kind": kind,
        "core": core,
    }

FIELDS = [
    "report_date_as_yyyy_mm_dd", "market_and_exchange_names", "cftc_contract_market_code",
    "open_interest_all", "dealer_positions_long_all", "dealer_positions_short_all",
    "dealer_positions_spread_all", "asset_mgr_positions_long", "asset_mgr_positions_short",
    "asset_mgr_positions_spread", "lev_money_positions_long", "lev_money_positions_short",
    "lev_money_positions_spread", "other_rept_positions_long", "other_rept_positions_short",
    "other_rept_positions_spread", "tot_rept_positions_long_all", "tot_rept_positions_short",
    "nonrept_positions_long_all", "nonrept_positions_short_all", "traders_tot_all",
    "conc_gross_le_4_tdr_long", "conc_gross_le_4_tdr_short", "conc_net_le_4_tdr_long_all",
    "conc_net_le_4_tdr_short_all", "contract_units", "change_in_open_interest_all",
    "change_in_dealer_long_all", "change_in_dealer_short_all", "change_in_asset_mgr_long",
    "change_in_asset_mgr_short", "change_in_lev_money_long", "change_in_lev_money_short",
    "change_in_other_rept_long", "change_in_other_rept_short", "change_in_nonrept_long_all",
    "change_in_nonrept_short_all",
]

# Source fields retained verbatim in SQLite. Export numbers are parsed only for
# graph-friendly fields; absent values remain null and are never replaced by 0.
NUMERIC_FIELDS = [f for f in FIELDS if f not in {
    "report_date_as_yyyy_mm_dd", "market_and_exchange_names", "cftc_contract_market_code", "contract_units"
}]


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def date_only(value: str) -> str:
    text = str(value or "")[:10]
    try:
        datetime.strptime(text, "%Y-%m-%d")
    except ValueError as exc:
        raise ValueError(f"Invalid CFTC report date: {value!r}") from exc
    return text


def parse_number(value: Any) -> int | float | None:
    if value is None or value == "":
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(number):
        return None
    return int(number) if number.is_integer() else number


def market_key(row: dict[str, Any]) -> tuple[str, str]:
    return (str(row.get("cftc_contract_market_code", "")), norm_name(str(row.get("market_and_exchange_names", ""))))


def build_where() -> str:
    clauses = []
    for (code, name_norm), market in MARKETS.items():
        # Use the approved source string (not normalized text) in the query.
        source_name = market["market_name"].replace("'", "''")
        clauses.append(
            f"(cftc_contract_market_code='{code}' AND market_and_exchange_names='{source_name}')"
        )
    return " OR ".join(clauses)


def fetch_page(offset: int) -> list[dict[str, Any]]:
    params = {
        "$select": ",".join(FIELDS),
        "$where": build_where(),
        "$order": "report_date_as_yyyy_mm_dd ASC,cftc_contract_market_code ASC,market_and_exchange_names ASC",
        "$limit": str(PAGE_SIZE),
        "$offset": str(offset),
    }
    url = SOURCE_URL + "?" + urllib.parse.urlencode(params)
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                payload = json.loads(response.read().decode("utf-8"))
            if not isinstance(payload, list):
                raise ValueError("CFTC returned a non-list JSON payload")
            return payload
        except Exception as exc:
            last_error = exc
            if attempt < 2:
                time.sleep(1 + attempt * 2)
    raise RuntimeError(f"CFTC request failed at offset {offset}: {last_error}")


def validate_unique_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    # Do not silently collapse conflicting duplicate observations.
    seen: dict[tuple[str, str, str], str] = {}
    unique: dict[tuple[str, str, str], dict[str, Any]] = {}
    for row in rows:
        key = market_key(row)
        if key not in MARKETS:
            raise ValueError(f"CFTC returned a row outside the whitelist: {key}")
        report_date = date_only(row.get("report_date_as_yyyy_mm_dd", ""))
        identity = (report_date, key[0], key[1])
        digest = hashlib.sha256(canonical_json(row).encode()).hexdigest()
        if identity in seen and seen[identity] != digest:
            raise ValueError(f"Conflicting duplicate CFTC row: {identity}")
        seen[identity] = digest
        unique[identity] = row
    return list(unique.values())


def fetch_all() -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    offset = 0
    while True:
        batch = fetch_page(offset)
        rows.extend(batch)
        if len(batch) < PAGE_SIZE:
            break
        offset += len(batch)
    return validate_unique_rows(rows)


def canonical_json(row: dict[str, Any]) -> str:
    return json.dumps(row, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def connect(db_path: Path) -> sqlite3.Connection:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path, timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    conn.execute("PRAGMA busy_timeout=30000")
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=FULL")
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS schema_version (
            version INTEGER PRIMARY KEY,
            applied_at_utc TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS cot_observations (
            dataset_id TEXT NOT NULL,
            report_type TEXT NOT NULL,
            report_date TEXT NOT NULL,
            contract_market_code TEXT NOT NULL,
            market_name TEXT NOT NULL,
            asset TEXT NOT NULL,
            product_label TEXT NOT NULL,
            venue TEXT NOT NULL,
            contract_kind TEXT NOT NULL,
            core INTEGER NOT NULL CHECK (core IN (0,1)),
            contract_units TEXT,
            source_url TEXT NOT NULL,
            payload_json TEXT NOT NULL,
            payload_sha256 TEXT NOT NULL,
            first_seen_at_utc TEXT NOT NULL,
            last_seen_at_utc TEXT NOT NULL,
            PRIMARY KEY (dataset_id, report_type, report_date, contract_market_code, market_name)
        );
        CREATE INDEX IF NOT EXISTS idx_cot_asset_date
            ON cot_observations(asset, report_date);
        CREATE TABLE IF NOT EXISTS cot_revisions (
            dataset_id TEXT NOT NULL,
            report_type TEXT NOT NULL,
            report_date TEXT NOT NULL,
            contract_market_code TEXT NOT NULL,
            market_name TEXT NOT NULL,
            payload_sha256 TEXT NOT NULL,
            observed_at_utc TEXT NOT NULL,
            payload_json TEXT NOT NULL,
            PRIMARY KEY (dataset_id, report_type, report_date, contract_market_code, market_name, payload_sha256)
        );
        CREATE TABLE IF NOT EXISTS sync_runs (
            run_id INTEGER PRIMARY KEY AUTOINCREMENT,
            started_at_utc TEXT NOT NULL,
            completed_at_utc TEXT NOT NULL,
            fetched_rows INTEGER NOT NULL,
            inserted_rows INTEGER NOT NULL,
            revised_rows INTEGER NOT NULL,
            unchanged_rows INTEGER NOT NULL,
            source_url TEXT NOT NULL
        );
    """)
    conn.execute(
        "INSERT OR IGNORE INTO schema_version(version,applied_at_utc) VALUES(1,?)",
        (utc_now(),),
    )
    return conn


def sync_rows(conn: sqlite3.Connection, rows: list[dict[str, Any]], started_at: str) -> dict[str, int]:
    collected_at = utc_now()
    inserted = revised = unchanged = 0
    with conn:
        for row in rows:
            market = MARKETS[market_key(row)]
            report_date = date_only(row["report_date_as_yyyy_mm_dd"])
            market_name = str(row["market_and_exchange_names"])
            code = str(row["cftc_contract_market_code"])
            raw = canonical_json(row)
            digest = hashlib.sha256(raw.encode("utf-8")).hexdigest()
            key = (DATASET_ID, REPORT_TYPE, report_date, code, market_name)
            previous = conn.execute(
                "SELECT payload_sha256,first_seen_at_utc FROM cot_observations "
                "WHERE dataset_id=? AND report_type=? AND report_date=? AND contract_market_code=? AND market_name=?",
                key,
            ).fetchone()
            conn.execute(
                "INSERT OR IGNORE INTO cot_revisions VALUES(?,?,?,?,?,?,?,?)",
                (*key, digest, collected_at, raw),
            )
            if previous is None:
                inserted += 1
                first_seen = collected_at
            elif previous["payload_sha256"] == digest:
                unchanged += 1
                first_seen = previous["first_seen_at_utc"]
            else:
                revised += 1
                first_seen = previous["first_seen_at_utc"]
            conn.execute("""
                INSERT INTO cot_observations (
                    dataset_id,report_type,report_date,contract_market_code,market_name,
                    asset,product_label,venue,contract_kind,core,contract_units,source_url,
                    payload_json,payload_sha256,first_seen_at_utc,last_seen_at_utc
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                ON CONFLICT(dataset_id,report_type,report_date,contract_market_code,market_name)
                DO UPDATE SET asset=excluded.asset, product_label=excluded.product_label,
                    venue=excluded.venue, contract_kind=excluded.contract_kind, core=excluded.core,
                    contract_units=excluded.contract_units, source_url=excluded.source_url,
                    payload_json=excluded.payload_json, payload_sha256=excluded.payload_sha256,
                    last_seen_at_utc=excluded.last_seen_at_utc
            """, (
                DATASET_ID, REPORT_TYPE, report_date, code, market_name,
                market["asset"], market["label"], market["venue"], market["contract_kind"],
                int(market["core"]), row.get("contract_units"), SOURCE_URL, raw, digest,
                first_seen, collected_at,
            ))
        conn.execute(
            "INSERT INTO sync_runs(started_at_utc,completed_at_utc,fetched_rows,inserted_rows,revised_rows,unchanged_rows,source_url) "
            "VALUES(?,?,?,?,?,?,?)",
            (started_at, collected_at, len(rows), inserted, revised, unchanged, SOURCE_URL),
        )
    return {"fetched": len(rows), "inserted": inserted, "revised": revised, "unchanged": unchanged}


def integrity_check(conn: sqlite3.Connection) -> str:
    results = [row[0] for row in conn.execute("PRAGMA integrity_check")]
    if results != ["ok"]:
        raise RuntimeError(f"SQLite integrity_check failed: {results}")
    return "ok"


def make_backup(conn: sqlite3.Connection, backup_dir: Path) -> Path:
    backup_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    target = backup_dir / f"cot-archive-{stamp}.sqlite3"
    with sqlite3.connect(target) as backup_conn:
        conn.backup(backup_conn)
        check = [r[0] for r in backup_conn.execute("PRAGMA integrity_check")]
        if check != ["ok"]:
            target.unlink(missing_ok=True)
            raise RuntimeError(f"Backup integrity_check failed: {check}")
    backups = sorted(backup_dir.glob("cot-archive-????????T??????Z.sqlite3"), key=lambda p: p.name)
    for old in backups[:-MAX_LOCAL_BACKUPS]:
        old.unlink(missing_ok=True)
    return target


def export_data(conn: sqlite3.Connection) -> dict[str, Any]:
    rows = conn.execute("""
        SELECT report_date,contract_market_code,market_name,asset,product_label,venue,
               contract_kind,core,contract_units,source_url,payload_json,payload_sha256,
               first_seen_at_utc,last_seen_at_utc
        FROM cot_observations
        ORDER BY asset,venue,market_name,report_date
    """).fetchall()
    grouped: dict[tuple[str, str, str], dict[str, Any]] = {}
    all_dates: set[str] = set()
    for record in rows:
        key = (record["contract_market_code"], record["market_name"], record["asset"])
        item = grouped.setdefault(key, {
            "contract_market_code": record["contract_market_code"],
            "market_name": record["market_name"],
            "asset": record["asset"],
            "label": record["product_label"],
            "venue": record["venue"],
            "contract_kind": record["contract_kind"],
            "core": bool(record["core"]),
            "contract_units": record["contract_units"],
            "source_url": record["source_url"],
            "observations": [],
        })
        raw = json.loads(record["payload_json"])
        obs: dict[str, Any] = {
            "report_date": record["report_date"],
            "first_seen_at_utc": record["first_seen_at_utc"],
            "last_seen_at_utc": record["last_seen_at_utc"],
            "payload_sha256": record["payload_sha256"],
        }
        for field in NUMERIC_FIELDS:
            obs[field] = parse_number(raw.get(field))
        item["observations"].append(obs)
        all_dates.add(record["report_date"])
    series = list(grouped.values())
    series.sort(key=lambda s: (s["asset"], not s["core"], s["venue"], s["label"]))
    for item in series:
        item["observations"].sort(key=lambda o: o["report_date"])
    latest = max(all_dates) if all_dates else None
    collected = max((r["last_seen_at_utc"] for r in rows), default=None)
    return {
        "schema_version": 1,
        "generated_at_utc": utc_now(),
        "dataset": {
            "id": DATASET_ID,
            "name": REPORT_TYPE,
            "format": "Futures Only",
            "source_url": SOURCE_URL,
            "metadata_url": ABOUT_URL,
            "positions_as_of": "positions taken as of Tuesday (CFTC report date)",
            "typical_publication_lag": "Usually Friday; holiday schedules may shift publication.",
        },
        "latest_report_date": latest,
        "last_collected_at_utc": collected,
        "coverage": {
            "first_report_date": min(all_dates) if all_dates else None,
            "last_report_date": latest,
            "report_date_count": len(all_dates),
            "series_count": len(series),
            "observation_count": len(rows),
            "retention": "indefinite",
        },
        "disclaimer": (
            "COT décrit les positions déclarées sur futures, avec retard. Les catégories décrivent "
            "des profils de participants, pas leurs intentions; ces données ne constituent pas un signal ni un conseil."
        ),
        "series": series,
    }


def atomic_write_json(path: Path, data: dict[str, Any]) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    encoded = (json.dumps(data, ensure_ascii=False, separators=(",", ":"), allow_nan=False) + "\n").encode("utf-8")
    if len(encoded) > MAX_EXPORT_BYTES:
        raise ValueError(f"Export exceeds {MAX_EXPORT_BYTES} bytes: {len(encoded)}")
    fd, temp_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(encoded)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_name, path)
    except Exception:
        Path(temp_name).unlink(missing_ok=True)
        raise
    # Verify the written file parses and keeps the expected schema.
    written = json.loads(path.read_text(encoding="utf-8"))
    if written.get("schema_version") != 1 or not isinstance(written.get("series"), list):
        raise RuntimeError("Export validation failed after write")
    return len(encoded)


def command_sync(args: argparse.Namespace) -> int:
    started = utc_now()
    rows = fetch_all()
    if not rows:
        raise RuntimeError("CFTC returned zero rows for the validated whitelist; refusing to overwrite archive")
    db = Path(args.db)
    conn = connect(db)
    try:
        counts = sync_rows(conn, rows, started)
        integrity_check(conn)
        backup = make_backup(conn, Path(args.backup_dir))
        exported = export_data(conn)
        export_bytes = atomic_write_json(Path(args.output), exported)
        print(json.dumps({
            "status": "ok", "db": str(db), "backup": str(backup),
            "source_rows": len(rows), "counts": counts,
            "series": exported["coverage"]["series_count"],
            "report_dates": exported["coverage"]["report_date_count"],
            "first_date": exported["coverage"]["first_report_date"],
            "last_date": exported["coverage"]["last_report_date"],
            "export": str(Path(args.output)), "export_bytes": export_bytes,
            "integrity_check": "ok",
        }, ensure_ascii=False, indent=2))
    finally:
        conn.close()
    return 0


def command_export(args: argparse.Namespace) -> int:
    conn = connect(Path(args.db))
    try:
        data = export_data(conn)
        size = atomic_write_json(Path(args.output), data)
        print(json.dumps({"status": "ok", "rows": data["coverage"]["observation_count"],
                          "report_dates": data["coverage"]["report_date_count"],
                          "series": data["coverage"]["series_count"],
                          "output": str(Path(args.output)), "bytes": size}, ensure_ascii=False))
    finally:
        conn.close()
    return 0


def command_check(args: argparse.Namespace) -> int:
    conn = connect(Path(args.db))
    try:
        integrity_check(conn)
        counts = {
            "observations": conn.execute("SELECT count(*) FROM cot_observations").fetchone()[0],
            "revisions": conn.execute("SELECT count(*) FROM cot_revisions").fetchone()[0],
            "sync_runs": conn.execute("SELECT count(*) FROM sync_runs").fetchone()[0],
        }
        print(json.dumps({"status": "ok", "integrity_check": "ok", **counts}, ensure_ascii=False))
    finally:
        conn.close()
    return 0


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    root.add_argument("--db", default=str(DEFAULT_DB), help="SQLite database path")
    root.add_argument("--backup-dir", default=str(DEFAULT_BACKUP_DIR), help="Local backup generations directory")
    root.add_argument("--output", default=str(DEFAULT_EXPORT), help="Static JSON export path")
    commands = root.add_subparsers(dest="command", required=True)
    commands.add_parser("sync", help="Fetch all allowed CFTC history, upsert, back up and export")
    commands.add_parser("export", help="Export current SQLite data as static JSON")
    commands.add_parser("check", help="Run SQLite integrity and row-count checks")
    return root


def main() -> int:
    args = parser().parse_args()
    try:
        return {"sync": command_sync, "export": command_export, "check": command_check}[args.command](args)
    except Exception as exc:
        print(f"ERROR: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
