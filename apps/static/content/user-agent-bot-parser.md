---
title: User Agent & Bot Parser API
description: Parse user agents and cross-verify IPs to identify legitimate search engine crawlers and flag malicious scrapers.
hasMarkDownContent: true
hero:
  badge: Traffic Analysis
  orientation: horizontal
cta:
  title: Analyze your traffic
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "How do you verify a search engine crawler?"
    content: "We automatically perform real-time reverse and forward DNS lookups, cross-referencing the claimed User-Agent with the underlying IP ownership (e.g., verifying Googlebot IPs)."
    icon: "i-lucide-search"
  - label: "Can attackers spoof User-Agents?"
    content: "Yes, changing a User-Agent is trivial. That is why our API explicitly flags 'isSpoofed' when the network origin does not mathematically match the claimed bot identity."
    icon: "i-lucide-user-x"
  - label: "Does it extract device types?"
    content: "Yes, the parser returns structured data including OS, browser version, device category (mobile, tablet, smart-tv), and rendering engine."
    icon: "i-lucide-monitor-smartphone"
sections:
  - title: Highlight Features
    description: Structured intelligence from messy headers.
    orientation: horizontal
    image:
      src: '/products/bot_parser_1781163885187.png'
      alt: 'Bot Parsing'
    features:
      - title: Device & OS Extraction
        description: Parse out the exact device type, operating system, and browser version.
        icon: i-lucide-monitor-smartphone
      - title: Malicious Bot Detection
        description: Catch automated scrapers and headless browsers instantly.
        icon: i-lucide-bot
      - title: Search Engine Verification
        description: Verify Googlebot and Bingbot by cross-referencing IP ownership to prevent spoofing.
        icon: i-lucide-check-circle
---

## Make Sense of User Agents

Raw User-Agent strings are messy, frequently spoofed, and hard to analyze. The User Agent & Bot Parser API normalizes these strings into structured data, allowing you to easily identify devices, operating systems, browsers, and bots.

### Structured Output
- **Device Type**: Mobile, Tablet, Desktop, or Smart TV.
- **Browser & OS**: Exact versions and engine details.
- **Bot Detection**: Identify automated scripts, HTTP libraries, and known scraping tools.

### API Endpoint

```http
GET https://ip-shield.riavzon.com/v1/check/user-agent/{user_agent_string}
```

### Actionable Intelligence
- **Analytics**: Build accurate demographic and device usage reports.
- **Scraper Blocking**: Easily drop requests coming from headless browsers or default programmatic user agents (like `python-requests` or `curl`).
- **SEO Management**: Accurately categorize legitimate search engine crawlers versus impostors when combined with our IP network data.
