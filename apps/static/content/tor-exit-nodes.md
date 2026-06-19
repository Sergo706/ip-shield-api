---
title: Tor Exit Node Detection API
description: Block or flag traffic originating from the Tor anonymity network instantly.
hasMarkDownContent: false
hero:
  badge: IP Intelligence
  orientation: horizontal
  json: |
    {
      "ok": true,
      "date": "2025-06-12T00:00:00Z",
      "data": {
        "ip": "185.220.101.12",
        "proxy": true,
        "vpn": false,
        "threat_level": 95,
        "is_known_bot": false,
        "bot_details": null,
        "is_tor_node": true,
        "tor_details": {
          "flags": [
            "Exit",
            "Fast",
            "Running",
            "V2Dir",
            "Valid"
          ],
          "last_seen": "2025-06-12T00:00:00Z",
          "exit_probability": 0.85,
          "guard_probability": 0.12,
          "exit_addresses": [
            "185.220.101.12"
          ],
          "exit_policy_summary": "accept 80, 443",
          "country": "DE",
          "as_name": "TORNODE",
          "as_id": "208294"
        },
        "asn": {
          "asn_id": "208294",
          "asn_name": "TORNODE",
          "classification": "hosting",
          "route_visibility_count": 1054
        }
      },
      "meta": {
        "total_credits": 10000,
        "credits_remaining": 9999
      }
    }
sections:
  - title: Tor Exit Node Detection
    description: The Tor network is widely used to obscure the true origin of network traffic. While sometimes used for legitimate privacy reasons, Tor exit nodes are frequently a source of malicious activity, spam, and hacking attempts. Our API detects this traffic instantly.
    orientation: horizontal
    image:
      src: '/products/tor_exit_1781163834274.png'
      alt: 'Tor Network Exit Node Detection'
    features:
      - title: Up-to-date Exit Nodes
        description: Our lists are synced continuously with the Tor directory authorities.
        icon: i-lucide-refresh-cw
      - title: Low Latency
        description: Lookups take single-digit milliseconds to ensure no slowdowns.
        icon: i-lucide-zap
      - title: Simple Boolean Flag
        description: Easily write logic against the `is_tor_node` property in the response.
        icon: i-lucide-code

  - title: Relay Metadata & Analysis
    description: Beyond simple detection, the API provides rich metadata about the Tor relay itself. Understand the node's capabilities, its geographic location, and its exit probability to make nuanced security decisions rather than blanket blocking.
    orientation: horizontal
    reverse: true
    image:
      src: '/products/tor_relay_abstract.png'
      alt: 'Tor relay metadata abstract visualization'
    features:
      - title: Exit Probability
        description: Assess the mathematical likelihood that the given IP was acting as a Tor exit node.
        icon: i-lucide-percent
      - title: Node Flags
        description: Review raw Tor directory flags (Exit, Fast, Guard) assigned to the relay.
        icon: i-lucide-flag
      - title: Exit Policy Summary
        description: Understand which ports the node allows traffic to exit from (e.g., HTTP/HTTPS only).
        icon: i-lucide-door-open

  - title: Deep Web Traffic Management
    description: Apply the right amount of friction. For consumer e-commerce or sensitive banking applications, blocking Tor entirely is a best practice. For privacy-centric platforms, you can use our intelligence to monitor behavior instead.
    orientation: horizontal
    image:
      src: '/products/tor_traffic_abstract.png'
      alt: 'Deep web traffic management abstract visualization'
    features:
      - title: Spam Prevention
        description: Automatically challenge or block forum sign-ups originating from Tor.
        icon: i-lucide-shield-alert
      - title: Account Security
        description: Prevent unauthorized login attempts from actors masking their true location.
        icon: i-lucide-user-x
      - title: Reduce API Abuse
        description: Stop scrapers and attackers using the Tor network to bypass rate limits.
        icon: i-lucide-lock

features:
  title: Reliable Dark Web Intelligence
  description: Secure your application from anonymous threats.
  items:
    - title: Near Real-time Sync
      description: We monitor the Tor consensus network to detect new relays within minutes.
      icon: i-lucide-clock
    - title: Comprehensive Coverage
      description: Identifies both documented exit nodes and unlisted bridge relays.
      icon: i-lucide-globe
    - title: Combined Threat Context
      description: Tor detection is returned alongside ASN and threat score data.
      icon: i-lucide-braces
    - title: Millisecond Response Times
      description: Designed to be placed in the critical path of authentication flows.
      icon: i-lucide-gauge
    - title: Zero False Positives
      description: Cryptographically verified against the Tor directory authorities.
      icon: i-lucide-check-circle
    - title: Simple Integration
      description: One REST API call gives you complete visibility into the network origin.
      icon: i-lucide-code
    - title: Quota Management
      description: Easy credit tracking with HTTP 429 headers for rate limiting.
      icon: i-lucide-credit-card

faqs:
  - label: "What is a Tor Exit Node?"
    content: "An exit node is the final gateway where encrypted Tor traffic hits the public internet. Traffic originating here is fully anonymous, masking the user's true IP address, and is frequently used for malicious activities or ban evasion."
    icon: "i-lucide-help-circle"
  - label: "How often is the Tor node list updated?"
    content: "We synchronize our intelligence with the Tor directory authorities continuously. The consensus is published roughly every hour, and our edge nodes are updated immediately, ensuring new exit nodes are flagged within minutes of coming online."
    icon: "i-lucide-refresh-cw"
  - label: "Should I block all Tor traffic?"
    content: "It depends on your business. For e-commerce, banking, or sensitive logins, blocking Tor is an industry best practice to prevent fraud. However, if you run a privacy-centric application or a journalism platform, you might just flag the traffic instead."
    icon: "i-lucide-shield-alert"
  - label: "What is the exit_probability field?"
    content: "The exit_probability is a calculated metric (between 0.0 and 1.0) indicating how much of the total Tor network's exit capacity is routed through this specific node. A higher number means the IP is more likely to be the source of the Tor traffic."
    icon: "i-lucide-percent"
  - label: "Can Tor users bypass this detection?"
    content: "No. The nature of the Tor network requires exit nodes to be publicly listed in the directory consensus so Tor clients know how to build circuits. Our API ingests this consensus directly, making bypass impossible."
    icon: "i-lucide-lock"
  - label: "Does this API detect Tor bridges?"
    content: "Tor bridges are entry points used to bypass censorship, not exit points. Since your application only sees the exit node, detecting bridges is not relevant for securing your inbound traffic."
    icon: "i-lucide-eye-off"

cta:
  title: Secure your app from Tor traffic
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
