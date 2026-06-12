---
title: Rate Limits
description: Details on the IP Shield API rate limits and how to handle them.
icon: i-lucide-gauge
---

To ensure fast response times for all users and protect against abuse, IP Shield enforces rate limits. 

These rate limits are measured in requests **per second**, operate independently of your monthly credit quota, and increase based on your subscription plan.

::note
If you require more usage, even if premium plans are not yet published, please [reach out](/contact) to us.
::

---

## Request Limits

When using your API key, you are allowed up to **50 requests per second** in the free plan. This limit applies across all endpoints tied to your account.


## Handling Rate Limits

If you send too many requests too quickly, the API will reject the request and return a `429 Too Many Requests` status code. 

The response will include a `Retry-After` header, which tells you exactly how many seconds you must wait before trying again, along with a JSON message:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 1
Content-Type: application/json

{
  "ok": false,
  "date": "2024-03-24T12:00:00.000Z",
  "reason": "Too many requests. 50 reqs/second allowed"
}
```

::tip
We strongly recommend configuring your application to automatically pause and wait when it receives a `Retry-After` header.
::

## Automated Bans

If your application ignores the `429` status code and continues to aggressively spam the API while rate-limited, it will trigger an automated ban.

When a ban occurs, the `Retry-After` wait time will double with each consecutive violation. This means a minor timeout can quickly escalate into being locked out for several minutes and hours.

If you receive a `429 Too Many Requests` error, **stop sending requests immediately** and wait the amount of time specified in the `Retry-After` header. Once you wait out the penalty, your access will automatically be restored.

::note
[Reach out](/contact) if you encounter problems
::