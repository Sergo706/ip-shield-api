---
title: Tor Exit Node Detection API
description: Block or flag traffic originating from the Tor anonymity network instantly.
hasMarkDownContent: true
hero:
  badge: IP Intelligence
  orientation: horizontal
cta:
  title: Secure your app from Tor traffic
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "What is a Tor Exit Node?"
    content: "An exit node is the final gateway where encrypted Tor traffic hits the public internet. Traffic originating here is fully anonymous and frequently used for malicious activities."
    icon: "i-lucide-help-circle"
  - label: "How often is the list updated?"
    content: "We synchronize our intelligence with the Tor directory authorities continuously, ensuring new exit nodes are flagged within minutes of coming online."
    icon: "i-lucide-refresh-cw"
  - label: "Should I block all Tor traffic?"
    content: "For consumer e-commerce or sensitive logins, blocking Tor is a best practice. However, if you run a privacy-centric application, you might just flag the traffic instead."
    icon: "i-lucide-shield-alert"
sections:
  - title: Highlight Features
    description: Stay protected from anonymous traffic.
    orientation: horizontal
    image:
      src: '/products/tor_exit_1781163834274.png'
      alt: 'Dark Web Tor Network'
    features:
      - title: Up-to-date Exit Nodes
        description: Our lists are synced continuously with the Tor directory authorities.
        icon: i-lucide-refresh-cw
      - title: Deep Web Traffic Blocking
        description: Prevent abuse, spam, and hacking attempts before they reach your app.
        icon: i-lucide-shield-alert
      - title: Low Latency
        description: Lookups take single-digit milliseconds to ensure no slowdowns.
        icon: i-lucide-zap
---

## Detect and Manage Tor Traffic

The Tor network is widely used to obscure the true origin of network traffic. While sometimes used for legitimate privacy reasons, Tor exit nodes are frequently a source of malicious activity, spam, and hacking attempts.

### Key Features
- **Real-Time Exit Node List**: We continuously sync with the latest active Tor exit nodes.
- **Low Latency Lookup**: Detect Tor traffic in milliseconds, perfect for inline request blocking.

### API Endpoint

The network API provides a simple boolean flag indicating if an IP is currently an active Tor exit node.

```http
GET https://ip-shield.riavzon.com/v1/network/{ip_address}
```

### Use Cases
- **Spam Prevention**: Automatically challenge or block sign-ups originating from Tor.
- **Account Security**: Prevent unauthorized access attempts masking their location.
