export default defineNuxtConfig({
  extends: ['../shared/layer'],
  modules: [
    '@nuxt/eslint',
    '@riavzon/auth-h3client/module',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxtjs/mdc',
  ],
  authH3Client: {
    enableMiddleware: false,
    registerApiRoute: {
      path: '/api/auth/api-tokens'
    }
  },
  devtools: {
    enabled: true
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

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',
})