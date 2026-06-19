---
title: Granular Geolocation API
description: Receive highly accurate country, city, and timezone mapping to localize user experiences instantly.
hasMarkDownContent: false
hero:
  badge: Geo Services
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "8.8.8.8",
        "country_code": "US",
        "region": "California",
        "continent": "North America",
        "country": "United States",
        "city": "Mountain View",
        "capital": "Washington D.C.",
        "subregion": "Northern America",
        "zip_code": "94035",
        "latitude": "37.3860",
        "longitude": "-122.0838",
        "state": "California",
        "nationality": "American",
        "phone": "+1",
        "currency": "USD",
        "currency_name": "United States Dollar",
        "currency_symbol": "$",
        "language_iso639": "en-US",
        "tld": ".us",
        "utc_offset": "-0700",
        "timezone": "America/Los_Angeles",
        "timeZoneName": "Pacific Daylight Time"
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Country & City-Level Precision
    description: Identify the origin of incoming requests. The API uses standard RFC 8805 Geofeeds and RIR data to map IP addresses to city-level locations, providing reliable geographic context for both IPv4 and IPv6 traffic.
    orientation: horizontal
    image:
      src: '/products/geo_map_1781163844436.png'
      alt: 'Global IP Geolocation Map'
    features:
      - title: Country & Region Matching
        description: Instantly retrieve standard ISO country codes and full region names to enforce geo-blocking or content licensing rules.
        icon: i-lucide-map
      - title: City-Level Granularity
        description: Target local markets and personalize content by mapping users to their specific city.
        icon: i-lucide-building-2
      - title: IPv6 Support
        description: Fully supports deep geolocation and metadata enrichment for the entire modern IPv6 address space.
        icon: i-lucide-network

  - title: Timezone, Currency & Language
    description: Stop asking users where they are. Provide a seamless, localized experience on their very first visit by automatically configuring their environment based on their network location.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/geo_localization_abstract.png'
      alt: 'Localization and timezone data abstract visualization'
    features:
      - title: Automatic Timezones
        description: Get the exact IANA timezone string (e.g., America/Los_Angeles) to display dates and times correctly.
        icon: i-lucide-clock
      - title: Native Language Hints
        description: Retrieve standard ISO 639 language codes to instantly serve your application in the user's preferred language.
        icon: i-lucide-languages
      - title: Currency Prediction
        description: Map countries to their local currency symbols for accurate pricing and checkout flows.
        icon: i-lucide-coins

  - title: Coordinates & Regional Data
    description: Power dynamic maps and proximity-based features using estimated latitude and longitude coordinates. Perfect for "find nearest store" logic or analyzing geographic traffic clusters.
    orientation: horizontal
    image:
      src: '/products/geo_coordinates_abstract.png'
      alt: 'Geographic coordinates abstract visualization'
    features:
      - title: Precise Coordinates
        description: Retrieve estimated latitude and longitude pairs for immediate mapping integrations.
        icon: i-lucide-navigation
      - title: Proximity Calculations
        description: Easily calculate distances between the user and physical infrastructure using standard geo-math.
        icon: i-lucide-ruler
      - title: Continuous Updates
        description: Aggregated from RIRs, ISP peering data, and BGP routing tables to maintain accuracy.
        icon: i-lucide-refresh-ccw

features:
  title: Build Better Experiences
  description: Fast, reliable geographic intelligence at the edge.
  items:
    - title: Millisecond Response Times
      description: Geolocation data is served from memory at the edge, ensuring zero noticeable latency.
      icon: i-lucide-zap
    - title: Complete JSON Payload
      description: All location data is returned in a single, easy-to-parse structure.
      icon: i-lucide-braces
    - title: High Accuracy
      description: Proprietary data fusion ensures low error rates across mobile and fixed networks.
      icon: i-lucide-target
    - title: Privacy Compliant
      description: IP location data provides regional accuracy without compromising individual identity.
      icon: i-lucide-shield-check
    - title: Simple Rate Limiting
      description: Built-in quota tracking with standard HTTP 429 backoff headers.
      icon: i-lucide-shield
    - title: Easy Integration
      description: RESTful design means you can add localization to your app in minutes.
      icon: i-lucide-code
    - title: Global Coverage
      description: Comprehensive mapping for both domestic and international IP spaces.
      icon: i-lucide-globe

faqs:
  - label: "How accurate is the city-level data?"
    content: "Our geolocation engine leverages standard RFC 8805 Geofeeds and enriched RIR datasets to provide reliable city and state-level mapping, which is ideal for broad localization, language targeting, and analytics."
    icon: "i-lucide-map"
  - label: "Do you support IPv6 addresses?"
    content: "Yes, our database fully supports deep geolocation and metadata enrichment for the entire IPv6 address space, just as it does for IPv4."
    icon: "i-lucide-network"
  - label: "How is the data sourced and kept up to date?"
    content: "We aggregate data from multiple regional internet registries (RIRs), ISP peering agreements, and live BGP routing tables. This multi-source approach ensures our geographic database adapts quickly to network changes."
    icon: "i-lucide-database"
  - label: "Can I use this for precise user tracking?"
    content: "No. IP Geolocation provides regional accuracy (city, state, country) which is perfect for localization and broad fraud detection, but it cannot pinpoint a specific street address or building."
    icon: "i-lucide-crosshair"
  - label: "How fast is the lookup API?"
    content: "Because our databases are loaded directly into memory at the edge, geocoding lookups typically return in single-digit milliseconds, well within the threshold for inline blocking or content rewriting."
    icon: "i-lucide-gauge"
  - label: "What happens when I exceed my quota?"
    content: "Every API response includes a meta object with your total_credits and credits_remaining. If you exceed your limit, the API returns a HTTP 429 Too Many Requests status."
    icon: "i-lucide-credit-card"

cta:
  title: Add geolocation to your app
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: /account
      external: true
      target: _self
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
---
