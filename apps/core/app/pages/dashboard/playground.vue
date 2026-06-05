<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useDemoApi } from '~/composables/useDemoApi';
definePageMeta({
    layout: 'dashboard'
});

const { endpoint, payload, error, loading, data: response, execute } = useDemoApi();
const data = computed(() => JSON.stringify(response.value, null, 2));
const { data: tokenList, refresh } = await useListApiToken();

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
        v-if="tokenList?.tokenList?.length"
        title="Playground"
        description="Enter an ip address below to get a response. (Your quota is not consumed in here)"
        :ui="{ root: 'h-fit overflow-visible', body: 'overflow-visible h-full' }"
      >
        <DashboardPlayForm
          :loading="loading"
          @check="run"
        />
        <UBadge 
          v-if="data && (!error && !loading)"
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
          :description="error"
          variant="subtle"
        >
          <template #actions>
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
      <LazyUEmpty 
        v-else
        class="flex-1 min-h-[550px] grid place-content-center text-center"
        icon="i-lucide-key-round"
        title="No tokens yet" 
        description="It looks like you haven't created any tokens yet. Create one to get started with the playground."
        :ui="{root: 'ring-0'}"
      > 
        <template #actions>
          <GeneralModal
            :show-btn="true"
            btn-size="md"
            :btn-color="'success'"
            :btn-label="'Create API Token'"
            :btn-icon="'lucide:plus'" 
            title="Create API Token"
            :msg="'Create New API Token'"
            @update:model-value="(val) => { if (!val) refresh() }"
          > 
            <template #contentModal>
              <FormsNewTokenForm />
            </template>
          </GeneralModal>
          <UButton
            icon="i-lucide-flask-conical"
            class="cursor-pointer"
            to="/dashboard/playground"
            variant="outline"
            color="primary"
            label="Playground"
          />
        </template>
      </LazyUEmpty>
    </template>
  </UDashboardPanel>
</template>