---
title: "Un faux e-mail a suffi : Revolut a livré passeports, selfies KYC et historiques bitcoin à un tiers non autorisé"
description: "Revolut a transmis les passeports, selfies de vérification et historiques de transactions bitcoin d'une partie de ses clients à un tiers ayant usurpé le domaine e-mail d'une agence gouvernementale. Aucune intrusion, aucun fonds perdu : c'est la vérification de la demande qui a échoué."
pubDate: 2026-09-12T17:00:00Z
tags: ["securite", "revolut", "kyc", "phishing", "donnees"]
draft: false
---

<div class="summary"><strong>En résumé :</strong> Revolut, la néobanque britannique devenue banque agréée en France en août, a confirmé le 12 septembre avoir transmis des données clients sensibles à un tiers non autorisé qui s'était fait passer pour une agence gouvernementale. Les fichiers envoyés comprennent des dates de naissance, adresses postales et électroniques, numéros de téléphone, copies de passeports et de permis de conduire, et probablement des selfies de vérification d'identité, des relevés de compte et des historiques de transactions — <strong>y compris les historiques de transactions en bitcoin</strong>. Revolut évoque un nombre « limité » de clients touchés, sans préciser combien, ni sur quel marché, ni quelle agence a été usurpée. Ni les systèmes ni les fonds des clients n'auraient été compromis. Données indicatives, pas un conseil d'investissement.</div>

L'affaire a commencé sur X, tard vendredi 11 septembre au soir, par la publication de l'e-mail que Revolut a envoyé aux clients concernés. Elle a été confirmée dans la journée du samedi 12 septembre par l'entreprise elle-même auprès de plusieurs rédactions, dont TechCrunch. Ce qui rend ce dossier inconfortable, ce n'est pas son ampleur — elle semble réduite — mais sa nature : il n'y a pas eu d'intrusion. Le code n'a pas cédé. C'est une vérification humaine qui a échoué.

## Ce que Revolut a transmis, et à qui

Selon la notification envoyée aux clients concernés et les éléments confirmés par un porte-parole de l'entreprise, l'incident est décrit comme « une arnaque sophistiquée par usurpation d'identité externe, dans laquelle un tiers non autorisé a utilisé le domaine e-mail d'une agence gouvernementale légitime pour soumettre des demandes frauduleuses d'informations ».

Autrement dit : l'attaquant n'a pas eu besoin de pirater quoi que ce soit. Il lui a suffi d'écrire depuis une adresse dont le domaine imitait — ou reprenait — celui d'une administration, dans un format que les équipes de conformité bancaire reconnaissent comme celui d'une réquisition légale, en désignant précisément un petit nombre de clients.

Le lot de données transmis couvre l'essentiel de ce qu'une banque détient sur un client :

- **Identité et coordonnées** : nom, date de naissance, adresse postale, adresse e-mail, numéro de téléphone ;
- **Documents d'identité** : copies de passeports et de permis de conduire ;
- **Éléments de vérification** : probablement les « selfies » réalisés lors du contrôle d'identité à l'ouverture du compte, qui relient un visage à un document ;
- **Données financières** : relevés de compte, IBAN, historique des retraits ;
- **Données crypto** : l'historique des transactions en bitcoin associées au compte.

Revolut indique avoir bloqué l'adresse e-mail de l'attaquant dès la découverte de la fraude, puis alerté l'agence gouvernementale usurpée, les forces de l'ordre et les régulateurs concernés. L'entreprise n'a pas précisé le nombre exact de victimes, ni si l'incident touchait un seul pays, ni quelle administration a été imitée. Elle affirme que « les systèmes de Revolut et les fonds des clients ne sont pas affectés ».

## Une faille humaine, pas une faille logicielle

La distinction n'est pas cosmétique. Dans un piratage classique, on corrige un correctif, on révoque des accès, on repart. Ici, le maillon faible est un processus : la manière dont une équipe vérifie qu'une demande d'accès à des données est réellement émise par l'autorité qu'elle prétend être, sous contrainte de délais légaux.

Les grandes banques reçoivent des milliers de demandes de ce type. Elles doivent répondre vite, et l'attaquant le sait : il reproduit le vocabulaire, la structure et la mise en forme d'une réquisition, avec des références de dossier crédibles. Le contrôle qui aurait dû faire la différence — rappeler l'émetteur sur un numéro connu indépendamment de l'e-mail, exiger une signature vérifiable — est celui qui coûte du temps.

Le chercheur en sécurité ZachXBT, qui a rendu public l'e-mail adressé aux clients, estime que l'incident semble avoir ciblé des clients à forte valeur patrimoniale. Le périmètre restreint et la sélection nominative vont dans ce sens : l'attaquant ne cherchait pas une base de données massive, il voulait les dossiers de quelques personnes bien identifiées.

Cette affaire s'inscrit dans une séquence plus large. Le 10 septembre, le géant de la vérification d'identité IDScan a confirmé une fuite portant sur **plus de 153 millions de permis de conduire** américains et canadiens, mise en vente sur le dark web et déjà suivie d'une plainte collective et d'une enquête du FBI. Deux incidents différents, une même marchandise : des documents d'identité authentiques, avec la signature d'institutions régulées.

## Pourquoi un historique bitcoin n'est pas un relevé bancaire de plus

Un relevé bancaire raconte ce que vous avez dépensé. Un historique de transactions en bitcoin raconte ce que vous détenez, où vous le détenez, et permet de le prouver.

Un relevé de compte classique perd de sa valeur avec le temps : les flux se périment, l'IBAN se change, la carte se renouvelle. Une liste d'adresses bitcoin associée à un nom, elle, reste vraie indéfiniment. La blockchain est publique et permanente : à partir d'une adresse identifiée, n'importe qui peut suivre les mouvements, estimer un patrimoine, repérer les périodes d'accumulation et les connexions entre portefeuilles. L'attaquant qui dispose déjà de l'identité civile du client détient donc la pièce manquante : la correspondance entre une personne et un ensemble d'adresses.

Cela ouvre trois portes. Le phishing personnalisé d'abord, beaucoup plus crédible quand le message contient des éléments authentiques du dossier. L'extorsion ensuite : un portefeuille identifié et géolocalisé par une adresse postale n'a plus besoin d'être piraté si l'on peut faire pression sur son propriétaire. La fraude au faux support enfin, où l'attaquant cite des transactions réelles pour convaincre sa cible d'installer un logiciel d'accès à distance ou de signer une transaction.

## Le mauvais moment pour Revolut

Le calendrier n'aide pas. Revolut a obtenu son agrément bancaire en France en août 2026 et revendique environ huit millions de clients dans l'Hexagone, sur plus de 80 millions dans le monde. L'entreprise a reçu au début du mois un accord conditionnel de l'autorité américaine (OCC) pour créer une banque nationale aux États-Unis, et négocie une possible introduction en bourse qui la valoriserait jusqu'à 200 milliards de dollars, contre 75 milliards lors de sa dernière valorisation privée en novembre.

Dans ce contexte, un incident qui touche les documents d'identité — et non les soldes — est le pire scénario de réputation : il ne coûte pas un euro de réserve, il coûte la confiance dans un processus. C'est aussi un sujet réglementaire de premier ordre. Le RGPD impose à un responsable de traitement de notifier une violation à l'autorité de contrôle dans les 72 heures, en l'occurrence la CNIL pour les clients français et l'ICO pour les clients britanniques, et d'informer les personnes concernées lorsque le risque est élevé. Les amendes peuvent atteindre 20 millions d'euros ou 4 % du chiffre d'affaires annuel mondial, le montant le plus élevé étant retenu. Depuis 2025, DORA ajoute à cela des obligations de résilience opérationnelle, mais elle ne traite que le risque lié aux prestataires : une frappe d'ingénierie sociale visant un service conformité reste hors de son périmètre.

## Ce que cela change concrètement pour vous

Deux enseignements pratiques, valables bien au-delà de Revolut.

Le premier, c'est que la fuite d'un dossier KYC est un problème à retardement. Le compte peut être fermé, le solde peut être déplacé ; la copie du passeport, elle, circule déjà. Si vous avez été notifié, attendez-vous à des messages crédibles dans les mois qui viennent, éventuellement des années après, construits à partir de votre vraie date de naissance ou d'un extrait de votre pièce d'identité. En France, l'usurpation d'identité est punie d'un an d'emprisonnement et de 15 000 euros d'amende (article 226-4-1 du code pénal), et une déclaration peut être enregistrée en ligne sur service-public.fr pour faciliter les démarches.

Le second, c'est la méthode de défense. Elle tient en trois règles : ne jamais traiter une demande entrante — par téléphone, e-mail ou message — comme légitime, même si elle cite vos données exactes, car c'est précisément le signe que le dossier a fuité ; ne jamais communiquer les douze mots de récupération d'un portefeuille, quel que soit l'interlocuteur ; et privilégier une clé de sécurité matérielle plutôt que le SMS pour la double authentification, le SMS restant le point faible structurel de la plupart des comptes bancaires.

## Le vrai débat : le KYC est devenu une base d'attaque

Sous MiCA et l'ensemble des régimes d'enregistrement nationaux, chaque plateforme régulée conserve désormais une copie complète et permanente de l'identité de ses utilisateurs. C'est la contrepartie acceptée de l'accès aux services bancaires. Mais cette contrepartie crée un patrimoine d'un nouveau genre : des dossiers d'identité vérifiés, stockés chez des dizaines d'acteurs, dont la valeur sur les marchés clandestins est directement proportionnelle à leur authenticité.

Revolut a rappelé que les fonds de ses clients étaient intacts. C'est vrai, et juridiquement important. Mais dans un environnement où le bitcoin cotait encore **77 345 dollars** samedi après-midi, en baisse de 0,7 % sur vingt-quatre heures, et où l'ether évoluait autour de **2 531 dollars**, la question que les utilisateurs européens poseront n'est pas celle des soldes : elle est celle de savoir combien de temps un document d'identité reste une menace après avoir quitté la banque censée le protéger. À ce jour, personne n'a de réponse rassurante.

*Sources : TechCrunch, CoinDesk, 24/7 Wall St, The Record, CryptoQuant, données de marché CoinGecko et crypto.news. Données indicatives, pas un conseil d'investissement.*
