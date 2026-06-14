# syntax=docker/dockerfile:1

FROM debian:stable-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    tar \
    gzip

RUN curl -fsSL https://github.com/FiloSottile/age/releases/download/v1.2.1/age-v1.2.1-linux-amd64.tar.gz -o /tmp/age.tgz && \
    tar -xzf /tmp/age.tgz -C /usr/local/bin --strip-components=1 age/age age/age-keygen

FROM mysql:8.0-debian
LABEL org.opencontainers.image.source="https://github.com/sergo706/ip-shield-api"

RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    && npm install -g zx tsx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_PATH="/usr/local/lib/node_modules"

COPY --from=builder /usr/local/bin/age /usr/local/bin/age
COPY --from=builder /usr/local/bin/age-keygen /usr/local/bin/age-keygen

COPY scripts/utils.ts /usr/local/bin/utils.ts
COPY scripts/decrypt.ts /usr/local/bin/decrypt.ts
COPY docker/mysql/decryptRunner.ts /usr/local/bin/decryptRunner.ts
RUN chmod +x /usr/local/bin/decryptRunner.ts

RUN rm -f /usr/bin/curl /usr/bin/wget

ENTRYPOINT ["tsx", "/usr/local/bin/decryptRunner.ts"]

CMD ["mysqld"]