<script setup>
const config = useAppConfig();

useSeoMeta({
  title: config.appName,
  description: config.seo.description,
  ogTitle: config.appName,
  ogDescription: config.seo.description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
