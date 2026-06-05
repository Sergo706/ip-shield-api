#!/bin/sh

set -eu
die() { echo "Error: $*" >&2; exit 1; }

BUILD_ARGS=""
if [ "${NO_CACHE:-0}" = "1" ]; then
  BUILD_ARGS="--no-cache"
fi

echo "Building dev images..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml build $BUILD_ARGS
docker compose build $BUILD_ARGS migrations
echo "Running database migrations..."
docker compose run --rm migrations sh -c "pnpm --filter @app/core migrate && pnpm --filter @app/core seed:plans" || die "docker compose migrations failed"
echo "Starting services in development mode (Press Ctrl+C to stop)..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --force-recreate --watch
echo "Development session ended."