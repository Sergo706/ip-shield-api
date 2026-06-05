# syntax=docker/dockerfile:1

FROM node:lts-slim AS base
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && apt-get install -y --no-install-recommends \
    findutils \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

WORKDIR /app

RUN addgroup --system --gid 10001 appuser && \
    adduser --system --uid 10001 --gid 10001 --home /home/appuser --shell /bin/false appuser

FROM base AS build-tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    curl

FROM build-tools AS development

COPY . .

RUN chmod +x docker/healthcheck.js && \
    chown -R appuser:appuser /app

USER appuser

RUN pnpm install

EXPOSE 3001
ENV NODE_ENV=development
ENV HEALTHCHECK_PORT=3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD ["node", "docker/healthcheck.js"]

CMD ["pnpm", "dev:core"]

FROM build-tools AS builder

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/core/package.json apps/core/package.json
COPY apps/shared/layer/package.json apps/shared/layer/package.json
RUN pnpm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN rm -rf apps/core/.nuxt apps/core/.nitro apps/core/node_modules/.cache/nuxt && pnpm run build:core

FROM base AS production

COPY docker/healthcheck.js ./healthcheck.js
COPY --from=builder --chown=appuser:appuser /app/apps/core/.output ./.output

USER appuser

EXPOSE 3001
ENV NODE_ENV=production
ENV HEALTHCHECK_PORT=3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD ["node", "healthcheck.js"]

CMD ["node", ".output/server/index.mjs"]
