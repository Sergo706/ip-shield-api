<script setup lang="ts">
import { resetPasswordZod as schema, type ResetPassword} from '#layers/shared-layer/shared/types/PasswordResetForm';
import { type PasswordResetResponse} from '#layers/shared-layer/shared/types/InitPasswordResetResponse';
import { type VerificationLinkSchema } from '#layers/shared-layer/shared/types/VerificationLinkSchema';
import { executeRequest } from '@riavzon/auth-h3client/client';

const props = defineProps<VerificationLinkSchema>();

const state = reactive<ResetPassword>({
  password: '',
  confirmedPassword: ''
});

const showPassword = ref(false);
const showSecPassword = ref(false);
const tooltip = ref(false);

const errors = ref<string>();
const success = ref<boolean>(false);
const successMsg = ref<string>();

const submit = async () => { 
    try {
      const headers = useRequestHeaders();
      const event = useRequestEvent();
      const fetcher = useRequestFetch();
      errors.value = '';
      
      const res = await executeRequest<PasswordResetResponse>(`/api/auth/reset-password`, 'POST',  state  , {}, {
        query: { ...props},
      }, { headers, event, fetcher });

      if (!res.ok) {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          errors.value =  res.reason ?? 'Please check your password and make sure it met all the requirements';
          return;
      }
        
        if ("ans" in res.data) {
            successMsg.value = res.data.ans;
            success.value = true;
            return;
        } else {
            errors.value =  `Server error. Please try again later.`;
            return;
        }
        } catch {
            errors.value = `Server error. Please try again later.`;
        }
};

  const alretData = computed(() => {
        if (success.value) {
          return {
            color: 'success',
            icon: "i-lucide-rocket",
            title: "Success!",
            description: successMsg.value ?? "Your password restarted successfully!",
            actions: [
                      {
                        label: 'Go to login',
                        color: 'success',
                        variant: 'subtle',
                        size: 'md',
                        to: '/'
                      }
                ],
          };
        }
        else if (errors.value) {
          return {
            color: 'error',
            icon: "lucide:message-circle-warning",
            title: "Error!",
            description: errors.value,
            actions: [],
          };
        }
        else return undefined;
  });
</script>

<template>
  <div class="mx-auto flex w-full justify-center">
    <UForm
      :schema="schema"
      :validate-on="[]"
      :loading-auto="true"
      :state="state"
      class="flex flex-col justify-center items-center m-auto gap-4"
      @submit="submit"
    >
      <UFormField
        label="Password"
        name="password"
        class="w-full"
      >
        <template #hint>
          <UTooltip
            v-model:open="tooltip"
            arrow
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 1
            }"
            :ui="{
              content: 'h-auto max-w-64 items-start py-2',
              text: 'block whitespace-normal break-words text-left leading-4'
            }"
            text="Password must be 12 characters, include one uppercase letter, one lowercase letter, one digit, and one special character."
          >
            <UIcon
              name="lucide:circle-help"
              class="size-4 cursor-pointer"
              @click.prevent="tooltip = !tooltip"
            />
          </UTooltip>
        </template>
        <UInput
          v-model="state.password"
          class="w-full"
          variant="soft"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1' }"
          color="neutral"
          icon="material-symbols:password"
          highlight
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField
        label="Confirm your new password"
        name="confirmedPassword"
        class="w-full"
      >
        <UInput
          v-model="state.confirmedPassword"
          class="w-full"
          variant="soft"
          placeholder="Confirm password"
          :type="showSecPassword ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1' }"
          color="neutral"
          icon="material-symbols:password"
          highlight
        > 
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showSecPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showSecPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showSecPassword"
              aria-controls="password"
              @click="showSecPassword = !showSecPassword"
            />
          </template>
        </UInput>
      </UFormField>
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
    </UForm>
  </div>
  <UAlert 
    v-if="alretData"
    :icon="alretData.icon"
    :color="alretData.color as 'success'"
    :title="alretData.title"
    :description="alretData.description"
    variant="outline"
    :actions="alretData.actions as Array<{ label: string; color: 'success'; variant: 'subtle' | 'outline'; size: 'md'; to: string }>"
  />
</template>