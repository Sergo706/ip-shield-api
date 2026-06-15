#!/bin/bash
set -e

echo "Decrypting WatchTower secrets..."

KEY_FILE="/run/secrets/watchtower_age_key"
TOKEN_SECRET_FILE="/run/secrets/watchtower_config_json"
API_TOKEN_FILE="/run/secrets/watchtower_api_token"

age -d -i "$KEY_FILE" "$TOKEN_SECRET_FILE" > /tmp/config.json
export DOCKER_CONFIG="/tmp"
export WATCHTOWER_HTTP_API_TOKEN=$(age -d -i "$KEY_FILE" "$API_TOKEN_FILE")

echo "Secrets decrypted successfully. Starting Watchtower..."

exec /watchtower "$@"