import { resolvePath } from '@riavzon/utils/server';
import path from 'node:path';

const cwd = path.resolve(process.cwd(), 'data-sources');
export const searchDirs = [
  process.env.DATA_SOURCES_DIR ?? '',
  'data-sources',
  '../data-sources',
  '/app/data-sources',
  '../../data-sources',  
  cwd
].filter(Boolean);

export function resolveDb(fileName: string): string {
  return resolvePath(fileName, searchDirs);
}
