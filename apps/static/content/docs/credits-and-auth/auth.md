---
title: Authentication
description: Learn how to authenticate your API requests using API keys.
icon: i-lucide-shield-check
---

The IP Shield API uses API keys to authenticate requests. You can view and manage your API keys in the [Dashboard](https://ip-shield.riavzon.com/account).

---

<!-- TODO: ADD Screenshots -->
## Creating an API Key

When you first log in to your dashboard, you will be prompted to generate your first API key. During creation, you can configure additional security options to strictly control how and when your key can be used.

### Setting an Expiry Date

To ensure keys are rotated securely, you can set a specific expiration date for your API key. Once the date passes, the key will automatically become invalid and API requests using it will be rejected. You can omit this option if you prefer the key to remain valid indefinitely.

### Restricting Allowed Hosts

For maximum security, you can restrict API access to specific IP addresses. When configured, IP Shield will explicitly reject any API requests originating from unauthorized servers, even if the API key is valid. If left blank, the API key can be used from any network.

## Managing API Keys

From your dashboard, you can create, rotate, and revoke API keys at any time to maintain strict access control over your account.

### Rotating a Key
If you suspect a key has been compromised or simply want to enforce routine key rotation, you can rotate your API key. Rotating generates a brand-new secret key while preserving all of your existing configuration settings—such as host restrictions and expiry dates. 

### Revoking a Key
Revoking an API key immediately and permanently invalidates it. Any systems or applications attempting to authenticate with a revoked key will instantly be denied access.

## Using Your API Key

Authentication to the API is performed via the `x-api-key` header. When making a request, you must include your API key using the `x-api-key` HTTP header.

```bash [Terminal]
curl -X GET "https://api.ip-shield.riavzon.com/api/v1/network/8.8.8.8" \
  -H "x-api-key: YOUR_API_KEY"
```


::warning
Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, or public forums.
::