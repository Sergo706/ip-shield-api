FROM containrrr/watchtower as watchtower-binary

FROM alpine:latest

LABEL org.opencontainers.image.source="https://github.com/sergo706/ip-shield-api"

RUN apk add --no-cache age bash

COPY --from=watchtower-binary /watchtower /watchtower
COPY ./docker/watchtower/entry.sh /entry.sh
RUN chmod +x /entry.sh

RUN adduser -D -u 10001 appuser
USER appuser

ENTRYPOINT ["/entry.sh"]