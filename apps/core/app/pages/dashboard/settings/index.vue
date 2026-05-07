<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { personalSchema } from '~~/shared/types/auth';
import type { FormSubmitEvent } from '@nuxt/ui';
import z from 'zod';
import AuthApiModal from '~/components/Auth/AuthApiModal.vue';


// await useAuthRedirect('/', undefined);
definePageMeta({
  layout: 'dashboard'
});


const onCreate = async () => {
    const overlay = useOverlay();
    const modal = overlay.create(AuthApiModal);
    const instance = modal.open({
        title: 'Create API Token',
        msg: `Fill the form below to create a new token`,
        action: 'create',

    });
   await instance.result;
   return;
};

const toast = useToast();

type PersonalSchema = z.output<typeof personalSchema>

const success = ref(false);

const state = reactive<PersonalSchema>({
  firstname: '',
  lastname: '',
});

function submit(event: FormSubmitEvent<PersonalSchema>) {
  success.value = true;
  Object.assign(state, event.data);
}


async function initEmailChange() {
        const headers = useRequestHeaders();
        const event = useRequestEvent();
        const fetcher = useRequestFetch();
        const result = await executeRequest<string>('/api/auth/change-email', 'POST', { "init": "1" }, {}, {}, { headers, event, fetcher });
        if (!result.ok) {
            toast.add({
                title: "Error!",
                color: 'error',
                description: "Server error. Try again later"
            });
            return;
        }

        toast.add({
            title: "Success!",
            color: 'success',
            description: "Check your email to continue"
        });
        return;
    }

</script>

<template>
  <UDashboardPanel id="settings">
    <template #header>
      <UDashboardNavbar title="Settings">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            label="Create API Token"
            variant="subtle"
            color="primary"
            size="sm"
            trailing-icon="lucide:plus"
            @click.prevent="onCreate"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex w-full justify-center m-auto">
        <UCard
          title="Profile"
          description="Update your profile information"
          class="w-full max-w-2xl"
          variant="subtle"
        >
          <UForm
            :schema="personalSchema"
            :validate-on="[]"
            :loading-auto="true"
            :state="state"
            class="flex w-full flex-col gap-2"
            @submit="submit"
          >
            <div class="flex w-full flex-col gap-6">
              <UFormField
                label="First name"
                help="Update your first name"
                name="firstname"
                class="w-full"
              >
                <UInput
                  v-model="state.firstname"
                  class="w-full"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-user"
                  highlight
                />
              </UFormField>

              <UFormField
                label="Last name"
                help="Update your last name"
                name="lastname"
                class="w-full"
              >
                <UInput
                  v-model="state.lastname"
                  class="w-full"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-user"
                  highlight
                />
              </UFormField>

              <UButton
                type="submit"
                color="primary"
                variant="subtle"
                loading-auto
                size="md"
                class="w-full justify-center px-6"
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
            description="Your data have been updated successfully!"
            variant="outline"
          />
          
          <USeparator class="mt-5" />
          <UPageCard
            title="Update email"
            description="Before you can proceed we will need to verify your identity and your current email"
            icon="i-simple-icons-mail"
            variant="ghost"
            class="cursor-pointer"
          >
            <template #footer>
              <UButton
                label="Send link"
                loading-auto
                size="md"
                variant="subtle"
                @click.prevent="initEmailChange"
              />
            </template>
          </UPageCard>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>