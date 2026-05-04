
<script setup lang="ts">
const props = defineProps<{
  msg?: string;
  navigateTo: string;
}>();

const emit = defineEmits(['close']);

const onClick = async (): Promise<void> => {
  emit('close');
  await navigateTo(props.navigateTo, { external: true });
};

</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :ui="{ overlay: 'bg-elevated/55 backdrop-blur-lg backdrop-saturate-150' }"
    :title="`Security Verification is required`"
    :description="msg ?? 'To continue with this action, please check your email fist'"
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
