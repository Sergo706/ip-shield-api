<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useDemoApi } from '~/composables/useDemoApi';
definePageMeta({
    layout: 'dashboard'
});

const { endpoint, payload, error, loading, data: response, execute } = useDemoApi();
const data = computed(() => JSON.stringify(response.value, null, 2));
const hasNoSub = computed(() => error.value === "User has no active subscription");

const run = async (value: string, endpointParam: string) => {
  payload.value = value;
  let demoEndpoint = '/demo/lookup';
  if (endpointParam.includes('lookup')) demoEndpoint = '/demo/lookup';
  else if (endpointParam.includes('email-domain')) demoEndpoint = '/demo/email';
  else if (endpointParam.includes('user-agent')) demoEndpoint = '/demo/useragent';
  else if (endpointParam.includes(':geo')) demoEndpoint = '/demo/geo';
  else if (endpointParam.includes('network')) demoEndpoint = '/demo/network';
  else if (endpointParam.includes('summary')) demoEndpoint = '/demo/summary';

  endpoint.value = demoEndpoint;
  await execute();
  console.log(data.value);
};

</script>

<template>
  <UDashboardPanel id="playground">
    <template #header>
      <UDashboardNavbar title="Playground">
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
      <UCard 
        title="Playground"
        description="Enter an ip address below to get a response"
        :ui="{ root: 'h-fit overflow-visible', body: 'overflow-visible h-full' }"
      >
        <DashboardPlayForm
          :loading="loading"
          @check="run"
        />
        <UBadge 
          v-if="data && !error"
          color="success"
          variant="subtle"
          size="lg"
          class="mt-5"
          label="GET 200 OK"
        />   
        <DashboardPlayRes
          v-if="data"
          :data
        />
        <UAlert 
          v-else-if="!data && error" 
          class="w-full mt-5"
          icon="i-lucide-circle-alert"
          color="error"
          title="Error !"
          :description="hasNoSub ? 'Please create an API key first' : error"
          variant="subtle"
        >
          <template #actions>
            <GeneralModal
              v-if="hasNoSub"
              :show-btn="true"
              btn-size="md"
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
            <UButton
              icon="i-lucide-flask-conical"
              class="cursor-pointer"
              variant="outline"
              color="primary"
              label="Retry"
              @click.prevent="execute"
            />
          </template>
        </UAlert>
      </UCard>
    </template>
  </UDashboardPanel>
</template>