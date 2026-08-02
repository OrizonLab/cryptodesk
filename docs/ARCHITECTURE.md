# Architecture — CryptoDesk

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    Internet                              │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS (TLS Let's Encrypt)
              ┌────────▼─────────┐
              │  NPM (nginx-proxy│  ← proxy-manager
              │  manager)        │      réseau: nginx-proxy
              └────────┬─────────┘
                       │ http://cryptodesk:80 (nom DNS docker)
              ┌────────▼─────────┐
              │  cryptodesk      │  ← conteneur Docker
              │  nginx:alpine    │      (non-root, headers sécu)
              └────────┬─────────┘
                       │ fichiers statiques
              ┌────────▼─────────┐
              │  /usr/share/nginx│  ← build Astro (dist/)
              └──────────────────┘
```

## Choix techniques

### Pourquoi Astro (SSG) ?
- **100% statique** : pas de serveur applicatif exposé → surface d'attaque minimale
- **Performance** : pages pré-générées, HTML compressé, CSS inliné automatiquement
- **SEO natif** : sitemap, RSS, canonical, OpenGraph intégrés
- **Contenu en Markdown** : publication simple = création d'un fichier `.md`

### Pourquoi nginx en frontal ?
- Headers de sécurité complets (CSP, HSTS, X-Frame-Options…)
- Cache long terme des assets hashed (`/_astro/` immutable)
- Compression gzip
- Exécution en **non-root** (durcissement)
- Healthcheck intégré

### Réseau
- Le conteneur rejoint le réseau externe `nginx-proxy` (créé par l'install NPM)
- **Aucun port exposé publiquement** — seul NPM atteint le conteneur par nom DNS
- TLS terminé par NPM (Let's Encrypt)

## Sécurité

| Couche | Mesure |
|--------|--------|
| Transport | HTTPS obligatoire (HSTS 1 an, includeSubDomains) |
| Headers | CSP `default-src 'self'`, X-Frame-Options DENY, nosniff, Permissions-Policy vide |
| Processus | nginx en non-root, conteneur minimal (alpine) |
| Surface | Site statique : pas de JS serveur, pas de base de données, pas d'API |
| Réseau | Aucun port exposé sur l'hôte ; NPM seul point d'entrée |

## SEO

- **Sitemap** : `/sitemap-index.xml` (généré par @astrojs/sitemap)
- **RSS** : `/rss.xml`
- **OpenGraph** : image par défaut 1200×630 (`og-default.png`)
- **JSON-LD** : `Article`, `WebSite`, `BreadcrumbList`
- **llms.txt** : index structuré pour les LLM (`/llms.txt`, généré dynamiquement)
- **robots.txt** : autorise tous les crawlers, y compris GPTBot/ClaudeBot/PerplexityBot
- **Canonical** : chaque page a son URL canonique
