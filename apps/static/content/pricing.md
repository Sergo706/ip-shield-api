---
title: Simple, Transparent Pricing
description: The standard plan is free and always will be. We are currently finalizing premium tiers for custom data hosting and expanded API rate limits.
hasMarkDownContent: true
hero:
  badge: Pricing Plans
  orientation: horizontal
cta:
  title: Ready to get started?
  description: Join our public preview today and lock in your early adopter credit for your first months of premium usage.
  links:
    - label: Register Now
      to: /dashboard/plans
      external: true
      target: _self
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
---

::u-pricing-table
---
tiers:
  - id: 'free'
    title: 'FREE'
    price: '$0'
    description: 'Free forever'
    billingCycle: '/month'
    button:
      label: 'Join waitlist'
      to: /dashboard/plans
      external: true
      target: _self
  - id: 'pro'
    title: 'PRO'
    price: '$30'
    description: 'More generous limits'
    billingCycle: '/month'
    button:
      label: 'Join waitlist'
      to: /dashboard/plans
      external: true
      target: _self
  - id: 'custom'
    title: 'CUSTOM'
    price: 'Custom'
    description: 'Best for large teams & enterprises'
    billingCycle: 'custom'
    button:
      label: 'Join waitlist'
      to: /dashboard/plans
      external: true
      target: _self
sections:
  - title: 'Features'
    features:
      - title: 'Always fresh data'
        tiers:
          free: true
          pro: true
          custom: true
      - title: 'Access to 14 datasets'
        tiers:
          free: true
          pro: true
          custom: true
      - title: 'Bulk lookup'
        tiers:
          free: false
          pro: true
          custom: true
      - title: 'API Keys'
        tiers:
          free: 1
          pro: 3
          custom: 'Contact us'
      - title: 'Support'
        tiers:
          free: false
          pro: 'Basic'
          custom: 'Priority'
      - title: 'Custom datasets'
        tiers:
          free: false
          pro: 1
          custom: 'Contact us'
      - title: 'Rate limits'
        tiers:
          free: '50 requests/min, 1000 total for month'
          pro: '100 requests/min, 3000 total for month'
          custom: 'Contact us'
  - title: 'Early adopter benefits'
    features:
      - title: 'Rate limits from your selected plan'
        tiers:
          free: false
          pro: 'Free for the first 2 months'
          custom: 'Contact us'
---
::
