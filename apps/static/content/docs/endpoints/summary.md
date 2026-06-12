---
title: Summary API
description: Full IP intelligence summary
icon: i-lucide-bar-chart-2
---

The Summary API is our most comprehensive endpoint. It executes multiple database lookups concurrently (Network, Geolocation, and Threat) and returns a unified intelligence payload in a single, high-speed response.

---

## Endpoint

```bash [Terminal]
curl -X GET "https://api.ip-shield.riavzon.com/api/v1/summary/1.1.1.1" \
  -H "x-api-key: YOUR_API_KEY"
```

The `1.1.1.1` parameter in the URL path represents the target IPv4 or IPv6 address you want to check.

## Response Example

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "date": "2025-06-12T00:00:00.000Z",
  "data": {
    "ip": "1.1.1.1",
    "country_code": "US",
    "proxy": false,
    "vpn": false,
    "threat_level": 0,
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

  ::field{name="data.country_code" type="string | null"}
    This field provides the two-letter ISO 3166-1 alpha-2 country code.
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

  ::field{name="data.is_tor_node" type="boolean"}
    Returns `true` if the IP address routes through the Tor anonymity network.
  ::

  ::field{name="data.classification" type="string | null"}
    This field classifies the network type as `hosting`, `eyeballs`, or `unknown`.
  ::

  ::field{name="data.asn_id" type="string | null"}
    This field provides the Autonomous System Number assigned to the routing provider.
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
    Always `false` for error responses.
  ::

  ::field{name="date" type="string"}
    ISO 8601 timestamp of when the error occurred.
  ::

  ::field{name="reason" type="string"}
    A human-readable message explaining why the request failed.
  ::
::
