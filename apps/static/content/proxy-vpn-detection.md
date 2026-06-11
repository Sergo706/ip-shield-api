---
title: Proxy & VPN Detection API
description: Accurately identify residential proxies, datacenter IPs, and commercial VPN networks.
hasMarkDownContent: true
hero:
  badge: IP Intelligence
  orientation: horizontal
cta:
  title: Start detecting proxies today
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "What is a residential proxy?"
    content: "A residential proxy routes traffic through an actual residential internet connection, making the traffic appear as though it originates from a standard home user rather than a datacenter."
    icon: "i-lucide-help-circle"
  - label: "Can I block all proxies?"
    content: "While possible, blocking all proxies may result in high false positives. We recommend introducing adaptive friction (like MFA) instead of outright blocking."
    icon: "i-lucide-shield-alert"
  - label: "How accurate is the VPN detection?"
    content: "Our system combines behavioral analysis, real-time node databases, and ASN classification to provide 99.9% accuracy for commercial VPN networks."
    icon: "i-lucide-target"
sections:
  - title: Highlight Features
    description: Advanced analytics for proxy detection.
    orientation: horizontal
    image:
      src: '/products/proxy_vpn_1781163824981.png'
      alt: 'Proxy Server'
    features:
      - title: Real-time Database
        description: Instantly checks against live databases of known proxy IPs.
        icon: i-lucide-database
      - title: Commercial VPN Flags
        description: Detect traffic from popular consumer VPN providers like NordVPN or ExpressVPN.
        icon: i-lucide-shield-check
      - title: Residential Proxies
        description: Catch sophisticated botnets operating through residential gateway nodes.
        icon: i-lucide-home
---

## Reliable Proxy & VPN Detection

Stop fraudsters hiding behind anonymizing networks. The Proxy & VPN Detection endpoint analyzes the incoming IP against a constantly updated database of known commercial VPNs, datacenter IP ranges, and residential proxy networks.

### What it detects:
- **Commercial VPNs**: Traffic from popular consumer VPN providers.
- **Datacenter IPs**: Connections originating from cloud providers like AWS, GCP, and DigitalOcean.
- **Residential Proxies**: Endpoints acting as residential gateways for botnets and scrapers.

### API Endpoint

The endpoint provides rich network metadata including proxy detection flags.

```http
GET https://ip-shield.riavzon.com/v1/network/{ip_address}
```

### Integration Benefits
- Reduce chargebacks by flagging high-risk transactions.
- Block automated scrapers and credential stuffing attacks.
- Ensure compliance by enforcing geographic access restrictions accurately.
