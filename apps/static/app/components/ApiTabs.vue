<script setup lang="ts">
import JsonSnippet from './JsonSnippet.vue';

const endpoints = [
  {
    id: 'lookup',
    label: 'Full Lookup',
    icon: 'i-lucide-globe',
    response: `{
  "ok": true,
  "date": "${new Date().toISOString()}",
  "data": {
    "ip": "8.8.8.8",
    "location": {
      "country": "United States",
      "country_code": "US",
      "region": "California",
      "city": "Mountain View",
      "language_iso639": "en-US",
      "timezone": "America/Los_Angeles",
      "latitude": "37.3860",
      "longitude": "-122.0838"
    },
    "proxy": false,
    "vpn": false,
    "threat_level": 0,
    "is_known_bot": false,
    "tor": false,
    "network": {
      "asn_id": "15169",
      "asn_name": "GOOGLE",
      "classification": "hosting"
    }
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  },
  {
    id: 'network',
    label: 'Network',
    icon: 'i-lucide-network',
    response: `{
  "ok": true,
  "date": "${new Date().toISOString()}",
  "data": {
    "ip": "8.8.8.8",
    "proxy": false,
    "vpn": false,
    "threat_level": 0,
    "is_known_bot": true,
    "bot_details": {
      "bot_owner": "Google",
      "creationTime": "2023-01-01T00:00:00Z"
    },
    "is_tor_node": false,
    "tor_details": null,
    "asn": {
      "asn_id": "15169",
      "asn_name": "GOOGLE",
      "classification": "hosting",
      "route_visibility_count": 8945
    }
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  },
  {
    id: 'geo',
    label: 'Geolocation',
    icon: 'i-lucide-map-pin',
    response: `{
  "ok": true,
  "date": "${new Date().toISOString()}",
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
    "state": "CA",
    "nationality": "American",
    "phone": "1",
    "currency": "USD",
    "currency_name": "United States Dollar",
    "currency_symbol": "$",
    "language_iso639": "en-US",
    "tld": ".us",
    "utc_offset": "-07:00",
    "timezone": "America/Los_Angeles",
    "timeZoneName": "Pacific Daylight Time"
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'i-lucide-mail',
    response: `{
  "ok": true,
  "date": "${new Date().toISOString()}",
  "data": {
    "email": "test@example.com",
    "domain": "example.com",
    "is_disposable": false
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  },
  {
    id: 'user-agent',
    label: 'User Agent',
    icon: 'i-lucide-monitor-smartphone',
    response: `{
  "ok": true,
  "date": "${new Date().toISOString()}",
  "data": {
    "useragent": "curl/7.81.0",
    "useragent_rx": "^curl",
    "description": "cURL is a command line tool...",
    "tool": "cURL",
    "category": "scraper",
    "link": "https://curl.se",
    "priority": "high",
    "severity": "medium"
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  },
  {
    id: 'summary',
    label: 'Summary',
    icon: 'i-lucide-list-collapse',
    response: `{
  "ok": true,
  "date": "${new Date().toISOString()}",
  "data": {
    "ip": "8.8.8.8",
    "country_code": "US",
    "proxy": false,
    "vpn": false,
    "threat_level": 0,
    "is_known_bot": false,
    "is_tor_node": false,
    "classification": "hosting",
    "asn_id": "15169"
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  }
];
</script>

<template>
  <UTabs
    :items="endpoints"
    class="w-full"
    :variant="'link'"
    :ui="{
      list: 'flex flex-wrap gap-2 p-0 pb-5 bg-transparent',
      trigger: 'rounded-full border border-default px-4 py-2 data-[state=active]:bg-elevated data-[state=active]:border-transparent',
      indicator: 'hidden'
    }"
  >
    <template #content="{ item }">
      <JsonSnippet :data="item.response" />
    </template>
  </UTabs>
</template>