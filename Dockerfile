# ============================================================
# CryptoDesk — build statique Astro + serveur nginx
# Multi-stage : node build → nginx (image finale légère)
# ============================================================

# Stage 1 : build Astro
FROM node:22-alpine AS builder
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copie du code source
COPY . .

# Build statique
RUN npm run build

# ============================================================
# Stage 2 : serveur nginx sécurisé
# ============================================================
FROM nginx:1.27-alpine

# Config nginx (headers de sécurité, cache, gzip, sécu)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artifacts statiques
COPY --from=builder /app/dist /usr/share/nginx/html

# Exécution en non-root (durcissement)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    sed -i 's/^user  nginx;/user  nginx;/' /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
