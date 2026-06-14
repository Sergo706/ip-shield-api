#!/bin/bash
set -e

echo "Decrypting Cloudflare Tunnel token..."

KEY_FILE="/run/secrets/age_key_app"
TOKEN_SECRET_FILE="/run/secrets/tunnel_token"

export TUNNEL_TOKEN=$(age -d -i "$KEY_FILE" "$TOKEN_SECRET_FILE")

echo "Token decrypted successfully. Starting tunnel..."

exec cloudflared tunnel run