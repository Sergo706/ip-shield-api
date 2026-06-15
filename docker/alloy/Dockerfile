FROM golang:bookworm AS go-builder
RUN go install filippo.io/age/cmd/...@latest

FROM grafana/alloy:latest
USER root
COPY --from=go-builder /go/bin/age /usr/local/bin/age
COPY ./docker/alloy/entry.sh /entry.sh
RUN chmod +x /usr/local/bin/age /entry.sh && chown alloy:alloy /entry.sh
USER alloy
ENTRYPOINT ["/entry.sh"]
