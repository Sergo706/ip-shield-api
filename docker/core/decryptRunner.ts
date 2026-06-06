#!/usr/bin/env zx

import { chalk } from 'zx';
// @ts-ignore
import { executeDownstream } from './utils.ts'; 
// @ts-ignore
import { convertToEnvs } from './decrypt.ts';

async function run() {
  console.log(chalk.cyan('Starting Apps ZX pre-entrypoint...'));
  await convertToEnvs(
    false,
    [
      'MYSQL_USER',
      'MYSQL_PASSWORD',
      'MYSQL_DATABASE',
      'AUTH_SERVER_LOCATION',
      'AUTH_PORT_LOCATION',
      'HMAC_CLIENT_ID',
      'HMAC_SHARED_SECRET',
      'AUTH_CRYPTO_COOKIES',
      'OAUTH_GOOGLE_CLIENT_ID',
      'OAUTH_GOOGLE_CLIENT_SECRET',
      'OAUTH_GITHUB_CLIENT_ID',
      'OAUTH_GITHUB_CLIENT_SECRET'
    ],
    '/run/secrets/age_key_app', 
    '/run/secrets'
  );

  await executeDownstream();
}
run();