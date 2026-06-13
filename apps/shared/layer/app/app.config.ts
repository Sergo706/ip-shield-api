export default defineAppConfig({
  ui: {
    colors: {
      primary: 'accent',
      neutral: 'riavzon',
    },
    prose: {
      pre: {
        base: 'bg-transparent border-transparent' 
      },
      codeIcon: {
        sh: 'i-lucide-square-terminal'
      },
      codeGroup: {
        slots: {
          indicator: 'bg-cream-200/70 dark:bg-riavzon-800',
          trigger: 'hover:bg-cream-200/70 dark:hover:bg-riavzon-500'
        }
      },
    }
  },	

  appName: 'IP Shield',
  seo: {
    title: 'Free Geo Location API | Network Data | Proxy & Tor Information | Ip To Location',
    description: 'IP Address Geolocation to Country, City, Region, Latitude, Longitude, ZIP Code, ISP, Domain, Time Zone, Area Code, Tor Network, ASN, Proxy and so on.',
    url: 'https://ip-shield.riavzon.com',
  },
  profile: {
    name: 'IP Shield',
  },
});