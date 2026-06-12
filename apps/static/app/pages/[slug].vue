<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { withLeadingSlash } from 'ufo';
import JsonSnippet from '~/components/JsonSnippet.vue';



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
const { data: page } = await useAsyncData(`page-${path.value}`, async () => {
    const data = await queryCollection('pages').path(path.value).first();
    return data;
}, { watch: [path] });

if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' });

const schemaNodes = computed(() => {
    const nodes: Record<string, unknown>[] = [];

    const webPage: Record<string, unknown> = {
        name: page.value?.title,
        description: page.value?.description,
    };
    if (page.value?.hero?.image?.src) {
        webPage.image = `https://ip-shield.riavzon.com${page.value.hero.image.src}`;
    }
    nodes.push(defineWebPage(webPage));

    if (page.value?.faqs?.length) {
        nodes.push(defineWebPage({
            '@type': 'FAQPage',
            mainEntity: page.value.faqs.map((faq: { label: string; content: string }) => ({
                '@type': 'Question',
                name: faq.label,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.content,
                },
            })),
        }));
    }

    const features = page.value?.features as { title?: string; description?: string; items?: { title: string; description: string }[] } | undefined;
    if (features?.items?.length) {
        nodes.push({
            '@type': 'ItemList',
            name: features.title,
            description: features.description,
            itemListElement: features.items.map(
                (item, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: item.title,
                    description: item.description,
                }),
            ),
        });
    }

    return nodes;
});

useSchemaOrg(schemaNodes);

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
    class="relative"
  >
    <UPageHero 
      v-if="page.hero"
      :title="page.title"
      :description="page.description"
      :orientation="page.hero.orientation || 'horizontal'"
      :ui="{
        container: 'gap-12 lg:gap-16'
      }"
    > 
      <template #headline>
        <UBadge
          v-if="page.hero.badge"
          variant="subtle"
          icon="i-lucide-globe"
          class="animate-fade-in"
        >
          {{ page.hero.badge }}
        </UBadge>
      </template>
      <template #top>
        <Dots />
      </template>
      
      <template #default>
        <div
          v-if="!page.hero.image && !page.hero.json"
          class="hidden lg:flex items-center justify-center w-full h-full lg:pl-8 mt-12 lg:mt-0"
        >
          <AboutSvg />
        </div>
        <WindowFrame
          v-else-if="page.hero.image && !page.hero.json"
          :title="page.title"
          :animate="true"
        >
          <NuxtImg
            :src="page.hero.image.src"
            :alt="String(page.hero.image.alt || page.title)"
            :height="page.hero.image.height"
            class="w-full"
            loading="lazy"
            quality="90"
          />
        </WindowFrame>

        <WindowFrame
          v-else-if="page.hero.json"
          :title="page.title"
          :animate="true"
        >
          <JsonSnippet :data="page.hero.json" />
        </WindowFrame>
      </template>
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :icon="section.icon"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
      :links="section.links"
      :ui="{ root: 'relative overflow-hidden' }"
    >
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
        />
      </div>
    </UPageSection>

    <UContainer
      v-if="page.hasMarkDownContent"
      class="space-y-16 max-w-6xl"
    >
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <UAccordion 
        v-if="page.faqs"
        type="multiple" 
        :items="page.faqs"
      />
    </UContainer>

    <UAccordion 
      v-if="page.faqs && !page.hasMarkDownContent"
      type="multiple" 
      :items="page.faqs"
    />
  </UPageBody>

  <USeparator
    v-if="page?.cta"
    class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
  />
  
  <UPageCTA
    v-if="page?.cta"
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
.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>