# Archive COT — CryptoDesk

## Purpose

Collecter et préserver les rapports publics hebdomadaires CFTC *Traders in Financial Futures — Futures Only* (jeu Socrata `gpe5-46if`), sans compte ni clé API, et produire un JSON statique pour Astro. Aucune base ou API n’est exposée au navigateur.

Source officielle : <https://publicreporting.cftc.gov/Commitments-of-Traders/TFF-Futures-Only/gpe5-46if/about_data>
Calendrier COT : <https://www.cftc.gov/MarketReports/CommitmentsofTraders/ReleaseSchedule/index.htm>

## Fichiers et données

- Collecteur/exporteur : `scripts/cot_archive.py` (stdlib Python uniquement).
- Pilote cron no-agent : `/opt/data/profiles/ares/scripts/weekly_cot_archive.py` (local au profil Hermes, hors dépôt).
- Base canonique locale : `data/cot-archive.sqlite3` (dossier `data/` ignoré par Git).
- Générations de sauvegarde locale : `/opt/data/backups/cryptodesk-cot/` (52 copies les plus récentes).
- Export statique public : `public/cot-history.json` (les observations sont publiques; aucune donnée personnelle).
- Page pédagogique : `src/pages/cot.astro`, route `/cot`.
- Interactivité sans dépendance externe : `public/js/cot-explorer.js`.

La clé d’une observation combine le jeu, le type de rapport, la date du rapport, le code CFTC **et le nom du marché/venue** : certains codes CFTC sont partagés entre marchés différents. Les valeurs sources sont gardées en JSON canonique et hachées; les anciennes versions d’une ligne restent dans `cot_revisions` quand une révision CFTC est observée. Les dates de publication exactes ne sont pas inférées : `first_seen_at_utc` est la première collecte locale.

Le périmètre autorisé est constitué de huit marchés BTC/ETH explicitement listés dans `MARKET_ROWS` : contrats CME standard et micro, Nano Coinbase et contrats Coinbase perp-style. Les codes sont appariés au nom du marché, car CFTC réutilise certains codes pour d’autres venues. Cboe historique, LMX Labs et Bitcoin Cash sont exclus. Toute ligne CFTC hors whitelist fait échouer le collecteur sans l’ajouter silencieusement.

La rétention est indéfinie dans la base. L’export comprend toutes les observations, avec une limite de taille de 5 Mio. La page propose une vue des 52 derniers rapports, jusqu’à 5 ans et toute la période disponible.

## Lancer manuellement

À la racine du dépôt :

```sh
python3 scripts/cot_archive.py sync
python3 scripts/cot_archive.py check
python3 -m unittest discover -s tests -p 'test_cot*.py' -v
npm run build
```

`sync` retélécharge l’historique des marchés autorisés, puis effectue un upsert idempotent, archive une révision si la ligne source change, exécute `PRAGMA integrity_check`, crée une sauvegarde SQLite cohérente via l’API SQLite et régénère l’export JSON par écriture atomique. Il est sans effet sur les comptes financiers et n’appelle aucun LLM.

Pour régénérer uniquement le JSON après une récupération de base :

```sh
python3 scripts/cot_archive.py export
```

La sauvegarde est locale à l’hôte. Hephaistos a signalé des snapshots VPS séparés chez Hostinger, mais l’inclusion de ces chemins et leur rétention n’ont pas encore été testées. Ne pas présenter le backup local seul comme une protection hors hôte. Le COT est rétéléchargeable depuis la CFTC, mais une reprise depuis la source ne reproduirait pas nécessairement chaque ancienne version rétroactivement corrigée.

## Modèle et précautions de lecture

L’export garde les positions brutes. Le graphe calcule `long − short`, puis rapporte ce net à l’intérêt ouvert total; les positions de spread ne sont pas prises pour une exposition directionnelle nette. Le delta net hebdomadaire est `variation long − variation short`. Les valeurs manquantes restent `null`, jamais zéro.

Le TFF fournit cinq catégories : Dealer, Asset Manager, Leveraged Money, Other Reportables et Non-Reportables. Ce sont des classifications d’activité, pas l’intention individuelle de chaque trader. Les positions peuvent correspondre à de la couverture ou de l’arbitrage, et la publication est retardée (positions généralement du mardi, rapport normalement publié le vendredi; calendrier susceptible d’être décalé par les jours fériés). Aucun score n’est présenté comme signal d’achat/vente.

## État opérationnel

La collecte est planifiée par le cron no-agent « Archive COT CryptoDesk » chaque vendredi à 21:00 UTC. Le script met à jour la base SQLite, une sauvegarde locale et `public/cot-history.json`. Les sorties et erreurs sont conservées localement; aucune notification utilisateur n’est envoyée. Le cron ne commite, ne pousse et ne déploie jamais : chaque export hebdomadaire devient visible sur le site seulement après un déploiement distinct autorisé. La protection hors hôte reste à confirmer; Hephaistos a signalé des snapshots VPS séparés chez Hostinger, mais l’inclusion de ces chemins et leur rétention n’ont pas encore été testées.
