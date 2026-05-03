<script setup lang="ts">
import { resetPasswordZod as schema, type ResetPassword} from '#layers/shared-layer/shared/types/PasswordResetForm';
import { type PasswordResetResponse} from '#layers/shared-layer/shared/types/InitPasswordResetResponse';
import { type VerificationLinkSchema } from '#layers/shared-layer/shared/types/VerificationLinkSchema';
import { useZodValidator } from '#layers/shared-layer/app/composables/useZodValidator';
import { executeRequest } from '@riavzon/auth-h3client/client';

const props = defineProps<VerificationLinkSchema>();

const formState = ref<ResetPassword>({
  password: '',
  confirmedPassword: ''
});

const showPassword = ref(false);
type ErrorBag = Record<string, string | undefined>
const errors = ref<ErrorBag>({});
const success = ref<boolean>(false);
const successMsg = ref<string>();

    const submit = async () => { 
        errors.value = {};
        const results = useZodValidator(schema, formState.value);

        if (!results.success) {
            errors.value = results.errors as ErrorBag;
            return;
        }
        const dataToSend = results.data;

        if (!dataToSend) {
            errors.value = { global: 'Something went wrong.' };
            return;
        }

    try {
      const headers = useRequestHeaders();
      const event = useRequestEvent();
      const fetcher = useRequestFetch();

      const res = await executeRequest<PasswordResetResponse>(`/api/auth/reset-password`, 'POST',  dataToSend  , {}, {
        query: { ...props},
      }, { headers, event, fetcher });


      if (!res.ok) {
          errors.value = { global: `Something went wrong. ${res.reason}`  };
          return;
      }
        
        if ("ans" in res.data) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
          successMsg.value = `${res.data.ans} Redirecting...`;
          success.value = true;
          return;
        } else {
            errors.value = { global: `Server error try again later.`  };
            return;
        }
        } catch {
            errors.value = { global: 'An unexpected error occurred.' };
        }
};
        
</script>

<template>
  <form 
    v-if="!success"
    novalidate
    class="p-7 m-auto mt-25 md:px-8 w-full sm:w-[90%] md:w-[70%] rounded-xl xl:w-[50%] border"
    @submit.prevent
  >
    <legend class="mb-7">
      Reset Password
    </legend>
 
    <div class="relative">
      <BaseFloatingInput 
        :id="'password'"
        v-model="formState.password"
        :type="!showPassword ? 'password' : 'text'"
        :name="'password'" 
        :label="'Password'" 
        :placeholder="'Password'" 
        :required="true" 
        :autofocus="true" 
        :autocomplete="'true'" 
        :error="errors.password"
      />
      <Icon
        :name="showPassword ? 'clarity:eye-show-line' : 'clarity:eye-hide-line'"
        size="22px"
        class="absolute top-[18%] right-3 cursor-pointer"
        @click="showPassword = !showPassword"
      />
    </div>

    <div class="relative">
      <BaseFloatingInput
        :id="'confirmedPassword'"
        v-model="formState.confirmedPassword"
        :type="!showPassword ? 'password' : 'text'" 
        :name="'confirmedPassword'" 
        :label="'Confirm password'" 
        :placeholder="'Confirm password'" 
        :required="true" 
        :autofocus="false" 
        :autocomplete="'true'" 
        :error="errors.confirmedPassword"
      />
      <Icon
        :name="showPassword ? 'clarity:eye-show-line' : 'clarity:eye-hide-line'"
        size="22px"
        class="absolute top-[18%] right-3 cursor-pointer"
        @click="showPassword = !showPassword"
      />
    </div>

    <BaseGlobalErrorBox 
      v-if="errors.global" 
      :message="errors.global"
    />

    <BaseButton
      :show-arrow="false"
      :primary="true"
      class="w-40 rounded-lg bg-primary! text-amber-50 m-auto"
      @click.prevent="submit"
    >
      Reset Password
    </BaseButton>
  </form>
  <BaseTextCountDown 
    v-if="success"
    :count-from="5"
    :message-before-count-down="successMsg ?? 'Your password has been reset!'"
    :redirect-on-times-up="true" 
    :message-after-count-down="'Redirecting...'"
    :redirect-url="'/accounts?screen=login'"
  /> 
</template>