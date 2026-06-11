<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import { useBreadCrumbs } from '~~/app/composables/useBreadCrumbs';

const route = useRoute();
const sidebarDocsNavigation = inject<Ref<ContentNavigationItem[]>>('sidebar_docs_navigation');
const mapBread = useBreadCrumbs(route.path, false);

definePageMeta({
  layout: 'docs'
});

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first();
});

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}
const crumbs = mapBread(sidebarDocsNavigation?.value ?? []).value;
const schemaBreadcrumbs = crumbs.map((crumb, index) => ({
  position: index + 1,
  name: crumb.label,
  item: crumb.to ? `https://ip-shield.riavzon.com${crumb.to}` : '',
}));

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: schemaBreadcrumbs,
  }),
  defineArticle({
    '@type': 'TechArticle',
    headline: page.value.title,
    description: page.value.description,
    image: 'https://ip-shield.riavzon.com/favicon.svg',
    author: {
      name: 'IP Shield',
      url: 'https://ip-shield.riavzon.com',
      image: 'https://ip-shield.riavzon.com/favicon.svg',
      sameAs: ['https://github.com/Sergo706'],
      jobTitle: 'Documentation Team',
      worksFor: {
        name: 'IP Shield',
        url: 'https://ip-shield.riavzon.com'
      }
    },
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'IP Shield',
      logo: 'https://ip-shield.riavzon.com/favicon.svg',
      url: 'https://ip-shield.riavzon.com',
      description: 'Advanced network intelligence and security validation API.',
      email: 'contact@riavzon.com',
      sameAs: ['https://github.com/Sergo706']
    },
  }),
]);

if (import.meta.server) {
  defineOgImage('Image', {
    title: page.value.title,
    description: page.value.description,
  });
}

</script>

<template>
  <template v-if="page">
    <SeoMetaData
      :page
      :is-writing="false"
    />
    <ContentRenderer :value="page" />
  </template>
</template>