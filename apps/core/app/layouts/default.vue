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
</template>