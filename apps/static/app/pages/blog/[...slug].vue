<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const route = useRoute();
import type { ContentNavigationItem } from '@nuxt/content';
import { useBreadCrumbs } from '~~/app/composables/useBreadCrumbs';

const sidebarDocsNavigation = inject<Ref<ContentNavigationItem[]>>('sidebar_docs_navigation');
const mapBread = useBreadCrumbs(route.path, false);

definePageMeta({
    layout: 'blog'
});

const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('blog').path(route.path).first();
});

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true });
}

useSchemaOrg([
    defineArticle({
        headline: page.value.title,
        author: { 
            name: page.value.author, 
            url: page.value.authorGithub,
            image: `${page.value.authorGithub}.png`,
            sameAs: [page.value.authorGithub],
            jobTitle: 'Technical Writer',
            worksFor: {
                name: 'IP Shield',
                url: 'https://ip-shield.riavzon.com'
            }
        },
        datePublished: page.value.date,
        dateModified: page.value.date,
        description: page.value.description,
        image: page.value.image,
        inLanguage: 'en',
        publisher: {
            '@type': 'Organization',
            name: 'IP Shield',
            logo: 'https://ip-shield.riavzon.com/favicon.svg'
        }
    }),
    defineBreadcrumb({
        itemListElement: computed(() => {
            const crumbs = mapBread(sidebarDocsNavigation?.value ?? []);
            return crumbs.value.map((crumb, index) => ({
                position: index + 1,
                name: crumb.label,
                item: crumb.to ? `https://ip-shield.riavzon.com${crumb.to}` : ''
            }));
        })
    })
]);
</script>

<template>
  <template v-if="page">
    <SeoMetaData
      :page="page"
      :is-writing="true"
      :image="page.image"
    />
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </template>
</template>