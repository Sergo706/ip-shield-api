---
title: User Agent Check API
description: Parse and detect malicious user agents
icon: i-lucide-monitor
---

The User Agent Check API parses raw HTTP `User-Agent` headers against a database of malicious patterns. The endpoint classifies the traffic and returns detailed metadata about the scanner, crawler, or tool if it detects a match. Use this endpoint to dynamically block reconnaissance tools and vulnerability scanners at the edge.

---

## Endpoint

```bash [Terminal]
curl -X GET "https://ip-shield.riavzon.com/api/v1/check/user-agent/Nmap%20Scripting%20Engine%207.92" \
  -H "x-api-key: YOUR_API_KEY"
```

The `Nmap%20Scripting%20Engine%207.92` parameter in the URL path represents the URL-encoded `User-Agent` string you want to check.

::tip
Ensure the User-Agent string is properly URL-encoded before sending it in the path to avoid routing errors.
::

## Clean Response Example

When the API determines the User-Agent is safe, it returns a minimal payload indicating the check passed.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "date": "2025-06-12T00:00:00.000Z",
  "data": {
    "clean": true
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}
```

## Malicious Response Example

When the API detects a malicious or suspicious tool, it returns comprehensive data about the matched signature.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "date": "2025-06-12T00:00:00.000Z",
  "data": {
    "useragent": "Nmap Scripting Engine 7.92",
    "useragent_rx": "^Nmap Scripting Engine.*",
    "description": "Nmap Network Mapper",
    "tool": "Scanner",
    "category": "Reconnaissance",
    "link": "https://nmap.org/",
    "priority": "high",
    "severity": "critical"
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
    The API returns `true` when the request succeeds.
  ::

  ::field{name="date" type="string"}
    This field contains the ISO 8601 timestamp of the response.
  ::

  ::field{name="data.clean" type="boolean"}
    This field appears as `true` only if the User-Agent is benign, omitting the threat metadata.
  ::

  ::field{name="data.useragent" type="string | null"}
    This field reflects the raw, decoded User-Agent string that was evaluated.
  ::

  ::field{name="data.useragent_rx" type="string | null"}
    This field provides the underlying regular expression signature that triggered the match.
  ::

  ::field{name="data.description" type="string | null"}
    This field provides a brief description of the detected software or threat actor.
  ::

  ::field{name="data.tool" type="string | null"}
    This field identifies the specific tool or script name.
  ::

  ::field{name="data.category" type="string | null"}
    This field classifies the tool's behavior.
  ::

  ::field{name="data.link" type="string | null"}
    This field provides a reference URL containing more information about the tool.
  ::

  ::field{name="data.priority" type="string | null"}
    This field indicates the urgency of the alert (`none`, `low`, `medium`, `high`, `critical`).
  ::

  ::field{name="data.severity" type="string | null"}
    This field indicates the potential impact of the tool (`none`, `low`, `medium`, `high`, `critical`).
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
  "reason": "Missing user-agent parameter"
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
