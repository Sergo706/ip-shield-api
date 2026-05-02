export default defineNuxtConfig({
  extends: ['../shared/layer'],
  modules: [
    '@nuxt/content',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-feedme',
    'nuxt-llms',
    '@nuxt/fonts'
  ],
    content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2
        },
        highlight: {
          theme: {
            default: 'light-plus',
            light: 'light-plus',
            dark: 'dracula'
          },
            langs: ['bash', 'yaml', 'yml', 'json', 'http']
          }
      }
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})