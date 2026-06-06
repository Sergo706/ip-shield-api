#!/usr/bin/env zx

import { spawn } from "node:child_process"
import { chalk, which } from "zx"

export async function need(cmd: string) {
  try {
    await which(cmd)
  } catch {
    console.error(chalk.red(`Error: Missing dependency: ${cmd}`))
    process.exit(1) 
  }
}

export function throwError(msg: string): never {
    throw new Error(chalk.red(`Error: ${msg}`))
}

export async function executeDownstream(wrapperScript?: string, defaultCmd: string[] = []) {
  const rawArgs = process.argv.slice(2);
  const commandToRun = rawArgs.length > 0 ? rawArgs : defaultCmd;

  if (commandToRun.length > 0 || wrapperScript) {
    let cmd: string;
    let args: string[];

    if (wrapperScript) {
      cmd = wrapperScript;
      args = commandToRun;
      console.log(chalk.cyan(`Executing downstream via wrapper: ${cmd} ${args.join(' ')}`));
    } else {
      [cmd, ...args] = commandToRun;
      console.log(chalk.cyan(`Executing downstream command: ${cmd} ${args.join(' ')}`));
    }
    
    const child = spawn(cmd, args, { 
      stdio: 'inherit', 
      env: process.env
    });

    child.on('error', async (err) => {
       throwError(`Failed to execute command: ${err.message}`);
    });

    child.on('exit', (code) => {
      process.exit(code || 0);
    });
  } else {
    console.log(chalk.yellow('No downstream command provided, exiting.'));
  }
}