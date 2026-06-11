---
title: Disposable Email Check API
description: Instantly detect temporary, disposable, and free email domains to prevent spam signups.
hasMarkDownContent: true
hero:
  badge: Email Intelligence
  orientation: horizontal
cta:
  title: Clean up your signups
  description: Get 1,000 free requests per month when you register.
  links:
    - label: Get API Key
      to: 'https://ip-shield.riavzon.com/dashboard'
      color: primary
      size: lg
      icon: i-lucide-arrow-right
      trailing: true
faqs:
  - label: "How large is your disposable domain list?"
    content: "We track over 150,000 known disposable, temporary, and 10-minute email domains, updated continuously as new burner domains are registered."
    icon: "i-lucide-list"
  - label: "Are freemail providers (like Gmail) blocked?"
    content: "No. Providers like Gmail, Outlook, and Yahoo are classified as 'freemail', which is tracked as a separate boolean flag from 'disposable' domains."
    icon: "i-lucide-mail"
  - label: "How fast is the lookup?"
    content: "The API evaluates the domain directly from our edge cache, consistently returning a verdict in under 20 milliseconds."
    icon: "i-lucide-zap"
sections:
  - title: Highlight Features
    description: Keep your userbase clean.
    orientation: horizontal
    image:
      src: '/products/email_check_1781163874937.png'
      alt: 'Email Scanning'
    features:
      - title: Burner Domain Lists
        description: Block thousands of known 10-minute and disposable email domains.
        icon: i-lucide-trash-2
      - title: Free Provider Flagging
        description: Force enterprise customers to use business emails by flagging free providers.
        icon: i-lucide-flag
      - title: Role-based Detection
        description: Identify generic emails like admin@ or sales@ to prevent bad leads.
        icon: i-lucide-users
---

## Stop Fake Accounts at the Source

Protect your platform from spam, abuse, and free-trial abuse by verifying email domains at registration. The Disposable Email Check API identifies temporary inboxes, throwaway domains, and common free email providers.

### Capabilities
- **Disposable Domains**: Detect hundreds of thousands of known burner email domains (e.g., Mailinator, 10 Minute Mail).
- **Free Providers**: Categorize generic free providers like Gmail, Yahoo, and Outlook.
- **Role-Based Addresses**: Identify generic role addresses like `admin@` or `support@`.

### API Endpoint

```http
GET https://ip-shield.riavzon.com/v1/check/email-domain/{email_address}
```

### Improve Data Quality
- Require a business email address for enterprise B2B trials.
- Prevent attackers from creating thousands of fake accounts using temporary domains.
- Ensure your marketing emails are reaching real, permanent inboxes to protect your sender reputation.
