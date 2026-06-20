export default defineNuxtConfig({
  extends: ['../shared/layer'],
  modules: [
    '@nuxt/eslint',
    '@riavzon/auth-h3client/module',
    '@nuxt/hints',
    '@nuxt/image',
    "@nuxtjs/turnstile",
    '@nuxtjs/mdc',
    '@vueuse/nuxt',
  ],
  app: {
    buildAssetsDir: '/_core/'
  },
  turnstile: {
    siteKey: '0x4AAAAAADmgk9pVpmAk-PAy',
  },
  runtimeConfig: {
    turnstile: {
      secretKey: '',
    }
  },
  authH3Client: {
    enableMiddleware: false,
    registerApiRoute: {
      path: '/api/auth/api-tokens'
    }
  },
  devtools: {
    enabled: true
  },
  vite: {
      esbuild: { target: 'es2022' },
      server: {
        watch: { usePolling: true, interval: 100 },
        hmr: { 
           protocol: 'wss',
           host: 'localhost',
           port: 443,
           clientPort: 443,
        }
      },
    },
    typescript: {
    tsConfig: {
      compilerOptions: {
        strictNullChecks: true,
        strict: true,
        types: ['node']
      }
    }
  },
  nitro: {
    preset: 'node-server'
  },
  routeRules: {
    '/': { prerender: false },
    '/api/v1/**': {
      cors: true,
      headers: { 
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, OPTIONS',
        'access-control-allow-headers': 'x-api-key, Content-Type, Accept',
        'access-control-max-age': '86400',
      },
      cache: false,
    }
  },

  compatibilityDate: '2025-01-15',
})