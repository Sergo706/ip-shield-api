---
title: Verified Bots & Crawlers API
description: Accurately identify legitimate search engine crawlers and automated agents using official provider geofeeds—no slow DNS lookups required.
hasMarkDownContent: false
hero:
  badge: SEO Protection
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "66.249.66.1",
        "proxy": false,
        "vpn": false,
        "threat_level": 0,
        "is_known_bot": true,
        "bot_details": {
          "bot_owner": "google",
          "creationTime": "2024-03-09T22:00:00.000Z"
        },
        "is_tor_node": false,
        "tor_details": null,
        "asn": {
          "asn_id": "15169",
          "asn_name": "GOOGLE",
          "classification": "Search Engine",
          "route_visibility_count": 2679
        }
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Pre-Fetched Official Geofeeds
    description: Unlike legacy systems that rely on slow and spoofable reverse/forward DNS lookups, our engine proactively fetches official IP ranges directly from verified providers (Google, Bing, OpenAI, etc.).
    orientation: horizontal
    image:
      src: '/products/verified_bots_abstract.png'
      alt: 'Search engine verification abstract visualization'
    features:
      - title: 100% Accuracy
        description: Traffic flagged as a known bot is mathematically guaranteed to belong to that provider's published infrastructure.
        icon: i-lucide-check-circle
      - title: Zero Latency
        description: Bypassing DNS queries means bot verification happens in-memory at the edge in less than 1 millisecond.
        icon: i-lucide-zap
      - title: Broad Provider Support
        description: We track IP ranges for Google, Bing, OpenAI, Meta, Apple, DuckDuckGo, Ahrefs, and more.
        icon: i-lucide-bot

  - title: AI Scraper & Crawler Protection
    description: Control how AI models and specialized web crawlers access your content. Quickly allow, limit, or block agents like OpenAI's GPTBot, CommonCrawler, or Ahrefs based on verified IP ownership.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/full_geo_network_abstract.png'
      alt: 'Network routing abstract visualization'
    features:
      - title: OpenAI Detection
        description: Accurately identify GPTBot, ChatGPT User, and SearchBot traffic.
        icon: i-lucide-brain-circuit
      - title: Protect Bandwidth
        description: Block resource-intensive crawlers like SEMrush or Ahrefs if they impact server performance.
        icon: i-lucide-shield-alert
      - title: Prevent Content Scraping
        description: Enforce your robots.txt dynamically by denying access at the network edge.
        icon: i-lucide-file-lock-2

features:
  title: Verified Bot Identification
  description: Stop impostors while rolling out the red carpet for legitimate SEO crawlers.
  items:
    - title: Search Engine Verification
      description: Never accidentally block Googlebot or Bingbot from indexing your site.
      icon: i-lucide-search
    - title: Spoofing Prevention
      description: Automatically catch attackers setting fake Googlebot User-Agents to bypass WAFs.
      icon: i-lucide-user-x
    - title: No Slow DNS Lookups
      description: Avoid the massive latency penalty of standard reverse DNS verification checks.
      icon: i-lucide-server-fast
    - title: Continually Updated
      description: Geofeeds and lists are refreshed regularly to capture provider infrastructure changes.
      icon: i-lucide-refresh-cw
    - title: Simple Integration
      description: The `is_known_bot` boolean flag provides a simple yes/no answer for your firewall rules.
      icon: i-lucide-code
    - title: AI Scraper Controls
      description: Readily identify AI bots like GPTBot to protect your copyrighted data from being ingested.
      icon: i-lucide-brain-circuit
    - title: Broad Coverage
      description: Encompasses all major global and regional search providers and diagnostic bots.
      icon: i-lucide-globe

faqs:
  - label: "How is this different from the User Agent Parser?"
    content: "The User Agent Parser only tells you what the client *claims* to be in their HTTP headers (which is easily spoofed). This Verified Bots API checks the underlying network IP against official provider infrastructure databases to prove *who they actually are*."
    icon: "i-lucide-help-circle"
  - label: "Do you use reverse DNS to verify Googlebot?"
    content: "No. Reverse and forward DNS lookups (rDNS/fDNS) add hundreds of milliseconds of latency and can occasionally fail. Instead, we directly ingest the official IP range JSON feeds published by Google, Bing, OpenAI, and other providers."
    icon: "i-lucide-server"
  - label: "Which bots and crawlers do you track?"
    content: "We currently ingest data for Google (Googlebot, User-Triggered Fetchers), Bing, OpenAI (GPTBot, ChatGPT, SearchBot), Apple (Applebot), Meta/Facebook, X/Twitter, Pinterest, Telegram, DuckDuckGo, Ahrefs, SEMrush, and CommonCrawler."
    icon: "i-lucide-list"
  - label: "How often are the IP ranges updated?"
    content: "Our engine continuously polls the official provider endpoints (JSON, CSV, and HTML pages) and automatically distributes updates to the edge nodes."
    icon: "i-lucide-refresh-ccw"

cta:
  title: Protect your SEO rankings
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
