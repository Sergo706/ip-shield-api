<script lang="ts" setup>
import { codeForm as schema } from '#layers/shared-layer/shared/types/PasswordResetForm';
import {type ResponseFromServiceLogin } from '#layers/shared-layer/shared/types/LoginServerTypes';
import type { VerificationLinkSchema } from '#layers/shared-layer/shared/types/VerificationLinkSchema';
import { executeRequest } from '@riavzon/auth-h3client/client';
import { useZodValidator } from '#layers/shared-layer/app/composables/useZodValidator';


type Props = VerificationLinkSchema & {
    codeLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
    codeLength: 7,
});

const code = ref<string[]>(Array.from({ length: props.codeLength }, () => ''));
const success = ref<boolean>(false);
const successUrl = ref<string | URL>('');
const errors = ref<string | object | undefined>('');


const handleSubmit = async () => {
    const fullCode =  {code: code.value.join('')};
    errors.value = '';

    if (fullCode.code.length !== props.codeLength) {
        errors.value = 'Invalid or expired code';
    }
    const results = useZodValidator(schema, fullCode);

    if (!results.success) {
          const zodErrors = results.errors as Record<string, string>;
          errors.value = zodErrors.code ?? 'Invalid code format';
          return;
    }
      const dataToSend = results.data;

    if (!dataToSend) {
          errors.value = 'Something went wrong.';
          return;
      }

  
    try {
    const headers = useRequestHeaders();
    const event = useRequestEvent();
    const fetcher = useRequestFetch();

    const res = await executeRequest<ResponseFromServiceLogin>(`/api/auth/verify-mfa`, 'POST', dataToSend, {}, {
      query: { ...props},
    }, { headers, event, fetcher });

    

    if (!res.ok) {
          errors.value = `Something went wrong. ${res.reason}`;
          return;
    }
    
     if ("redirectTo" in res.data) {
        success.value = true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        successUrl.value = res.data.redirectTo ?? '/';
        return;
    } else {
        errors.value = 'Invalid or expired code';
        return;
    }
    } catch {
        errors.value = 'An unexpected error occurred.';
    }
  
};
</script>

<template>
  <form 
    v-if="!success"
    class="absolute-center top-[20%]"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col items-center gap-4">
      <p>Enter your secret code</p>

      <small class="text-error">
        {{ errors }}
      </small>
      <BaseButton
        :primary="true"
        :show-arrow="true"
        type="submit"
      >
        Verify Code
      </BaseButton> 
    </div>
  </form>
</template>
