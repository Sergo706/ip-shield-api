---
title: ASN & Carrier Data API
description: Retrieve the exact Autonomous System Number and internet service provider details behind any IP address. Identify network owners, detect bots, proxies, VPNs, and Tor exit nodes in a single API call.
hasMarkDownContent: false
hero:
  badge: Network Data
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "8.8.8.8",
        "proxy": false,
        "vpn": false,
        "threat_level": 0,
        "is_known_bot": true,
        "bot_details": {
          "bot_owner": "Google",
          "creationTime": "2023-01-01T00:00:00Z"
        },
        "is_tor_node": false,
        "tor_details": null,
        "asn": {
          "asn_id": "15169",
          "asn_name": "GOOGLE",
          "classification": "hosting",
          "route_visibility_count": 8945
        }
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: ASN & BGP Routing Intelligence
    description: Every IP address belongs to a network identified by an Autonomous System Number. The ASN lookup reveals the organizational owner, network classification, and BGP route visibility — giving you immediate context on who operates the infrastructure behind each request.
    orientation: horizontal
    image:
      src: '/products/asn_network_1781163867264.png'
      alt: 'ASN and BGP routing intelligence visualization'
    features:
      - title: ASN Identification
        description: Resolve the exact autonomous system number and registered operator name behind any IPv4 address using live BGP routing data.
        icon: i-lucide-server
      - title: Network Classification
        description: Instantly categorize traffic origin as residential, hosting, corporate, or cellular to power adaptive security rules.
        icon: i-lucide-layers
      - title: Route Visibility Scoring
        description: Measure BGP route announcement reach across global peers to assess network legitimacy and detect suspicious infrastructure.
        icon: i-lucide-activity

  - title: Bot & Threat Detection
    description: Distinguish legitimate crawlers from malicious bots in real time. The API cross-references incoming IPs against curated databases of known search engine crawlers, SEO tools, and monitoring services — returning the bot owner, classification, and first-seen timestamp.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/bot_threat_abstract.png'
      alt: 'Bot and threat detection abstract visualization'
    features:
      - title: Known Bot Fingerprinting
        description: Identify verified crawlers from Google, Bing, and other services so you can whitelist good bots and challenge unknown ones.
        icon: i-lucide-bot
      - title: Threat Level Scoring
        description: Receive a computed threat score per IP that combines proxy signals, Tor usage, and historical abuse data into a single actionable metric.
        icon: i-lucide-shield-alert
      - title: Tor Exit Node Detection
        description: Flag traffic originating from active Tor exit nodes with detailed metadata including exit probability, guard flags, and country of origin.
        icon: i-lucide-eye-off

  - title: Proxy & VPN Intelligence
    description: Anonymizing networks are the primary tool for fraud, credential stuffing, and web scraping at scale. The API detects commercial VPNs, datacenter proxies, and residential proxy networks — giving you the context to block or challenge suspicious traffic before it reaches your application.
    orientation: horizontal
    image:
      src: '/products/proxy_vpn_abstract.png'
      alt: 'Proxy and VPN detection abstract visualization'
    features:
      - title: Proxy Detection
        description: Detect open proxies, SOCKS proxies, and HTTP proxies operating across datacenter and residential IP ranges in real time.
        icon: i-lucide-scan
      - title: Commercial VPN Flagging
        description: Identify traffic from popular consumer VPN providers like NordVPN, ExpressVPN, and Surfshark using continuously updated IP range databases.
        icon: i-lucide-shield-check
      - title: Single API Call
        description: Retrieve proxy status, VPN flags, ASN data, bot detection, Tor status, and threat score in one unified response — no need to chain multiple endpoints.
        icon: i-lucide-zap

features:
  title: Built for Security Engineers
  description: Everything you need to make real-time decisions about network traffic at the edge.
  items:
    - title: Sub-10ms Latency
      description: In-memory data sources deliver lookup results in single-digit milliseconds, fast enough for inline request blocking without adding perceptible latency.
      icon: i-lucide-gauge
    - title: Continuously Updated Databases
      description: Proxy lists, Tor directory data, bot fingerprints, and BGP routing tables refresh automatically so your security rules never go stale.
      icon: i-lucide-refresh-cw
    - title: Quota-Protected Access
      description: Built-in credit tracking with per-request metering returns your remaining quota in every response, making usage management effortless.
      icon: i-lucide-credit-card
    - title: Unified JSON Response
      description: A single endpoint returns ASN, proxy, VPN, bot, Tor, and threat data in one structured JSON payload — eliminating integration complexity.
      icon: i-lucide-braces
    - title: Rate-Limited by Design
      description: IP-level rate limiting protects the API from abuse while ensuring fair access for all consumers, with Retry-After headers for graceful backoff.
      icon: i-lucide-shield
    - title: Easy Integration
      description: Simple RESTful API design allows integration with any language or framework in minutes, not hours.
      icon: i-lucide-code
    - title: High Availability
      description: Deployed across global edge locations to ensure maximum uptime and reliability for your mission-critical applications.
      icon: i-lucide-server-crash

faqs:
  - label: "What is an ASN and why does it matter for security?"
    content: "An Autonomous System Number (ASN) uniquely identifies a network operator on the internet, such as an ISP, cloud provider, or enterprise. Knowing the ASN behind an IP address reveals whether traffic originates from a legitimate residential ISP, a datacenter often associated with bots, or a bulletproof hosting provider frequently used for abuse."
    icon: "i-lucide-help-circle"
  - label: "How does the API detect proxies and VPNs?"
    content: "The API checks each IP against continuously updated databases of known proxy servers, SOCKS nodes, and commercial VPN exit points. These databases combine crowdsourced intelligence, active scanning, and BGP routing analysis to maintain high detection accuracy with minimal false positives."
    icon: "i-lucide-shield-check"
  - label: "Can I use this API to block Tor traffic?"
    content: "Yes. The API returns an is_tor_node flag along with detailed metadata including exit probability, guard flags, exit policy summary, and the country of the Tor relay. You can use these fields to block, challenge, or simply monitor Tor traffic based on your application's risk tolerance."
    icon: "i-lucide-eye-off"
  - label: "What does the threat_level score represent?"
    content: "The threat level is a composite score computed from multiple signals including proxy detection, VPN usage, Tor association, and historical abuse patterns. A score of 0 indicates low risk, while higher values suggest the IP has been associated with suspicious or malicious activity."
    icon: "i-lucide-activity"
  - label: "How are known bots identified and verified?"
    content: "The API maintains a curated database of verified bot signatures from major search engines (Google, Bing), SEO tools, and monitoring services. When a match is found, the response includes the bot owner name and the timestamp when the bot was first catalogued."
    icon: "i-lucide-bot"
  - label: "What is the rate limit and how does quota work?"
    content: "Every API response includes a meta object with your total_credits and credits_remaining for the current billing period. If you exceed the IP-level rate limit, the API returns a 429 status with a Retry-After header indicating how long to wait before retrying."
    icon: "i-lucide-credit-card"

cta:
  title: Access Carrier Data
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
