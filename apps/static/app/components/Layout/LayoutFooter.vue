<script setup lang="ts">

import type { NavigationMenuItem } from '@nuxt/ui';
import type { NavigationCollection } from '~~/shared/types/Navigation';
const route = useRoute();

const { data: navLinks } = await useAsyncData<NavigationCollection>('navLinks_footer', async () => {
  return await queryCollection('navigationMenu').first() as unknown as NavigationCollection;
});


const excludeFromFooter = new Set(['Home', 'Docs', 'Blog', 'API Products', 'Resources']);

const items = computed<NavigationMenuItem[]>(() => {
  const mappedLinks = (navLinks.value?.links ?? [])
    .filter(link => !excludeFromFooter.has(link.label))
    .map((link): NavigationMenuItem => ({
      label: link.label,
      to: link.to,
      active: link.nested ? route.path.startsWith(link.to) : route.path === link.to,
    }));

  return [
    ...mappedLinks,
    {
      label: 'Privacy',
      to: '/legal/privacy',
      active: route.path === '/legal/privacy',
    },
    {
      label: 'Terms of Serivce',
      to: '/legal/tos',
      active: route.path === '/legal/tos',
    }
  ];
});

</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright IP Shield © {{ new Date().getFullYear() }} All rights reserved
      </p>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UButton
        icon="i-lucide-globe"
        color="neutral"
        variant="ghost"
        to="https://riavzon.com"
        target="_blank"
        aria-label="Website"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/Sergo706/ip-shield-api"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>