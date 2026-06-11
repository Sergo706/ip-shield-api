---
title: Granular Geolocation API
description: Receive highly accurate country, city, and timezone mapping to localize user experiences instantly.
hasMarkDownContent: true
hero:
  badge: Geo Services
  orientation: horizontal
cta:
  title: Add geolocation to your app
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "How accurate is the city-level data?"
    content: "Our geolocation data resolves to a 25-kilometer radius for over 90% of IP addresses globally, ensuring highly accurate city and state-level mapping."
    icon: "i-lucide-map"
  - label: "Do you support IPv6?"
    content: "Yes, our database fully supports deep geolocation and metadata enrichment for the entire IPv6 address space."
    icon: "i-lucide-network"
  - label: "How is the data sourced?"
    content: "We aggregate data from regional internet registries (RIRs), ISP peering data, and BGP routing tables to maintain an up-to-date geographic database."
    icon: "i-lucide-database"
sections:
  - title: Highlight Features
    description: Map IP addresses to the physical world.
    orientation: horizontal
    image:
      src: '/products/geo_map_1781163844436.png'
      alt: 'Global Map'
    features:
      - title: Country & City Matching
        description: Pinpoint locations accurately across the globe.
        icon: i-lucide-map
      - title: Precise Coordinates
        description: Retrieve estimated latitude and longitude for mapping.
        icon: i-lucide-navigation
      - title: Localized Content
        description: Use location data to automatically set language and currency for your users.
        icon: i-lucide-globe
---

## Lightning Fast IP Geolocation

Translate any IP address into actionable location data. Whether you are enforcing content licensing, localizing your user interface, or detecting anomalous logins, our Granular Geolocation API delivers accurate results in milliseconds.

### Data Returned
- **Country**: ISO codes and full country names.
- **City & Region**: Granular mapping down to the city level.
- **Coordinates**: Latitude and longitude estimates.
- **Timezone**: Accurate timezone data for the user's location.

### API Endpoint

```http
GET https://ip-shield.riavzon.com/v1/check/geo/{ip_address}
```

### Why IP-Shield Geolocation?
- **High Accuracy**: Continuously updated databases ensure low error rates.
- **Low Latency**: Designed for use in the critical path of your web requests.
- **Localization**: Automatically set the correct language and currency for your users on their first visit.
