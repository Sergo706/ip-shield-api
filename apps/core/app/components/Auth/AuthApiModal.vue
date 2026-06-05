
<script setup lang="ts">

defineProps<{
  title: string;
  action: 'rotate' | 'revoke' | 'create' | 'ip-restriction';
  tokenId?: number;
  msg?: string;
}>();

const emit = defineEmits<(e: 'close', value?: boolean) => void>();

</script>

<template>
  <UModal
    class="w-full sm:max-w-2xl"
    :close="{ onClick: () => emit('close', false) }"
    :ui="{ overlay: 'bg-elevated/55 backdrop-blur-lg backdrop-saturate-150' }"
    :title="title"      
    :description="msg ?? ''"
  >
    <template
      v-if="action === 'create' || action === 'ip-restriction'"
      #body
    >
      <FormsNewTokenForm v-if="action === 'create'" />
      <FormsTokenNewIpRestrict
        v-else-if="action === 'ip-restriction' && tokenId"
        :token-id="tokenId"
      />
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton
          label="Go back"
          color="neutral"
          variant="outline"
          @click="emit('close', false)"
        />

        <UButton
          v-if="action === 'revoke' || action === 'rotate'"
          label="Proceed"
          @click="emit('close', true)"
        />
      </div>
    </template>
  </UModal>
</template>
