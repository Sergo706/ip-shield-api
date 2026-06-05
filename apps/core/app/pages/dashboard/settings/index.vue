<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { personalSchema } from '~~/shared/types/auth';
import { useSettings } from '~/composables/useSettings';

definePageMeta({
    layout: 'dashboard'
});

const {updateNames, name, lastname, loading } = useSettings();


</script>

<template>
  <UDashboardPanel id="settings">
    <template #header>
      <UDashboardNavbar title="Settings">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <GeneralModal
            :show-btn="true"
            btn-size="sm"
            :btn-color="'success'"
            :btn-label="'Create API Token'"
            :btn-icon="'lucide:plus'" 
            title="Create API Token"
            :msg="'Create New API Token'"
          > 
            <template #contentModal>
              <FormsNewTokenForm />
            </template>
          </GeneralModal>
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
            loading-auto
            :state="{firstname: name, lastname}"
            class="flex w-full flex-col gap-2"
            @submit="updateNames"
          >
            <div class="flex w-full flex-col gap-6">
              <UFormField
                label="First name"
                help="Update your first name"
                name="firstname"
                class="w-full"
              >
                <UInput
                  v-model="name"
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
                  v-model="lastname"
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
                :loading="loading"
                size="md"
                class="w-full justify-center px-6"
              >
                Submit
              </UButton>
            </div>
          </UForm>
          <!-- 
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
                :loading="loading"
                size="md"
                variant="subtle"
                @click.prevent="initEmailUpdate"
              />
            </template>
          </UPageCard> -->
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>