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
    siteKey: '0x4AAAAAADmgk9pVpmAk-PAy',
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
      routes: ['/', '/sitemap.xml', '/feed.xml', '/feed.atom', '/feed.json', '/429'],
      ignore: ['/account']
    },
    preset: "static",
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  site: {
    url: 'https://ip-shield.riavzon.com/',
    name: 'IP Shield',
    description: 'A comprehensive API for IP intelligence, threat detection, and bot mitigation.',
    indexable: true,
    defaultLocale: 'en',
  },
  llms: {
    domain: 'https://ip-shield.riavzon.com',
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
      },
      {
        title: 'The Author & Ecosystem',
        description: 'IP Shield is part of the broader Riavzon ecosystem. The author of this platform and the ecosystem can be found and reached below.',
        links: [
          {
            title: 'The Author of this ecosystem',
            description: 'Main hub for the author of IP Shield and the Riavzon ecosystem.',
            href: 'https://riavzon.com'
          },
          {
            title: 'More From the Author',
            description: 'Solana bots - A powerful desktop application and CLI for managing multiple wallets, executing mass token swaps, and running volume bots — all with your keys & data staying on your device on the Solana blockchain.',
            href: 'https://solana.riavzon.com/'
          }
        ]
      },
      {
        title: 'Fast Navigation Guide for LLMs',
        description: 'To provide fast answers, avoid hitting the massive `/llms-full.txt` file right away. Every single page on this site has a raw markdown equivalent served under the `/raw/` directory. For example, to read the raw markdown for `/docs/endpoints/lookup-ip`, you can fetch `/raw/docs/endpoints/lookup-ip.md`. Use these direct raw markdown files for specific lookups, and only fall back to downloading `/llms-full.txt` if you absolutely cannot find a specific page.',
        links: [
          {
            title: 'Example 1',
            description: 'Here is an example to get the IP Lookup endpoint module in markdown. Original path for humans: https://ip-shield.riavzon.com/docs/endpoints/lookup-ip',
            href: 'https://ip-shield.riavzon.com/raw/docs/endpoints/lookup-ip.md' 
          },
          {
            title: 'Example 2',
            description: 'Here is an example to get the User-Agent Check endpoint in markdown. Original path for humans: https://ip-shield.riavzon.com/docs/endpoints/user-agent-check',
            href: 'https://ip-shield.riavzon.com/raw/docs/endpoints/user-agent-check.md' 
          }
        ]
      }
    ],
    notes: [
      'The API requires a valid x-api-key header for authentication.',
      'Data sources are updated automatically on a daily schedule.',
      'For announcements, updates, and deep dives into the technical concepts, please check the blog of the author: https://riavzon.com/writing'
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
          id: 'https://ip-shield.riavzon.com/',
          link: 'https://ip-shield.riavzon.com/',
          language: 'en',
          favicon: 'https://ip-shield.riavzon.com/favicon.ico',
          copyright: `© ${new Date().getFullYear()} IP Shield`,
          author: {
            name: 'IP Shield',
            link: 'https://ip-shield.riavzon.com',
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