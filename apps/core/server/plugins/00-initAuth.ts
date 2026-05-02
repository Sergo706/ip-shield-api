import { authConfig } from '../../lib/auth/config';
import { defineAuthConfiguration } from '@riavzon/auth-h3client';

export default defineNitroPlugin((nitro) => {
  try {
    defineAuthConfiguration(nitro, {
      ...authConfig,
          uStorage: {
            storage: useStorage('cache'),
            cacheOptions: {
                successTtl: 60 * 60 * 24 * 30, 
                rateLimitTtl: 10    
            }
        }
    });
  } catch (e) {
    console.error('[auth] failed to start', e);
  }
});