<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
});

const config = useAppConfig();
const route = useRoute();
const title = computed(() => `${config.appName} ${route.path.startsWith('/login') ? 'Login' : route.path.startsWith('/signup') ? 'Signup' : 'Authentication'}`);

useSeoMeta({
  title,
  description: config.seo.description,
  ogTitle: title,
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
