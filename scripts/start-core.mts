import { executeDownstream, need } from "./utils";
import { $ } from 'zx';
import { encryptAppSecrets, cleanupAppSecrets } from "./crypto"; 

$.verbose = true; 
$.shell = '/usr/bin/bash'
await need('docker')

console.log("Building images and encrypting secrets...");

await encryptAppSecrets('./secrets/age_key_app', './secrets/app/env');
await encryptAppSecrets('./secrets/age_key_app', './secrets/app/mysql');

await encryptAppSecrets('./secrets/auth/age_key', './secrets/auth/config.dev.json');
await encryptAppSecrets('./secrets/watchtower/age_key', './secrets/watchtower/config.json');
await encryptAppSecrets('./secrets/watchtower/age_key', './secrets/watchtower/api_token');

await $`docker compose -f docker-compose.yml build`
await $`docker compose build migrations`

console.log("Running database migrations...");
await $`docker compose run --rm migrations sh -c "pnpm --filter @app/core migrate && pnpm --filter @app/core seed:plans"`

console.log("Starting application services...");
await $`docker compose up -d --force-recreate`
console.log("Deployment finished successfully!");

console.log("Setting permissions and deleting plaintext secrets...");

await cleanupAppSecrets('./secrets/age_key_app', './secrets/app/env');
await cleanupAppSecrets('./secrets/age_key_app', './secrets/app/mysql');
await cleanupAppSecrets('./secrets/auth/age_key', './secrets/auth/config.dev.json');
await cleanupAppSecrets('./secrets/watchtower/age_key', './secrets/watchtower/config.json');
await cleanupAppSecrets('./secrets/watchtower/age_key', './secrets/watchtower/api_token');

// add static
await executeDownstream();
