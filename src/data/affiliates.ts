// ─────────────────────────────────────────────────────────────────────────────
// PARTENAIRES & AFFILIATION — source de vérité unique
// ─────────────────────────────────────────────────────────────────────────────
// Ce fichier alimente :
//   • la page /partenaires/  (src/pages/partenaires.astro)
//   • le bloc affiliés en bas des articles  (src/layouts/PostLayout.astro)
//   • le comparateur d'exchanges  (src/pages/comparateur.astro)
//
// Champs :
//   promo     → « offre du moment » affichée en badge (null = pas d'offre)
//   featured  → mise en avant dans la section « Offres du moment »
//   active    → false = masqué partout (partenariat terminé)
//   type/pays/regulation/frais/fraisClasse/ideal → ligne du comparateur
//
// MISE À JOUR AUTOMATIQUE : le cron « Veille offres affiliation » (hebdo)
// revoit les offres du moment et met à jour promo/featured/active ici,
// puis commit + push + déploiement. Ne pas dupliquer ces URLs ailleurs.
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
  // Champs comparateur (optionnels — page /comparateur/)
  type?: string;
  pays?: string;
  regulation?: string;
  frais?: string;
  fraisClasse?: 'faible' | 'moyen' | 'eleve';
  ideal?: string;
};

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
    type: 'Exchange centralisé',
    pays: 'Pays-Bas 🇳🇱',
    regulation: 'Régulé (DNB)',
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
    type: 'Épargne BTC',
    pays: 'France 🇫🇷',
    regulation: 'PSAN (AMF)',
    frais: '1,49 % (achat)',
    fraisClasse: 'moyen',
    ideal: 'Épargne régulière',
  },
  {
    name: 'OKX',
    tagline: 'Exchange international : spot, produits dérivés, Web3.',
    bonus: "Jusqu'à 150 € de bonus quand tu commences à trader (code parrainage 77244970).",
    url: 'https://my.okx.com/fr-fr/join/77244970',
    cta: 'Ouvrir un compte OKX',
    note: 'Code de parrainage : 77244970.',
    umami: 'okx',
    promo: 'Bonus de dépôt 8 % jusqu’à 5 000 € (jusqu’au 31 août)',
    featured: true,
    active: true,
    type: 'Exchange international',
    pays: 'Global 🌍',
    regulation: 'Licences multiples',
    frais: '0,10 % (spot)',
    fraisClasse: 'faible',
    ideal: 'Traders actifs',
  },
  {
    name: 'WEEX',
    tagline: 'Exchange en forte croissance : contrats, copy trading.',
    bonus: 'Accès aux produits dérivés avec des promotions régulières.',
    url: 'https://weex.com/register?vipCode=4flde',
    cta: "S'inscrire sur WEEX",
    note: 'Code VIP : 4flde.',
    umami: 'weex',
    promo: 'Promotions régulières sur les dérivés',
    featured: false,
    active: true,
    type: 'Exchange dérivés',
    pays: 'Global 🌍',
    regulation: 'Licences multiples',
    frais: '0,06 % (futures)',
    fraisClasse: 'faible',
    ideal: 'Futures & copy trading',
  },
  {
    name: 'Bitget',
    tagline: 'Exchange mondial : copy trading, futures, earn.',
    bonus: 'Programme de parrainage avec bonus pour les nouveaux inscrits.',
    url: 'https://www.bitgetapps.com/referral/register?clacCode=W8JDT92M&from=%2Fevents%2Freferral-all-program&source=events&utmSource=PremierInviter',
    cta: 'Ouvrir un compte Bitget',
    note: 'Code parrainage : W8JDT92M.',
    umami: 'bitget',
    promo: 'Jusqu’à 20 % de réduction à vie sur les frais de trading',
    featured: true,
    active: true,
    type: 'Exchange international',
    pays: 'Global 🌍',
    regulation: 'Licences multiples',
    frais: '0,10 % (spot)',
    fraisClasse: 'faible',
    ideal: 'Copy trading & futures',
  },
  {
    name: 'Aave',
    tagline: "Protocole DeFi de prêt et d'épargne — accès anticipé V4.",
    bonus: "Invitation à l'accès anticipé du protocole Aave V4 et de l'application dédiée.",
    url: 'https://aave.com/r/2BA113',
    cta: 'Accéder à Aave V4',
    note: "Lien d'invitation accès anticipé.",
    umami: 'aave',
    promo: null,
    featured: false,
    active: true,
    type: 'Protocole DeFi',
    pays: 'Décentralisé 🌐',
    regulation: 'Open source',
    frais: 'Frais de protocole',
    fraisClasse: 'moyen',
    ideal: 'Prêt & épargne DeFi',
  },
  {
    name: 'Kraken Pro',
    tagline: 'Exchange international réputé : spot, futures, sécurité solide.',
    bonus: "Récompenses de parrainage pour toi et moi à l'inscription (code t9rfwd87).",
    url: 'https://proinvite.kraken.com/9f1e/wqrqgy6s',
    cta: 'Rejoindre Kraken Pro',
    note: 'Code de parrainage : t9rfwd87.',
    umami: 'kraken',
    promo: 'Récompenses de parrainage à l’inscription (code t9rfwd87)',
    featured: true,
    active: true,
    type: 'Exchange international',
    pays: 'Global 🌍',
    regulation: 'Régulé (multiples juridictions)',
    frais: '0,16 % / 0,26 % (spot)',
    fraisClasse: 'faible',
    ideal: 'Traders & sécurité',
  },
];

export const activeAffiliates = affiliates.filter((a) => a.active);
export const featuredOffers = activeAffiliates.filter((a) => a.featured && a.promo);
