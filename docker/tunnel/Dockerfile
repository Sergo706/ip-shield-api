FROM cloudflare/cloudflared:latest AS cloudflared-binary

FROM alpine:latest
LABEL org.opencontainers.image.source="https://github.com/sergo706/ip-shield-api"

RUN apk add --no-cache age bash

COPY --from=cloudflared-binary /usr/local/bin/cloudflared /usr/local/bin/cloudflared

COPY ./docker/tunnel/entrypoint.sh /entry.sh
RUN chmod +x /entrypoint.sh

RUN adduser -D -u 10001 appuser
USER appuser

ENTRYPOINT ["/entrypoint.sh"]