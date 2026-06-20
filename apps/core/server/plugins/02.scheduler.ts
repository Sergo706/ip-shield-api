import { scheduleTask, shutdownScheduledTasks } from '@riavzon/utils/server';
import { resolve } from 'node:path';

export default defineNitroPlugin((nitroApp) => {

  console.info('Initializing background task scheduler...');
  const isDev = process.env.NODE_ENV === 'development';
  const dataSchedule = Number(process.env.DATA_RESET_SCHEDULE) || 1000 * 60 * 60 * 24;
  const scriptPath = isDev 
    ? resolve(process.cwd(), 'server/scripts/runDbUpdate.ts')
    : resolve(process.cwd(), '.output/server/scripts/runDbUpdate.mjs'); 
  
  const cmd = isDev ? 'npx' : 'node';
  const args = isDev ? ['tsx', scriptPath] : [scriptPath];

  scheduleTask(
    'shield-base-refresh',
    cmd,
    args,
    dataSchedule
  );

  nitroApp.hooks.hook('close', async () => {
    console.info('Nitro shutting down, cleaning up scheduled tasks...');
    await shutdownScheduledTasks();
  });
});