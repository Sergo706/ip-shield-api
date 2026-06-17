#!/bin/sh
set -e

echo "Decrypting Alloy secrets..."
age -d -i "/run/secrets/watchtower_age_key" "/run/secrets/watchtower_api_token" > /tmp/watchtower_token
chmod 600 /tmp/watchtower_token
age -d -i "/run/secrets/watchtower_age_key" "/run/secrets/watchtower_api_token" | tr -d '\n' > /tmp/watchtower_token

echo "Configuring routes to VPN network..."
# Add route to 10.10.10.0/24 via egress network gateway
ip route add 10.10.10.0/24 via 173.22.20.1 dev eth1 2>/dev/null || \
  (echo "Note: Route may already exist or require elevated privileges")

echo "Starting Alloy..."
exec /bin/alloy run \
  --disable-reporting \
  --server.http.listen-addr=0.0.0.0:12345 \
  --storage.path=/var/lib/alloy/data \
  /etc/alloy/config.alloy
