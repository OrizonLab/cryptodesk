# Vérification MiCA des partenaires — dossier de preuve

> **Ce document est la trace des contrôles effectués avant toute promotion d'un partenaire.**
> C'est exactement ce que la DGCCRF a reproché aux entités sanctionnées le 14/04/2026 :
> **ne pas avoir contrôlé** le statut des acteurs promus.

## Base légale

- **Règlement (UE) 2023/1114 (MiCA)** : depuis le **1er juillet 2026** (fin de la période transitoire), seuls les prestataires agréés (*CASP/PSCA*) peuvent fournir des services sur crypto-actifs à des clients de l'Union.
- **Loi n° 2023-451 du 9 juin 2023, art. 4 V** : interdiction, pour toute personne exerçant une activité d'influence commerciale, de promouvoir directement ou indirectement la fourniture de services sur crypto-actifs par un acteur non enregistré/agréé.
- **Code de la consommation, art. L.222-16-2** : interdiction des opérations de parrainage ayant pour objet ou effet la publicité d'un service sur actifs numériques sans le statut requis.
- **ARPP, Recommandation Crypto-actifs V3** (en vigueur au 1er juillet 2026) : vérifier que le prestataire figure sur la liste blanche AMF / registre ESMA **avant toute diffusion**.

## Procédure de contrôle (à rejouer à chaque ajout ou révision)

```bash
# 1. Télécharger le registre officiel ESMA des prestataires agréés MiCA
curl -s -o /tmp/CASPS.csv "https://www.esma.europa.eu/sites/default/files/2024-12/CASPS.csv"
curl -s -o /tmp/NCASP.csv "https://www.esma.europa.eu/sites/default/files/2024-12/NCASP.csv"

# 2. Empreinte du fichier (preuve d'intégrité) + date
sha256sum /tmp/CASPS.csv; date -u

# 3. Rechercher l'ENTITÉ LÉGALE (pas la marque) dans ae_lei_name / ae_commercial_name
#    Exemples de correspondances : Kraken -> Payward Europe Solutions Limited,
#    OKX -> OKX Europe Limited, Bitstamp -> ..., etc.
#    Colonnes utiles : ae_lei_name, ae_competentAuthority, ae_homeMemberState,
#                      ae_lei, ac_authorisationNotificationDate, ac_serviceCode_cou (passeport)
```

⚠️ Points de méthode :
- Chercher le **nom d'entité légale**, pas la marque : une marque absente peut exister sous une autre entité.
- Vérifier le **passeport** (`ac_serviceCode_cou`) : l'entité doit couvrir la France (`FR`) ou le passeport doit inclure les pays visés.
- Croiser avec `NCASP.csv` (registre des acteurs **non conformes** signalés par les autorités).

## Contrôle du 18 septembre 2026

**Source** : registre intermédiaire MiCA de l'ESMA — `CASPS.csv`
**Empreinte SHA-256 du fichier contrôlé** : `f43c0d18a6d2d98d0479b510f01aee4777990cdb133e319a6b35fa3176a3b1d0`
**Taille** : 169 626 octets · **Téléchargé le** 18/09/2026 à 03:19 UTC · **Entités dans le registre** : 352

### Partenaires promus sur le site (actifs) — tous présents au registre

| Partenaire | Entité légale | Autorité | État | LEI | Agrément notifié |
|---|---|---|---|---|---|
| Bitvavo | Bitvavo B.V. | AFM (Pays-Bas) | NL | 724500MX2WBKDJP9HE56 | 26/06/2025 |
| Bitstack | BITSTACK DIGITAL ASSETS SAS | AMF (France) | FR | 894500RKZ3TVTPIF7V84 | 30/06/2025 |
| Kraken Pro | Payward Europe Solutions Limited | Central Bank of Ireland | IE | 254900641D8KNHUZYX24 | 25/06/2025 |
| OKX | OKX Europe Limited | MFSA (Malte) | MT | 54930069NLWEIGLHXU42 | 27/01/2025 |

*Note : les LEI sont repris du fichier source ; vérifier la valeur exacte à chaque nouveau contrôle.*

### Partenaires RETIRÉS le 18/09/2026 (non conformes)

| Partenaire | Constat | Décision |
|---|---|---|
| **WEEX** | Aucune occurrence dans le registre CASP (417 lignes contrôlées), absent de `NCASP.csv` | `active: false` — URLs neutralisées, retiré du site, du comparateur, du simulateur et du lexique |
| **Bitget** | Aucune occurrence dans le registre. Une demande d'agrément déposée auprès du régulateur autrichien le 17/06/2026 a été évoquée publiquement — **une demande n'est pas une autorisation** | `active: false` — idem |
| **Aave** | Protocole décentralisé : par construction, il n'est pas un prestataire de services et ne peut pas figurer sur la liste blanche MiCA | Lien de parrainage retiré ; mention éditoriale possible, sans lien d'invitation |

### Contrôles complémentaires effectués

- Recherche des mentions « WEEX », « Bitget », « Aave » dans **toutes** les pages générées du site (`dist/`) : seules occurrences restantes = citations d'analystes dans deux articles d'archive (mentions de source, sans lien ni promotion) et la mention explicative du présent retrait sur `/partenaires/`.
- Vérification des surfaces d'affiliation : `src/data/affiliates.ts` (source unique), `PostLayout.astro` (blocs en bas d'article FR), `lexique/[slug].astro` (7 blocs contextuels), `partenaires.astro`, `comparateur.astro` + `src/data/exchange-fees.json` (simulateur de coût). L'édition anglaise ne comporte aucun bloc d'affiliation.
- **Lien de parrainage OKX confirmé conforme (18/09/2026)** : interrogé sur le point de vigilance initial (le domaine `my.okx.com` pouvait laisser penser à une redirection vers l'entité mondiale), l'éditeur a confirmé que ce lien est celui généré par **son application OKX européenne** — il route donc vers **OKX Europe Limited** (MFSA, Malte), l'entité agréée MiCA. Aucune action requise ; à revérifier si OKX modifie la structure de son domaine ou la géolocalisation de ses liens.

## Engagements pris

1. **Contrôle avant diffusion** : aucun partenaire n'est promu sans vérification documentée ci-dessus.
2. **Retrait immédiat** : si un partenaire perd son agrément (ou disparaît du registre), il est **désactivé sans délai** (`active: false` dans `src/data/affiliates.ts`), ce qui le retire automatiquement de toutes les pages, du comparateur, du simulateur et du lexique — puis le déploiement est déclenché.
3. **Contrôle récurrent automatisé** : le job hebdomadaire « Veille offres affiliation » (lundi) télécharge le registre ESMA, vérifie que chaque partenaire actif y figure encore, désactive automatiquement celui qui aurait disparu et alerte l'éditeur. Il a l'interdiction explicite de réactiver un partenaire retiré ou d'en ajouter un nouveau.
4. **Avertissements** : un avertissement de risque (perte totale possible, volatilité, piratage, absence de protection des dépôts) est affiché au même niveau visuel que chaque offre, et les blocs d'affiliation sont identifiés comme communications commerciales.

## Historique

| Date | Événement |
|---|---|
| 18/09/2026 | Contrôle initial complet (registre ESMA + liste blanche AMF) → retrait de WEEX, Bitget et Aave ; recadrage d'OKX (suppression des mentions « dérivés » et « traders actifs ») ; agréments détaillés affichés ; avertissements risque ajoutés ; création des pages Mentions légales et Politique de confidentialité |

## Réserve

Ce dossier documente une vérification factuelle aux sources officielles ; il ne constitue pas un avis juridique. Pour un site générant des revenus par affiliation, une consultation d'avocat spécialisé en droit du numérique / régulation des actifs numériques reste recommandée.
