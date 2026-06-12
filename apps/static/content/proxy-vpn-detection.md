---
title: Proxy & VPN Detection API
description: Accurately identify residential proxies, datacenter IPs, and commercial VPN networks.
hasMarkDownContent: false
hero:
  badge: IP Intelligence
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "104.28.12.34",
        "proxy": true,
        "vpn": true,
        "threat_level": 85,
        "is_known_bot": false,
        "bot_details": null,
        "is_tor_node": false,
        "tor_details": null,
        "asn": {
          "asn_id": "13335",
          "asn_name": "CLOUDFLARENET",
          "classification": "hosting",
          "route_visibility_count": 5231
        }
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Proxy & VPN Detection
    description: Stop fraudsters hiding behind anonymizing networks. The endpoint analyzes the incoming IP against a constantly updated database of known open proxies, SOCKS nodes, and HTTP proxies to reveal the true nature of the traffic.
    orientation: horizontal
    image:
      src: '/products/proxy_vpn_1781163824981.png'
      alt: 'Proxy Server and Network Security'
    features:
      - title: Real-time Database
        description: Instantly checks against live databases of known proxy IPs.
        icon: i-lucide-database
      - title: Open Proxy Detection
        description: Catch insecure and public proxies often used for low-sophistication attacks.
        icon: i-lucide-unlock
      - title: SOCKS & HTTP
        description: Broad coverage across multiple proxy protocols and port configurations.
        icon: i-lucide-layers

  - title: Residential Proxy Intelligence
    description: Attackers increasingly use compromised IoT devices and residential broadband connections to mask their attacks. Our intelligence layer identifies traffic acting as residential gateways for botnets and scrapers.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/proxy_residential_abstract.png'
      alt: 'Residential proxy intelligence abstract visualization'
    features:
      - title: Residential Flagging
        description: Catch sophisticated botnets operating through standard ISP connections.
        icon: i-lucide-home
      - title: Abuse History
        description: Correlate IPs with known spam and hacking blacklist databases.
        icon: i-lucide-history
      - title: Adaptive Friction
        description: Force MFA or CAPTCHA challenges when residential proxy traffic is detected.
        icon: i-lucide-sliders

  - title: Datacenter & Commercial VPN Flagging
    description: Legitimate users rarely browse from AWS or DigitalOcean. Detect connections originating from cloud providers and accurately flag traffic from popular consumer VPN networks like NordVPN, ExpressVPN, and Surfshark.
    orientation: horizontal
    image:
      src: '/products/proxy_datacenter_abstract.png'
      alt: 'Datacenter and commercial VPN abstract visualization'
    features:
      - title: Hosting Classification
        description: Identify traffic originating from datacenters and server farms.
        icon: i-lucide-server
      - title: Commercial VPN Flags
        description: Accurately detect traffic from popular consumer VPN providers.
        icon: i-lucide-shield-check
      - title: Rule Flexibility
        description: Choose to block datacenters while allowing consumer VPNs based on your risk profile.
        icon: i-lucide-settings

features:
  title: Reliable Detection at Scale
  description: Advanced analytics to stop automated abuse and credential stuffing.
  items:
    - title: Millisecond Latency
      description: Lookups perform in single-digit milliseconds, allowing inline blocking.
      icon: i-lucide-gauge
    - title: Comprehensive Coverage
      description: Detects everything from public proxies to elite residential networks.
      icon: i-lucide-globe
    - title: ASN Integration
      description: Cross-references proxy status with BGP routing intelligence.
      icon: i-lucide-server-cog
    - title: Threat Scoring
      description: Proxy detection feeds directly into our unified 0-100 threat score.
      icon: i-lucide-activity
    - title: Continuous Updates
      description: Our nodes constantly ingest new proxy lists from global honeypots.
      icon: i-lucide-refresh-cw
    - title: Reduce Chargebacks
      description: Flag high-risk transactions originating from anonymizing networks.
      icon: i-lucide-credit-card
    - title: Enforce Compliance
      description: Ensure geographic access restrictions cannot be bypassed with VPNs.
      icon: i-lucide-map-pin

faqs:
  - label: "What is a residential proxy?"
    content: "A residential proxy routes traffic through an actual residential internet connection, making the traffic appear as though it originates from a standard home user rather than a datacenter. These are heavily used by sophisticated scrapers and credential stuffing attacks."
    icon: "i-lucide-help-circle"
  - label: "Can I block all proxies?"
    content: "While possible, blocking all proxies may result in high false positives (e.g., blocking corporate proxies). We recommend introducing adaptive friction, such as requiring MFA or a CAPTCHA, instead of outright blocking."
    icon: "i-lucide-shield-alert"
  - label: "How accurate is the VPN detection?"
    content: "Our system combines real-time node databases, threat intelligence feeds, and ASN classification to accurately identify nodes belonging to commercial VPN networks like NordVPN, ExpressVPN, and others."
    icon: "i-lucide-target"
  - label: "Does this API detect datacenter IPs?"
    content: "Yes, the API returns an ASN classification field that explicitly flags IPs originating from hosting providers, datacenters, and cloud platforms like AWS or GCP."
    icon: "i-lucide-server"
  - label: "Will proxy blocking hurt my SEO?"
    content: "No. Our network API simultaneously checks if the IP belongs to a verified search engine bot. Legitimate crawlers like Googlebot are explicitly flagged, allowing you to bypass proxy rules for good bots."
    icon: "i-lucide-bot"
  - label: "How often do you update the proxy lists?"
    content: "Our systems continuously aggregate data from global honeypots, public proxy lists, and threat intelligence feeds. Edge nodes receive updates asynchronously in near real-time."
    icon: "i-lucide-refresh-cw"

cta:
  title: Start detecting proxies today
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/account'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
---
