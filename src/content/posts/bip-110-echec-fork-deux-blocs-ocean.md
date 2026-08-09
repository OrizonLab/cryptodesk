---
title: "Bitcoin : le fork BIP-110 s'éteint après deux blocs, Ocean perd 96 % de sa puissance de minage"
description: "La tentative de soft fork BIP-110, qui devait limiter les données non financières dans les transactions Bitcoin, a produit deux blocs avant de s'arrêter. Avec 2,53 % de soutien minier, la chaîne dissidente agonise : Ocean a perdu 96,5 % de son hashrate et 99,85 % des mineurs sont restés sur la chaîne principale. Retour sur un échec éclair et ses pièges, risque de replay inclus."
pubDate: 2026-08-09T17:20:00Z
tags: ["bitcoin", "minage", "bip-110", "fork", "consensus"]
enSlug: "bip110-bitcoin-softfork-block-961632"
draft: false
---

<div class="summary"><strong>En résumé :</strong> Le soft fork controversé BIP-110, qui visait à interdire temporairement le stockage de données non financières dans les transactions Bitcoin, a fait long feu. Lancée samedi 8 août au bloc 961 632, la chaîne dissidente n'a produit que <strong>deux blocs</strong> avant de s'arrêter. Le groupe de minage Roughnecks, à l'origine de ces deux blocs, a annoncé dimanche matin qu'il cessait l'exploitation, tandis que le hashrate affiché du pool Ocean s'effondrait de <strong>96,5 %</strong> (36 EH/s à 1,25 EH/s). Avec seulement <strong>2,53 %</strong> des blocs signalant la proposition — contre 55 % requis —, la « rébellion » n'a jamais pesé : 99,85 % de la puissance de calcul est restée sur la chaîne principale, dont le cours n'a pas bronché (~65 200 $).</div>

Ce devait être le test de gouvernance le plus spectaculaire de l'année. Il a duré huit heures et deux blocs. Samedi 8 août, au bloc 961 632, les nœuds exécutant le logiciel BIP-110 ont commencé à rejeter tout bloc ne signalant pas leur proposition : la « chaîne dissidente » de Bitcoin était née. Dimanche 9 août au matin, elle était déjà cliniquement morte — et c'est le réseau principal qui a écrit l'épilogue, sans même hausser le ton.

## Deux blocs, puis le silence

La chronologie tient en trois actes. Au bloc 961 632, AntPool a miné un bloc « non-signalant », accepté par l'immense majorité du réseau ; les nœuds BIP-110 l'ont rejeté et ont suivi à la place un bloc concurrent produit par un mineur d'Ocean, le pool associé au créateur de Bitcoin Knots, Luke Dashjr. Le groupe Roughnecks, fer de lance du mouvement, a enchaîné un deuxième bloc (961 633). Puis plus rien. Vers 6 h UTC dimanche, la chaîne dissidente en était toujours à deux blocs, pendant que la chaîne principale en avançait 48 — l'équivalent d'une journée d'activité. Michael Saylor, cofondateur de Strategy, évoquait dimanche « plus de 80 blocs » de retard.

La suite est mécanique, au sens propre. La chaîne dissidente a hérité de la difficulté de minage du bitcoin, montée à environ <strong>127 trillions</strong>, un niveau calibré pour la puissance colossale du réseau principal — mais elle ne disposait que d'une fraction infime des machines. Résultat : des blocs espacés de plusieurs heures, et un ajustement de difficulté (qui n'intervient que tous les 2 016 blocs) repoussé à des centaines de jours : <strong>350 jours</strong> selon le moniteur BIP-110 suivi par CoinDesk, « environ 25 ans » selon les calculs de Saylor une fois le hashrate résiduel intégré. Un piège sans issue, dans lequel s'est engouffré le hashrate.

## BIP-110, c'était quoi ? Un an sans « données non financières »

Pour comprendre l'échec, il faut revenir au débat. BIP-110 — « Reduced Data Temporary Softfork », rédigé par Dathon Ohm en décembre 2025 — propose d'interdire pendant <strong>52 416 blocs (environ un an)</strong> les principales méthodes permettant de stocker des données non financières dans les transactions : scripts de sortie de plus de 34 octets (avec une exception OP_RETURN jusqu'à 83 octets), éléments de witness de plus de 256 octets, annexes Taproot et opcodes `OP_SUCCESS*` inutilisés. Les paiements classiques (P2PKH, P2WPKH, Taproot) ne sont pas touchés, et les UTXO hérités sont préservés.

Derrière la technique, une bataille philosophique vieille de plusieurs années, depuis l'explosion des inscriptions Ordinals en 2023. Pour les partisans — Luke Dashjr, le Club Orange de Matteo Pellegrini, le pool Roughnecks —, ces données « non financières » encombrent le réseau, alourdissent la validation et détournent Bitcoin de sa vocation monétaire. Pour les opposants, emmenés par Adam Back (Blockstream) et Jameson Lopp, quiconque paie des frais a acheté le droit d'utiliser l'espace de bloc comme il l'entend — et confier aux mineurs ou aux opérateurs de nœuds le soin de décider quelles transactions sont « légitimes » créerait un précédent dangereux.

Le débat n'est d'ailleurs pas resté théorique cette semaine : l'adresse du hacker Coldcard, qui détient environ 2 055 BTC (~130 M$) dérobés lors de l'exploit de début août, a été transformée en tableau d'affichage public, des dizaines d'internautes lui adressant des messages OP_RETURN (suppliques, poèmes, voire une offre de blanchiment) — précisément le genre de contenu que BIP-110 voulait limiter. Un pied de nez que la chaîne dissidente n'aura pas le temps de digérer.

## Une activation « forcée » qui a mal tourné

Le vrai problème de BIP-110 n'était pas son objet, mais sa méthode. Historiquement, une modification de consensus sur Bitcoin exige un signalement massif des mineurs — 90 à 95 % des blocs avant activation. BIP-110 abaissait le seuil à <strong>55 %</strong> (1 109 blocs sur 2 016 par période), en vain : le soutien réel a culminé autour de <strong>2,5-2,6 %</strong> des blocs, et 2,53 % sur les deux semaines précédant l'échéance, selon CoinDesk et le moniteur bip110.org.

Plutôt que de renoncer, les partisans ont choisi de forcer le passage (UASF, user-activated soft fork) : à partir du bloc 961 632, leurs nœuds devaient rejeter tout bloc non signalant, quitte à se retrouver seuls sur leur propre version de la chaîne. La suite a donné raison aux critiques : une chaîne que presque personne ne mine est une chaîne qui ne bouge pas. Comme en 2017 avec SegWit2x — porté par des acteurs autrement plus puissants —, l'imposition a cédé devant la réalité du hashrate.

## Roughnecks jette l'éponge, Ocean fond de 96 %

L'épilogue est signé Roughnecks. « À 3 h 40 UTC, nous avons tenu une réunion d'équipe et pris la décision difficile de cesser les opérations de minage sous le nom de Roughnecks », a tweeté le groupe dimanche, qualifiant le retrait non pas de défaite mais d'« <em>escalade vers l'étape suivante</em> » et conseillant à quiconque mine encore la chaîne BIP-110 de s'arrêter jusqu'à nouvel ordre.

Le signal est venu des chiffres : le hashrate affiché d'Ocean, devenu la place centrale du signalement BIP-110 grâce à son système DATUM (qui laisse chaque mineur construire son propre modèle de bloc), est passé d'environ <strong>36 EH/s le 8 août à 1,25 EH/s le 9 août</strong>, soit une chute de 96,5 % en vingt-quatre heures. Le « mouvement » n'avait jamais dépassé 2,5 % de la puissance du réseau — il ne lui en restait plus que 0,15 %.

## « Bitcoin a fonctionné exactement comme prévu »

Les réactions officielles ont donné le ton. Michael Saylor a salué la démonstration : « Bitcoin a fonctionné exactement comme prévu. BIP-110 était libre de forker, et le réseau était libre de ne pas suivre. Le résultat est sans appel : environ 99,85 % de la puissance de hachage de Bitcoin est restée avec Bitcoin. » Avant d'ajouter : « N'importe qui peut forker Bitcoin. Sans sécurité, sans utilité, sans capital et sans utilisateurs, un fork n'a aucune importance. »

Côté partisans, Matteo Pellegrini a tiré une leçon plus amère : « La leçon de BIP-110, c'est que 15 à 20 % des nœuds ne suffisent pas à changer le consensus de Bitcoin. » Un aveu qui a valu à son auteur un rappel du livre blanc de Satoshi Nakamoto, cité par plusieurs contradicteurs : « [Les mineurs] votent avec leur puissance CPU, en exprimant leur acceptation des blocs valides par le fait de les étendre, et en rejetant les blocs invalides en refusant de travailler dessus. » La démonstration est brutale : les règles logicielles ne pèsent rien sans l'électricité qui construit la chaîne.

## Le replay, piège pour les curieux

L'épisode laisse un piège concret : le <strong>risque de replay</strong>. Les deux chaînes acceptent encore des transactions identiques. Une transaction signée dépensant des pièces du fork fonctionne donc aussi sur Bitcoin : un acheteur de « pièces BIP-110 » pourrait la retransmettre sur la chaîne principale et récupérer de vrais BTC auprès du même vendeur. À cela s'ajoute la lenteur extrême des confirmations sur la chaîne dissidente (un bloc toutes les quelques heures), qui rend tout échange impraticable. Les détenteurs de coins du fork — s'il en existe — feraient bien de ne pas les bouger, et personne de les acheter, tant que la situation n'est pas clarifiée.

## Et le marché dans tout ça ? Pas grand-chose

Le contraste est saisissant : la « guerre de consensus » la plus médiatisée de l'année n'a pas fait bouger le cours. Bitcoin s'échangeait dimanche autour de <strong>65 200 $</strong> (+0,2 % sur 24 h), selon CoinGecko, au plus haut de sa fourchette récente — « le prix du bitcoin n'a presque pas cillé », résumait Bitcoin.com. Les flux institutionnels confirment l'indifférence : les ETF spot ont engrangé environ <strong>850 M$ sur la semaine du 3 au 7 août</strong> (Farside Investors), avec 101,7 M$ rien que vendredi et l'IBIT de BlackRock en tête. Les marchés de prédiction, de leur côté, donnent plus de 90 % de chances à un bitcoin au-dessus de 62 000 $ le 15 août — et à peine 3 % au-dessus de 70 000 $ : une fourchette étroite, sans scénario d'emballement.

Le feuilleton réglementaire américain, lui, continue de ronronner : le CLARITY Act attendra septembre, le Sénat étant en pause jusqu'au 14 — un dossier suivi, mais qui n'émeut plus les cours. La leçon de la semaine est ailleurs : sur Bitcoin, aucune règle ne s'impose sans conviction — ni développeur, ni mineur, ni pool. La chaîne la plus lourde a parlé, et elle a parlé en vingt-quatre heures.

*Sources : CoinDesk (édition française, 9 août 2026), Bitcoin.com News (9 août 2026), Incrypted (9 août 2026), spec BIP-110 (bips.dev/110), bip110.org/monitor, Farside Investors, CoinGecko. Les probabilités de marchés de prédiction sont indicatives. Cet article est informatif et ne constitue pas un conseil d'investissement ; faites vos propres recherches.*
