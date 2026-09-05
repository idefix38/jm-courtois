# ── Development ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS development
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

# ── Build ─────────────────────────────────────────────────────────────────────
FROM development AS builder
ENV NEXT_TELEMETRY_DISABLED=1
# Seule NEXT_PUBLIC_* doit être connue au build (elle est inlinée dans le bundle client) ; les secrets restent des variables d'exécution
ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
RUN npm run build

# ── Production ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
