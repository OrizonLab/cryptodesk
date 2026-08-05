# CryptoDesk ⌁

**Blog sobre et indépendant sur les cryptomonnaies et les marchés financiers.**

[cryptodesk.fr](https://cryptodesk.fr)

## Vision

CryptoDesk publie des analyses, actualités et perspectives sur Bitcoin, les altcoins et les marchés financiers — en français, sans jargon inutile, et sans conflit d'intérêt. **Contenu informatif, pas un conseil en investissement.**

## Stack

| Composant | Technologie |
|-----------|-------------|
| Générateur | **Astro 5** (SSG — site 100% statique) |
| Contenu | Markdown (collections Astro) |
| SEO | sitemap, RSS, OpenGraph, JSON-LD (Article/WebSite/Breadcrumb), llms.txt |
| Sécurité | nginx durci : CSP, HSTS, X-Frame-Options, Permissions-Policy, non-root |
| Déploiement | Docker multi-stage → nginx, réseau `nginx-proxy` (NPM) |
| Domaine | `cryptodesk.fr` (HTTPS via NPM/Let's Encrypt) |

## Structure

```
src/
├── content/
│   ├── config.ts          # Schéma des articles (frontmatter validé)
│   └── posts/             # Articles en Markdown ← publication = créer un .md
├── layouts/
│   ├── BaseLayout.astro   # Head SEO complet (OG, Twitter, JSON-LD)
│   └── PostLayout.astro   # Template article + navigation prev/next
├── pages/
│   ├── index.astro        # Accueil : hero + liste articles
│   ├── posts/[slug].astro # Page article
│   ├── tags/[tag].astro   # Filtres par tag
│   ├── rss.xml.ts         # Flux RSS
│   ├── llms.txt.ts        # SEO LLM (généré dynamiquement)
│   └── 404.astro
└── styles/prose.css       # Typographie des articles
```

## Publier un article

1. Créer `src/content/posts/<slug>.md` avec le frontmatter :

```markdown
---
title: "Titre de l'article"
description: "Résumé 1-2 phrases (meta description + SEO)"
pubDate: 2026-08-02
tags: ["bitcoin", "analyse"]
draft: false
---
Contenu en Markdown...
```

2. `git push` (le VPS fait `git pull` + rebuild automatique)
3. L'article est en ligne : `https://cryptodesk.fr/posts/<slug>/`

## Développement local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build statique → dist/
```

## Déploiement

```bash
# Sur le VPS hôte :
cd /app/cryptodesk && git pull && docker compose up -d --build
```

NPM (Nginx Proxy Manager) route `cryptodesk.fr` → conteneur `cryptodesk:80` via le réseau `nginx-proxy`.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)

## Licence

MIT — © 2026 CryptoDesk
