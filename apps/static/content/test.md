---
title: Test Page
description: A test page to validate all dynamic page features.
hasMarkDownContent: true
hero:
  badge: "Testing all fields"
  image:
    src: /favicon.svg
    alt: Test hero image

sections:
  - title: First Section
    description: This section tests the basic section layout with features.
    icon: i-lucide-layers
    orientation: horizontal
    features:
      - title: Feature A
        description: Testing a feature item inside a section.
        icon: i-lucide-check
      - title: Feature B
        description: Another feature item inside a section.
        icon: i-lucide-zap
    links:
      - label: Learn More
        to: /docs
        icon: i-lucide-arrow-right
        trailing: true
        variant: link
  - title: Second Section
    description: This section tests an image inside a section.
    icon: i-lucide-image
    orientation: horizontal
    image:
      src: /favicon.svg
      alt: Section image
      title: Section Preview

features:
  title: Core Capabilities
  description: Testing the bento grid features section.
  items:
    - title: Lightning Fast
      description: Sub-millisecond response times at the edge.
      icon: i-lucide-zap
    - title: Global Coverage
      description: Data from every corner of the internet.
      icon: i-lucide-globe
    - title: Always Fresh
      description: Databases updated continuously throughout the day.
      icon: i-lucide-refresh-cw
    - title: Privacy First
      description: No user IP logging, ever.
      icon: i-lucide-shield
    - title: Developer Friendly
      description: Clean JSON responses with comprehensive docs.
      icon: i-lucide-code

faqs:
  - label: What is this test page?
    content: This page tests every dynamic field supported by the [slug].vue page generator.
  - label: Does the FAQ schema work?
    content: If you see this in the Schema.org output as a FAQPage with Question and Answer pairs, then yes!
  - label: What about the features grid?
    content: The features section above should render as a bento grid with spotlight cards.

cta:
  title: Ready to get started?
  description: This tests the call-to-action section at the bottom.
  links:
    - label: Get Started
      to: /account
      icon: i-lucide-rocket
      size: xl
    - label: Read the Docs
      to: /docs
      icon: i-lucide-book-open
      variant: outline
      size: xl
---

## Markdown Content Section

This section tests that `hasMarkDownContent: true` correctly renders the markdown body below the structured YAML sections.

### Code Example
```json
{
  "status": "working",
  "test": true
}
```

### List Test
- Item one
- Item two
- Item three

> This is a blockquote to test markdown rendering.
