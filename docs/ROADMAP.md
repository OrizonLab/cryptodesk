# Roadmap — CryptoDesk

## Livré

- [x] Blog Astro statique : accueil, articles, tags et page 404
- [x] Éditions française et anglaise
- [x] SEO technique : sitemap, RSS, OpenGraph, JSON-LD et robots.txt
- [x] SEO orienté IA : `llms.txt` dynamique
- [x] Pages thématiques : réglementation, lexique et données
- [x] Affiliation centralisée et transparente
- [x] Page partenaires et comparateur d’exchanges
- [x] Simulateur du coût complet d’un achat crypto
- [x] Newsletter avec double opt-in et archive des éditions
- [x] Analytics Umami auto-hébergé et respectueux de la vie privée
- [x] Partage d’articles sans SDK ni tracker tiers
- [x] Navigation FR/EN et CTA vers les outils du site
- [x] Nginx durci, headers de sécurité, exécution non-root et réseau NPM
- [x] Docker multi-stage et déploiement sur VPS
- [x] CI de build et garde-fou sur les fichiers d’articles

## Priorités suivantes

### P1 — Sécurité et fiabilité

- [ ] Auditer et documenter le cron de mise à jour des offres d’affiliation
- [ ] Vérifier régulièrement les bonus, frais et informations réglementaires des partenaires
- [ ] Ajouter un scan de dépendances et d’image Docker dans la CI
- [ ] Réduire progressivement `unsafe-inline` dans la CSP
- [ ] Vérifier la configuration réelle de Nginx Proxy Manager et du VPS

### P2 — Découvrabilité et expérience

- [ ] Ajouter une recherche interne
- [ ] Ajouter des articles liés par thème
- [ ] Soumettre et suivre le sitemap dans Google Search Console
- [ ] Afficher uniquement des preuves sociales vérifiables sur l’accueil
- [ ] Ajouter les canaux sociaux réels lorsqu’ils sont officiellement définis

### P3 — Développement éditorial et soutien

- [ ] Définir un canal de soutien direct : don ponctuel ou soutien récurrent
- [ ] Ajouter une page expliquant clairement comment soutenir CryptoDesk
- [ ] Développer la newsletter comme rendez-vous éditorial identifiable
- [ ] Étudier des partenariats ou sponsorings compatibles avec la ligne indépendante
- [ ] Proposer éventuellement des dossiers ou rapports premium, sans conseil financier personnalisé

## Principes

- CryptoDesk reste un média informatif, pas un service de conseil en investissement.
- Aucun chiffre d’audience ou résultat ne doit être affiché sans source vérifiable.
- Les liens d’affiliation doivent rester identifiés et ne pas influencer artificiellement les analyses.
- Les articles publiés ne sont pas réécrits pour modifier leurs URLs ou leur historique.
