# syntax=docker/dockerfile:1

FROM caddy:2-builder AS builder
RUN xcaddy build \
    --with github.com/mholt/caddy-ratelimit \
    --with github.com/fabriziosalmi/caddy-mib


FROM node:lts-slim AS staticbuild
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
WORKDIR /app
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    libatomic1 \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.30.3 --activate
ENV NODE_PATH="/usr/local/lib/node_modules"

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/static/package.json apps/static/package.json
COPY apps/shared/layer/package.json apps/shared/layer/package.json
RUN pnpm install --frozen-lockfile

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=8096"
RUN rm -rf apps/static/.nuxt apps/static/.nitro apps/static/node_modules/.cache/nuxt && pnpm run build:static

FROM caddy:latest
LABEL org.opencontainers.image.source="https://github.com/sergo706/ip-shield-api"

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

RUN addgroup -S -g 10001 appuser && \
    adduser -S -u 10001 -G appuser -h /home/appuser -s /sbin/nologin appuser


RUN mkdir -p /data /config /home/appuser
RUN mkdir -p /var/www/static-site
COPY --from=staticbuild /app/apps/static/.output /var/www/static-site/.output
RUN chown -R appuser:appuser /data /config /home/appuser /var/www/static-site

RUN rm -f /usr/bin/wget /usr/bin/curl && \
    rm -rf /sbin/apk /etc/apk /lib/apk /usr/share/apk /var/lib/apk

USER appuser   

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD nc -z localhost 80 || exit 1

CMD [ "caddy", "run", "--config", "/etc/caddy/Caddyfile" ]