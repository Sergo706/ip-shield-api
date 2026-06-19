---
title: Threat Scoring System
description: Combine multiple vectors into a single risk score to dynamically adjust login friction.
hasMarkDownContent: false
hero:
  badge: Security
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "104.28.12.34",
        "country_code": "US",
        "proxy": true,
        "vpn": false,
        "threat_level": 85,
        "is_known_bot": false,
        "is_tor_node": false,
        "classification": "hosting",
        "asn_id": "13335"
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Unified Threat Score
    description: Evaluating individual flags like proxies, VPNs, or Tor nodes can be complex. The Threat Scoring System simplifies this by analyzing multiple threat vectors and returning a unified, actionable risk score from 0 to 100.
    orientation: horizontal
    image:
      src: '/products/threat_score_1781163855831.png'
      alt: 'Unified Threat Score Dashboard'
    features:
      - title: Unified 0-100 Score
        description: Stop guessing with raw data and use a single, reliable metric for access control.
        icon: i-lucide-activity
      - title: Sub-10ms Latency
        description: Highly optimized rule evaluation happens in milliseconds at the edge.
        icon: i-lucide-zap
      - title: Comprehensive Context
        description: The summary payload includes all relevant flags like proxy, ASN, and Tor status alongside the score.
        icon: i-lucide-braces

  - title: Multi-Vector Analysis
    description: A high threat score isn't just about using a proxy. Our algorithms evaluate historical abuse data, routing anomalies, geographical inconsistencies, and known bad-actor infrastructure to compute a highly accurate risk profile.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/threat_multivector_abstract.png'
      alt: 'Multi-vector analysis abstract visualization'
    features:
      - title: Historical Abuse Data
        description: Scores are heavily influenced by known spam, DDoS, and hacking blacklist databases.
        icon: i-lucide-history
      - title: Infrastructure Profiling
        description: Datacenter IPs, bulletproof hosting, and residential proxies receive appropriate risk weights.
        icon: i-lucide-server-crash
      - title: Anonymity Networks
        description: Commercial VPNs and Tor exit nodes are factored into the baseline risk calculation.
        icon: i-lucide-eye-off

  - title: Adaptive Friction Rules
    description: Don't block legitimate users. Instead, use the Threat Score to create adaptive user experiences. Streamline login for low-risk traffic, while applying CAPTCHAs, MFA challenges, or manual review queues for high-risk requests.
    orientation: horizontal
    image:
      src: '/products/threat_friction_abstract.png'
      alt: 'Adaptive friction rules abstract visualization'
    features:
      - title: Low Risk (0-20)
        description: Streamline the checkout or login experience to maximize conversion rates.
        icon: i-lucide-check-circle
      - title: Medium Risk (21-70)
        description: Require a CAPTCHA, email verification, or secondary authentication factor.
        icon: i-lucide-shield-alert
      - title: High Risk (71-100)
        description: Block the request entirely or flag the account for immediate manual review.
        icon: i-lucide-ban

features:
  title: Simplify Your Security Logic
  description: Stop managing complex rulesets and rely on a single, continuously updated metric.
  items:
    - title: Machine Learning Models
      description: Our scoring algorithms adapt to new attack vectors automatically.
      icon: i-lucide-brain
    - title: Single API Call
      description: Get the score, ASN classification, and proxy status in one fast request.
      icon: i-lucide-globe
    - title: Reduce False Positives
      description: Context-aware scoring ensures legitimate privacy tool users aren't incorrectly blocked.
      icon: i-lucide-target
    - title: Protect APIs
      description: Rate-limit or block high-threat IPs from accessing expensive backend resources.
      icon: i-lucide-lock
    - title: Fraud Prevention
      description: Flag high-risk transactions for manual review before capturing funds.
      icon: i-lucide-credit-card
    - title: Easy Integration
      description: Simply check if `threat_level > 75` to apply your security policies.
      icon: i-lucide-code
    - title: Real-time Updates
      description: Threat intelligence is updated continuously as new attacks are detected globally.
      icon: i-lucide-refresh-cw

faqs:
  - label: "How is the threat score calculated?"
    content: "The score (0-100) is aggregated using models that evaluate proxy status, historical abuse lists, ASN reputation, Tor node directory presence, and geographic consistency."
    icon: "i-lucide-calculator"
  - label: "What is considered a high-risk score?"
    content: "A score above 75 typically indicates a highly suspicious or automated connection. We recommend applying CAPTCHA or MFA challenges to scores in this range, and blocking scores above 90."
    icon: "i-lucide-alert-triangle"
  - label: "Can I customize the scoring weights?"
    content: "Currently, the threat scoring engine uses a proprietary weighted algorithm optimized across our global network, but custom enterprise rulesets are coming soon."
    icon: "i-lucide-sliders"
  - label: "Is a VPN user always assigned a high score?"
    content: "No. While using an anonymizing VPN increases the baseline risk score, if the IP has no history of abuse, it will typically stay in the low-to-medium range, preventing false positives for privacy-conscious users."
    icon: "i-lucide-shield-check"
  - label: "Does the summary endpoint return geo data?"
    content: "The summary endpoint returns the ISO country code. If you need city, region, or coordinates, you should use the Granular Geolocation API or the Full IP Lookup API."
    icon: "i-lucide-map"
  - label: "How fast does a threat score decay?"
    content: "Scores are dynamic. As an IP stops exhibiting malicious behavior or is removed from global blocklists, its threat score naturally decays over a period of 7 to 30 days depending on the severity of the past abuse."
    icon: "i-lucide-trending-down"

cta:
  title: Implement Threat Scoring
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
