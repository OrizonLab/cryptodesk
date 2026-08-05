// ============================================================
// Lexique crypto — données des termes
// Chaque terme génère une page /lexique/<slug>/ (SEO)
// category détermine le bloc affilié recommandé en bas de page
// ============================================================

export interface LexiqueTerm {
  term: string;
  slug: string;
  category: 'bitcoin' | 'defi' | 'trading' | 'securite' | 'marche' | 'technique';
  short: string; // définition en 1 phrase (meta description + intro)
  content: string[]; // paragraphes d'explication
  related?: string[]; // slugs de termes liés
}

export const CATEGORIES: Record<LexiqueTerm['category'], { name: string; emoji: string; desc: string }> = {
  bitcoin: { name: 'Bitcoin & actifs', emoji: '🟠', desc: 'Les actifs et concepts fondamentaux de la crypto.' },
  defi: { name: 'DeFi', emoji: '🔷', desc: 'Finance décentralisée : protocoles, staking, rendements.' },
  trading: { name: 'Trading', emoji: '📈', desc: 'Ordres, stratégies et vocabulaire des traders.' },
  securite: { name: 'Sécurité', emoji: '🔐', desc: 'Protéger ses actifs : wallets, clés, bonnes pratiques.' },
  marche: { name: 'Marché', emoji: '🌍', desc: 'Dynamique de marché, sentiment et indicateurs.' },
  technique: { name: 'Technique', emoji: '⚙️', desc: 'Blockchain, consensus et infrastructure.' },
};

export const LEXIQUE: LexiqueTerm[] = [
  // ============ BITCOIN & ACTIFS ============
  {
    term: 'Bitcoin (BTC)',
    slug: 'bitcoin',
    category: 'bitcoin',
    short: 'La première cryptomonnaie, créée en 2009 par Satoshi Nakamoto : un argent numérique décentralisé, limité à 21 millions d\'unités.',
    content: [
      'Le Bitcoin est la première cryptomonnaie de l\'histoire, lancée en janvier 2009 par un auteur anonyme connu sous le pseudonyme de Satoshi Nakamoto. Son innovation : un système de paiement électronique fonctionnant sans banque centrale ni intermédiaire, grâce à un registre public partagé appelé blockchain.',
      'Son offre est mathématiquement plafonnée à 21 millions de bitcoins. Cette rareté programmée, combinée à la difficulté croissante de production (le halving), lui vaut souvent le surnom d\'« or numérique ». Contrairement aux monnaies fiduciaires, personne ne peut en créer davantage par décision politique.',
      'Le Bitcoin est aujourd\'hui l\'actif de référence du marché crypto : sa capitalisation représente environ la moitié du marché total, et son cours donne le « la » au reste de l\'écosystème. Il est aussi devenu un actif financier institutionnel, avec des ETF au comptant aux États-Unis depuis 2024.',
    ],
    related: ['blockchain', 'halving', 'altcoin', 'market-cap'],
  },
  {
    term: 'Altcoin',
    slug: 'altcoin',
    category: 'bitcoin',
    short: 'Toute cryptomonnaie autre que le Bitcoin : Ethereum, Solana, Chainlink, etc.',
    content: [
      'Le terme « altcoin » (contraction de *alternative coin*) désigne toute cryptomonnaie qui n\'est pas le Bitcoin. On y range aussi bien des actifs majeurs comme Ethereum ou Solana que des projets plus confidentiels.',
      'Les altcoins se distinguent du Bitcoin par leur objectif : certaines visent le calcul (Ethereum), d\'autres la vitesse (Solana), d\'autres encore l\'oracle de données (Chainlink) ou la finance décentralisée (Aave). Cette diversité en fait un univers à la fois riche et risqué.',
      'Règle de prudence : plus un altcoin est petit et récent, plus son risque est élevé. Les « memecoins » en particulier sont des paris spéculatifs sans valeur fondamentale. Privilégier les protocoles qui génèrent des revenus réels (frais, TVL) est une approche plus solide.',
    ],
    related: ['bitcoin', 'market-cap', 'token'],
  },
  {
    term: 'Stablecoin',
    slug: 'stablecoin',
    category: 'bitcoin',
    short: 'Une cryptomonnaie dont la valeur est arrimée à un actif stable (dollar, euro, or) pour éviter la volatilité.',
    content: [
      'Un stablecoin est une cryptomonnaie conçue pour conserver une valeur stable, généralement arrimée 1:1 au dollar américain (USDT, USDC, DAI) ou à d\'autres devises. L\'objectif : offrir les avantages de la crypto (transferts rapides, 24/7) sans la volatilité.',
      'Deux grands modèles existent. Les stablecoins centralisés (USDT, USDC) sont adossés à des réserves détenues par une société. Les stablecoins décentralisés (DAI) sont garantis par des collatéraux en crypto, gérés par des protocoles.',
      'Les stablecoins sont l\'oxygène du marché : ils servent de valeur refuge pendant les baisses, de monnaie d\'échange sur les plateformes, et de pont entre le monde traditionnel et la crypto. Leur régulation (notamment en Europe avec MiCA) est un sujet majeur.',
    ],
    related: ['defi', 'exchange', 'token'],
  },
  {
    term: 'NFT (Jeton non fongible)',
    slug: 'nft',
    category: 'bitcoin',
    short: 'Un jeton numérique unique attestant la propriété d\'un objet digital : art, collectibles, actifs de jeux.',
    content: [
      'Un NFT (Non-Fungible Token, jeton non fongible) est un certificat de propriété numérique unique, inscrit sur une blockchain (souvent Ethereum). Contrairement à un bitcoin — fongible, interchangeable — chaque NFT est unique et ne peut pas être échangé à l\'identique.',
      'Les NFT ont explosé en 2021 avec les collections d\'art digital (CryptoPunks, Bored Apes), puis se sont étendus aux jeux vidéo, aux billets d\'événements, aux domaines et aux identités numériques. Leur valeur dépend de la demande, de la rareté et de l\'utilité réelle.',
      'Attention : après le pic de 2021, la plupart des collections ont vu leur valeur s\'effondrer. Un NFT n\'a de valeur que si quelqu\'un est prêt à l\'acheter. Privilégier les projets avec une vraie utilité plutôt que la spéculation pure.',
    ],
    related: ['blockchain', 'ethereum', 'token'],
  },
  {
    term: 'Ethereum (ETH)',
    slug: 'ethereum',
    category: 'defi',
    short: 'La deuxième cryptomonnaie et la première blockchain programmable : le socle de la DeFi et des smart contracts.',
    content: [
      'Ethereum, lancé en 2015 par Vitalik Buterin, est bien plus qu\'une cryptomonnaie : c\'est une plateforme de calcul décentralisée. Son jeton, l\'ETH, sert à payer les frais de transaction (gas) et à sécuriser le réseau.',
      'Sa grande innovation : les smart contracts, des programmes autonomes qui s\'exécutent sans intermédiaire. C\'est sur Ethereum que vit l\'essentiel de la finance décentralisée (DeFi), des stablecoins et des NFT. La plupart des protocoles majeurs (Aave, Uniswap, Lido) y sont nés.',
      'Ethereum a basculé en 2022 d\'un consensus « proof of work » (minage) à « proof of stake » (validation par mise en jeu), réduisant sa consommation d\'énergie de plus de 99 %. Ses frais élevés en période de forte activité ont poussé vers des solutions de couche 2 (Arbitrum, Optimism, Base).',
    ],
    related: ['smart-contract', 'defi', 'gas-fees', 'layer2'],
  },
  {
    term: 'Token',
    slug: 'token',
    category: 'bitcoin',
    short: 'Un actif numérique émis sur une blockchain existante (souvent Ethereum), représentant un droit, une utilité ou une valeur.',
    content: [
      'Un token est un actif numérique créé sur une blockchain existante (Ethereum, Solana, BNB Chain...), par opposition aux « coins » qui disposent de leur propre blockchain (Bitcoin, Ethereum). Les tokens représentent une unité de valeur ou de droit dans un projet.',
      'On distingue les tokens utilitaires (accès à un service : payer des frais réduits, voter), les tokens de gouvernance (droits de vote sur les décisions d\'un protocole) et les tokens de sécurité (représentant une part ou un revenu, soumis à régulation).',
      'La création d\'un token est facile et peu coûteuse — c\'est pourquoi il existe des centaines de milliers de tokens, dont beaucoup sans aucune valeur. L\'analyse fondamentale (revenus réels, équipe, usage) est essentielle pour trier.',
    ],
    related: ['altcoin', 'defi', 'ico'],
  },
  {
    term: 'Halving',
    slug: 'halving',
    category: 'bitcoin',
    short: 'La division par deux de la récompense de minage du Bitcoin, tous les ~4 ans, qui réduit l\'offre de nouveaux BTC.',
    content: [
      'Le halving est un mécanisme inscrit dans le code du Bitcoin : tous les 210 000 blocs (environ 4 ans), la récompense accordée aux mineurs pour la production d\'un bloc est divisée par deux. De 50 BTC en 2009, elle est passée à 3,125 BTC après le halving d\'avril 2024.',
      'Objectif : contrôler l\'inflation et maintenir la rareté. Comme l\'offre de nouveaux bitcoins diminue alors que la demande peut rester stable ou augmenter, les halvings sont historiquement suivis de cycles haussiers — mais avec un décalage de plusieurs mois et jamais de manière mécanique.',
      'Le prochain halving est attendu en 2028. Attention : un halving ne garantit pas une hausse. C\'est un choc d\'offre, pas une promesse de rendement. Le marché intègre souvent l\'événement à l\'avance.',
    ],
    related: ['bitcoin', 'minage', 'market-cap'],
  },
  {
    term: 'Market cap (Capitalisation)',
    slug: 'market-cap',
    category: 'marche',
    short: 'La valeur totale d\'une cryptomonnaie : prix × nombre d\'unités en circulation.',
    content: [
      'La capitalisation boursière (market cap) d\'une cryptomonnaie se calcule en multipliant son prix par son nombre d\'unités en circulation. C\'est la mesure la plus utilisée pour comparer la taille relative des actifs : Bitcoin (~50 % du marché), Ethereum, puis le reste.',
      'Elle permet de classer les actifs en « large cap » (plus de 10 Mds$), « mid cap » (1-10 Mds$) et « small cap » (moins de 1 Md$). En règle générale, plus la capitalisation est faible, plus la volatilité et le risque sont élevés.',
      'Piège à éviter : une capitalisation élevée ne signifie pas que cet argent « entre » dans le projet. Elle reflète la valeur totale des pièces en circulation au prix actuel. Une faible liquidité peut aussi fausser les comparaisons.',
    ],
    related: ['bitcoin', 'volume', 'liquidity'],
  },
  {
    term: 'ICO (Initial Coin Offering)',
    slug: 'ico',
    category: 'bitcoin',
    short: 'Une levée de fonds où un projet vend ses tokens à l\'avance pour financer son développement.',
    content: [
      'Une ICO (Initial Coin Offering) est une levée de fonds en cryptomonnaie : un projet émet des tokens qu\'il vend au public, généralement avant le lancement de son produit. Les investisseurs parient sur la réussite future du projet en échange de tokens potentiellement prometteurs.',
      'La bulle des ICO de 2017-2018 a révélé les dérives du modèle : projets sans produit, équipes anonymes, fonds détournés. De nombreuses ICO se sont révélées être des arnaques pures. La régulation a ensuite encadré le secteur (notamment les « securities » aux États-Unis).',
      'Le modèle a évolué vers les IDO (Initial DEX Offering) sur les échanges décentralisés et les IEO (Initial Exchange Offering) orchestrées par des plateformes. Principe de prudence : toute vente de tokens à l\'avance comporte un risque élevé de perte totale.',
    ],
    related: ['token', 'exchange', 'rug-pull'],
  },

  // ============ DEFI ============
  {
    term: 'DeFi (Finance décentralisée)',
    slug: 'defi',
    category: 'defi',
    short: 'Un système financier sans banque ni intermédiaire, construit sur des smart contracts : prêt, échange, épargne.',
    content: [
      'La DeFi (Decentralized Finance) désigne l\'ensemble des services financiers fonctionnant sans intermédiaire centralisé, grâce à des smart contracts sur blockchain (principalement Ethereum). Prêter, emprunter, échanger, épargner : tout y est automatisé et transparent.',
      'Les protocoles DeFi majeurs : Uniswap (échanges), Aave (prêts), Lido (staking), MakerDAO (stablecoin DAI). Ces protocoles génèrent des revenus réels via les frais prélevés — un indicateur fondamental pour évaluer leur santé, au même titre que le TVL (valeur totale verrouillée).',
      'La DeFi offre des rendements (yield) parfois attractifs, mais comporte des risques spécifiques : bugs de code, attaques de hackeurs, volatilité extrême. Les rendements « mirobolants » cachent presque toujours des risques majeurs. La prudence est de mise.',
    ],
    related: ['smart-contract', 'stablecoin', 'tvl', 'yield-farming'],
  },
  {
    term: 'Smart contract',
    slug: 'smart-contract',
    category: 'technique',
    short: 'Un programme autonome stocké sur blockchain qui s\'exécute automatiquement quand ses conditions sont remplies.',
    content: [
      'Un smart contract est un programme informatique déployé sur une blockchain (souvent Ethereum) qui s\'exécute automatiquement lorsque des conditions prédéfinies sont réunies. Pas d\'intermédiaire, pas de confiance à accorder : le code fait foi.',
      'Exemple : un contrat de prêt DeFi libère automatiquement le collatéral dès que le prêt est remboursé. Un contrat d\'assurance verse l\'indemnité quand un événement est confirmé par un oracle. Les smart contracts sont la brique de base de toute la finance décentralisée.',
      'Attention : « le code est la loi » a ses limites. Un bug dans un smart contract peut être exploité (des milliards ont été volés dans l\'histoire de la DeFi). Les contrats audités par des sociétés spécialisées restent plus sûrs, mais aucun n\'est infaillible.',
    ],
    related: ['ethereum', 'defi', 'blockchain'],
  },
  {
    term: 'TVL (Total Value Locked)',
    slug: 'tvl',
    category: 'defi',
    short: 'La valeur totale des actifs déposés dans un protocole DeFi — un indicateur clé de son adoption réelle.',
    content: [
      'Le TVL (Total Value Locked, valeur totale verrouillée) mesure la somme des actifs déposés dans un protocole DeFi : prêts, pools de liquidité, staking. C\'est l\'indicateur le plus utilisé pour évaluer l\'adoption et la confiance dans un protocole.',
      'Un TVL élevé et stable signale un protocole utilisé et ancré. Un TVL qui s\'effondre peut révéler un désengagement massif ou un problème de confiance. À croiser avec les frais générés (fees) : le meilleur indicateur de revenus réels est le ratio frais/TVL.',
      'Piège : un TVL gonflé par des récompenses inflationnistes (yield farming agressif) n\'est pas durable. Quand les récompenses baissent, le TVL part. Analyser la qualité du TVL (organique vs subventionné) est essentiel.',
    ],
    related: ['defi', 'yield-farming', 'revenue'],
  },
  {
    term: 'Yield farming',
    slug: 'yield-farming',
    category: 'defi',
    short: 'La pratique consistant à déposer ses cryptos dans des protocoles DeFi pour percevoir des rendements (intérêts, récompenses).',
    content: [
      'Le yield farming (« culture de rendement ») consiste à placer ses cryptomonnaies dans des protocoles DeFi — pools de liquidité, prêts, staking — pour générer des rendements. En échange, on perçoit des intérêts, des frais de trading ou des tokens de récompense.',
      'Les rendements affichés (parfois 20 %, 50 %, 100 % par an) doivent être décortiqués : une partie provient souvent de tokens distribués en récompense, dont le prix peut s\'effondrer. Le rendement « réel » est souvent bien inférieur au taux affiché.',
      'Risques : impermanent loss (perte impermanente) dans les pools de liquidité, bugs de smart contract, hacks. La règle d\'or : ne jamais y mettre d\'argent dont on a besoin, et privilégier les protocoles établis aux rendements raisonnables.',
    ],
    related: ['defi', 'tvl', 'stablecoin'],
  },
  {
    term: 'Staking',
    slug: 'staking',
    category: 'defi',
    short: 'Mettre en jeu ses cryptos pour sécuriser un réseau proof of stake et recevoir des récompenses en retour.',
    content: [
      'Le staking consiste à verrouiller ses cryptomonnaies dans un réseau « proof of stake » (Ethereum, Solana, Cardano...) pour contribuer à sa sécurité et sa validation des transactions. En récompense, le réseau verse des intérêts, souvent entre 3 % et 10 % par an.',
      'Contrairement au yield farming, le staking de protocoles majeurs est un revenu relativement stable et simple : on « loue » sa participation au réseau. Des services comme Lido permettent de staker sans verrouiller ses fonds (liquid staking).',
      'Risques : la volatilité de l\'actif (un rendement de 5 % ne compense pas une chute de 50 %), les périodes de verrouillage, et les risques techniques. Le staking rémunère la confiance à long terme, pas la spéculation.',
    ],
    related: ['defi', 'proof-of-stake', 'tvl'],
  },
  {
    term: 'Airdrop',
    slug: 'airdrop',
    category: 'defi',
    short: 'La distribution gratuite de tokens à une communauté pour récompenser les utilisateurs et lancer un projet.',
    content: [
      'Un airdrop est une distribution de tokens gratuits à des utilisateurs éligibles : ceux qui ont utilisé un protocole, détenu un actif ou participé à un testnet. C\'est à la fois une récompense de fidélité et une stratégie marketing pour lancer un projet.',
      'Certains airdrops historiques ont été très lucratifs (Uniswap, Arbitrum, Jito), créant une véritable chasse aux airdrops : les « farmers » multiplient les transactions sur les protocoles prometteurs dans l\'espoir d\'être éligibles.',
      'Attention : les arnaques par airdrop sont fréquentes. Ne connectez jamais votre wallet à un site « d\'airdrop » non vérifié — c\'est la méthode préférée des hackeurs pour voler les fonds (drainers). Un vrai airdrop ne demande jamais votre seed phrase.',
    ],
    related: ['token', 'wallet', 'seed-phrase'],
  },
  {
    term: 'Rug pull',
    slug: 'rug-pull',
    category: 'defi',
    short: 'Une arnaque où les créateurs d\'un projet disparaissent avec les fonds des investisseurs, laissant le token sans valeur.',
    content: [
      'Un rug pull (« retrait de tapis ») est une arnaque dans laquelle les développeurs d\'un projet crypto — souvent un nouveau token ou un pool de liquidité — retirent brutalement les fonds et disparaissent. Les investisseurs se retrouvent avec des tokens sans valeur.',
      'Méthodes courantes : retirer la liquidité d\'un pool (les investisseurs ne peuvent plus vendre), faire chuter volontairement le prix, ou déployer un smart contract avec une fonction cachée permettant au créateur de tout récupérer.',
      'Signaux d\'alerte : équipe anonyme, code non audité, promesses de rendements irréalistes, marketing agressif sur les réseaux sociaux, liquidité verrouillable rapidement. La prudence et la vérification (audits, équipe identifiable) sont les meilleures protections.',
    ],
    related: ['token', 'defi', 'liquidity'],
  },

  // ============ TRADING ============
  {
    term: 'DCA (Moyenne d\'achat)',
    slug: 'dca',
    category: 'trading',
    short: 'Une stratégie d\'épargne : investir un montant fixe à intervalles réguliers, quel que soit le prix.',
    content: [
      'Le DCA (Dollar Cost Averaging, moyenne de coût en dollars) consiste à acheter un montant fixe d\'un actif à intervalles réguliers — chaque semaine ou chaque mois — sans chercher à timer le marché. On achète plus de tokens quand le prix est bas, moins quand il est haut.',
      'Cette méthode lisse le prix d\'entrée moyen et élimine le stress de la prédiction. Pour les investisseurs à long terme, c\'est la stratégie la plus éprouvée : elle fonctionne sur Bitcoin comme sur les marchés traditionnels.',
      'Le DCA s\'applique facilement : épargne programmée sur un exchange (Bitstack est conçu pour ça), ordres récurrents, ou simple règle manuelle. La discipline compte plus que le montant — même 50 € par mois construisent une position au fil des années.',
    ],
    related: ['bitcoin', 'exchange', 'stop-loss'],
  },
  {
    term: 'Stop loss',
    slug: 'stop-loss',
    category: 'trading',
    short: 'Un ordre automatique qui vend un actif quand son prix chute à un niveau défini, pour limiter les pertes.',
    content: [
      'Un stop loss est un ordre conditionnel : si le prix d\'un actif descend jusqu\'à un niveau choisi, l\'ordre se déclenche et vend automatiquement. Son rôle : couper les pertes avant qu\'elles ne s\'amplifient, en retirant l\'émotion de la décision.',
      'Bien placé, un stop loss se situe sous un support technique significatif, avec une marge pour éviter les « faux signaux » (wick). Trop serré, il sera déclenché par la volatilité normale ; trop large, il laisse filer les pertes.',
      'C\'est un outil indispensable pour les positions à effet de levier (où une perte peut dépasser la mise), mais aussi pour tout investisseur qui veut définir à l\'avance son risque maximum. Attention : sur un marché qui « gap » (saute), le stop peut s\'exécuter à un prix pire que prévu.',
    ],
    related: ['take-profit', 'leverage', 'dca'],
  },
  {
    term: 'Take profit',
    slug: 'take-profit',
    category: 'trading',
    short: 'Un ordre qui vend automatiquement un actif quand il atteint un objectif de prix, pour sécuriser les gains.',
    content: [
      'Un take profit est l\'inverse du stop loss : un ordre automatique qui vend un actif lorsqu\'il atteint un niveau de prix cible, verrouillant ainsi les gains. Il matérialise la discipline « vends quand c\'est atteint » sans surveiller les écrans en permanence.',
      'La bonne pratique consiste à définir ses objectifs à l\'avance, en s\'appuyant sur des niveaux techniques (résistances) ou des objectifs de rendement. Beaucoup de traders utilisent plusieurs take profits partiels : vendre une partie, laisser courir le reste.',
      'Fixer un take profit sans analyse, c\'est vendre au hasard. L\'idéal : objectif basé sur une résistance, un multiple du risque pris (ex : risque 1 pour viser 3), ou une cible fondamentale (valorisation, revenus du protocole).',
    ],
    related: ['stop-loss', 'trading', 'leverage'],
  },
  {
    term: 'Leverage (Effet de levier)',
    slug: 'leverage',
    category: 'trading',
    short: 'Emprunter des fonds pour amplifier ses positions : multiplie les gains... et les pertes, jusqu\'à la liquidation.',
    content: [
      'L\'effet de levier (leverage) permet de trader une position plus grande que son capital en empruntant auprès de la plateforme. Un levier de 10x signifie qu\'un mouvement de 1 % du prix se traduit par 10 % de gain... ou de perte sur votre mise.',
      'Si le marché va à l\'encontre de la position, la plateforme peut procéder à une liquidation : la position est fermée de force, et le trader perd tout ou partie de sa marge. Les liquidations en cascade ont historiquement amplifié les krachs.',
      'Le levier est un outil de professionnels : il exige une gestion du risque irréprochable (stop loss systématique, taille de position calculée). Pour un investisseur débutant, il est plus prudent de l\'éviter totalement — le risque de perte totale est réel.',
    ],
    related: ['stop-loss', 'futures', 'take-profit'],
  },
  {
    term: 'Futures (Contrats à terme)',
    slug: 'futures',
    category: 'trading',
    short: 'Des contrats permettant de parier sur le prix futur d\'un actif, à la hausse (long) comme à la baisse (short).',
    content: [
      'Les contrats futures sont des dérivés : on y négocie non pas l\'actif lui-même, mais un contrat sur son prix futur. Ils permettent de prendre position à la hausse (long) comme à la baisse (short), souvent avec un effet de levier.',
      'Sur les exchanges crypto (Binance, Bybit, OKX), les futures perpétuels sont les plus populaires : sans date d\'échéance, avec un mécanisme de financement qui aligne leur prix sur le marché au comptant. Leur volume dépasse largement celui du marché spot.',
      'Produit risqué : combiné au levier, un mouvement adverse de quelques pour cent peut liquider la position. Les futures sont faits pour les traders expérimentés avec une gestion du risque stricte, pas pour les débutants.',
    ],
    related: ['leverage', 'spot', 'stop-loss'],
  },
  {
    term: 'Spot (Marché au comptant)',
    slug: 'spot',
    category: 'trading',
    short: 'L\'achat et la vente immédiats d\'une cryptomonnaie au prix courant — le marché « simple » des exchanges.',
    content: [
      'Le marché spot (« au comptant ») est le marché où l\'on achète et vend des cryptomonnaies directement, au prix actuel, avec livraison immédiate. Quand vous achetez du Bitcoin sur un exchange, vous le faites sur le marché spot.',
      'C\'est le marché de référence : son prix fait foi pour l\'évaluation des actifs, et il est moins risqué que les dérivés. Acheter du spot, c\'est posséder réellement l\'actif — on peut le retirer vers son propre wallet.',
      'Pour la plupart des investisseurs (épargne, DCA, long terme), le marché spot est le bon choix. Les produits dérivés (futures, options) ajoutent du levier et du risque sans apporter de valeur pour un investisseur patient.',
    ],
    related: ['exchange', 'dca', 'futures'],
  },
  {
    term: 'Long / Short',
    slug: 'long-short',
    category: 'trading',
    short: 'Être « long » = parier sur la hausse. Être « short » = parier sur la baisse d\'un actif.',
    content: [
      'Dans le jargon des traders, être « long » signifie détenir un actif ou une position qui profite d\'une hausse de prix. Acheter du Bitcoin en espérant qu\'il monte, c\'est être long.',
      'Être « short » (vendeur à découvert) signifie parier sur la baisse : on emprunte l\'actif pour le vendre, avec l\'intention de le racheter moins cher plus tard. Sur les exchanges crypto, le short se pratique via les futures ou le margin trading.',
      'Le short est plus risqué que le long : le potentiel de perte est théoriquement illimité (le prix peut monter indéfiniment), et les « short squeezes » (écrasements de vendeurs) peuvent être brutaux. Pour un investisseur classique, le long terme reste la stratégie dominante.',
    ],
    related: ['futures', 'leverage', 'market'],
  },
  {
    term: 'Altseason',
    slug: 'altseason',
    category: 'trading',
    short: 'Une période où les altcoins surperforment massivement le Bitcoin, souvent après un rallye du BTC.',
    content: [
      'L\'altseason (« saison des altcoins ») désigne les périodes où les altcoins enregistrent des performances nettement supérieures à celles du Bitcoin, en pourcentage. Les capitaux quittent alors temporairement BTC pour les altcoins et la DeFi.',
      'Historiquement, les altseasons surviennent après les phases haussières du Bitcoin : quand BTC stagne ou consolide après une montée, les investisseurs cherchent des rendements plus élevés dans les petites capitalisations.',
      'C\'est une période excitante mais dangereuse : les altcoins peuvent monter très vite puis s\'effondrer tout aussi vite. Les « top » d\'altseason précèdent souvent des corrections sévères. La prudence et la prise de profit progressive sont essentielles.',
    ],
    related: ['altcoin', 'bitcoin', 'market-cap'],
  },

  // ============ SECURITE ============
  {
    term: 'Wallet (Portefeuille)',
    slug: 'wallet',
    category: 'securite',
    short: 'L\'outil qui stocke vos clés privées et vous permet d\'envoyer, recevoir et gérer vos cryptomonnaies.',
    content: [
      'Un wallet (portefeuille) crypto ne « stocke » pas vos cryptos au sens classique : il détient les clés privées qui vous donnent le droit de dépenser vos actifs, enregistrés sur la blockchain. Sans vos clés, vous n\'avez rien.',
      'Deux grandes familles : les wallets « chauds » (connectés à Internet : applications mobiles, extensions navigateur, wallets d\'exchange) — pratiques mais vulnérables aux hackeurs ; et les wallets « froids » (hors ligne : clés matérielles type Ledger ou Trezor, papier) — plus sûrs mais moins pratiques.',
      'Règle d\'or : « Not your keys, not your coins ». Pour des sommes significatives, un wallet froid est indispensable. Les gros montants devraient toujours rester hors des exchanges.',
    ],
    related: ['seed-phrase', 'cold-wallet', 'exchange'],
  },
  {
    term: 'Seed phrase (Phrase de récupération)',
    slug: 'seed-phrase',
    category: 'securite',
    short: 'Les 12 ou 24 mots qui permettent de restaurer un wallet — la clé maîtresse à protéger absolument.',
    content: [
      'La seed phrase (ou phrase mnémonique) est une suite de 12 à 24 mots générée à la création d\'un wallet. Elle permet de restaurer l\'intégralité des fonds sur n\'importe quel appareil compatible. C\'est LA clé maîtresse de votre patrimoine crypto.',
      'Quiconque possède votre seed phrase contrôle vos fonds, définitivement. Il faut la noter sur du papier (ou du métal ignifugé), la conserver dans un endroit sûr — et ne JAMAIS la photographier, la stocker dans un fichier numérique, ou la saisir sur un site web.',
      'Alerte arnaque : aucune plateforme légitime (exchange, support, airdrop) ne vous demandera jamais votre seed phrase. Toute demande est une tentative de vol. Une phrase de récupération divulguée = fonds perdus, sans recours possible.',
    ],
    related: ['wallet', 'cold-wallet', 'airdrop'],
  },
  {
    term: 'Cold wallet (Portefeuille froid)',
    slug: 'cold-wallet',
    category: 'securite',
    short: 'Un portefeuille hors ligne (clé matérielle) qui protège vos cryptos des hackeurs et du piratage en ligne.',
    content: [
      'Un cold wallet (portefeuille froid) est un dispositif qui conserve vos clés privées hors ligne, déconnecté d\'Internet. Les modèles les plus connus sont les clés matérielles : Ledger, Trezor, BitBox. Une alternative simple : la phrase de récupération notée sur papier.',
      'Parce que les clés ne touchent jamais un appareil connecté, un cold wallet résiste aux virus, aux sites de phishing et au piratage à distance. Les transactions sont signées sur l\'appareil, même si l\'ordinateur est compromis.',
      'C\'est la norme de sécurité pour toute somme significative (plus de quelques centaines d\'euros). Les exchanges, eux, gardent vos clés pour vous — pratique mais risqué en cas de faillite ou de piratage de la plateforme.',
    ],
    related: ['wallet', 'seed-phrase', 'exchange'],
  },
  {
    term: 'KYC (Know Your Customer)',
    slug: 'kyc',
    category: 'securite',
    short: 'La vérification d\'identité exigée par les exchanges régulés pour lutter contre le blanchiment d\'argent.',
    content: [
      'Le KYC (Know Your Customer, « connaissez votre client ») est la procédure par laquelle un exchange vérifie votre identité : pièce d\'identité, justificatif de domicile, parfois selfie. C\'est une obligation légale dans la plupart des juridictions, dont l\'Europe (règlementation MiCA).',
      'Le KYC protège les utilisateurs (traçabilité, lutte contre le blanchiment et le financement du terrorisme) mais supprime l\'anonymat. Les échanges centralisés régulés — comme Bitvavo — l\'exigent pour se conformer à la loi.',
      'Les plateformes sans KYC existent (échanges décentralisés, services offshore) mais présentent des risques accrus : pas de recours en cas de problème, risque de plateforme frauduleuse. Pour la plupart des investisseurs, un exchange régulé avec KYC est le choix le plus sûr.',
    ],
    related: ['exchange', 'aml', 'regulation'],
  },
  {
    term: 'Phishing',
    slug: 'phishing',
    category: 'securite',
    short: 'Une arnaque qui imite un site ou un message légitime pour vous voler vos identifiants ou vos cryptos.',
    content: [
      'Le phishing est une technique d\'arnaque qui consiste à imiter un site web, un email ou un message officiel (exchange, wallet, support) pour vous faire révéler vos informations sensibles : mots de passe, clés privées, seed phrase.',
      'Dans la crypto, les attaques sont sophistiquées : faux sites d\'airdrop, faux wallets, faux profils de support sur les réseaux sociaux, liens malveillants. Un site parfaitement imité peut piéger même un utilisateur averti.',
      'Réflexes de sécurité : vérifier l\'URL exacte, ne jamais cliquer sur un lien reçu par message non sollicité, ne jamais saisir sa seed phrase nulle part, utiliser un bookmark pour les sites importants, et activer la double authentification (2FA).',
    ],
    related: ['seed-phrase', '2fa', 'wallet'],
  },
  {
    term: '2FA (Double authentification)',
    slug: '2fa',
    category: 'securite',
    short: 'Une seconde couche de sécurité (code à usage unique) en plus du mot de passe pour protéger vos comptes.',
    content: [
      'La 2FA (Two-Factor Authentication, double authentification) ajoute une seconde vérification au-delà du mot de passe : un code à usage unique généré par une application (Google Authenticator, Authy), envoyé par SMS, ou une clé physique (YubiKey).',
      'Pour un compte exchange ou un wallet en ligne, la 2FA est indispensable : même si votre mot de passe est volé, l\'attaquant ne peut pas accéder au compte sans le code. Privilégier les applications d\'authentification au SMS, qui peut être intercepté (SIM swapping).',
      'Configurez la 2FA sur tous vos comptes sensibles : exchanges, email principal (qui contrôle souvent tout), wallets en ligne. C\'est la protection la plus simple et la plus efficace contre le vol de compte.',
    ],
    related: ['kyc', 'phishing', 'exchange'],
  },

  // ============ MARCHE ============
  {
    term: 'Bull run (Marché haussier)',
    slug: 'bull-run',
    category: 'marche',
    short: 'Une période prolongée de hausse des prix, souvent de plusieurs mois, portée par l\'enthousiasme et les capitaux entrants.',
    content: [
      'Un bull run (ou marché haussier) est une période prolongée pendant laquelle les prix montent fortement et durablement. Dans la crypto, les bull runs sont spectaculaires : le Bitcoin a connu des hausses de plusieurs centaines de pour cent sur ses cycles.',
      'Ils sont généralement déclenchés par un catalyseur (halving, adoption institutionnelle, assouplissement monétaire, clarté réglementaire) et nourris par un afflux de nouveaux investisseurs, le FOMO et l\'optimisme généralisé.',
      'Les bull runs crypto sont cycliques et finissent toujours par s\'essouffler. Les sommets d\'euphorie (« top ») sont souvent suivis de corrections violentes. La prise de profit progressive pendant les hausses est une discipline qui protège le capital.',
    ],
    related: ['bear-market', 'fomo', 'altseason'],
  },
  {
    term: 'Bear market (Marché baissier)',
    slug: 'bear-market',
    category: 'marche',
    short: 'Une période prolongée de baisse des prix, souvent de plusieurs mois ou années, marquée par le pessimisme.',
    content: [
      'Un bear market (marché baissier) est une période prolongée de baisse des prix. Dans la crypto, ils peuvent être sévères : des chutes de 70 à 90 % depuis les sommets ne sont pas rares (2018, 2022).',
      'Ils sont souvent déclenchés par un choc (scandale, resserrement monétaire, éclatement de bulle) et entretenus par la capitulation, la peur et le désintérêt progressif. Le « bottom » survient quand plus personne ne croit au marché.',
      'Pour un investisseur à long terme, les bear markets sont paradoxalement des périodes d\'opportunité : les actifs de qualité s\'achètent à prix réduit. Le DCA pendant les baisses a historiquement été la stratégie la plus rentable sur les cycles complets.',
    ],
    related: ['bull-run', 'dca', 'fud'],
  },
  {
    term: 'FOMO (Fear Of Missing Out)',
    slug: 'fomo',
    category: 'marche',
    short: 'La peur de rater une hausse, qui pousse à acheter au mauvais moment — souvent au sommet.',
    content: [
      'Le FOMO (Fear Of Missing Out, peur de rater quelque chose) est l\'émotion qui pousse un investisseur à acheter précipitamment parce que le prix monte et que « tout le monde » en profite. C\'est le carburant des sommets de marché.',
      'Le schéma est classique : un actif monte de 50 %, le FOMO pousse à acheter, le prix corrige de 30 %, et l\'acheteur reste bloqué avec une perte. Acheter dans l\'euphorie est statistiquement la pire entrée possible.',
      'Contrer le FOMO demande de la méthode : définir à l\'avance ses niveaux d\'achat (comme le DCA), se méfier des pics de sentiment (« tout le monde en parle » est un signal d\'alerte), et accepter de rater des gains plutôt que de subir des pertes.',
    ],
    related: ['bull-run', 'dca', 'fud'],
  },
  {
    term: 'FUD (Fear, Uncertainty, Doubt)',
    slug: 'fud',
    category: 'marche',
    short: 'La peur, l\'incertitude et le doute répandus par des nouvelles négatives — fondées ou manipulées.',
    content: [
      'Le FUD (Fear, Uncertainty and Doubt, peur-incertitude-doute) désigne la diffusion de nouvelles négatives ou alarmistes sur un actif ou le marché. Il peut être légitime (vraie mauvaise nouvelle) ou manipulé (rumeurs pour faire baisser le prix).',
      'Dans la crypto, le FUD est omniprésent : fausses annonces de régulation, rumeurs de piratage, exagérations médiatiques. Les phases de FUD intense coïncident souvent avec les creux de marché — les « vendeurs paniqués » cèdent aux plus patients.',
      'L\'esprit critique est essentiel : vérifier la source, recouper l\'information, distinguer un fait vérifié d\'une rumeur. Un FUD non fondé peut créer des opportunités d\'achat ; un FUD fondé peut signaler un vrai problème structurel.',
    ],
    related: ['bear-market', 'fomo', 'bull-run'],
  },
  {
    term: 'ATH (All Time High)',
    slug: 'ath',
    category: 'marche',
    short: 'Le plus haut niveau de prix jamais atteint par un actif — un repère psychologique et technique majeur.',
    content: [
      'L\'ATH (All Time High, plus haut historique) est le prix le plus élevé jamais atteint par un actif. Pour le Bitcoin, chaque nouvel ATH marque un sommet de cycle et un repère pour les investisseurs.',
      'Sur le plan technique, un ATH est significatif : aucun vendeur n\'est « bloqué » au-dessus (tous ceux qui ont acheté sont en profit), ce qui facilite souvent la poursuite de la hausse. À l\'inverse, approcher un ancien ATH peut déclencher des prises de profit.',
      'Le contraire est l\'ATL (All Time Low, plus bas historique). Suivre les ATH/ATL aide à situer un actif dans son histoire, mais ne prédit pas l\'avenir : un actif peut battre son ATH comme s\'effondrer bien en dessous de son ATL.',
    ],
    related: ['market-cap', 'bull-run', 'bitcoin'],
  },
  {
    term: 'Liquidité',
    slug: 'liquidity',
    category: 'marche',
    short: 'La facilité avec laquelle un actif peut être acheté ou vendu sans impact significatif sur son prix.',
    content: [
      'La liquidité mesure la capacité d\'un marché à absorber des ordres d\'achat et de vente sans variations brutales de prix. Un marché liquide (Bitcoin sur les grands exchanges) permet d\'exécuter de gros ordres presque sans impact.',
      'Un marché illiquide (petit token, heure creuse) présente des risques : slippage important (le prix glisse contre vous), volatilité amplifiée, et difficulté à sortir en cas de panique. La liquidité d\'un actif se mesure au carnet d\'ordres (order book) et au volume.',
      'C\'est un critère de sélection souvent négligé : un token « prometteur » mais illiquide peut être impossible à vendre sans casse. Les actifs à grande capitalisation et à fort volume offrent la meilleure liquidité.',
    ],
    related: ['volume', 'exchange', 'slippage'],
  },
  {
    term: 'Volume',
    slug: 'volume',
    category: 'marche',
    short: 'Le montant total d\'actifs échangés sur une période — un indicateur d\'intérêt et de santé du marché.',
    content: [
      'Le volume de trading mesure le montant total d\'un actif échangé sur une période donnée (24 h, 7 jours). C\'est l\'indicateur d\'intérêt le plus direct : un volume en hausse confirme un mouvement, un volume en baisse signale un essoufflement.',
      'En analyse technique, le volume « confirme » les cassures : une sortie de range avec fort volume est plus crédible qu\'avec un volume faible. Les divergences prix-volume (le prix monte, le volume baisse) sont des signaux de faiblesse.',
      'Attention aux volumes gonflés artificiellement (wash trading) sur certaines plateformes peu régulées. Croiser le volume avec la capitalisation et la liquidité donne une image plus fiable de l\'activité réelle.',
    ],
    related: ['liquidity', 'market-cap', 'trading'],
  },

  // ============ TECHNIQUE ============
  {
    term: 'Blockchain',
    slug: 'blockchain',
    category: 'technique',
    short: 'Un registre numérique partagé et infalsifiable où toutes les transactions sont enregistrées de façon transparente.',
    content: [
      'Une blockchain est un registre numérique distribué : une base de données partagée entre des milliers d\'ordinateurs, où chaque transaction est enregistrée dans un « bloc » chaîné aux précédents par cryptographie. Une fois écrite, une information ne peut plus être modifiée.',
      'C\'est la technologie fondatrice du Bitcoin : elle permet de transférer de la valeur sans banque ni tiers de confiance, car la vérification est faite par le réseau entier. Personne ne peut falsifier l\'historique sans contrôler la majorité de la puissance de calcul.',
      'Au-delà de la crypto, la blockchain est explorée pour la traçabilité (supply chain), la certification (diplômes, œuvres), la propriété intellectuelle et la finance. Son coût énergétique dépend du consensus : élevé pour le proof of work, faible pour le proof of stake.',
    ],
    related: ['bitcoin', 'smart-contract', 'proof-of-work'],
  },
  {
    term: 'Proof of Work (Preuve de travail)',
    slug: 'proof-of-work',
    category: 'technique',
    short: 'Le mécanisme de consensus qui sécurise le Bitcoin grâce au minage — sûr mais énergivore.',
    content: [
      'Le proof of work (PoW, preuve de travail) est le mécanisme de consensus du Bitcoin : pour ajouter un bloc de transactions, les mineurs doivent résoudre un puzzle cryptographique coûteux en calcul. Le premier à trouver la solution valide le bloc et reçoit la récompense.',
      'Cette dépense d\'énergie est la « preuve » de travail fournie : falsifier l\'historique exigerait de refaire tout le travail avec plus de la moitié de la puissance du réseau — économiquement irréaliste. C\'est ce qui rend le Bitcoin immuable et décentralisé.',
      'Le PoW est critiqué pour sa consommation électrique. Il reste le consensus le plus éprouvé et le plus décentralisé. Le Bitcoin représente environ 0,4 % de l\'électricité mondiale, avec une part croissante d\'énergies renouvelables et de gaz torché récupéré.',
    ],
    related: ['blockchain', 'minage', 'proof-of-stake'],
  },
  {
    term: 'Proof of Stake (Preuve d\'enjeu)',
    slug: 'proof-of-stake',
    category: 'technique',
    short: 'Le mécanisme de consensus économe en énergie : les validateurs « misent » leurs cryptos pour sécuriser le réseau.',
    content: [
      'Le proof of stake (PoS, preuve d\'enjeu) sécurise un réseau grâce aux validateurs qui « misent » (stake) leurs propres cryptomonnaies. Plus ils misent, plus ils ont de chances de valider un bloc — et plus ils perdent en cas de mauvaise conduite (slashing).',
      'Contrairement au minage, pas besoin de calculs coûteux : la sécurité repose sur l\'intérêt économique des validateurs, qui ont tout à perdre en trahissant le réseau. Ethereum a migré vers le PoS en 2022, réduisant sa consommation de 99,9 %.',
      'Le PoS permet le staking : les détenteurs peuvent déléguer leurs tokens à un validateur et recevoir des récompenses. C\'est à la fois un revenu pour les utilisateurs et la colonne vertébrale économique de ces réseaux.',
    ],
    related: ['staking', 'ethereum', 'proof-of-work'],
  },
  {
    term: 'Minage (Mining)',
    slug: 'minage',
    category: 'technique',
    short: 'Le processus par lequel de nouveaux bitcoins sont créés et les transactions validées — le cœur du proof of work.',
    content: [
      'Le minage est le processus de validation des transactions du Bitcoin : des machines spécialisées (ASIC) résolvent des puzzles cryptographiques, et le mineur gagnant ajoute un bloc à la blockchain et reçoit la récompense en bitcoins (actuellement 3,125 BTC par bloc, plus les frais).',
      'C\'est un véritable « travail » économique : investir en machines et en électricité pour sécuriser le réseau. Le minage professionnel s\'est industrialisé (fermes, pools), rendant le minage individuel à domicile non rentable depuis des années.',
      'Le minage garantit la sécurité et l\'immuabilité du Bitcoin : attaquer le réseau coûterait plus cher que ce qu\'on pourrait y gagner. Il est aussi le point de vente naturel des bitcoins (les mineurs vendent souvent pour couvrir leurs coûts).',
    ],
    related: ['bitcoin', 'proof-of-work', 'halving'],
  },
  {
    term: 'Gas fees (Frais de transaction)',
    slug: 'gas-fees',
    category: 'technique',
    short: 'Les frais payés pour exécuter une transaction ou un smart contract sur une blockchain — le « péage » du réseau.',
    content: [
      'Les gas fees sont les frais payés en crypto (ETH sur Ethereum, SOL sur Solana...) pour qu\'une transaction ou un smart contract soit exécuté. Ils rémunèrent les validateurs/mineurs et empêchent le spam du réseau.',
      'Sur Ethereum, le prix du gas varie avec la congestion : en période de forte activité (NFT populaires, DeFi en effervescence), les frais peuvent dépasser 50 $ pour une simple transaction. Les couches 2 (Arbitrum, Base, Optimism) réduisent ces coûts drastiquement.',
      'Le gas est un critère pratique de choix de blockchain : des frais faibles et stables (Solana, couches 2) conviennent aux petits montants et aux usages fréquents ; Ethereum en couche 1 reste le fief des gros mouvements.',
    ],
    related: ['ethereum', 'layer2', 'wallet'],
  },
  {
    term: 'Layer 2 (Couche 2)',
    slug: 'layer2',
    category: 'technique',
    short: 'Des solutions construites au-dessus d\'une blockchain pour la rendre plus rapide et moins chère.',
    content: [
      'Les solutions layer 2 (couche 2) sont des réseaux construits au-dessus d\'une blockchain (la couche 1, comme Ethereum) pour améliorer sa vitesse et réduire ses frais, tout en héritant de sa sécurité.',
      'Les plus connues : Arbitrum, Optimism, Base (rollups optimistes), zkSync (rollup à preuve de connaissance nulle). Elles regroupent les transactions, les compriment et les « règlent » en une seule sur la couche 1 — d\'où des frais jusqu\'à 100 fois inférieurs.',
      'La plupart de l\'activité DeFi et des paiements se déplace progressivement vers les couches 2. Pour l\'utilisateur, elles fonctionnent comme des blockchains classiques, avec des wallets et des bridges pour y transférer des fonds.',
    ],
    related: ['ethereum', 'gas-fees', 'defi'],
  },
  {
    term: 'Exchange (Plateforme d\'échange)',
    slug: 'exchange',
    category: 'marche',
    short: 'La plateforme où l\'on achète, vend et échange des cryptomonnaies — centralisée ou décentralisée.',
    content: [
      'Un exchange est une plateforme qui permet d\'acheter, vendre et échanger des cryptomonnaies. C\'est la porte d\'entrée quasi obligatoire du marché : on y dépose des euros, on y achète du Bitcoin, on y gère son portefeuille.',
      'Deux familles. Les exchanges centralisés (CEX) — Bitvavo, Binance, Coinbase, OKX — sont gérés par une entreprise, offrent une interface simple et un support client, mais conservent vos clés (risque de faillite ou de piratage). Les échanges décentralisés (DEX) — Uniswap, Raydium — fonctionnent sans intermédiaire via smart contracts, mais exigent plus de technique.',
      'Critères de choix : régulation (pays où il est enregistré), frais, liquidité, sécurité (historique de hacks), et facilité d\'utilisation. Pour débuter, un exchange centralisé régulé dans son pays est le meilleur compromis.',
    ],
    related: ['kyc', 'liquidity', 'wallet'],
  },
  {
    term: 'Oracle',
    slug: 'oracle',
    category: 'technique',
    short: 'Un service qui fournit des données du monde réel (prix, météo...) aux smart contracts.',
    content: [
      'Un oracle est un service qui transmet des données du monde extérieur à la blockchain : prix des actifs, résultats sportifs, taux d\'intérêt, météo. Les smart contracts ne peuvent pas accéder à Internet, ils ont donc besoin de ces « ponts » de données.',
      'Le leader du secteur est Chainlink (LINK), utilisé par la majorité des protocoles DeFi pour leurs prix. La qualité des oracles est cruciale : une donnée manipulée peut déclencher des liquidations en cascade ou des erreurs de paiement.',
      'La sécurité des oracles repose sur la décentralisation (plusieurs sources, agrégation) et la réputation. C\'est une brique invisible mais essentielle : sans oracles fiables, la DeFi ne pourrait pas fonctionner.',
    ],
    related: ['smart-contract', 'defi', 'chainlink'],
  },
  {
    term: 'Slippage',
    slug: 'slippage',
    category: 'technique',
    short: 'La différence entre le prix attendu et le prix réellement obtenu lors d\'un ordre — surtout sur les marchés illiquides.',
    content: [
      'Le slippage (glissement) est l\'écart entre le prix auquel vous espérez exécuter un ordre et le prix effectivement obtenu. Sur un marché liquide, il est quasi nul ; sur un token illiquide ou un gros ordre, il peut être considérable.',
      'Causes : le carnet d\'ordres est « consommé » au fur et à mesure (votre ordre fait monter le prix si vous achetez en masse), et les DEX appliquent une formule de prix qui dépend de la profondeur de la pool de liquidité.',
      'Les DEX permettent de régler un slippage maximum toléré (souvent 0,5-1 %). Si le glissement réel dépasse ce seuil, la transaction est annulée. C\'est une protection utile contre les mouvements brutaux.',
    ],
    related: ['liquidity', 'defi', 'volume'],
  },
  {
    term: 'DEX (Échange décentralisé)',
    slug: 'dex',
    category: 'defi',
    short: 'Une plateforme d\'échange sans intermédiaire, où l\'on trade directement depuis son wallet via des smart contracts.',
    content: [
      'Un DEX (Decentralized Exchange) est une plateforme d\'échange fonctionnant sans entreprise centrale : les transactions s\'exécutent directement sur la blockchain via des smart contracts, depuis votre propre wallet. Uniswap, Raydium et PancakeSwap en sont les exemples les plus connus.',
      'Avantages : pas de dépôt de fonds (vous gardez vos clés), aucun KYC, listage ouvert de nouveaux tokens, et transparence totale. Inconvénients : interface moins intuitive, frais de gas, risques de bugs, et impossibility d\'avoir un support client.',
      'Sur un DEX, le prix est déterminé par des pools de liquidité (modèle AMM) plutôt que par un carnet d\'ordres. Le slippage peut être élevé sur les tokens illiquides. Pour débuter, un échange centralisé régulé reste plus simple ; le DEX est une étape ensuite.',
    ],
    related: ['exchange', 'slippage', 'liquidity'],
  },
  {
    term: 'Impermanent loss (Perte impermanente)',
    slug: 'impermanent-loss',
    category: 'defi',
    short: 'La perte temporaire subie en fournissant de la liquidité quand les prix s\'écartent — compensée ou non par les frais.',
    content: [
      'L\'impermanent loss (perte impermanente) est le phénomène par lequel un fournisseur de liquidité (LP) perd de la valeur par rapport au simple fait de conserver ses tokens, lorsque les prix des actifs de la pool divergent.',
      'Exemple : vous déposez 50 % ETH / 50 % USDC dans une pool. Si l\'ETH monte fortement, les arbitragistes achètent votre ETH à prix « ancien », et vous vous retrouvez avec plus d\'USDC et moins d\'ETH — une position moins bonne que si vous aviez simplement gardé vos tokens.',
      'La perte est dite « impermanente » car elle se réduit si les prix reviennent à leur niveau initial. Elle peut être compensée par les frais de trading perçus. En cas de divergence extrême, elle devient « permanente » à la sortie. C\'est le risque principal du yield farming.',
    ],
    related: ['yield-farming', 'liquidity', 'defi'],
  },
  {
    term: 'Liquidity pool (Pool de liquidité)',
    slug: 'liquidity-pool',
    category: 'defi',
    short: 'Une réserve de tokens verrouillée dans un smart contract, qui permet les échanges instantanés sur un DEX.',
    content: [
      'Une liquidity pool (pool de liquidité) est une réserve de deux tokens (ou plus) déposée dans un smart contract, qui permet d\'échanger instantanément ces actifs sur un DEX. Le prix est calculé automatiquement selon la proportion des tokens dans la pool.',
      'Les fournisseurs de liquidité (LP) déposent leurs tokens en échange d\'une part des frais de trading générés. Ils reçoivent des tokens LP représentant leur part, qu\'ils peuvent retirer à tout moment — en supportant le risque d\'impermanent loss.',
      'La profondeur d\'une pool détermine le slippage : plus la pool est grande, moins un échange d\'une taille donnée impacte le prix. Les pools des grands DEX (Uniswap, Curve) détiennent des milliards en liquidité.',
    ],
    related: ['dex', 'impermanent-loss', 'defi'],
  },
  {
    term: 'APY / APR',
    slug: 'apy-apr',
    category: 'defi',
    short: 'Deux mesures de rendement : l\'APR est simple, l\'APY inclut la capitalisation des intérêts composés.',
    content: [
      'L\'APR (Annual Percentage Rate) est le taux de rendement annuel simple : si vous placez 1 000 $ à 10 % d\'APR, vous recevez 100 $ par an, sans réinvestissement automatique. C\'est la mesure la plus honnête et la plus facile à comprendre.',
      'L\'APY (Annual Percentage Yield) inclut la capitalisation (intérêts composés) : si les intérêts sont versés et réinvestis quotidiennement, le rendement effectif est supérieur au taux nominal. Un taux de 10 % composé chaque jour donne un APY d\'environ 10,5 %.',
      'Piège classique en DeFi : des APY affichés à 100 %, 500 % ou plus sont presque toujours gonflés par des tokens de récompense inflationnistes dont le prix s\'effondre. Toujours vérifier d\'où vient le rendement : frais réels ou distribution de nouveaux tokens ?',
    ],
    related: ['yield-farming', 'staking', 'defi'],
  },
  {
    term: 'Bridge (Pont)',
    slug: 'bridge',
    category: 'technique',
    short: 'Un protocole qui transfère des actifs entre deux blockchains différentes — un maillon sensible de l\'écosystème.',
    content: [
      'Un bridge (pont) est un protocole permettant de transférer des actifs d\'une blockchain à une autre : par exemple, envoyer de l\'ETH d\'Ethereum vers Arbitrum, ou des tokens de Ethereum vers Solana. Sans bridges, chaque blockchain serait une île isolée.',
      'Les bridges fonctionnent en verrouillant les actifs sur la chaîne d\'origine et en émettant un « jumeau » (wrapped token) sur la chaîne de destination. La sécurité repose sur des validateurs ou des preuves cryptographiques qui attestent du verrouillage.',
      'Les bridges sont historiquement les cibles préférées des hackeurs : plusieurs attaques majeures ont dépassé le milliard de dollars (Ronin, Wormhole, Nomad). Ils concentrent d\'énormes valeurs dans des smart contracts complexes — le risque technique est maximal.',
    ],
    related: ['layer2', 'blockchain', 'wallet'],
  },
  {
    term: 'Rollup',
    slug: 'rollup',
    category: 'technique',
    short: 'Une solution de couche 2 qui regroupe des milliers de transactions hors chaîne pour les régler en une seule sur Ethereum.',
    content: [
      'Un rollup est une solution de couche 2 qui exécute des transactions hors de la blockchain principale (couche 1), les regroupe (« roule ») en un lot, puis publie une preuve condensée sur Ethereum. Résultat : des frais jusqu\'à 100 fois inférieurs.',
      'Deux familles. Les rollups optimistes (Arbitrum, Optimism, Base) supposent les transactions valides par défaut, avec une fenêtre de contestation. Les rollups à preuve de connaissance nulle (zkSync, Starknet, Polygon zkEVM) prouvent mathématiquement la validité à chaque lot.',
      'Les rollups héritent de la sécurité d\'Ethereum tout en offrant la vitesse et le faible coût. Ils concentrent aujourd\'hui l\'essentiel de l\'activité DeFi et des applications grand public. C\'est l\'avenir de la scalabilité d\'Ethereum.',
    ],
    related: ['layer2', 'ethereum', 'gas-fees'],
  },
  {
    term: 'Fork (Bifurcation)',
    slug: 'fork',
    category: 'technique',
    short: 'Une division de la blockchain en deux versions, suite à un changement de règles — d\'où peuvent naître deux cryptos distinctes.',
    content: [
      'Un fork (bifurcation) se produit quand une blockchain se divise en deux : une partie du réseau adopte de nouvelles règles, l\'autre continue avec les anciennes. Chaque branche suit alors son propre historique et crée potentiellement une nouvelle cryptomonnaie.',
      'Le soft fork est un changement rétrocompatible (les anciens nœuds restent compatibles) : une seule chaîne subsiste. Le hard fork est un changement incompatible : la chaîne se divise, et les détenteurs reçoivent les tokens des deux branches (ex : Bitcoin Cash issu de Bitcoin en 2017).',
      'Certains forks sont « planifiés » pour améliorer un protocole (Ethereum Merge), d\'autres naissent de désaccords communautaires. Attention : beaucoup de forks opportunistes n\'ont aucune valeur et servent souvent à des arnaques.',
    ],
    related: ['blockchain', 'bitcoin', 'ethereum'],
  },
  {
    term: 'Whale (Baleine)',
    slug: 'whale',
    category: 'marche',
    short: 'Un investisseur ou entité détenant une quantité massive d\'un actif, capable d\'influencer le marché.',
    content: [
      'Une baleine (whale) est un investisseur — individu, fonds, entreprise ou protocole — détenant une part massive d\'une cryptomonnaie. Par leur taille, leurs mouvements d\'achat ou de vente peuvent faire bouger le prix de manière visible.',
      'Les baleines sont surveillées via les données on-chain : les grandes adresses et les gros transferts vers les exchanges sont tracés. Un transfert massif vers une plateforme d\'échange est souvent interprété comme une intention de vente.',
      'Conseil : ne pas surréagir aux mouvements de baleines. Un transfert n\'est pas une vente, et les « baleines » peuvent aussi accumuler. L\'essentiel reste l\'analyse des fondamentaux et des tendances de fond, pas la chasse aux gros portefeuilles.',
    ],
    related: ['volume', 'market-cap', 'liquidity'],
  },
  {
    term: 'Market maker',
    slug: 'market-maker',
    category: 'trading',
    short: 'Un acteur qui fournit de la liquidité en affichant en permanence des ordres d\'achat et de vente, gagnant sur l\'écart.',
    content: [
      'Un market maker (teneur de marché) est un acteur qui affiche en permanence des ordres d\'achat et de vente sur un marché, fournissant ainsi de la liquidité. Il gagne sur l\'écart (spread) entre le prix d\'achat et le prix de vente.',
      'Sur les exchanges crypto, les market makers sont essentiels : sans eux, les carnets d\'ordres seraient vides et les gros échanges feraient exploser le prix. Beaucoup d\'exchanges rémunèrent les market makers (rabais de frais) pour garantir la liquidité.',
      'Leur présence se repère aux carnets d\'ordres profonds et aux spreads serrés. À l\'inverse, un token sans market maker a des écarts énormes et un slippage sévère — signe d\'illiquidité et de risque.',
    ],
    related: ['liquidity', 'exchange', 'volume'],
  },
  {
    term: 'Arbitrage',
    slug: 'arbitrage',
    category: 'trading',
    short: 'Acheter un actif moins cher sur un marché pour le revendre plus cher sur un autre, en profitant des écarts de prix.',
    content: [
      'L\'arbitrage consiste à profiter des écarts de prix d\'un même actif entre deux marchés : l\'acheter là où il est moins cher et le revendre là où il est plus cher, empocheant la différence sans risque de direction.',
      'En crypto, les écarts existent entre exchanges, entre spot et futures, et surtout entre DEX et CEX. Les arbitragistes jouent un rôle essentiel : leurs transactions rapides rééquilibrent les prix et maintiennent les marchés « efficaces ».',
      'L\'arbitrage moderne est dominé par des robots ultra-rapides ; les marges sont minces (fractions de pour cent) et souvent annulées par les frais et le slippage. Pour un particulier, c\'est rarement rentable sans outils avancés — et le « tri-arbitrage » à la main est un mythe.',
    ],
    related: ['exchange', 'slippage', 'dex'],
  },
  {
    term: 'HODL',
    slug: 'hodl',
    category: 'marche',
    short: 'Le fait de conserver ses cryptos à long terme, sans céder à la panique ni à l\'euphorie — une philosophie née d\'une faute de frappe.',
    content: [
      'HODL est une faute de frappe célèbre de « HOLD » (conserver) datant de 2013, devenue un mantra de la communauté Bitcoin : conserver ses actifs sur le long terme, quoi qu\'il arrive, plutôt que de trader frénétiquement.',
      'La stratégie HODL repose sur l\'idée que les fondamentaux (rareté, adoption, réseau) finissent par l\'emporter sur la volatilité à court terme. Elle s\'accompagne de disciplines comme le DCA et la sécurisation dans un wallet froid.',
      'Nuance importante : HODL n\'est pas « acheter n\'importe quoi et ne jamais vendre ». Les bons hodlers font des prises de profit progressives aux sommets et accumulent aux creux. C\'est une philosophie de long terme, pas une excuse pour ignorer le marché.',
    ],
    related: ['dca', 'bull-run', 'cold-wallet'],
  },
  {
    term: 'Dip (Baisse)',
    slug: 'dip',
    category: 'marche',
    short: 'Une baisse temporaire du prix d\'un actif — souvent vue par les investisseurs de long terme comme une opportunité d\'achat.',
    content: [
      'Un dip est une baisse temporaire et limitée du prix d\'un actif au sein d\'une tendance plus large. « Buy the dip » (acheter la baisse) est l\'expression consacrée : profiter de ces corrections pour accumuler à meilleur prix.',
      'La difficulté est de distinguer un dip (opportunité) d\'un retournement (piège). Un dip dans une tendance haussière se caractérise souvent par un volume décroissant et un support qui tient ; un retournement casse les supports avec du volume.',
      'Acheter un dip sans analyse est risqué : « attraper un couteau qui tombe » peut signifier acheter au début d\'une chute prolongée. Le DCA reste la méthode la plus sûre pour profiter des baisses sans chercher à timer le fond.',
    ],
    related: ['dca', 'bull-run', 'support'],
  },
  {
    term: 'Memecoin',
    slug: 'memecoin',
    category: 'marche',
    short: 'Une cryptomonnaie créée sur un mème ou un personnage internet, sans utilité réelle — pure spéculation.',
    content: [
      'Un memecoin est une cryptomonnaie inspirée d\'un mème, d\'un personnage ou d\'un buzz internet : Dogecoin, Shiba Inu, Pepe, et des milliers d\'autres. Son prix dépend uniquement de la demande spéculative, pas de revenus ni d\'utilité.',
      'Les memecoins peuvent générer des gains spectaculaires en très peu de temps — et des pertes tout aussi brutales. Ils sont souvent créés par centaines chaque jour, avec un risque élevé de rug pull et de manipulation.',
      'Notre position chez CryptoDesk : les memecoins sont des paris, pas des investissements. Si vous y touchez, ne misez que ce que vous pouvez perdre intégralement. Les protocoles à revenus réels et fondamentaux solides restent la base d\'un portefeuille sain.',
    ],
    related: ['altcoin', 'rug-pull', 'speculation'],
  },
  {
    term: 'Shitcoin',
    slug: 'shitcoin',
    category: 'marche',
    short: 'Un token sans valeur réelle ni utilité, souvent créé pour enrichir ses promoteurs — à éviter.',
    content: [
      'Le terme « shitcoin » désigne péjorativement un token sans valeur fondamentale, sans utilité réelle et souvent sans équipe sérieuse. Créés en masse, ces tokens servent parfois uniquement à enrichir leurs créateurs.',
      'Les signes d\'un shitcoin : aucun produit réel, équipe anonyme, marketing agressif, promesses irréalistes, liquidité faible ou verrouillable, et une communauté centrée sur le « moon » plutôt que sur l\'usage.',
      'La distinction avec un bon projet : revenus réels (frais, TVL), code audité, équipe identifiable, transparence, et une adoption mesurable. La règle : si vous ne comprenez pas d\'où vient la valeur, c\'est probablement un shitcoin.',
    ],
    related: ['memecoin', 'rug-pull', 'altcoin'],
  },
  {
    term: 'Tokenomics',
    slug: 'tokenomics',
    category: 'defi',
    short: 'L\'économie d\'un token : offre totale, distribution, inflation, utilité — la feuille de route de sa valeur.',
    content: [
      'La tokenomics (économie des tokens) décrit tous les mécanismes économiques d\'un projet : offre totale et en circulation, calendrier d\'émission, distribution (équipe, investisseurs, communauté), brûlage, et utilité du token.',
      'Une bonne tokenomics crée de la rareté et aligne les incitations : offre plafonnée ou déflationniste, token utile (staking, gouvernance, partage de revenus), vesting long pour l\'équipe. Une mauvaise tokenomics dilue les détenteurs ou enrichit les initiés.',
      'Analysez toujours la tokenomics avant d\'investir : quelle part pour l\'équipe ? Quelle inflation annuelle ? Le token est-il nécessaire au protocole, ou un simple artifice ? Les projets où le token capte les revenus réels (ex : rachats, partage de frais) sont les plus solides.',
    ],
    related: ['token', 'defi', 'tvl'],
  },
  {
    term: 'DAO (Organisation autonome décentralisée)',
    slug: 'dao',
    category: 'defi',
    short: 'Une organisation gouvernée par ses membres via des votes on-chain, sans hiérarchie traditionnelle.',
    content: [
      'Une DAO (Decentralized Autonomous Organization) est une organisation dont les décisions sont prises collectivement par ses membres, via des votes enregistrés sur la blockchain. Pas de PDG : la gouvernance est codée et transparente.',
      'Les membres détiennent des tokens de gouvernance qui donnent droit de vote : trésorerie, paramètres du protocole, rémunérations, partenariats. Les décisions s\'exécutent souvent automatiquement via smart contracts une fois le quorum atteint.',
      'Les DAO sont puissantes (certaines gèrent des milliards) mais imparfaites : participation souvent faible, risque de concentration du vote (les grosses baleines dominent), et lenteur décisionnelle. C\'est une expérience sociale autant que technologique.',
    ],
    related: ['token', 'governance', 'defi'],
  },
  {
    term: 'Governance token',
    slug: 'governance',
    category: 'defi',
    short: 'Un token donnant droit de vote sur les décisions d\'un protocole — le « pouvoir » de la DeFi.',
    content: [
      'Un token de gouvernance donne à son détenteur le droit de voter sur les décisions d\'un protocole décentralisé : paramètres (frais, réserves), évolutions, distribution du trésor. Exemples : UNI (Uniswap), AAVE, MKR (MakerDAO).',
      'Au-delà du vote, ces tokens ont souvent une valeur économique : certains captent une partie des revenus du protocole, d\'autres sont utilisés comme collatéral ou pour le staking. Leur valeur dépend de la santé du protocole.',
      'Nuance : la gouvernance décentralisée est parfois théorique — les grands détenteurs et fonds dominent les votes. Vérifiez la répartition des tokens et le quorum avant d\'y voir une « démocratie » parfaite.',
    ],
    related: ['dao', 'token', 'defi'],
  },
  {
    term: 'Whitepaper',
    slug: 'whitepaper',
    category: 'technique',
    short: 'Le document fondateur d\'un projet crypto : technologie, économie, feuille de route et équipe.',
    content: [
      'Le whitepaper (livre blanc) est le document fondateur d\'un projet crypto : il explique la technologie, le problème résolu, la tokenomics, la feuille de route et l\'équipe. Le whitepaper du Bitcoin (2008) est le document fondateur de toute l\'industrie.',
      'C\'est le premier document à lire avant d\'évaluer un projet : un bon whitepaper est précis, technique, honnête sur les risques. Un mauvais whitepaper est vague, rempli de promesses marketing, ou recopie celui d\'un autre projet.',
      'Attention : un whitepaper ne prouve rien par lui-même. Beaucoup d\'arnaques ont des whitepapers soignés. Il doit être complété par la vérification du code, de l\'équipe réelle et de l\'adoption. Le whitepaper est une porte d\'entrée, pas une preuve.',
    ],
    related: ['ico', 'token', 'blockchain'],
  },
  {
    term: 'Wallet chaud (Hot wallet)',
    slug: 'hot-wallet',
    category: 'securite',
    short: 'Un portefeuille connecté à Internet (application, extension, exchange) — pratique mais vulnérable.',
    content: [
      'Un hot wallet (portefeuille chaud) est un portefeuille dont les clés privées sont stockées sur un appareil connecté à Internet : application mobile (MetaMask, Trust Wallet), extension navigateur, ou compte d\'exchange. Il est conçu pour un usage fréquent.',
      'Sa force : la praticité — transactions en quelques secondes, intégration avec les DEX et les applications. Sa faiblesse : l\'exposition permanente au piratage, aux virus et au phishing. Un appareil compromis peut vider le wallet.',
      'Règle d\'usage : les hot wallets doivent contenir uniquement l\'argent « de poche » — ce dont vous avez besoin pour transiger. L\'épargne de long terme doit aller dans un cold wallet (clé matérielle).',
    ],
    related: ['wallet', 'cold-wallet', 'phishing'],
  },
  {
    term: 'Clé privée (Private key)',
    slug: 'private-key',
    category: 'securite',
    short: 'La donnée secrète qui permet de dépenser vos cryptos — son possesseur contrôle les fonds, sans exception.',
    content: [
      'La clé privée est une longue chaîne de caractères secrète qui donne le droit de dépenser les fonds associés à une adresse. Toute transaction est signée avec cette clé : quiconque la détient contrôle les cryptos, définitivement.',
      'La clé publique (l\'adresse) est dérivée de la clé privée et peut être partagée pour recevoir des fonds. On ne peut pas remonter de la clé publique à la clé privée — c\'est ce qui rend le système sûr.',
      'Protection absolue : ne jamais partager sa clé privée, ne jamais la stocker numériquement (photo, fichier, cloud), ne jamais la saisir sur un site. La seed phrase est la forme « lisible » de vos clés : sa sécurité est celle de vos fonds.',
    ],
    related: ['seed-phrase', 'wallet', 'cold-wallet'],
  },
  {
    term: 'Ledger (Hardware wallet)',
    slug: 'ledger-hardware',
    category: 'securite',
    short: 'Une clé matérielle qui stocke vos clés privées hors ligne — la référence des portefeuilles froids.',
    content: [
      'Un hardware wallet (portefeuille matériel) est un petit appareil physique — Ledger, Trezor, BitBox — qui stocke vos clés privées dans une puce sécurisée, hors ligne. Les transactions sont signées sur l\'appareil, jamais exposées à l\'ordinateur.',
      'C\'est la référence des cold wallets : même si votre ordinateur est infecté par un virus, vos clés restent inaccessibles au pirate. L\'appareil confirme chaque transaction sur son écran avant signature.',
      'Règle d\'or : n\'achetez un hardware wallet que sur le site officiel du fabricant ou un revendeur agréé. Les wallets « pré-initialisés » achetés ailleurs peuvent être des pièges avec une seed phrase déjà connue du vendeur. Vérifiez toujours l\'emballage scellé.',
    ],
    related: ['cold-wallet', 'seed-phrase', 'private-key'],
  },
  {
    term: 'Multi-signature (Multi-sig)',
    slug: 'multisig',
    category: 'securite',
    short: 'Un portefeuille nécessitant plusieurs signatures pour valider une transaction — la sécurité des organisations.',
    content: [
      'Un portefeuille multi-signature (multi-sig) exige que plusieurs clés privées approuvent une transaction avant son exécution. Par exemple, un multi-sig 2-sur-3 : sur trois signataires, deux doivent valider.',
      'Avantages : répartition du risque (une clé compromise ne suffit pas), protection contre le vol interne, et gouvernance collective. Les DAO et les fonds utilisent massivement le multi-sig pour leurs trésoreries.',
      'Pour un particulier, un multi-sig personnel (ex : 2-sur-3 avec des clés à différents endroits) protège contre le vol et la perte. Inconvénient : plus de complexité et le risque inverse — perdre l\'accès si trop de clés sont perdues.',
    ],
    related: ['private-key', 'dao', 'wallet'],
  },
  {
    term: 'Hashrate',
    slug: 'hashrate',
    category: 'technique',
    short: 'La puissance de calcul totale sécurisant un réseau proof of work — un indicateur de santé et de sécurité.',
    content: [
      'Le hashrate mesure la puissance de calcul totale déployée par les mineurs d\'un réseau proof of work (Bitcoin, Litecoin). Il s\'exprime en hashes par seconde (TH/s, EH/s). Plus il est élevé, plus le réseau est difficile à attaquer.',
      'Un hashrate en hausse signale des mineurs confiants et un réseau plus sécurisé ; une chute peut indiquer un désinvestissement ou des difficultés économiques du minage. Le hashrate du Bitcoin a atteint des records historiques malgré les cycles.',
      'Le hashrate est aussi lié à la difficulté de minage : le réseau s\'ajuste automatiquement pour maintenir un temps de bloc stable (~10 min pour Bitcoin). Plus de mineurs = difficulté plus haute = coût de production plus élevé.',
    ],
    related: ['minage', 'proof-of-work', 'bitcoin'],
  },
  {
    term: 'Mempool',
    slug: 'mempool',
    category: 'technique',
    short: 'La « salle d\'attente » des transactions non confirmées d\'un réseau — visible et publique sur Bitcoin.',
    content: [
      'La mempool (memory pool) est l\'ensemble des transactions en attente de confirmation sur un réseau : chaque nœud tient sa propre file, et les mineurs choisissent lesquelles inclure dans le prochain bloc, généralement selon les frais proposés.',
      'Sur Bitcoin, la mempool est publique : on peut suivre en temps réel le nombre de transactions en attente et les frais moyens. Une mempool saturée (congestion) signifie des frais élevés et des confirmations lentes ; une mempool vide, des frais minimaux.',
      'Ajuster ses frais selon l\'état de la mempool permet de payer le juste prix : trop bas = transaction bloquée pendant des heures ; trop haut = surpayer. Des outils comme mempool.space visualisent cette file d\'attente en direct.',
    ],
    related: ['gas-fees', 'bitcoin', 'blockchain'],
  },
  {
    term: 'Testnet / Mainnet',
    slug: 'testnet-mainnet',
    category: 'technique',
    short: 'Le réseau de test (gratuit) vs le réseau principal (réel) d\'une blockchain — l\'essayer avant de l\'utiliser.',
    content: [
      'Le mainnet (réseau principal) est la blockchain réelle d\'un projet, où les transactions ont une vraie valeur. Le testnet est un réseau parallèle gratuit, réservé aux développeurs et aux tests, où les tokens n\'ont aucune valeur.',
      'Les testnets servent à essayer les applications, identifier les bugs et simuler les mises à jour avant déploiement. De nombreux projets récompensent les testeurs actifs de testnets par des airdrops ultérieurs.',
      'Pour l\'utilisateur : ne jamais envoyer de fonds réels vers une adresse de testnet (les tokens y sont sans valeur), et se méfier des faux testnets utilisés par les arnaqueurs pour simuler des « dépôts ». Vérifiez toujours que vous êtes sur le mainnet officiel.',
    ],
    related: ['blockchain', 'airdrop', 'wallet'],
  },
  {
    term: 'Node (Nœud)',
    slug: 'node',
    category: 'technique',
    short: 'Un ordinateur du réseau qui stocke et vérifie la blockchain — plus il y a de nœuds, plus le réseau est décentralisé.',
    content: [
      'Un nœud (node) est un ordinateur connecté à une blockchain qui stocke une copie du registre et vérifie les transactions selon les règles du protocole. Le Bitcoin compte des dizaines de milliers de nœuds dans le monde.',
      'Plus il y a de nœuds indépendants, plus le réseau est résistant : aucune autorité centrale ne peut modifier l\'historique, et le réseau survit à la défaillance d\'une grande partie de ses participants. C\'est le cœur de la décentralisation.',
      'Faire tourner son propre nœud (full node) est le geste ultime de souveraineté : on vérifie soi-même ses transactions sans faire confiance à un tiers. Cela demande du stockage (plusieurs centaines de Go pour Bitcoin) et un minimum de technique.',
    ],
    related: ['blockchain', 'bitcoin', 'decentralisation'],
  },
  {
    term: 'Delegation (Délégation)',
    slug: 'delegation',
    category: 'defi',
    short: 'Confier ses tokens à un validateur pour participer au staking sans gérer la technique soi-même.',
    content: [
      'La délégation (delegation) permet à un détenteur de tokens de « prêter » son poids de staking à un validateur professionnel, sans gérer la technique ni verrouiller ses fonds directement. C\'est le modèle dominant sur les réseaux proof of stake.',
      'En échange, le validateur partage une partie des récompenses. Le déléguant garde ses tokens mais délègue la validation. Attention au slashing : si le validateur mal se comporte, une partie des fonds délégués peut être pénalisée.',
      'Choisir un validateur : taux de commission raisonnable, historique sans incident (pas de slashing), et taille du réseau. Les plateformes de staking liquide (Lido) automatisent la délégation tout en gardant les tokens liquides.',
    ],
    related: ['staking', 'proof-of-stake', 'validator'],
  },
  {
    term: 'Validator (Validateur)',
    slug: 'validator',
    category: 'technique',
    short: 'Un acteur qui sécurise un réseau proof of stake en validant les transactions — rémunéré en récompenses.',
    content: [
      'Un validateur est un acteur d\'un réseau proof of stake qui propose et atteste les blocs de transactions. Pour participer, il doit « miser » (stake) une quantité minimale de tokens (32 ETH sur Ethereum).',
      'Le validateur est rémunéré par les frais et les récompenses de bloc, mais peut être pénalisé (slashing) en cas de panne prolongée ou de comportement malveillant. La concurrence et la réputation sont donc cruciales.',
      'Beaucoup de validateurs opèrent des services de délégation : les petits détenteurs leur confient leurs tokens en échange d\'une part des récompenses. C\'est le pilier économique des blockchains proof of stake.',
    ],
    related: ['staking', 'proof-of-stake', 'delegation'],
  },
  {
    term: 'Self-custody (Auto-conservation)',
    slug: 'self-custody',
    category: 'securite',
    short: 'Le fait de détenir soi-même ses clés privées, sans passer par un tiers — « Not your keys, not your coins ».',
    content: [
      'La self-custody (auto-conservation) consiste à détenir soi-même ses clés privées, dans un wallet que l\'on contrôle (idéalement froid), plutôt que de laisser ses cryptos sur un exchange ou chez un tiers.',
      'L\'adage résume l\'enjeu : « Not your keys, not your coins » — si vos clés sont chez un exchange, ce dernier contrôle vos fonds. Les faillites (FTX, Celsius, Mt. Gox) ont montré que les dépôts chez des tiers peuvent être perdus.',
      'La self-custody a un coût : vous devenez responsable de la sécurité de vos clés et de votre seed phrase. Perdues = fonds perdus, sans recours. Pour des sommes importantes, c\'est la norme de sécurité ; pour de petites sommes, un exchange régulé reste acceptable.',
    ],
    related: ['cold-wallet', 'seed-phrase', 'exchange'],
  },
  {
    term: 'Sybil attack (Attaque Sybil)',
    slug: 'sybil',
    category: 'technique',
    short: 'Une attaque où un acteur crée de fausses identités pour fausser un vote, une réputation ou une distribution.',
    content: [
      'Une attaque Sybil consiste pour un attaquant à créer un grand nombre de fausses identités (comptes, adresses, nœuds) pour influencer un système basé sur la participation : votes, airdrops, réputation, consensus.',
      'Dans la crypto, les attaques Sybil visent surtout les airdrops : des « farmers » créent des milliers de wallets pour capter une distribution. Les protocoles répondent avec des critères d\'éligibilité complexes (volume, historique, interaction humaine).',
      'Sur les réseaux proof of stake, le coût de l\'attaque Sybil est élevé car il faut miser de vrais tokens — c\'est justement ce que le staking résout. La détection Sybil est un enjeu croissant pour la distribution équitable des récompenses.',
    ],
    related: ['airdrop', 'proof-of-stake', 'node'],
  },
  {
    term: 'Sandwich attack (Attaque sandwich)',
    slug: 'sandwich',
    category: 'technique',
    short: 'Une attaque front-run sur les DEX : l\'attaquant encadre votre transaction pour vous faire payer plus cher.',
    content: [
      'L\'attaque sandwich est une forme de front-running sur les DEX : un bot détecte votre transaction d\'achat en attente, achète avant vous (faisant monter le prix), puis revend juste après que votre achat s\'est exécuté — empocheant la différence à vos dépens.',
      'Elle est possible parce que les transactions sont visibles dans la mempool avant confirmation, et que les DEX déterminent le prix selon la taille de la pool. Les gros ordres sur tokens illiquides sont les cibles favorites.',
      'Protections : utiliser des limites de slippage strictes, des routes privées (flashbots), ou exécuter les gros ordres en plusieurs petites transactions. Sur les réseaux à faibles frais, l\'attaque sandwich est moins rentable et donc moins fréquente.',
    ],
    related: ['dex', 'slippage', 'mempool'],
  },
  {
    term: 'Regulation (Régulation)',
    slug: 'regulation',
    category: 'marche',
    short: 'L\'ensemble des lois et règles encadrant la crypto — un facteur majeur d\'évolution du marché.',
    content: [
      'La régulation désigne les lois et règles qui encadrent la crypto : statut des tokens, obligations des exchanges (KYC/AML), fiscalité, protection des investisseurs. Elle varie fortement selon les pays : États-Unis, Europe (MiCA), France (PSAN), Asie.',
      'Une régulation claire est généralement positive à long terme : elle protège les utilisateurs, rassure les institutionnels et légitime l\'industrie. Une régulation trop restrictive ou confuse peut freiner l\'innovation et pousser les acteurs à se délocaliser.',
      'Le CLARITY Act aux États-Unis, MiCA en Europe, ou les débats sur les stablecoins sont des exemples majeurs. Suivre la régulation est essentiel : elle peut transformer du jour au lendemain la valeur et l\'usage de certains actifs.',
    ],
    related: ['kyc', 'stablecoin', 'exchange'],
  },
];

export const lexiqueBySlug = new Map(LEXIQUE.map((t) => [t.slug, t]));

// Regroupement par catégorie (ordre du fichier)
export const lexiqueByCategory = CATEGORIES_ORDER();

function CATEGORIES_ORDER(): Record<LexiqueTerm['category'], LexiqueTerm[]> {
  const result: Record<LexiqueTerm['category'], LexiqueTerm[]> = {
    bitcoin: [], defi: [], trading: [], securite: [], marche: [], technique: [],
  };
  for (const t of LEXIQUE) result[t.category].push(t);
  return result;
}
