<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { withLeadingSlash } from 'ufo';



definePageMeta({
    layout: 'default'
});

const route = useRoute();
const slug = computed(() => 
  Array.isArray(route.params.slug) 
    ? route.params.slug 
    : [route.params.slug ?? '']
);

const path = computed(() => withLeadingSlash(...slug.value));

const { data: page } = await useAsyncData(`legal-${path.value}`, async () => {
    const data = await queryCollection('legal').path(`/legal${path.value}`).first();
    return data;
}, { watch: [path] });

if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' });
const pageType = computed(() => page.value?.type);
if (pageType.value !== 'tos' && pageType.value !== 'privacy') throw createError({ statusCode: 404, statusMessage: 'Page not found' });

useSchemaOrg([
    defineWebPage({
        name: computed(() => page.value?.title),
        description: computed(() => page.value?.description),
        datePublished: computed(() => page.value?.date),
        dateModified: computed(() => page.value?.date)
    })
]);

if (import.meta.server) {
    defineOgImage('Image', {
        title: page.value.title,
        description: page.value.description,
    });
}

</script>

<template>
  <SeoMetaData
    v-if="page"
    :page="page"
    :is-writing="false"
  />
  <UPageBody 
    v-if="page"
  >
    <UContainer
      class="space-y-16 max-w-6xl"
    >
      <UPageHeader
        :title="page.title"
        :description="page.description"
      >
        <template #headline>
          <UBadge 
            variant="subtle"
            icon="i-lucide-calendar"
          >
            <template #default>
              <span>Last updated on</span>
              <NuxtTime
                :datetime="page.date"
                year="numeric"
                month="long"
                day="numeric"
              />
            </template>
          </UBadge>
        </template>
      </UPageHeader>
      <ContentRenderer
        :value="page"
      />
    </UContainer>
  </UPageBody>
</template>