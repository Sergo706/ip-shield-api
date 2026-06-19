<script setup lang="ts">
const { open } = useContentSearch();
const searchTerm = ref('');

const { data: navigation } = await useAsyncData('navigation', () => {
    return queryCollectionNavigation('docs');
});

const { data: files, status } = useLazyAsyncData('search', () => {
    return queryCollectionSearchSections('docs');
}, {
    server: false
});

const groups = [{
    id: 'links',
    label: 'Explore',
    slot: 'links' as const,
    items: [
        { label: 'Getting Started', icon: 'i-lucide-rocket', to: '/docs/getting-started' },
        { label: 'API Endpoints', icon: 'i-lucide-plug', to: '/docs/endpoints' },
        { label: 'Blog', icon: 'i-lucide-newspaper', to: '/blog' },
        { label: 'Account', icon: 'i-lucide-user', to: '/account', external: true, target: '_self' },
        { label: 'About', icon: 'i-lucide-info', to: '/about' },
    ]
}];
</script>

<template>
  <UContentSearchButton
    :collapsed="true"
    variant="ghost"
    icon="i-lucide-search"
    @click="open = true"
  />

  <ClientOnly>
    <LazyUContentSearch
      v-model:search-term="searchTerm"
      :files="files"
      shortcut="meta_k"
      :navigation="navigation"
      :fuse="{ resultLimit: 42 }"
      :loading="status === 'pending'"
      :groups
      placeholder="Search documentation..."
      :color-mode="false"
    />
  </ClientOnly>
</template>