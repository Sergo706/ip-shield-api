#!/bin/sh
set -e

echo "Decrypting Alloy secrets..."
age -d -i "/run/secrets/watchtower_age_key" "/run/secrets/watchtower_api_token" > /tmp/watchtower_token
chmod 600 /tmp/watchtower_token

echo "Starting Alloy..."
exec /bin/alloy run \
  --server.http.listen-addr=0.0.0.0:12345 \
  --storage.path=/var/lib/alloy/data \
  /etc/alloy/config.alloy
