---
title: Lookup IP API
description: Standard IP data lookup
icon: i-lucide-search
---

The Lookup IP API provides a intelligence profile for any IP address. The endpoint returns geographic data, network carrier metadata, and core risk indicators including proxy, VPN, and Tor usage. Use this endpoint to assess visitor risk and localize content.

---

## Endpoint

```bash [Terminal]
curl -X GET "https://api.ip-shield.riavzon.com/api/v1/lookup/ip/93.184.216.34" \
  -H "x-api-key: YOUR_API_KEY"
```

The `93.184.216.34` parameter in the URL path represents the target IPv4 or IPv6 address you want to look up.

## Response Example

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "date": "2025-06-12T00:00:00.000Z",
  "data": {
    "ip": "93.184.216.34",
    "location": {
      "country": "United States",
      "country_code": "US",
      "region": "Massachusetts",
      "city": "Norwell",
      "language_iso639": "en-US",
      "timezone": "America/New_York",
      "latitude": "42.1615",
      "longitude": "-70.7928"
    },
    "proxy": false,
    "vpn": false,
    "threat_level": 0,
    "is_known_bot": false,
    "tor": false,
    "network": {
      "asn_id": "15133",
      "asn_name": "EDGECAST",
      "classification": "hosting"
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
    Indicates whether the request was successful (`true`).
  ::

  ::field{name="date" type="string"}
    ISO 8601 timestamp of when the response was generated.
  ::

  ::field{name="data.ip" type="string"}
    The IP address that was queried.
  ::

  ::field{name="data.location.country" type="string"}
    The full name of the country.
  ::

  ::field{name="data.location.country_code" type="string"}
    Two-letter ISO 3166-1 alpha-2 country code.
  ::

  ::field{name="data.location.region" type="string"}
    The primary administrative division (e.g., state or province).
  ::

  ::field{name="data.location.city" type="string"}
    The city where the IP is located.
  ::

  ::field{name="data.location.language_iso639" type="string"}
    Primary language spoken, in ISO 639 format.
  ::

  ::field{name="data.location.timezone" type="string"}
    The IANA timezone database name (e.g., `America/New_York`).
  ::

  ::field{name="data.location.latitude" type="string"}
    Estimated latitude coordinate.
  ::

  ::field{name="data.location.longitude" type="string"}
    Estimated longitude coordinate.
  ::

  ::field{name="data.proxy" type="boolean"}
    `true` if the IP is acting as a generic proxy.
  ::

  ::field{name="data.vpn" type="boolean"}
    `true` if the IP belongs to a Virtual Private Network.
  ::

  ::field{name="data.threat_level" type="number"}
    A score indicating the historical risk of the IP (higher is riskier).
  ::

  ::field{name="data.is_known_bot" type="boolean"}
    `true` if the IP is associated with a known crawler such as googlebot.
  ::

  ::field{name="data.tor" type="boolean"}
    `true` if the IP is part of the Tor anonymity network.
  ::

  ::field{name="data.network.asn_id" type="string"}
    The Autonomous System Number (ASN) assigned to the routing provider.
  ::

  ::field{name="data.network.asn_name" type="string"}
    The name of the Autonomous System organization.
  ::

  ::field{name="data.network.classification" type="string"}
    The network type classification (`hosting`, `eyeballs`, `unknown`).
  ::

  ::field{name="meta.total_credits" type="number"}
    The total number of credits allocated to your account's plan.
  ::

  ::field{name="meta.credits_remaining" type="number"}
    The number of credits remaining in your current billing cycle.
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
