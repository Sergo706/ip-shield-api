#!/usr/bin/env zx

import { $, glob, fs, chalk, echo } from 'zx';
import path from 'node:path';
import { need, throwError } from './utils';

$.verbose = true; 
$.shell = '/usr/bin/bash'

export async function decryptSecrets(privateKeyPath?: string, secretsPaths?: string, outPutDir?: string) {
   await need('age')
   const privateKey = privateKeyPath || process.env.KEY_FILE;
   const encryptedSecrets = secretsPaths || process.env.SRC_DIR;
   const decryptedOutput = outPutDir || process.env.OUT_DIR;
   
   if (!privateKey || !encryptedSecrets || !decryptedOutput) {
      throwError(`Missing required paths. \nkey path: ${privateKey} \nencrypted secrets path: ${encryptedSecrets} \ndecrypted output path: ${decryptedOutput}`)
   }

   await fs.mkdirp(decryptedOutput)
   
   process.umask(0o077);
   await fs.chmod(decryptedOutput, 0o740)

   try {
     await fs.access(privateKey, fs.constants.R_OK);
   } catch {
      throwError(`Secret key not found or unreadable: ${privateKey}`);
   }

   echo('Decrypting secrets...');

   const files = await glob([`${encryptedSecrets}/**`], { onlyFiles: true, dot: true });

   for (const file of files) {
      if (path.resolve(file) === path.resolve(privateKey)) {
         echo(`skip (key): ${file}`);
         continue;
      }

      const base = path.basename(file);
      const destName = base.endsWith('.age') ? base.slice(0, -4) : base;
      const dest = path.join(decryptedOutput, destName);

      try {
         await $`age -d -i ${privateKey} -o ${dest} ${file}`.quiet();
         echo(`decrypt: ${base} -> ${destName}`);
      } catch (err) {
         echo(`copy: ${base} -> ${destName}`);
         await fs.copy(file, dest); 
      }
      
      try {
         await fs.chmod(dest, 0o400);
      } catch {}
   }

   echo(chalk.green('Secrets decryption complete.'));
}


export async function convertToEnvs(
  deleteOnDone: boolean, 
  requiredEnvs: string[], 
  privateKeyPath?: string, 
  secretsPaths?: string
) {
  await need('age');
  $.verbose = false; 
  
  const privateKey = privateKeyPath || process.env.KEY_FILE || '/run/secrets/age_key_app';
  const encryptedSecrets = secretsPaths || process.env.SRC_DIR || '/run/secrets';

  if (!await fs.pathExists(privateKey)) {
      throwError(`Secret key not found or unreadable: ${privateKey}`);
  }

  console.log(chalk.blue('Decrypting and loading secrets into environment...'));

  const files = await glob([`${encryptedSecrets}/**`], { onlyFiles: true, dot: true });

  for (const file of files) {
    if (path.resolve(file) === path.resolve(privateKey)) continue;
    const base = path.basename(file);
    const envName = base.endsWith('.age') ? base.slice(0, -4).toUpperCase() : base.toUpperCase();
    let content = '';

    try {
      const result = await $`age -d -i ${privateKey} ${file}`.quiet();
      content = result.stdout;
      console.log(`Decrypted directly to memory -> ${envName}`);
    } catch {
      content = await fs.readFile(file, 'utf8');
      console.log(`Read unencrypted file -> ${envName}`);
    }
    process.env[envName] = content.trim();
    if (deleteOnDone) {
      await fs.remove(file);
    }
  }

  process.env.DB_HOST = process.env.DB_HOST || 'mysql';
  process.env.DB_PORT = process.env.DB_PORT || '3306';

  if (requiredEnvs.length > 0) {
    const missing = requiredEnvs.filter(env => !process.env[env]);
    if (missing.length > 0) {
       throwError(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  console.log(chalk.green('Environment variables set successfully.'));
}