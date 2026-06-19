---
title: User Agent & Bot Parser API
description: Parse user agents and cross-verify IPs to identify legitimate search engine crawlers and flag malicious scrapers.
hasMarkDownContent: false
hero:
  badge: Traffic Analysis
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00.000Z",
      "data": {
        "useragent": "Nmap Scripting Engine 7.92",
        "useragent_rx": "^Nmap Scripting Engine.*",
        "description": "Nmap Network Mapper",
        "tool": "Scanner",
        "category": "Reconnaissance",
        "link": "https://nmap.org/",
        "priority": "high",
        "severity": "critical"
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Bot & Scraper Detection
    description: Raw User-Agent strings are messy, frequently spoofed, and hard to analyze. The Bot Parser normalizes these strings into structured data, allowing you to easily identify automated scripts, HTTP libraries, and known scraping tools.
    orientation: horizontal
    image:
      src: '/products/bot_parser_1781163885187.png'
      alt: 'Bot Parsing and Traffic Analysis'
    features:
      - title: Malicious Bot Detection
        description: Catch automated scrapers and headless browsers instantly.
        icon: i-lucide-bot
      - title: Programmatic Blocking
        description: Easily drop requests coming from default programmatic agents like Python Requests or curl.
        icon: i-lucide-shield-alert
      - title: Vulnerability Scanners
        description: Detect and block automated tools probing your application for security flaws.
        icon: i-lucide-scan

  - title: Search Engine Verification
    description: Attackers frequently change their User-Agent to masquerade as Googlebot or Bingbot to bypass WAF rules. True verification requires cross-referencing the claimed identity with the underlying network infrastructure.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/bot_verification_abstract.png'
      alt: 'Search engine verification abstract visualization'
    features:
      - title: SEO Management
        description: Accurately categorize legitimate search engine crawlers versus impostors.
        icon: i-lucide-search
      - title: Spoof Detection
        description: (When combined with the Network API) mathematically verify if the IP ownership matches the claimed crawler.
        icon: i-lucide-user-x
      - title: Crawler Metadata
        description: Retrieve detailed information about the exact crawler tool and category.
        icon: i-lucide-info

  - title: Device & Browser Parsing
    description: Extract meaningful demographic data from complex HTTP headers. The parser returns structured information about the device type, operating system, and browser rendering engine.
    orientation: horizontal
    image:
      src: '/products/bot_device_abstract.png'
      alt: 'Device and browser parsing abstract visualization'
    features:
      - title: Device Extraction
        description: Identify if the traffic originates from Mobile, Tablet, Desktop, or Smart TV devices.
        icon: i-lucide-monitor-smartphone
      - title: OS Identification
        description: Parse out the exact operating system (Windows, macOS, iOS, Android).
        icon: i-lucide-laptop
      - title: Actionable Analytics
        description: Build accurate demographic and device usage reports from normalized data.
        icon: i-lucide-bar-chart

features:
  title: Understand Your Traffic
  description: Convert messy HTTP headers into actionable structured intelligence.
  items:
    - title: Ultra-Fast Parsing
      description: Regex evaluations are optimized using LMDB at the edge for sub-millisecond response times.
      icon: i-lucide-zap
    - title: Continuous Regex Updates
      description: Our parser rules are constantly updated to identify new bots and scraping tools.
      icon: i-lucide-refresh-cw
    - title: Threat Severity
      description: Responses include a severity score (safe, suspicious, malicious) for easy blocking logic.
      icon: i-lucide-shield
    - title: Deep Categorization
      description: Classify traffic into granular categories like "Search Engine", "Uptime Monitor", or "Scraper".
      icon: i-lucide-layers
    - title: Low Payload Size
      description: Streamlined JSON responses keep your application fast and efficient.
      icon: i-lucide-braces
    - title: Rate Limiting
      description: Standard API quota management ensures reliable access without unexpected overages.
      icon: i-lucide-credit-card
    - title: Seamless Integration
      description: Pass the raw header directly in the URL path; we handle the decoding and parsing.
      icon: i-lucide-code

faqs:
  - label: "How do you verify a search engine crawler?"
    content: "While the Bot Parser extracts the claimed identity from the header, you must combine this with our Network API to verify the bot. The Network API instantly checks the IP against our constantly updated database of official provider geofeeds (Google, Bing, OpenAI, etc.) to verify ownership."
    icon: "i-lucide-search"
  - label: "Can attackers spoof User-Agents?"
    content: "Yes, changing a User-Agent is trivial. That is why relying solely on headers is dangerous. Our parser tells you what the client claims to be, but you should use our Network API's is_known_bot flag to verify that claim against the network origin."
    icon: "i-lucide-user-x"
  - label: "Does it extract device types and operating systems?"
    content: "Yes, the parser returns structured data including OS, browser version, device category (mobile, tablet, desktop, smart-tv), and rendering engine, making it perfect for analytics."
    icon: "i-lucide-monitor-smartphone"
  - label: "What happens if the User-Agent is not a bot?"
    content: "If the parser determines the User-Agent is a standard, clean web browser, the API returns a simple `{ clean: true }` payload to minimize bandwidth and processing time."
    icon: "i-lucide-check-circle"
  - label: "How fast is the regex parsing?"
    content: "We use a highly optimized memory-mapped database (LMDB) at the edge to evaluate thousands of regular expressions against the header in under 1 millisecond."
    icon: "i-lucide-gauge"
  - label: "How often are the bot definitions updated?"
    content: "Our threat research team constantly monitors web traffic patterns to identify new scraping tools and headless browser signatures, pushing updates to the edge continuously."
    icon: "i-lucide-refresh-cw"

cta:
  title: Analyze your traffic
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
