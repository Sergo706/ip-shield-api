---
title: Credits & Usage
description: Understand how API credits are calculated and consumed.
icon: i-lucide-coins
---

# Credits & Usage

Every request made to the IP Shield API consumes credits. Your total available credits depend on your current subscription plan.

The only supported plan for now is the free plan, which gives you 1,000 credits per month and allows up to 50 requests per second.

::note
If you require more usage, even if premium plans are not yet published, please [reach out](/contact) to us.
::

## Viewing Credit Balance

You can view your credit usage in your [Dashboard](/account){target="_self" external="true"}. 

Additionally, every successful API response includes a `meta` object detailing your current credit limits and the remaining balance.

```json
{
  "ok": true,
  "date": "iso date",
  "data": {
    // ... endpoint response payload
  },
  "meta": {
    "total_credits": 1000,
    "credits_remaining": 984
  }
}
```

## Cost Per Endpoint

All endpoints across the Network, Geo, and Threat APIs are priced at 1 credit per successful lookup.

::note
Failed requests do not consume your quota.
::

## Depleted Credits

If you exceed your monthly credit quota, the API will reject further requests and return a `429 Too Many Requests` status code with the following response:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "ok": false,
  "date": "2024-03-24T12:00:00.000Z",
  "reason": "Monthly quota exceeded"
}
```

Your service will automatically resume when your billing cycle resets.
