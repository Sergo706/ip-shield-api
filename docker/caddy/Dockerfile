# syntax=docker/dockerfile:1

FROM caddy:2-builder AS builder
RUN xcaddy build \
    --with github.com/mholt/caddy-ratelimit \
    --with github.com/fabriziosalmi/caddy-mib


FROM caddy:latest

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

RUN addgroup -S -g 10001 appuser && \
    adduser -S -u 10001 -G appuser -h /home/appuser -s /sbin/nologin appuser


RUN mkdir -p /data /config /home/appuser

RUN chown -R appuser:appuser /data /config /home/appuser

RUN rm -f /usr/bin/wget /usr/bin/curl && \
    rm -rf /sbin/apk /etc/apk /lib/apk /usr/share/apk /var/lib/apk

USER appuser   

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD nc -z localhost 80 && nc -z -w 2 dashboard 3001 || exit 1

CMD [ "caddy", "run", "--config", "/etc/caddy/Caddyfile" ]