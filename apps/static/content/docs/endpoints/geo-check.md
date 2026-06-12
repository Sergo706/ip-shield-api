---
title: Geo Check API
description: Check geographic location
icon: i-lucide-map-pin
---

The Geo Check API provides granular, city-level geographic mapping for an IPv4 or IPv6 address. It utilizes  geofeeds and enriched RIR datasets to return accurate location context, enabling you to localize user experiences, enforce geo-blocking, and adapt pricing automatically.

---

## Endpoint

```bash [Terminal]
curl -X GET "https://api.ip-shield.riavzon.com/api/v1/check/geo/8.8.8.8" \
  -H "x-api-key: YOUR_API_KEY"
```

The `8.8.8.8` parameter in the URL path represents the target IPv4 or IPv6 address you want to check.

## Response Example

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "date": "2025-06-12T00:00:00.000Z",
  "data": {
    "ip": "8.8.8.8",
    "country_code": "US",
    "region": "California",
    "continent": "North America",
    "country": "United States",
    "city": "Mountain View",
    "capital": "Washington D.C.",
    "subregion": "Northern America",
    "zip_code": "94035",
    "latitude": "37.3860",
    "longitude": "-122.0838",
    "state": "California",
    "nationality": "American",
    "phone": "+1",
    "currency": "USD",
    "currency_name": "United States Dollar",
    "currency_symbol": "$",
    "language_iso639": "en-US",
    "tld": ".us",
    "utc_offset": "-0700",
    "timezone": "America/Los_Angeles",
    "timeZoneName": "Pacific Daylight Time"
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

  ::field{name="data.country_code" type="string"}
    Two-letter ISO 3166-1 alpha-2 country code.
  ::

  ::field{name="data.region" type="string"}
    The primary administrative division (e.g., state or province).
  ::

  ::field{name="data.continent" type="string"}
    The continent where the IP is located.
  ::

  ::field{name="data.country" type="string"}
    The full name of the country.
  ::

  ::field{name="data.city" type="string"}
    The city where the IP is located.
  ::

  ::field{name="data.capital" type="string"}
    The capital city of the country.
  ::

  ::field{name="data.subregion" type="string"}
    The broader geographical subregion.
  ::

  ::field{name="data.zip_code" type="string"}
    The postal or zip code of the location.
  ::

  ::field{name="data.latitude" type="string"}
    Estimated latitude coordinate.
  ::

  ::field{name="data.longitude" type="string"}
    Estimated longitude coordinate.
  ::

  ::field{name="data.state" type="string"}
    Alias for region or specific state name.
  ::

  ::field{name="data.nationality" type="string"}
    The nationality demonym of the country.
  ::

  ::field{name="data.phone" type="string"}
    The international calling code prefix.
  ::

  ::field{name="data.currency" type="string"}
    Three-letter ISO 4217 currency code.
  ::

  ::field{name="data.currency_name" type="string"}
    The full name of the local currency.
  ::

  ::field{name="data.currency_symbol" type="string"}
    The local currency symbol.
  ::

  ::field{name="data.language_iso639" type="string"}
    Primary language spoken, in ISO 639 format.
  ::

  ::field{name="data.tld" type="string"}
    The country code top-level domain.
  ::

  ::field{name="data.utc_offset" type="string"}
    The current UTC time offset of the location.
  ::

  ::field{name="data.timezone" type="string"}
    The IANA timezone database name (e.g., `America/Los_Angeles`).
  ::

  ::field{name="data.timeZoneName" type="string"}
    The human-readable name of the timezone.
  ::

  ::field{name="meta.total_credits" type="number"}
    The total number of credits allocated to your account's plan.
  ::

  ::field{name="meta.credits_remaining" type="number"}
    The number of credits remaining in your current billing cycle.
  ::
::

## Error Response 

Error responses, such as bad requests or rate limits, return the following JSON format:

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
