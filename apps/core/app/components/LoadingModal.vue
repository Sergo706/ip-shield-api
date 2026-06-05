<script setup lang="ts">

const model = defineModel<boolean>({
  default: false
});
</script>

<template>
  <UModal
    v-model:open="model"
    :dismissible="false"
  >
    <template #content>
      <Spinner />
    </template>
  </UModal>
</template>