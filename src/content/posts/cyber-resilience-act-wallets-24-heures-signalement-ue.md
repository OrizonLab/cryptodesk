---
title: "Wallets crypto : depuis le 11 septembre, 24 heures pour signaler une faille exploitée à Bruxelles"
description: "Le Cyber Resilience Act s'applique depuis le 11 septembre 2026 : tout fabricant de wallet vendu dans l'UE doit signaler une vulnérabilité activement exploitée sous 24 heures à l'ENISA et au CERT-FR, informer ses utilisateurs, sous peine de 15 millions d'euros d'amende. Ce que cela change pour les portefeuilles matériels et logiciels."
pubDate: 2026-09-14T17:00:00Z
tags: ["regulation", "europe", "securite", "wallet", "cyber-resilience-act"]
draft: false
ogImage: "/og/cyber-resilience-act-wallets-24-heures-signalement-ue.jpg"
---

<div class="summary"><strong>En résumé :</strong> Depuis le vendredi 11 septembre 2026, l'article 14 du règlement européen sur la cyber-résilience (CRA) est applicable : tout fabricant d'un produit comportant des éléments numériques vendu dans l'Union — y compris un wallet matériel connecté ou une application de portefeuille commercialisée — doit signaler une vulnérabilité activement exploitée sous <strong>24 heures</strong> à l'ENISA et à l'autorité nationale. S'ensuivent une notification détaillée sous 72 heures et un rapport final sous 14 jours. Les sanctions peuvent atteindre <strong>15 millions d'euros ou 2,5 % du chiffre d'affaires mondial</strong>. En France, le signalement atterrit au CERT-FR (ANSSI) et l'ANFR surveille le marché. Mais le texte, écrit pour les objets connectés, ne couvre pas ce qui a réellement vidé les portefeuilles en 2026. Données indicatives, pas un conseil d'investissement.</div>

Une date a changé la semaine dernière sans faire de bruit dans l'écosystème crypto : le **11 septembre 2026**, les obligations de signalement du *Cyber Resilience Act* — règlement (UE) 2024/2847 — sont entrées en application, plus de quinze mois avant le reste du dispositif. Ce que la Commission européenne présente comme une avancée pour les « objets numériques du quotidien » (moniteurs pour bébés, montres connectées, applications) touche de plein fouet les portefeuilles de cryptoactifs, sans jamais prononcer le mot « crypto ».

Le principe tient en une phrase : un fabricant qui apprend qu'une faille de son produit est **activement exploitée** doit le déclarer à l'agence européenne de cybersécurité, ENISA, et au CSIRT national compétent, par une plateforme unique mise en ligne le même jour. L'horloge démarre à la prise de connaissance, et elle est impitoyable.

## Un texte horizontal qui rattrape les wallets par la porte de service

Le CRA ne dresse aucune liste de produits. Il définit une catégorie juridique — les « produits comportant des éléments numériques » — et trois critères : le produit est un logiciel ou un matériel (y compris ses traitements de données à distance), il est mis à disposition sur le marché de l'UE dans le cadre d'une activité commerciale, et son usage prévu ou raisonnablement prévisible comprend une connexion de données, directe ou indirecte.

Un portefeuille matériel communicant avec une application compagnon entre dans la définition sans discussion : le boîtier et son logiciel forment un même produit, même si l'application se télécharge séparément. Une application de portefeuille mobile ou une extension de navigateur, en tant que logiciel autonome doté d'une fonction de sécurité, est également concernée. L'obligation pèse sur le **fabricant** — l'entité qui conçoit ou fait concevoir le produit et le commercialise sous son nom ou sa marque — et non sur le porteur, ni sur le contributeur open source bénévole : les gestionnaires de logiciels open source relèvent d'un régime distinct, applicable seulement à partir du 11 décembre 2027.

Deux nuances comptent pour un lecteur européen. D'abord, le texte couvre **les produits déjà sur le marché** avant cette échéance : personne n'y coupe au motif que le wallet a été conçu avant. Ensuite, la Commission n'a désigné aucune marque : la qualification dépend de la configuration réelle du produit, de son mode de distribution et des exclusions sectorielles applicables. Les plateformes d'échange et les dépositaires, eux, restent majoritairement dans le champ de MiCA ; ce sont bien les outils qui détiennent des clés privées qui basculent dans le droit des produits.

## Le compte à rebours : 24 heures, 72 heures, 14 jours

Le calendrier, fixé par l'article 14 et détaillé dans les lignes directrices publiées par la Commission le 27 juillet 2026, se déroule en trois temps :

- **Alerte précoce — 24 heures** après la prise de connaissance. Elle doit indiquer, le cas échéant, les États membres où le produit est connu comme disponible.
- **Notification détaillée — 72 heures** : informations sur le produit, nature générale de l'exploit et de la vulnérabilité, mesures correctives prises, et surtout **mesures que les utilisateurs peuvent appliquer eux-mêmes**.
- **Rapport final — 14 jours** après la disponibilité d'une mesure corrective ou d'atténuation. Pour un « incident grave », le délai est d'un mois après la notification des 72 heures.

Précision importante : le point de départ n'est pas la réception d'un signalement de chercheur, mais le moment où le fabricant dispose, après évaluation initiale, d'un **degré raisonnable de certitude** qu'une exploitation active est en cours. Rien n'est rétroactif : une exploitation connue avant le 11 septembre 2026 n'a pas à être déclarée — sauf si les attaquants s'y mettent après cette date.

## En France : le CERT-FR reçoit, l'ANFR sanctionne

Le règlement laissait à chaque État le soin d'organiser sa chaîne de contrôle. La foire aux questions publiée par l'ANSSI la précise pour la France. L'ANSSI est l'**autorité notifiante** : elle évalue et désigne les organismes d'évaluation de la conformité, sur accréditation du COFRAC. Le **CERT-FR**, qui fait partie de l'ANSSI, centralise les signalements transmis depuis la plateforme européenne. La surveillance du marché et les sanctions reviennent à l'**ANFR**.

Les montants sont ceux du règlement : jusqu'à **15 millions d'euros ou 2,5 % du chiffre d'affaires annuel mondial**, le seuil le plus élevé s'appliquant — et, en dernier recours, le retrait du produit du marché. C'est la bande de sanction la plus haute prévue par le CRA, ce qui dit assez l'ambition du législateur : un fournisseur qui laisse ses utilisateurs exposés, sans rien dire, s'expose à un coût supérieur à celui d'une campagne de rappel classique.

## L'article qui change vraiment quelque chose pour l'utilisateur

Le paragraphe le plus utile aux détenteurs n'est pas celui des sanctions, mais l'article 14(8). Dès qu'il a connaissance d'une vulnérabilité activement exploitée ou d'un incident grave, le fabricant doit **informer les utilisateurs touchés — et, si nécessaire, l'ensemble de ses utilisateurs** — de l'événement et, lorsqu'il en existe, des mesures d'atténuation et de correction qu'ils peuvent déployer. Mettre à jour un firmware, cesser temporairement d'utiliser une fonction, déplacer un solde vers de nouvelles adresses, vérifier manuellement une signature : c'est exactement le contenu attendu.

Deux réserves limitent la portée du dispositif. Aucun délai chiffré n'encadre cette information aux utilisateurs : le texte parle de diligence, pas de 24 heures. Et la Commission précise que cette communication doit rester proportionnée et fondée sur le risque — elle n'a pas à être publique ni indistincte, surtout lorsque trop de détails techniques faciliteraient l'exploitation. En contrepartie, un filet de sécurité existe : si le fabricant informe mal ou trop tard, le CSIRT coordinateur **peut** alerter lui-même les utilisateurs, quand il le juge nécessaire et proportionné. La formulation est permissive, pas contraignante.

## Ce que le CRA ne couvre pas — et c'est là que l'argent disparaît

C'est la limite que l'industrie met en avant, chiffres à l'appui. Le CRA traite la faille **du produit**. Or, en 2026, l'argent ne part presque jamais par là.

Le rapport Q2 2026 de Hacken recense 67 incidents pour 763,9 millions de dollars volés : **88,3 % de la valeur perdue** provient de clés, de signataires ou d'infrastructures compromis. Les bugs de contrats intelligents apparaissent dans 44 des 67 incidents, mais ne représentent qu'environ 11 % des pertes. TRM Labs, pour le premier semestre, comptabilise 207 piratages — un record — pour 972 millions de dollars, dont environ **76 % de la valeur** concentrée dans les compromissions d'infrastructure et d'opérations, qui ne pèsent pourtant que 15 % des incidents. CertiK, sur la même période, désigne la compromission de wallet comme le vecteur le plus coûteux : 444 millions de dollars en 33 incidents, devant l'hameçonnage (366 millions).

L'exemple le plus parlant est récent et européen. Le 13 août, Trezor révélait que l'intrusion chez son prestataire logistique ShipMonk avait exposé les données de 13 689 clients ([notre décryptage](/posts/trezor-fuite-donnees-shipmonk-13689-clients/)). Le 4 septembre, le fabricant tchèque annonçait un second lot : **67 000 clients américains supplémentaires**, portant le total à plus de 81 000 personnes, avec noms, e-mails, téléphones, adresses de livraison et numéros de commande — des données que ShipMonk avait pourtant certifié par écrit avoir supprimées. Ni les appareils, ni les clés privées, ni les fonds n'ont été touchés : la fuite vient de la plomberie commerciale, pas du code du wallet. Un délai de 24 heures vers l'ENISA n'aurait rien changé pour les victimes, qui restent exposées à des campagnes d'hameçonnage construites à partir de vraies informations.

## Décembre 2027 : le vrai chantier, et la tentation de fuir l'Europe

Le reste du CRA arrive le **11 décembre 2027** : sécurité dès la conception, gestion des vulnérabilités pendant au moins cinq ans, évaluation de conformité, marquage CE, documentation technique conservée dix ans. L'inventaire logiciel (SBOM) devient un prérequis opérationnel, et les organismes notifiés français sont attendus pour la fin 2026 — l'ANSSI en envisage une dizaine.

Pour un fabricant de wallets, la charge est d'abord procédurale : détecter qu'une exploitation est active, tenir une chaîne de décision capable de produire un signalement conforme en 24 heures, disposer d'un accès EU-Login à la plateforme, et sécuriser contractuellement la remontée d'information de ses sous-traitants — le délai de 24 heures ne se met pas en pause le temps qu'un fournisseur réponde. Les normes harmonisées qui définiront une présomption de conformité sont encore en projet : l'ANSSI le rappelle, la conformité s'impose sans les attendre.

La vraie question, celle qu'aucun texte ne tranche, est économique. Après MiCA, plusieurs acteurs ont choisi de restreindre leur offre pour certains marchés plutôt que d'affronter la charge de conformité européenne. Un petit éditeur de wallet, avec une équipe de sécurité réduite, devra arbitrer entre financer une astreinte 24 heures sur 24 et se retirer du marché unique. La délocalisation réglementaire n'est pas un slogan : c'est une décision de gestion.

## Ce que cela change pour vous, concrètement

Le CRA ne protège pas votre portefeuille : il protège votre **droit à l'information** sur l'état du produit que vous utilisez. Trois conséquences pratiques.

D'abord, la qualité du canal d'alerte d'un fabricant devient un critère de choix objectif : un éditeur capable de tenir une astreinte et de vous écrire en clair en cas d'exploitation active est mieux armé qu'un autre. Ensuite, l'hameçonnage reste, et de loin, le premier risque réel — or il est hors du champ du CRA, puisqu'aucune faille produit n'est nécessaire pour convaincre un détenteur de cliquer ou de signer. Enfin, la mise à jour reste de votre responsabilité : le règlement oblige le fabricant à corriger pendant la période de support, pas l'utilisateur à installer la correction. Un wallet matériel dont le firmware n'a pas été mis à jour depuis un an est un produit conforme sur le papier et vulnérable dans votre poche.

Le contexte de marché n'incite pas à la négligence. Ce lundi, le bitcoin évoluait autour de **78 700 dollars**, en hausse de près de 2 % sur vingt-quatre heures, pendant que les valeurs liées à l'intelligence artificielle décrochaient et que le pétrole bondissait de près de 4 % après la fermeture d'un oléoduc saoudien. L'ether restait autour de **2 529 dollars** et la capitalisation totale du marché crypto à environ 2 700 milliards de dollars. Un portefeuille de cette taille, dont la sécurité dépend de processus humains et de prestataires tiers, n'a pas besoin de nouvelle loi pour mériter un inventaire de ses dépendances : elle en a désormais une, avec un compte à rebours en heures.

*Sources : Commission européenne, règlement (UE) 2024/2847 (article 14), ENISA (Single Reporting Platform), FAQ de l'ANSSI sur le CRA, Jones Day, Travers Smith, Slaughter and May, CoinDesk, Cointelegraph, CryptoSlate, CryptoInfo, Hacken (rapport Q2 2026), TRM Labs (bilan H1 2026), CertiK (Hack3D H1 2026), BleepingComputer, The Hacker News, données de marché CoinGecko. Données indicatives, pas un conseil d'investissement.*
