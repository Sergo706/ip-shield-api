---
title: Disposable Email Check API
description: Instantly detect temporary, disposable, and free email domains to prevent spam signups.
hasMarkDownContent: false
hero:
  badge: Email Intelligence
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "email": "user@10minutemail.com",
        "domain": "10minutemail.com",
        "is_disposable": true
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Disposable Domain Detection
    description: Protect your platform from spam and free-trial abuse. The API identifies over 150,000 known temporary, throwaway, and 10-minute email domains, allowing you to block fake accounts at the registration gateway.
    orientation: horizontal
    image:
      src: '/products/email_check_1781163874937.png'
      alt: 'Email Scanning and Verification'
    features:
      - title: Burner Domain Lists
        description: Instantly block thousands of known 10-minute and disposable email domains.
        icon: i-lucide-trash-2
      - title: High Accuracy
        description: Domains are verified against continuously updated global blocklists.
        icon: i-lucide-target
      - title: Sub-millisecond Lookups
        description: Evaluate domains directly from edge cache in under 20 milliseconds.
        icon: i-lucide-zap

  - title: Free Provider Classification
    description: Building a B2B SaaS application? Ensure you are capturing high-quality leads by distinguishing between enterprise domains and generic freemail providers like Gmail, Outlook, or Yahoo.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/email_freemail_abstract.png'
      alt: 'Freemail classification abstract visualization'
    features:
      - title: Free Provider Flagging
        description: Easily force enterprise customers to use business emails by flagging free providers.
        icon: i-lucide-flag
      - title: Role-based Detection
        description: Identify generic addresses like admin@ or sales@ to prevent bad leads.
        icon: i-lucide-users
      - title: Clean Lead Data
        description: Ensure your marketing sequences only target real, actionable prospects.
        icon: i-lucide-filter

  - title: Registration Protection
    description: Improve your email deliverability and sender reputation. By stopping invalid and temporary emails before they enter your database, you prevent hard bounces that damage your domain reputation with major inbox providers.
    orientation: horizontal
    image:
      src: '/products/email_protection_abstract.png'
      alt: 'Registration protection abstract visualization'
    features:
      - title: Protect Sender Score
        description: Keep your bounce rates low by only accepting permanent email domains.
        icon: i-lucide-shield-check
      - title: Stop Trial Abuse
        description: Prevent users from creating infinite free trials using burner addresses.
        icon: i-lucide-user-x
      - title: Easy Integration
        description: Add validation to your signup form with a single API call.
        icon: i-lucide-code

features:
  title: Keep Your Userbase Clean
  description: Essential tools for maintaining data hygiene and preventing fraud.
  items:
    - title: 150K+ Blocked Domains
      description: The most comprehensive and continuously updated list of throwaway providers.
      icon: i-lucide-list
    - title: Real-time Updates
      description: As new burner domains are registered, they are automatically added to our edge nodes.
      icon: i-lucide-refresh-cw
    - title: Lightning Fast
      description: Low-latency lookups ensure your signup flow remains frictionless for legitimate users.
      icon: i-lucide-gauge
    - title: Simple JSON Output
      description: Clear, boolean flags make it easy to write conditional logic in your backend.
      icon: i-lucide-braces
    - title: Quota Tracking
      description: Easily monitor your usage directly from the API response metadata.
      icon: i-lucide-credit-card
    - title: Rate Limiting
      description: IP-based rate limiting prevents abuse of your validation endpoints.
      icon: i-lucide-shield-alert
    - title: Edge Deployed
      description: Validation logic runs globally at the edge for maximum performance.
      icon: i-lucide-globe

faqs:
  - label: "How large is your disposable domain list?"
    content: "We track over 150,000 known disposable, temporary, and 10-minute email domains. This list is updated continuously as new burner domains are registered and detected in the wild."
    icon: "i-lucide-list"
  - label: "Are freemail providers (like Gmail) blocked?"
    content: "No. Providers like Gmail, Outlook, and Yahoo are classified as 'freemail', which is tracked as a separate flag from 'disposable' domains. You can choose to block freemail if you only want B2B signups, but they are not considered disposable."
    icon: "i-lucide-mail"
  - label: "How fast is the lookup?"
    content: "The API evaluates the domain directly from our in-memory edge cache, consistently returning a verdict in single-digit milliseconds, ensuring zero friction in your signup flow."
    icon: "i-lucide-zap"
  - label: "What happens if a legitimate domain is blocked?"
    content: "False positives are extremely rare, but if a legitimate corporate domain is flagged, you can whitelist it in your application logic or report it to us for immediate correction."
    icon: "i-lucide-shield-check"
  - label: "Does this API send an email to verify the address?"
    content: "No. This is a passive verification check that analyzes the domain name against our intelligence databases. It does not send any emails or perform SMTP handshakes."
    icon: "i-lucide-eye-off"
  - label: "Can I use this on the frontend?"
    content: "While possible, we strongly recommend implementing this API on your backend to protect your API key and ensure validation cannot be bypassed by malicious users modifying client-side code."
    icon: "i-lucide-server"

cta:
  title: Clean up your signups
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/account'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
---
