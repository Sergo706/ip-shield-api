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
const title = computed(() => `${String(config.appName)} ${route.path.startsWith('/login') ? 'Login' : route.path.startsWith('/signup') ? 'Signup' : 'Authentication'}`);

useSeoMeta({
  title,
  description: String(config.seo.description),
  ogTitle: title,
  ogDescription: String(config.seo.description),
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

    
    <USeparator
      :avatar="{
        src: '/favicon.svg',
        alt: 'Logo',
        loading: 'lazy',
      }"
      color="neutral"
      decorative
    />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          All Right reserved 
          <NuxtLink
            to="https://riavzon.com"
            target="_blank"
          >
            Riavzon
          </NuxtLink> • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/Sergo706"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
