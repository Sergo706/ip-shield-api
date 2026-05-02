# IP Shield API plan

IP Shield API is a public-facing Nuxt application and Nitro API that turns the
Shield Base data pipeline into a hosted product. It gives developers and
security teams fast IP, ASN, geolocation, threat, crawler, user-agent,
disposable email, and JA4 lookups, while keeping the underlying datasets fresh
through scheduled refresh jobs and versioned data promotion.

This plan favors a fast build and fast deployment path. It keeps the product in
one Nuxt codebase, reuses the existing Riavzon packages already present in this
repo, and limits custom infrastructure to Docker, Caddy, MySQL, and the
standalone auth service.

## Repo scan findings

I reviewed the current `ip-shield-api` repo and the sibling `shield-base-cli`,
`utils`, `auth`, and `auth-H3Client` repos. The stack and exports already cover
most of the foundations needed for an MVP, so the main work is product
assembly, data modeling, and deployment rather than low-level plumbing.

- `ip-shield-api` already depends on `nuxt`, `@nuxt/ui`, `tailwindcss`,
  `@nuxt/content`, `@nuxtjs/seo`, `drizzle-orm`, `mysql2`, `zod`,
  `@riavzon/shield-base`, `@riavzon/utils`, and `@riavzon/auth-h3client`.
- `@riavzon/shield-base` already exports the dataset builders needed for ASN,
  geo, threats, Tor, proxies, crawlers, user agents, disposable emails, JA4,
  and custom `mmdb` or `lmdb` compilation.
- `@riavzon/utils` already exports `scheduleTask`, `run`, `uploadCsv`, and
  `BatchQueue`, which cover recurring jobs, shell execution, bulk imports, and
  buffered writes.
- `@riavzon/auth-h3client` already supports a Nuxt module plus Nitro plugin
  configuration, which fits this repo better than building auth middleware from
  scratch.
- `@riavzon/auth` is already packaged as a standalone service with Docker-based
  deployment patterns, so it can run as a sibling service on the same private
  network.

## Product goals

The product needs a narrow first release so you can ship quickly, validate
demand, and start collecting usage data. The core promise is simple: expose the
Shield Base datasets through a reliable hosted API, keep them fresh, and give
customers a clean upgrade path from free usage to paid plans.

- Ship a public API for IP and network intelligence backed by Shield Base data.
- Keep datasets fresh through scheduled fetch, compile, validate, and promote
  jobs.
- Reuse Nuxt and Nitro as much as possible so the frontend, marketing pages,
  dashboard, docs, and API live in one codebase.
- Offer three tiers with clear rate limits, quotas, and upgrade incentives.
- Support self-serve billing with Stripe and privacy-focused billing with
  Monero.
- Keep deployment simple enough for one-command local startup and
  straightforward VPS rollout with Docker and Caddy.

## Product scope

The first version must solve the high-value lookups that make Shield Base
useful as a hosted service. The API surface can expand later, but the initial
release must center on lookup speed, freshness transparency, and account-level
access control.

- Single IP lookup with merged response data.
- Bulk IP lookup for Pro and Custom customers.
- Focused endpoints for ASN, geo, threat, proxy, Tor, crawler, user-agent,
  disposable email, and JA4 checks.
- Dataset freshness metadata, service health, and version endpoints.
- Public marketing site, pricing page, docs, signup flow, dashboard, and API
  key management UI.
- Admin tooling for refresh runs, dataset versions, customer entitlements, and
  billing state.

## Non-goals for the first release

The first release needs restraint. Anything that increases surface area without
improving adoption or revenue can wait until the product has real traffic and
customer feedback.

- Building a separate frontend app outside Nuxt.
- Building a custom auth server inside this repo.
- Supporting every possible Shield Base export format in the public API.
- Offering self-serve custom dataset uploads on day one.
- Building a full internal analytics platform before the API is live.

## Pricing and entitlements

The pricing model must be simple enough to explain on one page and strict
enough to protect the free tier from abuse. You can start with conservative
limits and adjust them once you have live traffic data.

| Tier | Audience | Price | Limits | Included features |
| --- | --- | --- | --- | --- |
| Free | Developers and evaluation users | $0 | 50 requests per minute, 500 requests per hour | Single lookup, basic dashboard, API key, freshness metadata |
| Pro | Small teams and production users | $30 per month | Higher per-minute and per-hour limits plus a monthly quota large enough for production use | Bulk lookup, more API keys, usage history, webhook-ready billing |
| Custom | Enterprises and partners | Contact sales | Negotiated limits, with a starting target near 3 million requests per month | Custom data compilation, dedicated datasets, priority support, higher limits |

The exact Pro limits need tuning during implementation. A practical starting
point is 300 requests per minute, 10,000 requests per hour, and a monthly quota
in the low hundreds of thousands. The Custom tier can start near 3 million
requests per month and scale higher through contract terms.

## Payment model

The billing design needs one automated path and one flexible path. Stripe is
the default self-serve option for Free to Pro upgrades, while Monero works
better as an invoice-based or manually approved path until the core billing
flows are stable.

| Method | Initial role | Notes |
| --- | --- | --- |
| Stripe | Primary self-serve billing | Handle checkout, subscription lifecycle, customer portal, failed payment events, and webhook-driven plan changes |
| Monero | Manual or semi-automated billing | Start with invoice issuance plus operator approval, then automate wallet confirmation later if demand justifies it |

This split keeps the first launch realistic. Stripe carries the subscription
logic, and Monero gives you a privacy-oriented option without forcing complex
wallet automation into the first milestone.

## Core architecture

The fastest architecture is a single Nuxt application with Nitro route handlers
for the public API, dashboard pages in the same app, and a small number of
supporting services on the same Docker network. This keeps development fast,
reduces deployment complexity, and matches the dependencies already present in
the repo.

| Layer | Technology | Role |
| --- | --- | --- |
| Web app and API | Nuxt 4 + Nitro + Nuxt UI + Tailwind | Marketing site, dashboard, docs, and public API |
| Validation and shared types | Zod + shared TypeScript types | Request validation, response contracts, and env validation |
| App database | MySQL + Drizzle ORM | Users, API keys, plans, subscriptions, usage, refresh runs, and dataset metadata |
| Auth gateway | `@riavzon/auth-h3client` | Nuxt-side auth integration and middleware |
| Auth service | `@riavzon/auth` | Standalone authentication service on a private Docker network |
| Data pipeline | `@riavzon/shield-base` | Fetch, compile, and version source datasets |
| Jobs | `scheduleTask` and `BatchQueue` from `@riavzon/utils` | Recurring refresh jobs and buffered background writes |
| Reverse proxy | Caddy | TLS, compression, routing, and public entrypoint |
| Containers | Docker Compose | Local dev parity and VPS deployment |

## Nuxt-first implementation strategy

Nuxt already gives you most of what this project needs. The plan must lean on
that instead of rebuilding solved problems in parallel services.

- Use `server/api` for the public API and internal dashboard endpoints.
- Use `server/plugins` for auth, database, billing, and dataset registry setup.
- Use `server/middleware` for API key resolution, plan enforcement, and request
  tracing.
- Use `app/pages` and Nuxt UI for marketing, pricing, docs, login, dashboard,
  and account flows.
- Use `@nuxt/content` for docs and changelog content only when Git-based
  publishing and a content deployment step are acceptable.
- Use `@nuxtjs/seo`, `nuxt-feedme`, and `nuxt-llms` for search, feeds, and
  machine-readable docs without extra infrastructure.
- Use Nitro storage and cached handlers where short-lived caching reduces
  repeat read pressure on the database and artifacts.

## Content publishing strategy

Nuxt Content and Nuxt Studio solve authoring well, but they do not eliminate
the publish boundary. In a standard Nuxt Content setup, content is imported,
parsed, and written into a generated content database dump that is then served
by the deployed app. That means content changes are still part of a publish or
deployment workflow rather than true live runtime mutations of the running
server.

Nuxt Studio is therefore a good fit for Git-based docs, blog posts, changelog
entries, and marketing content when a controlled publish step is acceptable. It
is not the right core strategy if the hard requirement is to change copy on a
live VPS without rebuilding or rolling out a new app artifact.

For this project, the safer production approach is one of these two models.

| Model | Editing experience | Impact on API and dashboard |
| --- | --- | --- |
| Separate docs or marketing deployment using Nuxt Content and optionally Nuxt Studio | Excellent editor workflow with preview and Git history | No impact on the main API and dashboard deployment because content lives on a separate app or subdomain |
| Runtime-managed content stored outside Nuxt Content, such as a database-backed admin or headless CMS | True live edits without rebuilding the app | No redeploy required for content changes, but requires a separate content model and runtime fetch path |

The recommended default for IP Shield API is to keep the API and customer
dashboard stable in the main app, then either move docs and blog content to a
separate Nuxt surface or store frequently edited marketing copy in a runtime
database table or external CMS. Use Nuxt Studio only where a Git-based publish
workflow is acceptable.

## Authentication and account model

Authentication must stay out of the core app logic as much as possible. The app
needs a thin Nuxt integration layer, while the dedicated auth service remains
responsible for identity, sessions, cookies, and security-heavy flows.

- Run `@riavzon/auth` as a separate internal service in Docker.
- Add `@riavzon/auth-h3client/module` to the Nuxt app and configure it through
  a Nitro plugin.
- Use the auth service for signup, login, password reset, session rotation, and
  optional OAuth later.
- Store plan assignment, billing state, API keys, quota usage, and tenant data
  in the app database, not in the auth service.
- Treat auth identity as the user root record and app-side billing data as a
  separate bounded context.

## Data pipeline and freshness strategy

The product value depends on freshness, so refresh logic must be explicit,
versioned, and safe to fail. The app must never serve half-built datasets or
replace good data with broken data.

The refresh pipeline follows a four-step model.

1. Fetch source data with `@riavzon/shield-base`.
2. Compile artifacts into the target `mmdb` or `lmdb` outputs.
3. Validate artifact integrity, record counts, metadata, and expected files.
4. Promote the new version atomically only after validation succeeds.

The initial dataset groups can map directly to Shield Base exports.

| Dataset group | Shield Base source |
| --- | --- |
| ASN and routing | `getBGPAndASN` |
| Geographic data | `getGeoDatas` |
| Threat lists | `getThreatLists` |
| Tor nodes | `getTorLists` |
| Proxy data | `getListOfProxies` |
| Verified crawlers | `getCrawlersIps` |
| Suspicious user agents | `getUserAgentLmdbList` |
| Disposable email domains | `getDisposableEmailLmdbList` |
| JA4 fingerprints | `getJaDatabaseLmdb` |
| Custom customer datasets | `compiler` |

The refresh schedule can start with a pragmatic cadence.

| Dataset group | Refresh target |
| --- | --- |
| Threat, Tor, proxies, and crawlers | Every 6 to 12 hours |
| ASN and geo | Daily |
| User agents, disposable emails, and JA4 | Daily or twice weekly, depending on source churn |
| Custom enterprise datasets | On demand plus optional scheduled refresh |

Use `scheduleTask` for recurring child-process jobs that run on a worker
container, and keep refresh execution out of the request path. Use `BatchQueue`
for non-critical buffered writes such as usage rollups, audit events, or
refresh telemetry.

## Data versioning and artifact storage

Serving fresh data safely requires artifact versioning instead of in-place
mutation. Each successful refresh must create a new immutable version record
and a new artifact directory, then update a single active pointer after
validation.

- Store compiled datasets on a Docker volume or mounted data directory.
- Use a versioned path layout such as `data/sets/<dataset>/<version>/...`.
- Keep a lightweight `current` pointer or active version table in MySQL.
- Record source timestamps, artifact checksums, file sizes, record counts, and
  compile duration for each version.
- Keep the last known good version available for instant rollback.

## Public API design

The API needs one primary lookup contract and several specialized endpoints.
That makes the product easy to understand while still letting customers query
only the dimensions they care about.

A practical first-pass route set looks like this.

```text
GET    /api/v1/lookup/ip/:ip
POST   /api/v1/lookup/ip/bulk
GET    /api/v1/asn/:asn
GET    /api/v1/network/:cidr
POST   /api/v1/check/user-agent
POST   /api/v1/check/email-domain
POST   /api/v1/check/ja4
GET    /api/v1/meta/freshness
GET    /api/v1/meta/version
GET    /api/v1/account/usage
POST   /api/v1/account/api-keys
DELETE /api/v1/account/api-keys/:id
```

The single IP lookup response must merge the most useful fields into one
document. Specialized endpoints can exist where a lighter response or a
different key type makes more sense.

## Rate limiting and entitlement enforcement

Plan enforcement must happen in a predictable order. The app must reject
abusive traffic early, count accepted traffic accurately, and keep upgrade
logic simple.

1. Resolve the caller identity from API key, auth session, or anonymous free
   access path.
2. Load the active plan and limit profile.
3. Apply per-minute and per-hour limits before expensive dataset work.
4. Process the lookup.
5. Write usage events and aggregate counters asynchronously.
6. Surface remaining quota and reset metadata in response headers.

Use two related concepts consistently.

- Limit: a short-window ceiling such as 50 requests per minute.
- Quota: a longer administrative bucket such as a monthly included allocation.

## Database model

The database needs to separate identity from product operations. Most tables
are small and straightforward, which fits a fast Drizzle-first
implementation.

| Area | Initial tables |
| --- | --- |
| Users and orgs | `users`, `organizations`, `organization_members` |
| Auth bridge | `auth_identities`, `session_links` |
| Billing | `plans`, `subscriptions`, `invoices`, `payment_events` |
| API access | `api_keys`, `api_key_scopes`, `rate_limit_buckets` |
| Usage | `usage_events`, `usage_rollups_hourly`, `usage_rollups_monthly` |
| Data pipeline | `dataset_versions`, `refresh_runs`, `refresh_run_logs`, `artifact_files` |
| Enterprise | `custom_datasets`, `custom_dataset_runs`, `custom_dataset_access` |
| Ops | `webhook_events`, `audit_logs`, `support_notes` |

## Frontend plan

The frontend must move fast, communicate trust, and support conversion without
becoming a design project. Nuxt UI and Tailwind are the right choice here
because they reduce setup time and keep the dashboard, pricing, docs, and auth
views visually consistent.

The first frontend release needs these surfaces.

- Landing page with value proposition, dataset coverage, freshness promise, and
  trust signals.
- Pricing page with Free, Pro, and Custom plan comparison plus upgrade actions.
- Docs area with quick start, authentication, rate limits, sample responses,
  and changelog.
- Dashboard with API key management, usage charts, current plan, billing state,
  and recent lookups.
- Admin pages for refresh status, dataset versions, customer accounts, and
  custom dataset requests.

## Billing and subscription flow

Billing needs to stay boring and auditable. The app must treat the payment
provider as an event source, then translate those events into local
entitlement changes.

The Stripe flow can be fully automated.

1. User chooses Pro.
2. App creates a Stripe Checkout Session.
3. Stripe sends webhook events for checkout, renewal, cancellation, and failed
   payments.
4. The app validates the webhook signature and updates local subscription
   state.
5. Plan entitlements update immediately after the local state change.

The Monero flow can start as a controlled operator workflow.

1. User requests Monero checkout from the pricing or sales flow.
2. App creates an invoice record with amount, address, expiry, and status.
3. An operator or watcher process confirms payment.
4. The app activates or renews the subscription locally.
5. The invoice and entitlement changes remain fully auditable.

## Deployment topology

The production deployment can stay simple and still be robust. One VPS or a
small cluster is enough for the first meaningful release.

| Service | Role |
| --- | --- |
| `web` | Nuxt and Nitro application |
| `worker` | Scheduled refresh jobs and heavy background tasks |
| `auth` | Standalone Riavzon auth service |
| `mysql` | Application database |
| `caddy` | Public TLS termination and reverse proxy |

Caddy must be the only public entrypoint. Keep the auth service and MySQL on a
private Docker network, and let Nuxt talk to auth over internal DNS. Persist
dataset artifacts and database data on named volumes or mounted disks.

If the same Nuxt app is ever redeployed in production, use a blue-green or
rolling container swap behind Caddy so a new container becomes healthy before
the old one is removed. That avoids user-visible downtime during normal app
releases, but it still does not change the fact that file-based content updates
remain publish-time changes unless content is split into a separate deployment
or moved to a runtime-managed store.

## Local development workflow

The local workflow must stay close to production without becoming heavy. Docker
Compose gives you predictable startup for infrastructure, while Nuxt keeps the
app loop fast.

- Run MySQL, auth, and Caddy through Docker Compose.
- Run Nuxt in local dev mode for the best frontend and server feedback loop.
- Add a worker command that uses the same codebase and env file as the web app.
- Use seeded plans, test accounts, and test datasets so billing and limit logic
  can be exercised early.
- Add Stripe CLI or a simple webhook forwarder in local dev when Stripe work
  begins.

## Delivery phases

The fastest route is a phased build where each phase ends with a usable product
slice. That keeps momentum high and lets you defer lower-value work until the
core loop is proven.

| Phase | Outcome |
| --- | --- |
| Phase 0 | Project structure, env validation, MySQL, Drizzle schema, auth wiring, Docker Compose, and Caddy local setup |
| Phase 1 | Dataset registry, refresh worker, versioned artifact storage, and admin refresh visibility |
| Phase 2 | Public lookup API, API keys, free-tier limits, usage tracking, and freshness endpoints |
| Phase 3 | Marketing pages, docs, pricing, dashboard, self-serve signup, and Stripe billing |
| Phase 4 | Monero invoices, Pro bulk lookup, admin billing tools, and customer support flows |
| Phase 5 | Custom dataset compilation, enterprise onboarding, advanced quotas, and premium support tooling |

## Definition of done for the MVP

The MVP is done when a new user can sign up, create an API key, hit a stable
lookup endpoint, see usage in the dashboard, and upgrade to Pro through Stripe.
At the same time, the dataset refresh worker must run on schedule, publish new
versions safely, and surface freshness metadata to both users and operators.

Use this checklist to keep scope honest.

- Auth works through the standalone auth service and Nuxt integration.
- At least one merged IP lookup endpoint is production-ready.
- Free and Pro plan enforcement is live and measured.
- Dataset refresh runs without blocking web traffic.
- Billing is auditable and webhook-driven.
- Docker and Caddy deployment works end to end on a fresh host.
- Docs explain authentication, limits, sample requests, and freshness behavior.

## Risks and design constraints

The main product risk is not UI speed or framework choice. It is the
operational discipline required to keep datasets fresh, plans enforced, and
billing states correct while still shipping fast.

- Source availability can vary, so refresh jobs must fail safely and preserve
  the last known good dataset.
- Some Shield Base data sources can be heavy, so the worker must isolate CPU
  and memory pressure from the web container.
- Monero automation can expand quickly in complexity, so it must start with a
  constrained workflow.
- Custom dataset compilation can create support overhead, so keep it
  operator-led until demand is real.
- Free-tier abuse is likely, so API keys, IP throttling, and simple anomaly
  checks must arrive early.

## Recommended initial folder plan

The current repo is still a starter template, so the first implementation pass
must replace the scaffold with a product-oriented layout. A structure like the
following keeps the app organized without overengineering it.

```text
app/
  pages/
  components/
  layouts/
  composables/
content/
  docs/
server/
  api/
  middleware/
  plugins/
  services/
  utils/
  tasks/
db/
  schema/
  migrations/
shared/
  types/
  validators/
scripts/
  refresh/
docker/
  caddy/
data/
```

## Next steps

This document is the product and delivery blueprint. The best immediate move is
to turn it into implementation tickets and land the foundation work before
designing the final public UI.

1. Replace the starter homepage with a real landing page, pricing page, and
   docs shell.
2. Add the database schema, auth plugin, and Docker Compose services for web,
   auth, MySQL, worker, and Caddy.
3. Build the first dataset refresh pipeline and a single merged IP lookup
   endpoint.