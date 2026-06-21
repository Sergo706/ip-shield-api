---
title: Network API
description: Deep network intelligence and routing data
icon: i-lucide-network
---

The Network API retrieves deep network intelligence for any IPv4 or IPv6 address. The endpoint returns proxy detection, Tor exit node status, verified bot associations, and Autonomous System Number (ASN) routing data. Use this endpoint to filter traffic based on network origin and infrastructure type.

---

## Endpoint

```bash [Terminal]
curl -X GET "https://ip-shield.riavzon.com/api/v1/network/8.8.8.8" \
  -H "x-api-key: YOUR_API_KEY"
```

The `8.8.8.8` parameter in the URL path represents the target IPv4 or IPv6 address you want to analyze.

## Response Example

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "date": "2025-06-12T00:00:00.000Z",
  "data": {
    "ip": "8.8.8.8",
    "proxy": false,
    "vpn": false,
    "threat_level": 0,
    "is_known_bot": true,
    "bot_details": {
      "bot_owner": "google",
      "creationTime": "2024-03-09T22:00:00.000Z"
    },
    "is_tor_node": true,
    "tor_details": {
      "flags": ["Exit", "Fast", "Running", "Stable", "Valid"],
      "last_seen": "2025-06-12T00:00:00.000Z",
      "exit_probability": 0.015,
      "guard_probability": 0.0,
      "exit_addresses": "185.220.101.45",
      "exit_policy_summary": "accept 80, 443",
      "country": "DE",
      "as_name": "CENSUS-PROV",
      "as_id": "205100"
    },
    "asn": {
      "asn_id": "205100",
      "asn_name": "CENSUS-PROV",
      "classification": "hosting",
      "route_visibility_count": 420
    }
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}
```

### Response Fields

::field-group
  ::field{name="ok" type="boolean"}
    Returns `true` when the request succeeds.
  ::

  ::field{name="date" type="string"}
    This field contains the ISO 8601 timestamp of the response.
  ::

  ::field{name="data.ip" type="string"}
    This field contains the queried IP address.
  ::

  ::field{name="data.proxy" type="boolean"}
    Returns `true` if the IP address acts as a proxy.
  ::

  ::field{name="data.vpn" type="boolean"}
    Returns `true` if the IP address belongs to a Virtual Private Network.
  ::

  ::field{name="data.threat_level" type="number"}
    A score indicating the historical risk of the IP (higher is riskier).
  ::

  ::field{name="data.is_known_bot" type="boolean"}
    Returns `true` if the IP address associates with a known datacenter bot or crawler.
  ::

  ::field{name="data.bot_details" type="object | null"}
    This object provides metadata about the verified bot, or `null` if the IP is not a known bot.
  ::

  ::field{name="data.bot_details.bot_owner" type="string"}
    This field identifies the organization that operates the bot (e.g., Google, Bing).
  ::

  ::field{name="data.bot_details.creationTime" type="string"}
    This field contains the ISO 8601 timestamp when the bot IP was first verified.
  ::

  ::field{name="data.is_tor_node" type="boolean"}
    Returns `true` if the IP address routes through the Tor anonymity network.
  ::

  ::field{name="data.tor_details" type="object | null"}
    This object provides metadata about the Tor relay, or `null` if the IP is not a Tor node.
  ::

  ::field{name="data.tor_details.flags" type="string[] | null"}
    This array lists the consensus flags assigned to the Tor relay.
  ::

  ::field{name="data.tor_details.last_seen" type="string | null"}
    This field contains the ISO 8601 timestamp when the relay was last observed in the consensus.
  ::

  ::field{name="data.tor_details.exit_probability" type="number | null"}
    This value represents the probability that the relay acts as an exit node.
  ::

  ::field{name="data.tor_details.guard_probability" type="number | null"}
    This value represents the probability that the relay acts as a guard node.
  ::

  ::field{name="data.tor_details.exit_addresses" type="string | null"}
    This field lists the known exit IP addresses for the relay.
  ::

  ::field{name="data.tor_details.exit_policy_summary" type="string | null"}
    This field summarizes the port access policy for the exit node.
  ::

  ::field{name="data.tor_details.country" type="string | null"}
    This field provides the two-letter ISO country code where the relay operates.
  ::

  ::field{name="data.tor_details.as_name" type="string | null"}
    This field provides the Autonomous System name hosting the relay.
  ::

  ::field{name="data.tor_details.as_id" type="string | null"}
    This field provides the Autonomous System Number hosting the relay.
  ::

  ::field{name="data.asn" type="object | null"}
    This object provides routing metadata, or `null` if no BGP data exists.
  ::

  ::field{name="data.asn.asn_id" type="string | null"}
    This field provides the Autonomous System Number assigned to the routing provider.
  ::

  ::field{name="data.asn.asn_name" type="string | null"}
    This field provides the name of the Autonomous System organization.
  ::

  ::field{name="data.asn.classification" type="string | null"}
    This field classifies the network type as `hosting`, `eyeballs`, or `unknown`.
  ::

  ::field{name="data.asn.route_visibility_count" type="number | null"}
    This field indicates the number of BGP peers observing routes to this ASN.
  ::

  ::field{name="meta.total_credits" type="number"}
    This field displays the total number of credits allocated to the account plan.
  ::

  ::field{name="meta.credits_remaining" type="number"}
    This field displays the number of credits remaining in the current billing cycle.
  ::
::

## Error Response 

Error responses, such as bad requests or rate limits, return the following JSON format.

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "ok": false,
  "date": "2025-06-12T00:00:00.000Z",
  "reason": "Invalid IP address format"
}
```

### Error Fields

::field-group
  ::field{name="ok" type="boolean"}
    The API always returns `false` for error responses.
  ::

  ::field{name="date" type="string"}
    This field contains the ISO 8601 timestamp of the error event.
  ::

  ::field{name="reason" type="string"}
    This field provides a human-readable message that explains why the request failed.
  ::
::
