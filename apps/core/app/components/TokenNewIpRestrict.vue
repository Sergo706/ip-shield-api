<script setup lang="ts">
import { ipRestrictionUpdate, type IpRestrictionUpdateInput } from '~~/shared/types/apiTokens';

const errors = ref('');
const props = defineProps<{tokenId: number}>();

const state: IpRestrictionUpdateInput = reactive({
    tokenId: props.tokenId,
    ipv4: []
});

const submit = async () => {
    await new Promise(res => setTimeout(res, 5000));
    console.log(state);
   // TODO: SEND etc

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
      :loading-auto="true"
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
        loading-auto
        icon="i-lucide-shield-check"
        size="md"
        class="w-full cursor-pointer justify-center"
      >
        Submit
      </UButton>

      <UAlert 
        v-if="errors"
        class="mt-4 w-full"
        icon="i-lucide-circle-alert"
        color="error"
        title="Error!"
        :description="errors"
        variant="subtle"
      />
    </UForm>
  </div>
</template>