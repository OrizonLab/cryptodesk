import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

from scripts import cot_archive as cot


class CotArchiveTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.db = self.root / "cot.sqlite3"
        self.conn = cot.connect(self.db)

    def tearDown(self):
        self.conn.close()
        self.temp.cleanup()

    def row(self, open_interest="100"):
        row = {field: None for field in cot.FIELDS}
        row.update({
            "report_date_as_yyyy_mm_dd": "2026-09-29T00:00:00.000",
            "market_and_exchange_names": "BITCOIN - CHICAGO MERCANTILE EXCHANGE",
            "cftc_contract_market_code": "133741",
            "contract_units": "(5 Bitcoins)",
            "open_interest_all": open_interest,
            "lev_money_positions_long": "30",
            "lev_money_positions_short": "40",
            "change_in_open_interest_all": "-5",
        })
        return row

    def test_whitelist_is_the_approved_eight_markets_and_excludes_others(self):
        self.assertEqual(len(cot.MARKETS), 8)
        self.assertIn(("133LM1", cot.norm_name("Nano Bitcoin - Coinbase Derivatives, LLC")), cot.MARKETS)
        self.assertNotIn(("133LM1", cot.norm_name("Nano Bitcoin - LMX Labs LLC")), cot.MARKETS)
        self.assertNotIn(("146LM1", cot.norm_name("Nano Ether - LMX Labs LLC")), cot.MARKETS)
        self.assertNotIn(("1330E1", cot.norm_name("Bitcoin-USD - Cboe Futures Exchange")), cot.MARKETS)
        where = cot.build_where()
        self.assertNotIn("133LM5", where)
        self.assertNotIn("1330E1", where)
        self.assertIn("133741", where)
        self.assertIn("146021", where)

    def test_sync_is_idempotent_and_keeps_revisions(self):
        row = self.row()
        first = cot.sync_rows(self.conn, [row], "2026-10-03T00:00:00Z")
        self.assertEqual(first, {"fetched": 1, "inserted": 1, "revised": 0, "unchanged": 0})
        second = cot.sync_rows(self.conn, [row], "2026-10-03T00:01:00Z")
        self.assertEqual(second, {"fetched": 1, "inserted": 0, "revised": 0, "unchanged": 1})
        changed = self.row("101")
        third = cot.sync_rows(self.conn, [changed], "2026-10-03T00:02:00Z")
        self.assertEqual(third, {"fetched": 1, "inserted": 0, "revised": 1, "unchanged": 0})
        self.assertEqual(self.conn.execute("SELECT count(*) FROM cot_observations").fetchone()[0], 1)
        self.assertEqual(self.conn.execute("SELECT count(*) FROM cot_revisions").fetchone()[0], 2)
        current = self.conn.execute("SELECT payload_json FROM cot_observations").fetchone()[0]
        self.assertEqual(json.loads(current)["open_interest_all"], "101")
        self.assertEqual(cot.integrity_check(self.conn), "ok")

    def test_export_preserves_nulls_and_numeric_values(self):
        cot.sync_rows(self.conn, [self.row()], "2026-10-03T00:00:00Z")
        data = cot.export_data(self.conn)
        self.assertEqual(data["coverage"]["observation_count"], 1)
        self.assertEqual(data["series"][0]["observations"][0]["open_interest_all"], 100)
        self.assertIsNone(data["series"][0]["observations"][0]["dealer_positions_long_all"])
        output = self.root / "export.json"
        written_bytes = cot.atomic_write_json(output, data)
        self.assertEqual(written_bytes, output.stat().st_size)
        self.assertEqual(json.loads(output.read_text())["schema_version"], 1)

    def test_backup_is_integrity_checked_and_restorable(self):
        cot.sync_rows(self.conn, [self.row()], "2026-10-03T00:00:00Z")
        path = cot.make_backup(self.conn, self.root / "backups")
        with sqlite3.connect(path) as restored:
            self.assertEqual(restored.execute("PRAGMA integrity_check").fetchone()[0], "ok")
            self.assertEqual(restored.execute("SELECT count(*) FROM cot_observations").fetchone()[0], 1)

    def test_duplicate_conflict_is_rejected_before_database_write(self):
        a, b = self.row("100"), self.row("101")
        with self.assertRaisesRegex(ValueError, "Conflicting duplicate"):
            cot.validate_unique_rows([a, b])


if __name__ == "__main__":
    unittest.main()
