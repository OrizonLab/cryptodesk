---
title: "Trezor : 13 689 clients exposés après le piratage de ShipMonk, son partenaire logistique"
description: "Le fabricant tchèque de hardware wallets Trezor révèle qu'une intrusion chez ShipMonk, son partenaire logistique, a exposé noms, adresses, e-mails et numéros de téléphone de 13 689 clients. En cause : un zero-day critique dans Metabase (CVE-2026-72898, CVSS 10/10) et un risque accru de phishing ciblé."
pubDate: 2026-08-13T17:10:00Z
tags: ["trezor", "securite", "hack", "hardware-wallet", "phishing"]
draft: false
---

<div class="summary"><strong>En résumé :</strong> Trezor a révélé jeudi 13 août qu'une intrusion chez ShipMonk, l'un de ses partenaires logistiques, a exposé les données personnelles de 13 689 clients — noms complets, adresses de livraison, e-mails et numéros de téléphone. Les appareils, les clés privées et les fonds ne sont pas concernés, mais les personnes touchées s'exposent à un risque accru de phishing « sophistiqué ». En cause : l'exploitation d'un zero-day critique dans l'outil d'analytics Metabase (CVE-2026-72898, score CVSS 10/10), déjà utilisé contre au moins cinq entreprises. Données indicatives, pas un conseil d'investissement.</div>

Le hardware wallet est censé être l'objet le plus sûr de la crypto : une clé privée qui ne quitte jamais l'appareil. Mais acheter ce wallet, lui, laisse des traces. Trezor l'a appris à ses dépens cette semaine. Le fabricant tchèque — dont la société mère SatoshiLabs est basée à Prague — a publié jeudi 13 août un communiqué confirmant qu'une intrusion chez **ShipMonk**, l'un de ses partenaires logistiques, avait exposé les données personnelles de **13 689 clients** : noms complets, adresses de livraison, adresses e-mail et numéros de téléphone. Du jamais-vu depuis la fondation de l'entreprise en 2013, selon Trezor lui-même : c'est la première fois que des numéros de téléphone et des adresses physiques de clients fuient.

Les fonds, eux, ne bougent pas : Trezor insiste sur le fait que ses systèmes n'ont pas été compromis et que « votre appareil Trezor est sécurisé ». Mais la distinction compte moins qu'il n'y paraît : les données volées sont précisément celles qui permettent d'organiser des campagnes de phishing d'un réalisme redoutable, ciblant les porteurs de wallets.

## 13 689 clients, dont 11 742 avec une exposition complète

Selon le [communiqué officiel de Trezor](https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident), le bilan exact de l'incident est le suivant :

- **11 742 clients** avec exposition complète : nom, adresse e-mail, numéro de téléphone et adresse de livraison ;
- **1 947 clients** avec exposition partielle : nom, ville et adresse e-mail ;
- les pays concernés sont les **États-Unis, le Royaume-Uni, la Suède, la Colombie, le Brésil, l'Italie et le Portugal**, pour des commandes livrées entre le **10 mai et le 8 août 2026**.

Le chiffre aurait pu être bien plus lourd. Trezor applique une politique stricte de rétention des données à **90 jours** — étendue à ses partenaires d'exécution — qui a mécaniquement limité l'ampleur de la fuite : les commandes plus anciennes avaient déjà été effacées ou anonymisées. Les clients concernés ont été contactés individuellement par e-mail depuis l'adresse `privacy@trezor.io` ; ceux qui n'ont rien reçu ne sont pas touchés.

## La faille : un zero-day SQL injection dans Metabase, noté 10/10

Comment les données ont-elles fui ? C'est [ShipMonk qui l'explique dans ses notifications](https://www.bleepingcomputer.com/news/security/trezor-discloses-data-breach-affecting-nearly-14-000-customers/), dont BleepingComputer a pris connaissance : les attaquants ont exploité **une vulnérabilité dans Metabase**, la plateforme d'analytics que le logisticien utilisait en interne.

Metabase a divulgué le 6 août une faille d'**injection SQL non authentifiée**, référencée **CVE-2026-72898**, avec le score de sévérité maximal : **CVSS 10.0**. Selon les informations publiées par l'éditeur et relayées par la presse spécialisée, l'exploitation — active depuis le 3 août — permettait à un attaquant, en une seule requête, d'obtenir un **accès administrateur complet** à l'instance Metabase et, dans certains cas, aux **identifiants des bases de données connectées** en aval. La CISA a ajouté la faille à son catalogue des vulnérabilités exploitées. Au moins **cinq entreprises** ont été touchées par cette vague d'attaques, dont le fabricant d'ordinateurs portables Framework et l'éditeur de formulaires Tally, comme le rapporte [TechTimes](https://www.techtimes.com/articles/324060/20260812/metabase-sql-injection-breached-five-companies-exposed-all-connected-database-credentials.htm).

Pour ShipMonk, l'addition ne s'arrête pas là : BleepingComputer rapporte que le logisticien a également reçu des **e-mails d'extorsion du groupe ShinyHunters**, l'un des gangs de rançonnage les plus actifs du moment. Metabase assure avoir corrigé la faille et invalidé toutes les sessions actives ; ShipMonk dit avoir ouvert une enquête technique avec l'aide d'experts externes.

## Le vrai risque : un phishing « sophistiqué » ciblant les porteurs de wallets

Trezor ne minimise pas la menace : les victimes « pourraient être la cible de tentatives de phishing plus sophistiquées ». Concrètement, les fraudeurs disposent désormais de tout ce qu'il faut pour **usurper l'identité d'une banque, d'un exchange, ou de Trezor lui-même** — par e-mail, par téléphone, ou même par courrier postal. Un e-mail d'apparence officielle citant votre vrai nom, votre vraie adresse et votre vrai numéro de commande est infiniment plus crédible qu'un spam générique.

Le précédent de janvier 2024 montre où cela mène. Après une intrusion dans son portail de support tiers — qui avait exposé les données de **66 000 utilisateurs** —, Trezor avait confirmé que les informations volées servaient à lancer des campagnes de phishing dont l'objectif final était simple : **faire saisir la phrase de récupération de 24 mots** sur un faux site. La règle reste la même aujourd'hui : un wallet ne vous demandera jamais votre seed en ligne. Ni Trezor, ni Ledger, ni aucun service légitime ne vous fera « vérifier » ou « restaurer » votre portefeuille en saisissant vos 24 mots sur une page web. C'est la parade absolue contre ce type d'attaques.

## ShipMonk, CEVA : la logistique, nouveau maillon faible de la supply chain

L'incident n'est pas isolé. La même semaine, **Valve a prévenu ses clients européens du Steam Hardware** que leurs données avaient pu fuir après le piratage de **CEVA Logistics**, son partenaire d'expédition — noms, adresses et données de commande, comme le rapporte [TechCrunch](https://techcrunch.com/2026/08/10/a-data-breach-at-shipping-giant-ceva-logistics-is-rippling-across-banks-retailers-steam-gamers-and-beyond/). Deux attaques, deux prestataires logistiques, deux vagues de données clients exposées en l'espace de quelques jours.

La leçon est structurelle : les entreprises crypto ont durci leurs propres systèmes, mais les données de commande transitent par des tiers — logistics, paiement, support — dont la surface d'attaque leur échappe. Pour un acteur comme Trezor, dont la promesse est précisément la souveraineté des clés, la donnée personnelle devient un vecteur d'attaque de plus, et le paradoxe est cru : on achète un wallet pour ne plus dépendre d'un tiers, mais la commande, elle, passe par toute une chaîne.

## Trezor réagit : livraison anonyme et politique de rétention renforcée

Trezor a annoncé deux réponses. D'abord, une option de **livraison anonyme** (« Anonymous Delivery »), avec un checkout dédié, un retrait en locker, un emballage neutre et la suppression automatique des identifiants d'expédition après livraison — annoncée pour **septembre 2026 dans l'UE** et fin 2026 aux États-Unis. Ensuite, des conseils pratiques pour limiter l'exposition : adresse e-mail non liée à l'identité réelle, paiement en crypto ou en carte jetable, boîte postale.

Pour les 13 689 clients concernés, la conduite à tenir est simple et sans ambiguïté : se méfier de tout message demandant une action immédiate ou des informations personnelles, vérifier l'expéditeur, et ne jamais saisir sa phrase de récupération ailleurs que sur l'appareil lui-même. La clé privée reste hors d'atteinte — mais l'ingénierie sociale, elle, ne dort jamais. L'incident tombe dans un marché où le bitcoin se traite autour de 63 500 $ (13 août) et où l'autoconservation reste le réflexe dominant : la sécurité des fonds ne vaut que si celle des données personnelles suit.
