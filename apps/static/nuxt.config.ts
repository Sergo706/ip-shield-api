const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  extends: ['../shared/layer'],
  modules: [
    '@nuxt/content',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-feedme',
    "@nuxtjs/turnstile",
    'nuxt-llms',
    '@vueuse/nuxt',
    '@nuxt/fonts'
  ],
  turnstile: {
    siteKey: '0x4AAAAAACi5J_aDDxg04Jkl',
  },
  sourcemap: {
    server: false,
    client: false
  },
  routeRules: isDev
    ? {}
    : {
        '/blog/**': { prerender: true, cache: { maxAge: 60 * 60 * 24 * 30 } },
        '/docs/**': { prerender: true, cache: { maxAge: 60 * 60 * 24 * 30 } },
        '/legal/**': { prerender: true, cache: { maxAge: 60 * 60 * 24 * 30 } },
        '/': { prerender: true, cache: { maxAge: 60 * 60 * 24 * 30 } },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/feed.xml', '/feed.atom', '/feed.json']
    },
    preset: "static",
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  site: {
    url: 'https://ip-shield.com/',
    name: 'IP Shield',
    description: 'A comprehensive API for IP intelligence, threat detection, and bot mitigation.',
    indexable: true,
    defaultLocale: 'en',
  },
      llms: {
    domain: 'https://ip-shield.com',
    title: 'IP Shield',
    description: 'A robust API and dashboard for IP intelligence, threat detection, and bot mitigation.',
    sections: [
      {
        title: 'Core Features',
        description: 'IP Shield provides a comprehensive suite of IP intelligence endpoints. Developers can query the API to receive real-time intelligence on IP addresses, including precise geolocation, ISP/ASN data, proxy or VPN usage, Tor node detection, and associated threat levels.'
      },
      {
        title: 'Bot Detection & Mitigation',
        description: 'Protect your applications with advanced bot detection heuristics. IP Shield can automatically identify malicious traffic patterns, known data center IPs, and automated scraping tools to keep your web properties secure.'
      },
      {
        title: 'Dashboard & API Management',
        description: 'Users get access to an intuitive web dashboard where they can generate and revoke API keys, monitor their request usage and remaining credits in real-time, and view comprehensive analytics of their API activity.'
      },
      {
        title: 'Easy Integration',
        description: 'Integrate IP Shield easily using standard HTTP REST requests. The API returns clean, structured JSON responses designed to be instantly consumable by any frontend or backend stack. All requests are authenticated securely via a custom x-api-key header.'
      },
      {
        title: 'Documentation',
        description: 'Full API endpoint references and integration guides are located at /docs'
      },
      {
        title: 'Blog',
        description: 'Industry insights, platform updates, and tutorials are located at /blog'
      }
    ],
    notes: [
      'The API requires a valid x-api-key header for authentication.',
      'Data sources are updated automatically on a daily schedule.'
    ],
    full: {
      title: 'IP Shield Full Documentation',
      description: 'Comprehensive technical overview of the IP Shield API, including endpoints, authentication, and integration guides.'
    }
  },
  linkChecker: {
    failOnError: false,
  },
  ogImage: {
    zeroRuntime: true,
    componentDirs: ['app/components/OgImage']
  },
  sitemap: {
    zeroRuntime: true,
    defaults: {
      lastmod: new Date().toISOString(),
    }
  },
  feedme: {
    defaults: {
      common: false,
    },
    feeds: {
      common: {
        feed: {
          title: 'IP Shield Blog',
          description: 'Latest articles and updates from IP Shield',
          id: 'https://ip-shield.com/',
          link: 'https://ip-shield.com/',
          language: 'en',
          favicon: 'https://ip-shield.com/favicon.ico',
          copyright: `© ${new Date().getFullYear()} IP Shield`,
          author: {
            name: 'IP Shield',
            link: 'https://ip-shield.com',
          },
        },
        revisit: '6h',
        fixDateFields: true,
        templateMapping: ['', 'meta', 'meta.feedme'],
        mapping: [['link', 'path']],
        charset: 'utf-8',
        collections: ['blog'],
      },
      routes: {
        '/feed.atom': { type: 'atom1' },
        '/feed.json': { type: 'json1' },
        '/feed.xml': { type: 'rss2' },
      }
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'light-plus',
            light: 'light-plus',
            dark: 'dracula'
          },
          langs: ["bash", "http", "json"]
        },
        }
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})