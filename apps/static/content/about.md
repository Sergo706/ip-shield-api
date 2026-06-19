---
title: About IP Shield
description: The Trusted source for IP Address data.
hasMarkDownContent: true
hero:
  badge: "IP intelligence data"
cta:
  title: Ready to secure your infrastructure?
  description: Join developers who trust IP Shield for their daily threat intelligence.
  links:
    - label: Get Started Free
      to: /account
      external: true
      target: _self
      icon: i-lucide-rocket
      size: xl
---

## Built for Scale, Designed for Security
IP Shield was born out of frustration with slow, outdated, and expensive IP lookup services. Traditional APIs require network hops that add latency to every request. We solved this by bringing the intelligence to the edge. IP Shield is built upon **[Shield Base](https://docs.riavzon.com/docs/shield-base)**, our open-source CLI data aggregator that completely revolutionizes how threat intelligence is compiled and distributed.

## The Shield Base Engine
Behind IP Shield's lightning-fast API is the Shield Base engine. It acts as our central nervous system, continually aggregating data from over a dozen disparate public and private sources. This includes BGP routing tables, global geographic registries (RIRs), FireHOL threat lists, Tor exit node metrics, and verified search engine geofeeds. 

Rather than relying on traditional SQL or NoSQL stores which add query overhead, Shield Base compiles this massive ingestion pipeline into highly optimized, memory-mapped binary formats (`.mmdb` and `.mdb`/LMDB). This means our API reads data directly from memory without blocking operations—enabling sub-millisecond response times at the edge.

## Millions of Signals, Updated Daily
The internet's topology shifts constantly. Our databases consist of over **10 million active entries**. Shield Base constantly crawls multiple sources to keep this data pristine:

- **BGP & ASN Data**: Deep mapping of Autonomous System Numbers and prefix routing.
- **Geographic Precision**: Pinpoint IP-to-city mappings using RFC 8805 Geofeeds and enriched geographic datasets.
- **Threat Intelligence**: Tiered security blocklists covering recent attacks, spyware, active viruses, and aggressive tracking bots.
- **Anonymity Networks**: Live tracking of Tor exit nodes, I2P relays, and public proxy servers.
- **Verified Crawlers & User Agents**: Fingerprinting legitimate search engines (Google, Bing) while maintaining LMDB blocklists for malicious HTTP clients and disposable email domains.

Data sets are refreshed continuously. When Shield Base compiles a new database, IP Shield's edge nodes seamlessly swap to the latest memory map with zero downtime.

## Privacy First Approach
We don't log your users' IPs. We provide the intelligence and get out of the way. All data processing is done in-memory on the edge to ensure maximum privacy and compliance with global data protection standards.
