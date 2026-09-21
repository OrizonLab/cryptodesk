// ─────────────────────────────────────────────────────────────────────────────
// PARTENAIRES & AFFILIATION — source de vérité unique
// ─────────────────────────────────────────────────────────────────────────────
// Ce fichier alimente :
//   • la page /partenaires/  (src/pages/partenaires.astro)
//   • le bloc affiliés en bas des articles  (src/layouts/PostLayout.astro)
//   • le comparateur d'exchanges  (src/pages/comparateur.astro)
//
// ⚠️ CONFORMITÉ MiCA (mise à jour 18/09/2026) ────────────────────────────────
// Depuis le 1er juillet 2026 (fin de la période transitoire MiCA), seuls les
// prestataires AGRÉÉS (PSCA/CASP) peuvent servir des clients européens, et
// promouvoir un acteur non agréé est interdit :
//   • art. 4 V de la loi du 9 juin 2023 (activité d'influence commerciale)
//   • art. L.222-16-2 du code de la consommation (parrainage/publicité)
//   • ARPP Recommandation Crypto-actifs V3 : vérifier la liste blanche AMF /
//     registre ESMA AVANT toute diffusion.
// Vérification effectuée sur le registre officiel ESMA (CASPS.csv, 417 entités
// au 18/09/2026) : https://www.esma.europa.eu/.../markets-crypto-assets-regulation-mica
//   ✅ Bitvavo B.V. (AFM, NL) · Bitstack Digital Assets SAS (AMF, FR)
//   ✅ Payward Europe Solutions Ltd (CBI, IE) · OKX Europe Limited (MFSA, MT)
//   ❌ WEEX — ABSENT du registre → désactivé (active: false)
//   ❌ Bitget — ABSENT du registre → désactivé (active: false)
//   ⚠️ Aave — protocole décentralisé, pas un prestataire de services → lien de
//      parrainage désactivé (mention éditoriale possible, sans lien d'invitation)
// NE JAMAIS réactiver un partenaire sans revérifier le registre ESMA.
//
// Champs :
//   promo     → « offre du moment » affichée en badge (null = pas d'offre)
//   featured  → mise en avant dans la section « Offres du moment »
//   active    → false = masqué partout (partenariat retiré / non conforme)
//   mica      → agrément exact : entité + autorité + n° LEI + date (registre ESMA)
//   type/pays/regulation/frais/fraisClasse/ideal → ligne du comparateur
//
// MISE À JOUR AUTOMATIQUE : le cron « Veille offres affiliation » (hebdo)
// revoit les offres du moment et met à jour promo/featured/active ici.
// Il ne doit JAMAIS modifier url/cta/umami/name/mica, ni réactiver un
// partenaire non agréé.
// ─────────────────────────────────────────────────────────────────────────────

export type Affiliate = {
  name: string;
  tagline: string;
  bonus: string;
  url: string;
  cta: string;
  note: string;
  umami: string;
  promo: string | null;
  featured: boolean;
  active: boolean;
  /** Agrément MiCA vérifié au registre ESMA (entité + autorité + LEI + date) */
  mica?: string;
  // Champs comparateur (optionnels — page /comparateur/)
  type?: string;
  pays?: string;
  regulation?: string;
  frais?: string;
  fraisClasse?: 'faible' | 'moyen' | 'eleve';
  ideal?: string;
};

/** Avertissement risque — affiché au même niveau visuel que les offres
 *  (obligation de communication MiCA/ARPP : risque de perte totale). */
export const riskWarning =
  "Risque : les crypto-actifs peuvent perdre la totalité de leur valeur — volatilité extrême, risque de piratage, aucune protection des dépôts (contrairement à un compte bancaire). N'investissez que des sommes que vous pouvez perdre. Aucun contenu de ce site ne constitue un conseil en investissement.";

/** Mention de conformité affichée à côté des liens d'affiliation. */
export const micaNotice =
  "Toutes les plateformes présentées ici sont agréées MiCA (prestataire de services sur crypto-actifs) et vérifiées sur le registre officiel de l'ESMA. Liens de parrainage : nous percevons une commission, sans surcoût pour vous.";

export const affiliates: Affiliate[] = [
  {
    name: 'Bitvavo',
    tagline: 'Exchange européen, simple et régulé (Pays-Bas).',
    bonus: "Idéal pour débuter : interface claire, frais parmi les plus bas d'Europe.",
    url: 'https://bitvavo.com/invite?a=5CC31560CE',
    cta: 'Créer un compte Bitvavo',
    note: 'Parrainage : frais réduits pour toi et moi.',
    umami: 'bitvavo',
    promo: '0 % de frais sur vos 10 000 premiers € de trading',
    featured: true,
    active: true,
    mica: 'Bitvavo B.V. — autorité : AFM (Pays-Bas) — LEI 724500MX2WBKDJP9HE56 — agrément notifié le 26/06/2025, passeport européen (France incluse)',
    type: 'Exchange centralisé',
    pays: 'Pays-Bas 🇳🇱',
    regulation: 'Agréé MiCA (AFM, Pays-Bas)',
    frais: '0,25 % (maker/taker)',
    fraisClasse: 'faible',
    ideal: 'Débutants',
  },
  {
    name: 'Bitstack',
    tagline: 'Épargner en Bitcoin au quotidien, simplement.',
    bonus: "Arrondis automatiques et épargne programmée : le moyen le plus simple d'accumuler du BTC.",
    url: 'https://bitstack-app.com/referral/2softk0f6gUhcTpxoxAUqPd0gfK',
    cta: 'Rejoindre Bitstack',
    note: "Bonus de bienvenue en Bitcoin à l'inscription.",
    umami: 'bitstack',
    promo: '5 € en Bitcoin offerts à l’inscription',
    featured: false,
    active: true,
    mica: 'Bitstack Digital Assets SAS — autorité : AMF (France) — LEI 894500RKZ3TVTPIF7V84 — agrément notifié le 30/06/2025',
    type: 'Épargne BTC',
    pays: 'France 🇫🇷',
    regulation: 'Agréé MiCA (AMF, France)',
    frais: '1,49 % (achat)',
    fraisClasse: 'moyen',
    ideal: 'Épargne régulière',
  },
  {
    name: 'OKX',
    tagline: "Exchange international — entité européenne agréée à Malte : achat et vente au comptant, Web3.",
    bonus: "Bonus de bienvenue pour les nouveaux inscrits (code parrainage 77244970).",
    url: 'https://my.okx.com/fr-fr/join/77244970',
    cta: 'Ouvrir un compte OKX',
    note: 'Code de parrainage : 77244970.',
    umami: 'okx',
    promo: null,
    featured: false,
    active: true,
    mica: 'OKX Europe Limited — autorité : MFSA (Malte) — LEI 54930069NLWEIGLHXU42 — agrément notifié le 27/01/2025, passeport européen (dont la France)',
    type: 'Exchange international',
    pays: 'Malte 🇲🇹 (UE)',
    regulation: 'Agréé MiCA (MFSA, Malte)',
    frais: '0,10 % (spot)',
    fraisClasse: 'faible',
    ideal: 'Achat/vente au comptant & Web3',
  },
  {
    name: 'Kraken Pro',
    tagline: 'Exchange international réputé : achat/vente au comptant, sécurité solide.',
    bonus: "Récompenses de parrainage pour toi et moi à l'inscription (code t9rfwd87).",
    url: 'https://proinvite.kraken.com/9f1e/wqrqgy6s',
    cta: 'Rejoindre Kraken Pro',
    note: 'Code de parrainage : t9rfwd87.',
    umami: 'kraken',
    promo: 'Récompenses de parrainage à l’inscription (code t9rfwd87)',
    featured: false,
    active: true,
    mica: 'Payward Europe Solutions Limited — autorité : Central Bank of Ireland (Irlande) — LEI 254900641D8KNHUZYX24 — agrément notifié le 25/06/2025, passeport européen (dont la France)',
    type: 'Exchange international',
    pays: 'Irlande 🇮🇪 (UE)',
    regulation: 'Agréé MiCA (Central Bank of Ireland)',
    frais: '0,16 % / 0,26 % (spot)',
    fraisClasse: 'faible',
    ideal: 'Sécurité & volumes',
  },
  // ───────────────────────────────────────────────────────────────────────────
  // PARTENAIRES RETIRÉS (non conformes MiCA — voir en-tête).
  // Conservés ici, désactivés, pour historique et réactivation éventuelle
  // UNIQUEMENT après vérification du registre ESMA.
  // ───────────────────────────────────────────────────────────────────────────
  {
    name: 'WEEX',
    tagline: 'Exchange de produits dérivés (retiré du site).',
    bonus: 'Non agréé MiCA — retiré pour non-conformité (registre ESMA, 18/09/2026).',
    url: 'https://weex.com/register?vipCode=4flde',
    cta: '',
    note: 'Retiré le 18/09/2026 : absent du registre ESMA — promotion interdite (art. 4 V loi du 9 juin 2023).',
    umami: 'weex',
    promo: null,
    featured: false,
    active: false,
    type: 'Exchange dérivés',
    pays: 'Global 🌍',
    regulation: 'Non agréé MiCA (absent du registre ESMA)',
    frais: '0,06 % (futures)',
    fraisClasse: 'faible',
    ideal: 'Futures & copy trading',
  },
  {
    name: 'Bitget',
    tagline: 'Exchange international (retiré du site).',
    bonus: 'Non agréé MiCA — retiré pour non-conformité (registre ESMA, 18/09/2026).',
    url: 'https://www.bitgetapps.com/referral/register?clacCode=W8JDT92M',
    cta: '',
    note: 'Retiré le 18/09/2026 : absent du registre ESMA (seule une demande déposée en Autriche le 17/06/2026 — une demande n’est pas une autorisation).',
    umami: 'bitget',
    promo: null,
    featured: false,
    active: false,
    type: 'Exchange international',
    pays: 'Global 🌍',
    regulation: 'Non agréé MiCA (absent du registre ESMA)',
    frais: '0,10 % (spot)',
    fraisClasse: 'faible',
    ideal: 'Copy trading & futures',
  },
  {
    name: 'Aave',
    tagline: 'Protocole DeFi de prêt et d’épargne (lien de parrainage retiré).',
    bonus: "Le protocole n'est pas un prestataire de services sur crypto-actifs : il ne peut pas figurer dans une offre de parrainage. Mention éditoriale possible, sans lien d'invitation.",
    url: '',
    cta: '',
    note: 'Lien d’invitation retiré le 18/09/2026 : un protocole décentralisé n’est pas un PSAN agréé (hors champ de la liste blanche MiCA).',
    umami: 'aave',
    promo: null,
    featured: false,
    active: false,
    type: 'Protocole DeFi',
    pays: 'Décentralisé 🌐',
    regulation: 'Hors champ MiCA (protocole, non prestataire)',
    frais: 'Frais de protocole',
    fraisClasse: 'moyen',
    ideal: 'Prêt & épargne DeFi',
  },
];

export const activeAffiliates = affiliates.filter((a) => a.active);
export const featuredOffers = activeAffiliates.filter((a) => a.featured && a.promo);
