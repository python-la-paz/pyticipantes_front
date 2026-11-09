FROM node:20-alpine AS base

LABEL maintainer="Jonathan Villanueva <me@jevillanueva.dev>"

ENV NEXT_TELEMETRY_DISABLED=1

# --------------------------------------------------
# Dependencies
# --------------------------------------------------
FROM base AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

# --------------------------------------------------
# Builder
# --------------------------------------------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_API_URL_ARG

RUN test -n "$NEXT_PUBLIC_API_URL_ARG" || \
    (echo "ERROR: NEXT_PUBLIC_API_URL_ARG is empty" && exit 1)

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL_ARG}

RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# --------------------------------------------------
# Production runner
# --------------------------------------------------
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]