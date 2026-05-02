export default defineNuxtConfig({
  extends: ['../shared/layer'],
  modules: [
    '@nuxt/eslint',
    '@riavzon/auth-h3client/module',
    '@nuxt/hints',
    '@nuxt/image',
  ],

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