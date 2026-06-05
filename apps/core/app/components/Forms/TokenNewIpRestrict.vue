<script setup lang="ts">
import { ipRestrictionUpdate, type IpRestrictionUpdateInput } from '~~/shared/types/apiTokens';

const props = defineProps<{tokenId: number}>();
const { updateIp, ipUpdateResult, error, isLoading } = useApiTokens();
const state: IpRestrictionUpdateInput = reactive({
    tokenId: props.tokenId,
    ipv4: []
});
const emit = defineEmits(['submitted']);
const submit = async () => {
  await updateIp(state.ipv4, state.tokenId);
  emit('submitted');
  return;
};

</script>

<template>
  <div
    class="w-full"
  >
    <UForm
      :schema="ipRestrictionUpdate"
      :state="state"
      :validate-on="[]"
      :loading="isLoading"
      class="flex w-full flex-col gap-4"
      @submit="submit"
    >
      <UFormField
        label="Update Allowed IP's"
        name="ipv4"
        help="Provide an ip lists to restrict usage only to these ones. send an empty value to remove restrictions"
        class="w-full"
      >
        <UInputMenu
          v-model="state.ipv4" 
          create-item
          multiple
          highlight
          variant="subtle"
          color="neutral"
          icon="i-lucide-network"
          class="w-full"
          delete-icon="i-lucide-trash"
          @create="(item: string) => state.ipv4?.push(item)"
        />
      </UFormField>

      <UButton
        type="submit"
        color="primary"
        variant="subtle"
        :loading="isLoading"
        icon="i-lucide-shield-check"
        size="md"
        class="w-full cursor-pointer justify-center"
      >
        Submit
      </UButton>

      <UAlert 
        v-if="error"
        class="mt-4 w-full"
        icon="i-lucide-circle-alert"
        color="error"
        title="Error!"
        :description="error"
        variant="subtle"
      />
      <UAlert 
        v-if="ipUpdateResult"
        class="mt-4 w-full"
        icon="i-lucide-circle-alert"
        color="success"
        title="Success!"
        :description="ipUpdateResult.msg"
        variant="subtle"
      />
    </UForm>
  </div>
</template>