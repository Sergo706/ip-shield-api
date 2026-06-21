# syntax=docker/dockerfile:1

FROM golang:bookworm AS go-builder
RUN go install filippo.io/age/cmd/...@latest && \
    go install github.com/ipinfo/mmdbctl@latest


FROM node:lts-slim AS base
LABEL org.opencontainers.image.source="https://github.com/sergo706/ip-shield-api"
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    libatomic1 \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
    
RUN corepack enable && corepack prepare pnpm@10.30.3 --activate && \
    npm install -g zx tsx

ENV NODE_PATH="/usr/local/lib/node_modules"

WORKDIR /app

RUN addgroup --system --gid 10001 appuser && \
    adduser --system --uid 10001 --gid 10001 --home /home/appuser --shell /bin/false appuser

FROM base AS development
COPY --from=go-builder /go/bin/mmdbctl /usr/local/bin/mmdbctl
COPY --from=go-builder /go/bin/age /usr/local/bin/age
RUN chmod +x /usr/local/bin/mmdbctl /usr/local/bin/age

COPY scripts/utils.ts /usr/local/bin/utils.ts
COPY scripts/decrypt.ts /usr/local/bin/decrypt.ts
COPY docker/core/decryptRunner.ts /usr/local/bin/decryptRunner.ts
RUN chmod +x /usr/local/bin/decryptRunner.ts

COPY . .

RUN chmod +x docker/healthcheck.js && \
    mkdir -p /app/data-sources && \
    chown -R appuser:appuser /app

USER appuser

RUN pnpm install

EXPOSE 3000
ENV NODE_ENV=development
ENV HEALTHCHECK_PORT=3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD ["node", "docker/healthcheck.js"]
    
ENTRYPOINT ["tsx", "/usr/local/bin/decryptRunner.ts"]
CMD ["pnpm", "dev:core"]

FROM base AS builder
COPY --from=go-builder /go/bin/age /usr/local/bin/age
COPY --from=go-builder /go/bin/age-keygen /usr/local/bin/age-keygen
COPY --from=go-builder /go/bin/mmdbctl /usr/local/bin/mmdbctl

RUN mkdir -p data-sources

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/core/package.json apps/core/package.json
COPY apps/shared/layer/package.json apps/shared/layer/package.json
RUN pnpm install --frozen-lockfile

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=8096"
RUN rm -rf apps/core/.nuxt apps/core/.nitro apps/core/node_modules/.cache/nuxt && pnpm run build:core

RUN mkdir -p apps/core/.output/server/node_modules/@lmdb && \
    LMDB_BIN=$(find node_modules/.pnpm -type d -name "lmdb-linux-x64" | head -n 1) && \
    cp -rL "$LMDB_BIN" apps/core/.output/server/node_modules/@lmdb/ && \
    LMDB_DICT=$(find node_modules -path "*/lmdb/dict" -type d | head -n 1) && \
    mkdir -p apps/core/.output/server/node_modules/lmdb && \
    cp -rL "$LMDB_DICT" apps/core/.output/server/node_modules/lmdb/

FROM base AS production

COPY --from=go-builder /go/bin/mmdbctl /usr/local/bin/
COPY --from=go-builder /go/bin/age /usr/local/bin/age

RUN chmod +x /usr/local/bin/mmdbctl /usr/local/bin/age

COPY scripts/utils.ts /usr/local/bin/utils.ts
COPY scripts/decrypt.ts /usr/local/bin/decrypt.ts
COPY docker/core/decryptRunner.ts /usr/local/bin/decryptRunner.ts
RUN chmod +x /usr/local/bin/decryptRunner.ts

COPY docker/healthcheck.js ./healthcheck.js


COPY --from=builder --chown=appuser:appuser /app/apps/core/.output ./.output
COPY --from=builder --chown=appuser:appuser /app/apps/core/package.json ./package.json
RUN mkdir -p ./data-sources && chown appuser:appuser ./data-sources

RUN mkdir -p /home/appuser/.shield-base && \
    echo '{ "mmdbctlPath": "mmdbctl", "useragent": "sergey riavzon - contact@riavzon.com", "license": true }' > /home/appuser/.shield-base/.cache.json && \
    chown -R appuser:appuser /home/appuser/.shield-base

USER appuser

EXPOSE 3000
ENV NODE_ENV=production
ENV HEALTHCHECK_PORT=3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD ["node", "healthcheck.js"]

ENTRYPOINT ["tsx", "/usr/local/bin/decryptRunner.ts"]
CMD ["node", ".output/server/index.mjs"]