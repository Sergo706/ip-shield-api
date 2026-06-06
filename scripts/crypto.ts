#!/usr/bin/env zx

import { $, glob, fs,chalk, path } from 'zx';
import { need, throwError } from './utils';

$.verbose = true; 
$.shell = '/usr/bin/bash'

export async function encryptAppSecrets(privateKeyName: string, secretsPaths: string) {
  await need('age')
  await need('age-keygen')


  if (!await fs.pathExists(privateKeyName)) {
    console.log("Generating new app age key pair...")
    await fs.ensureDir(path.dirname(privateKeyName));
    await $`age-keygen -o ${privateKeyName}`
  } else {
    console.log("Using existing app age key.")
  }

  const pubKeyOut = await $`age-keygen -y ${privateKeyName}`
  const PUBLIC_KEY = pubKeyOut.stdout.trim()

  if (!await fs.pathExists(secretsPaths)) {
      throwError(`Missing dir: ${secretsPaths}`)
  }

  const isDir = (await fs.stat(secretsPaths)).isDirectory();

  if (isDir) {
  const files = await glob([`${secretsPaths}/**`, `!${secretsPaths}/**/*.age`], { 
    onlyFiles: true,
    dot: false
  })

  for (const file of files) {
    if (await fs.pathExists(`${file}.age`)) {
      console.log(`skip (exists): ${file}.age`)
    }

    let outPath = `${file}.age`;
    if (file.endsWith('dev.json')) {
       outPath = file.replace('dev.json', 'json.age');
    }
    
    console.log(`encrypt: ${file} -> ${outPath}`);
    await $`age -a -e -r ${PUBLIC_KEY} -o ${outPath} ${file}`;
  }
  
  await fs.chmod(privateKeyName, 0o640)
  console.log(chalk.green(`All files at ${secretsPaths} is encrypted`))
} else {

    await fs.access(secretsPaths).catch(async () => throwError('Error getting file'))

    let outPath = `${secretsPaths}.age`;
    if (secretsPaths.endsWith('dev.json')) {
       outPath = secretsPaths.replace('dev.json', 'json.age');
    }

    if (await fs.pathExists(outPath)) {
         console.log(`${outPath} is already encrypted`)
         return;
    }

    console.log(`encrypt: ${secretsPaths} -> ${outPath}`)
    await $`age -a -e -r ${PUBLIC_KEY} -o ${outPath} ${secretsPaths}`
    await fs.chmod(privateKeyName, 0o640)
    console.log(chalk.green(`File ${secretsPaths} encrypted to ${outPath}`))
}

}

export async function cleanupAppSecrets(privateKeyName: string, secretsPaths: string) {
  await need('find')

  try { await fs.chmod(privateKeyName, 0o600) } catch {} 

  if (!await fs.pathExists(secretsPaths)) {
    console.log(chalk.yellow(`Path not found, nothing to clean: ${secretsPaths}`));
    return;
  }

  const isDir = (await fs.stat(secretsPaths)).isDirectory();

  if (isDir) {
    const unencryptedFiles = await glob([
      `${secretsPaths}/**`, 
      `!${secretsPaths}/**/*.age`, 
      `!${secretsPaths}/**/.*`,
      `!${secretsPaths}/**/*dev*`
    ], { onlyFiles: true });
    
    for (const file of unencryptedFiles) {
      await fs.remove(file); 
      console.log(`Deleted sensitive config: ${file}`);
    }

    const devFiles = await glob([`${secretsPaths}/**/*dev*`], { onlyFiles: true });
    for (const dev of devFiles) {
      console.log(`Keeping dev config: ${dev}`);
    }


    await $`find ${secretsPaths} -type d -exec chmod 750 {} +`.quiet()
    await $`find ${secretsPaths} -type f -name '*.age' -exec chmod 640 {} +`.quiet()

  } else {
    if (secretsPaths.includes('dev')) {
      console.log(`Keeping dev config: ${secretsPaths}`);
    } else {
      await fs.remove(secretsPaths);
      console.log(`Deleted sensitive config: ${secretsPaths}`);
    }

    try { await fs.chmod(`${secretsPaths}.age`, 0o640) } catch {}
  }
}