<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <UHeader class="border-b-0">
    <template #left>
      <LayoutLogo
        :is-text="true"
        class="w-auto h-6 shrink-0"
      />
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
  <UMain>
    <slot />
  </UMain>

      
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
          :external="true"
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
</template>