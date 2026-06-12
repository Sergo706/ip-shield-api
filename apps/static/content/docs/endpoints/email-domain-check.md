---
title: Email Domain Check API
description: Verify disposable email domains
icon: i-lucide-mail
---

The Email Domain Check API allows you to quickly verify whether an email address belongs to a known temporary or disposable email provider. 

Disposable emails (also known as "burner" or "10-minute" emails) are frequently used by bots, fraudsters, and bad actors to bypass registration flows, abuse free trials, and pollute marketing databases. By checking the domain, you can proactively block spam signups, reduce bounce rates, and ensure you are only onboarding legitimate users.

---

## Endpoint

```bash [Terminal]
curl -X GET "https://api.ip-shield.riavzon.com/api/v1/check/email-domain/user@10minutemail.com" \
  -H "x-api-key: YOUR_API_KEY"
```

The `user@10minutemail.com` parameter in the URL path represents the email address or domain you want to verify.

## Response Example

```http
HTTP/1.1 200 OK
Content-Type: application/json

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
```

### Response Fields

::field-group
  ::field{name="ok" type="boolean"}
    Indicates whether the request was successful (`true`).
  ::

  ::field{name="date" type="string"}
    ISO 8601 timestamp of when the response was generated.
  ::

  ::field{name="data.email" type="string"}
    The full email address that was analyzed.
  ::

  ::field{name="data.domain" type="string"}
    The extracted domain portion of the email.
  ::

  ::field{name="data.is_disposable" type="boolean"}
    `true` if the domain belongs to a known temporary or disposable email provider.
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
  "reason": "Invalid email address format"
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