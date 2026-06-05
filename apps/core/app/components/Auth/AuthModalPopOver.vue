
<script setup lang="ts">
defineProps<{
  title: string;
  msg: string;
}>();

const isOpen = defineModel<boolean>('open'); 
const onClick = () => {isOpen.value = false;};

</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ overlay: 'bg-elevated/55 backdrop-blur-lg backdrop-saturate-150' }"
    :title="title"
    :description="msg"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton
          label="OK"
          @click="onClick"
        />
      </div>
    </template>
  </UModal>
</template>
