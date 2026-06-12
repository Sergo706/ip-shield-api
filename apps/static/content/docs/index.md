---
title: Introduction
description: A comprehensive overview of the IP Shield API, its features, and how to integrate it into your application.
icon: "i-lucide-info"
---

# Welcome to IP Shield

IP Shield is an IP intelligence and threat detection API. It provides instantaneous, sub-millisecond data on incoming traffic, empowering you to block malicious proxies, verify legitimate search engine crawlers, and enforce geographic restrictions effortlessly.

By offloading complex network lookups to our infrastructure, your application remains lightweight and fast while benefiting from world-class security intelligence.

## Built for Speed and Reliability

Traditional IP lookups or reverse DNS checks can add hundreds of milliseconds of latency to your application. 

IP Shield solves this. Our core engine completely self-hosts massive, highly optimized binary routing databases directly in memory at the edge. This means even our most intensive endpoints can execute a half-dozen concurrent database queries (Geo, Tor, VPN, Bots, ASN) and return a payload in single-digit milliseconds—fast enough to use for inline firewall blocking or real-time content routing without your users noticing.

To guarantee high availability for all users, the API supports massive concurrency with an enforced limit of **50 requests per second** per API key.

## What You Can Build

IP Shield provides a complete suite of network intelligence tools accessible via simple REST endpoints:

- **Threat & Proxy Detection:** Catch commercial VPNs, residential proxies, and Tor anonymity nodes before they hit your database.
- **Search Engine Verification:** Protect your SEO bandwidth by instantly verifying if an IP actually belongs to Googlebot, Bing, or OpenAI—no slow DNS lookups required.
- **Deep Geolocation & ASN:** Access city-level mapping and identify the underlying Internet Service Provider (ISP).
- **Fraud Prevention:** Check incoming registrations against known disposable and temporary email domains.
- **Traffic Analysis:** Parse messy HTTP `User-Agent` headers into structured demographic data.

## Flexible Integration

We designed the API to be as flexible as your application needs. 

If you want a 360-degree view of an incoming request, the **Summary API** aggregates Network, Geo, and Threat data into a single, unified JSON payload. Alternatively, if you only need to verify a specific detail, you can use our isolated endpoints (like the **Geo Check** or **Network** APIs) to minimize bandwidth.

---

**Ready to start building?**
Head over to the [Authentication](/docs/credits-and-auth/auth) guide to learn how to securely use your API key, or explore the [API Endpoints](/docs/endpoints) reference to see the data structures in action.