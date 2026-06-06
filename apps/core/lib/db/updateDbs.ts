import { replaceDirContent, getRoot } from "@riavzon/utils/server";
import { type InputCache } from "@riavzon/shield-base";
import { __cache,  __restartData } from '@riavzon/shield-base/internal';
import { searchDirs } from "./dbsPath";
import path from "node:path";
import fs from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';

export async function updateDbs() {
    const dataSourcesDir = searchDirs.find(dir => fs.existsSync(dir) && fs.statSync(dir).isDirectory());
    
    if (!dataSourcesDir) {
        console.error('Could not find data-sources directory in any of the search paths.');
        throw new Error('Could not find data-sources directory in any of the search paths.');
    }

    const cache: Partial<InputCache> = await __cache()._getCache() ?? {};
        
    if (!cache.mmdbctlPath || Object.keys(cache).length === 0) {
        console.error('No data to restart, please first run the installation wizard');
        throw new Error('No data to restart, please first run the installation wizard');
    }

    const output = path.resolve(getRoot(), dataSourcesDir);
    const tmp = path.resolve(getRoot(),  dataSourcesDir, `_tmp_${Date.now().toString()}`);
    await mkdir(tmp, { recursive: true });
    
    try {
        console.info('Restarting data sources...');
        await __restartData(tmp, true);
        await replaceDirContent(output, tmp);
        console.info('Successfully refreshed data sources');
    } catch (err) {
        console.error({err}, 'Error refreshing data');
    } finally {
        await rm(tmp, { recursive: true, force: true });
     }
}