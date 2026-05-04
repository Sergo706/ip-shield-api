<script lang="ts" setup>
import { codeForm as schema } from '#layers/shared-layer/shared/types/PasswordResetForm';
import {type ResponseFromServiceLogin } from '#layers/shared-layer/shared/types/LoginServerTypes';
import type { VerificationLinkSchema } from '#layers/shared-layer/shared/types/VerificationLinkSchema';
import { executeRequest } from '@riavzon/auth-h3client/client';


type Props = VerificationLinkSchema & {
    codeLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
    codeLength: 7,
});
const width = useScreenWidth();

const success = ref<boolean>(false);
const errors = ref<string>('');

const state = reactive({
  code: '',
});

const codeModel = computed({
  get: () => state.code ? state.code.split('') : [],
  set: (value) => {
    state.code = value.join('');
  }
});

const submit = async () => {
    try {
      const headers = useRequestHeaders();
      const event = useRequestEvent();
      const fetcher = useRequestFetch();
      const toast = useToast();

      if (!state.code) {
            errors.value = `Please enter a valid code`;
            return;
      }

      const res = await executeRequest<ResponseFromServiceLogin>(`/api/auth/verify-mfa`, 'POST', state, {}, {
        query: { ...props},
      }, { headers, event, fetcher });

      if (!res.ok) {
            errors.value = `Invalid or expired code`;
            return;
      }
    
     if ("redirectTo" in res.data) {
        success.value = true;
        toast.add({
          color: 'success',
          title: 'Success!',
          description: 'Your code successfully verified. redirecting to account...'
        });
        await navigateTo(res.data.redirectTo, { external: true });
        return;
    } else {
        errors.value = 'Invalid or expired code';
        return;
    }
    } catch {
        errors.value = 'Server error. Please try again later';
    }
  
};
</script>

<template>
  <div class="mx-auto flex w-full justify-center py-4">
    <UForm
      :schema="schema"
      :state="state"
      :validate-on="[]"
      :loading-auto="true"
      class="flex flex-col justify-center items-center m-auto gap-4 p-4"
      @submit="submit"
    >
      <UPinInput
        v-model="codeModel"
        otp
        placeholder="○"
        :length="7"
        color="neutral"
        variant="outline"
        highlight
        :ui="{
          base: `${width.width.value < 342 ? 'size-8' : 'size-9'}`
        }"
        autofocus
        mask
      />
      <UButton
        type="submit"
        color="primary"
        variant="subtle"
        loading-auto
        size="md"
        class="px-6 cursor-pointer self-start ml-auto mr-auto w-full justify-center"
      >
        Submit
      </UButton>

      <UAlert 
        v-if="errors"
        class="w-full"
        icon="i-lucide-circle-alert"
        color="error"
        title="Error!"
        :description="errors"
        variant="subtle"
      />
    </UForm>
  </div>
</template>
