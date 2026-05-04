<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { type VerificationLinkSchema } from '#layers/shared-layer/shared/types/VerificationLinkSchema';
import { type UpdateEmailSchemaTypeInput, dataSchema } from '#layers/shared-layer/shared/types/UpdateEmailSchemaType';
import { useScreenWidth } from '#layers/shared-layer/app/composables/useScreenWidth';
import { executeRequest } from '@riavzon/auth-h3client/client';

const width = useScreenWidth();
const props = defineProps<VerificationLinkSchema>();
const showPassword = ref(false);
const success = ref(false);


const state: UpdateEmailSchemaTypeInput = reactive({
    code: '',
    email: '',
    newEmail: '',
    password: ''
});

const codeModel = computed({
  get: () => state.code ? state.code.split('') : [],
  set: (value) => {
    state.code = value.join('');
  }
});


const headers = useRequestHeaders();
const event = useRequestEvent();
const fetcher = useRequestFetch();
const toast = useToast();

const submit = async () => {
    const res = await executeRequest<string>(`/api/auth/update-email`, 'POST', state, {}, {
        query: { ...props},
    }, { headers, event, fetcher });

    if (!res.ok) {
       toast.add({
        title: 'Error',
        icon: 'i-lucide-circle-alert',
        description: res.reason,
        color: 'error'
       });

       success.value = false;
       return;
    } else {
      toast.add({
        title: 'Success!',
        icon: 'i-lucide-circle-check',
        description: 'Your email updated Successfully!',
        color: 'success'
       });
       success.value = true;
       return;
    }
};
</script>

<template>
  <div class="mx-auto flex w-full justify-center py-4">
    <UForm
      :schema="dataSchema"
      :validate-on="[]"
      :loading-auto="true"
      :state="state"
      class="flex flex-col justify-center items-center m-auto gap-4 p-4"
      @submit="submit"
    >
      <div class="flex w-full max-w-sm flex-col items-center gap-6">
        <UFormField
          label="Secret Code"
          name="code"
          class="w-full"
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
        </UFormField>

        <UFormField
          label="Current Email"
          name="email"
          class="w-full"
        >
          <UInput
            v-model="state.email"
            class="w-full"
            variant="soft"
            color="neutral"
            icon="material-symbols:alternate-email-rounded"
            highlight
          />
        </UFormField>

        <UFormField
          label="New Email"
          name="newEmail"
          class="w-full"
        >
          <UInput
            v-model="state.newEmail"
            class="w-full"
            variant="soft"
            color="neutral"
            icon="material-symbols:alternate-email-rounded"
            highlight
          />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
          class="w-full"
        >
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
      </div>
    </UForm>
    <UAlert 
      v-if="success"
      class="w-full"
      icon="i-lucide-rocket"
      color="success"
      title="Success!"
      description="Your email updated Successfully!"
      variant="outline"
      :actions="[
        {
          label: 'Go to account',
          color: 'success',
          variant: 'subtle',
          size: 'md',
          to: '/dashboard'
        },
        {
          label: 'Go to Home',
          color: 'success',
          variant: 'outline',
          size: 'md',
          to: '/'
        }
      ]"
    />
  </div>
</template>