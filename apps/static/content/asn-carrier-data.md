---
title: ASN & Carrier Data API
description: Retrieve the exact Autonomous System Number and internet service provider details behind any IP address.
hasMarkDownContent: true
hero:
  badge: Network Data
  orientation: horizontal
cta:
  title: Access Carrier Data
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "What is an ASN?"
    content: "An Autonomous System Number (ASN) uniquely identifies a network (like an ISP or cloud provider) on the internet. It helps determine the organizational owner of an IP."
    icon: "i-lucide-help-circle"
  - label: "How can ASN data prevent fraud?"
    content: "Legitimate consumer traffic rarely originates from hosting providers (like AWS or DigitalOcean). By blocking or challenging datacenter ASNs, you eliminate massive amounts of bot traffic."
    icon: "i-lucide-shield-check"
  - label: "Do you provide ISP names?"
    content: "Yes, our API returns the full registered name of the ISP or carrier, the organization name, and the network type (e.g., cellular, hosting, residential)."
    icon: "i-lucide-building"
sections:
  - title: Highlight Features
    description: Understand the network owner.
    orientation: horizontal
    image:
      src: '/products/asn_network_1781163867264.png'
      alt: 'Fiber Network'
    features:
      - title: ASN Lookup
        description: Identify the autonomous system number routing the traffic.
        icon: i-lucide-server
      - title: Carrier & ISP Identification
        description: Differentiate between mobile cellular data, broadband ISPs, and corporate networks.
        icon: i-lucide-building
      - title: Network Routing Data
        description: Access CIDR blocks and registry details for deep analytics.
        icon: i-lucide-network
---

## Deep Network Insights

Understanding the network owner behind an IP address provides critical context for fraud prevention and network analytics. The ASN & Carrier Data API gives you immediate access to the routing information and organizational ownership of any IP.

### Available Data Points
- **ASN (Autonomous System Number)**: Identify the exact network segment.
- **ISP / Organization Name**: Know if the traffic belongs to an educational institution, a corporate network, a consumer ISP, or a cloud provider.
- **Network Routing**: CIDR blocks and registry information.

### API Endpoint

```http
GET https://ip-shield.riavzon.com/v1/network/{ip_address}
```

### Key Use Cases
- **B2B Enrichment**: Automatically identify which companies are visiting your website based on their corporate ASN.
- **Fraud Rules**: Create targeted rules to block specific abusive ASNs or entire bulletproof hosting providers.
