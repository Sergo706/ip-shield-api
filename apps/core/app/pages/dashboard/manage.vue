<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

definePageMeta({
    layout: 'dashboard'
});

const { data: displayData, pending, refresh } = await useListApiToken();

const data = computed(() => {
  const list = displayData.value?.tokenList;
  if (!list || list.length === 0) return [];

  const totalUsageCount = list.reduce((acc, curr) => acc + (curr.usage_count || 0), 0);
 
  return list.map(token => ({
    id: token.id,
    name: token.name,
    created_at: new Date(token.created_at),
    expires_at: token.expires_at ? new Date(token.expires_at) : null,
    last_used: token.last_used ? new Date(token.last_used) : null,
    usage_count: token.usage_count || 0,
    totalUsageCount,
    restricted_to_ip_address: token.restricted_to_ip_address ?? [],
    active: !token.expires_at || new Date(token.expires_at).getTime() > Date.now(),
    privilege_type: token.privilege_type,
  }));
});

</script>

<template>
  <UDashboardPanel id="manage">
    <template #header>
      <UDashboardNavbar title="Manage Tokens">
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
              <FormsNewTokenForm 
                @submitted="refresh"
              />
            </template>
          </GeneralModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-10 pb-4">
        <DashboardManageTokens
          v-if="data.length > 0"
          :data="data"
          class="flex-1 min-h-[350px]"
          @submitted="refresh"
        />

        <LazyUEmpty 
          v-else-if="data.length === 0 && !pending"
          class="flex-1 min-h-[550px] grid place-content-center text-center"
          icon="i-lucide-key-round"
          title="No tokens yet" 
          description="It looks like you haven't created any tokens yet. Create one to get started."
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
      </div>
      <LazySpinner
        v-if="pending && !data"
        class="mt-10"
      />
    </template>
  </UDashboardPanel>
</template>