---
title: Threat Scoring System
description: Combine multiple vectors into a single risk score to dynamically adjust login friction.
hasMarkDownContent: true
hero:
  badge: Security
  orientation: horizontal
cta:
  title: Implement Threat Scoring
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "How is the threat score calculated?"
    content: "The score (0-100) is aggregated using machine learning models that evaluate proxy status, historical abuse, ASN reputation, and geographic consistency."
    icon: "i-lucide-calculator"
  - label: "What is considered a high-risk score?"
    content: "A score above 75 typically indicates a highly suspicious or automated connection. We recommend applying CAPTCHA or MFA challenges to scores in this range."
    icon: "i-lucide-alert-triangle"
  - label: "Can I customize the scoring weights?"
    content: "Currently, the threat scoring engine uses a proprietary weighted algorithm optimized across our global network, but custom enterprise rulesets are coming soon."
    icon: "i-lucide-sliders"
sections:
  - title: Highlight Features
    description: Unified risk assessment.
    orientation: horizontal
    image:
      src: '/products/threat_score_1781163855831.png'
      alt: 'Threat Dashboard'
    features:
      - title: Unified 0-100 Score
        description: Stop guessing with raw data and use a single, reliable metric.
        icon: i-lucide-activity
      - title: Adaptive Friction
        description: Trigger CAPTCHAs or 2FA only for high-risk traffic scores.
        icon: i-lucide-sliders
      - title: Historical Abuse Data
        description: Scores are heavily influenced by known spam and hacking blacklist databases.
        icon: i-lucide-history
---

## Unified Threat Intelligence

Evaluating individual flags like proxies or Tor can be complex. The Threat Scoring System simplifies this by analyzing multiple threat vectors and returning a unified, easy-to-understand risk score from 0 to 100.

### How it Works
The scoring algorithm takes into account:
- Known malicious activity histories
- Presence on spam or abuse blacklists
- Anonymization network usage (VPNs, Proxies, Tor)
- Traffic anomalies from specific ASNs

### API Endpoint

```http
GET https://ip-shield.riavzon.com/v1/summary/{ip_address}
```

### Adaptive Friction
Use the Threat Score to create adaptive user experiences:
- **Low Risk (0-20)**: Streamlined login experience.
- **Medium Risk (21-70)**: Require a CAPTCHA or secondary verification.
- **High Risk (71-100)**: Block the request entirely or flag the account for manual review.
