---
title: Full IP Lookup API
description: Enrich any IP with geolocation, ASN, proxy detection, Tor status, and threat intelligence via a single, comprehensive endpoint.
hasMarkDownContent: false
hero:
  badge: Global Enrichment
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "104.28.12.34",
        "location": {
          "country": "United States",
          "country_code": "US",
          "region": "California",
          "city": "Los Angeles",
          "language_iso639": "en-US",
          "timezone": "America/Los_Angeles",
          "latitude": 34.0522,
          "longitude": -118.2437
        },
        "proxy": true,
        "vpn": true,
        "threat_level": 85,
        "is_known_bot": false,
        "tor": false,
        "network": {
          "asn_id": "13335",
          "asn_name": "CLOUDFLARENET",
          "classification": "hosting"
        }
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Complete IP Enrichment
    description: Why make three API calls when one will do? The Full IP Lookup endpoint aggregates our entire intelligence suite—combining geolocation, proxy detection, and network routing data into one fast, unified JSON payload.
    orientation: horizontal
    image:
      src: '/products/full_lookup_abstract.png'
      alt: 'Complete IP Enrichment and Aggregation'
    features:
      - title: Single API Call
        description: Reduce network overhead and simplify your codebase by fetching all required data at once.
        icon: i-lucide-globe
      - title: Millisecond Latency
        description: Edge-native architecture ensures massive data aggregation happens in single-digit milliseconds.
        icon: i-lucide-zap
      - title: Unified Payload
        description: A clearly structured JSON response that is easy to parse and integrate into any framework.
        icon: i-lucide-braces

  - title: Geolocation + Network Intelligence
    description: Localize your application and secure it simultaneously. Instantly know exactly where the user is physically located, what language they speak, and who owns the network infrastructure routing their traffic.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/full_geo_network_abstract.png'
      alt: 'Geolocation and network routing abstract visualization'
    features:
      - title: High-Precision Geo
        description: Resolve city, state, country, and precise latitude/longitude coordinates.
        icon: i-lucide-map-pin
      - title: Automatic Localization
        description: Configure application timezone and language automatically based on IP location.
        icon: i-lucide-languages
      - title: ASN Classification
        description: Instantly categorize traffic origin as residential, corporate, or datacenter hosting.
        icon: i-lucide-server

  - title: Comprehensive Threat Layer
    description: Protect your platform from automated abuse. The Full IP Lookup includes our complete threat assessment, actively checking the IP against Tor node lists, commercial VPN databases, proxy honeypots, and known bot signatures.
    orientation: horizontal
    image:
      src: '/products/full_threat_abstract.png'
      alt: 'Comprehensive threat intelligence abstract visualization'
    features:
      - title: Anonymity Detection
        description: Flag residential proxies, datacenter IPs, and commercial VPN networks.
        icon: i-lucide-shield-alert
      - title: Tor & Bot Filtering
        description: Identify Tor exit nodes and verified search engine crawlers with 100% accuracy.
        icon: i-lucide-eye-off
      - title: Unified Threat Score
        description: Use the composite 0-100 risk score to trigger adaptive authentication flows.
        icon: i-lucide-activity

features:
  title: The Ultimate Edge API
  description: Everything you need to evaluate, route, and secure incoming traffic.
  items:
    - title: Complete Data Coverage
      description: Access every datapoint IP Shield offers through a single endpoint.
      icon: i-lucide-database
    - title: Ultra-Low Latency
      description: Aggregation happens entirely in-memory at the edge for zero-friction lookups.
      icon: i-lucide-gauge
    - title: Predictable Quota
      description: Even though it aggregates multiple data sources, it only consumes one credit.
      icon: i-lucide-credit-card
    - title: Rate Limiting
      description: IP-based rate limiting with Retry-After headers protects the service.
      icon: i-lucide-shield
    - title: Privacy First
      description: Regional location data keeps you compliant with global privacy laws.
      icon: i-lucide-lock
    - title: Seamless Integration
      description: Drop-in replacement for legacy IP APIs, requiring less than 5 lines of code.
      icon: i-lucide-code
    - title: Always Fresh
      description: Underlying databases (BGP, Tor, Proxies) refresh automatically in the background.
      icon: i-lucide-refresh-cw

faqs:
  - label: "What is the difference between this and the other endpoints?"
    content: "The Full IP Lookup endpoint aggregates data from our Geolocation, Proxy Detection, Network ASN, and Threat Scoring engines into a single response. It is designed for developers who need maximum context with minimum network round-trips."
    icon: "i-lucide-help-circle"
  - label: "Does this cost more API credits to use?"
    content: "No! Despite querying multiple internal databases simultaneously, a call to the Full IP Lookup endpoint consumes only 1 API credit from your quota, making it extremely cost-effective."
    icon: "i-lucide-credit-card"
  - label: "Is it slower than querying the individual APIs?"
    content: "Not noticeably. Because all data sources (ASN, Geo, Proxy, Tor) are loaded into memory on the same edge nodes, the internal aggregation takes microseconds. The total request time is still typically under 10 milliseconds."
    icon: "i-lucide-zap"
  - label: "Can I use this for adaptive authentication?"
    content: "Absolutely. Many customers use the combined location data and threat_level score to trigger step-up authentication (like MFA) when a user logs in from an unexpected country or a high-risk proxy."
    icon: "i-lucide-shield-check"
  - label: "How accurate is the VPN and Proxy detection?"
    content: "Our detection engine combines BGP routing analysis, known datacenter IP ranges, and aggregated threat intelligence feeds to accurately identify commercial VPNs, hosting providers, and known proxy endpoints."
    icon: "i-lucide-target"
  - label: "What happens if one of the underlying data sources fails?"
    content: "Our API is designed to fail open. If the ASN database is temporarily updating, for example, the API will still return the Geolocation and Threat data with the ASN fields set to null, ensuring your application never blocks legitimate traffic due to a partial outage."
    icon: "i-lucide-server-crash"

cta:
  title: Enrich Your Traffic
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
