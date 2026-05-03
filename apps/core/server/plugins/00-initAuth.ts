import { authConfig } from '../../lib/auth/config';
import { defineAuthConfiguration } from '@riavzon/auth-h3client';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineNitroPlugin((nitro) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    defineAuthConfiguration(nitro, {
      ...authConfig,
          uStorage: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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