<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { Period, Range } from '#layers/shared-layer/shared/types/TimePeriod';
import { sub } from 'date-fns';
import { useStats } from '~/composables/useStats';

definePageMeta({
    layout: 'dashboard'
});

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
});

const period = ref<Period>('daily');
const { data: displayData, pending, refresh: refreshList } = await useListApiToken();
const { data: statsData, pending: statsStatus, refresh: statsRefresh, error } = useStats();
const hasNoSub = computed(() => error.value?.message === "User has no active subscription");

const refresh = async () => { await refreshList(); await statsRefresh(); };
const loading = computed(() => pending.value || statsStatus.value);

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
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home">
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
        <DashboardStatsHome
          v-if="(displayData && statsData) && !hasNoSub"
          :tokens-count="displayData?.totalValidTokens"
          :period="period"
          :requests-count="statsData?.reqThisMonth"
          :range="range"
          :quota-count="statsData?.totalQuota"
          :remaining-count="statsData?.remainingThisMonth"
        />

        <DashboardHomeTokenTable
          v-if="data && data.length > 0"
          :data="data"
          class="flex-1"
        />
        <UButton
          v-if="data.length > 0"
          class="ml-auto cursor-pointer -mt-7"
          to="/dashboard/manage"
          variant="subtle"
          label="Manage"
        />
        <LazyUEmpty 
          v-else-if="data.length === 0 && !loading"
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
        
        <LazySpinner
          v-if="loading && (!data || !statsData)"
          class="mt-10"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
