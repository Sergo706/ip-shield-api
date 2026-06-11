<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import ApiTabs from '~/components/ApiTabs.vue';
import JsonSnippet from '~/components/JsonSnippet.vue';


const { data: page } = await useAsyncData('home', async () => {
  return await queryCollection('index').first();
});

definePageMeta({
  layout: 'default'
});

useHead({
  bodyAttrs: {
    class: 'overflow-x-hidden'
  }
});

useSchemaOrg([
  defineWebPage({
    name: page.value?.title,
    description: page.value?.description,
    potentialAction: [
      {
        '@type': 'RegisterAction',
        target: ['https://ip-shield.riavzon.com/account']
      }
    ]
  })
]);

if (import.meta.server) {
  defineOgImage('Image', {
    title: page.value?.title,
    description: page.value?.description,
  });
}
const lookup = ref(`{
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
      "latitude": 37.386,
      "longitude": -122.0838
    },
    "proxy": false,
    "vpn": false,
    "threat_level": "low",
    "is_known_bot": false,
    "tor": false,
    "network": {
      "asn_id": 15169,
      "asn_name": "GOOGLE",
      "classification": "hosting"
    }
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`);

</script>
<template>
  <SeoMetaData
    v-if="page"
    :page="page"
    :is-writing="false"
  />

  <UPageBody
    v-if="page"
    class="relative"
  >
    <div class="absolute top-[10%] -left-64 w-[600px] h-[600px] rounded-full bg-primary/30 dark:bg-primary/5 blur-[150px] animate-float-slow pointer-events-none" />

    <div class="absolute top-[30%] -right-64 w-[500px] h-[500px] rounded-full bg-emerald-500/20 dark:bg-emerald-500/4 blur-[130px] animate-float-delayed pointer-events-none" />

    <div class="absolute top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-amber-500 dark:bg-amber-500/4 blur-[100px] animate-pulse-slow pointer-events-none" />
    
    <UPageHero
      v-if="page.hero"
      :title="page.title"
      :description="page.description"
      :orientation="'horizontal'"
      :links="page.hero.links"
      :ui="{
        container: 'gap-12 lg:gap-16'
      }"
    >
      <template #top>
        <NodeNetwork />
      </template>


      <template #default>
        <div class="flex items-center justify-center w-full h-full lg:pl-8 mt-12 lg:mt-0">
          <HeroTerminal />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :icon="section.icon"
      :orientation="section.orientation"
      :features="section.features"
      :links="section.links"
      :ui="{ root: 'relative overflow-hidden' }"
    > 
      <div v-if="section.title === 'Detect Proxies, VPNs & Geolocation'">
        <WindowFrame
          :title="'/api/v1/lookup/ip/8.8.8.8'"
          :animate="true"
        >
          <JsonSnippet 
            :data="lookup"
          />
        </WindowFrame>
      </div>


      <template
        v-if="section.title === 'One API Call. Complete Intelligence.'" 
        #top
      > 
        <div class="pointer-events-none absolute inset-0 bg-center bg-grid-white bg-[length:16px_16px] [mask-image:radial-gradient(white,transparent_85%)]" />
      </template>
      
      <template
        v-if="section.title === 'One API Call. Complete Intelligence.'" 
        #bottom
      >
        <ApiTabs />
      </template>

      
      <WindowFrame
        v-if="section.image"
        :title="section.image.title"
        :animate="true"
      >
        <NuxtImg
          :src="section.image.src"
          :alt="String(section.image.alt || '')"
          :height="section.image.height"
          class="w-full"
          loading="lazy"
          quality="90"
        />
      </WindowFrame>
    </UPageSection>

    <UPageSection
      v-if="page.features"
      :title="page.features.title"
      :description="page.features.description"
    >
      <template
        #top
      > 
        <div class="pointer-events-none absolute inset-0 bg-center bg-grid-white bg-[length:16px_16px] [mask-image:radial-gradient(white,transparent_85%)]" />
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        <UPageCard
          v-for="(card, i) in page.features.items"
          :key="i"
          :class="[
            i === 0 ? 'lg:col-span-2' : '',
            i === page.features.items.length - 1 ? 'lg:col-span-2' : ''
          ]"
          spotlight
          variant="subtle"
          v-bind="card"
          :to="card.to"
          :target="card.target"
        />
      </div>
    </UPageSection>
  </UPageBody>
  
  <USeparator class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]" />
  <UPageCTA
    v-if="page && page.cta"
    :title="page.cta.title"
    class="overflow-hidden relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
    variant="naked"
    :description="page.cta.description"
    :links="page.cta.links"
  > 
    <Stars />
  </UPageCTA>
</template>

<style scoped>
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-slow 10s ease-in-out 3s infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>