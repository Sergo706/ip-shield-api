#!/usr/bin/env zx

import { chalk } from 'zx';
// @ts-ignore
import { executeDownstream } from './utils.ts'; 
// @ts-ignore
import { convertToEnvs } from './decrypt.ts';

async function run() {
  console.log(chalk.cyan('Starting MySQL ZX pre-entrypoint...'));

  await convertToEnvs(
    false,
    [
      'MYSQL_ROOT_PASSWORD',
      'MYSQL_USER',
      'MYSQL_PASSWORD',
      'MYSQL_DATABASE'
    ],
    '/run/secrets/age_key_app', 
    '/run/secrets'
  );

  await executeDownstream('/usr/local/bin/docker-entrypoint.sh', ['mysqld']);
}
run();