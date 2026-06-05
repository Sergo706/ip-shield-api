<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { PricingTableTier, PricingTableSection } from '@nuxt/ui';
import { useEarlyRegister } from '~/composables/useEarlyRegister';
import { usePlansData } from '~/composables/usePlansData';


definePageMeta({
    layout: 'dashboard'
});
const { data, pending, refresh, error } = usePlansData();
const { loading, register } = useEarlyRegister();


const tiers = computed(() => {
 if (!data.value) return;

 const tiers: PricingTableTier[] = data.value.plans.map((da) => {
  const btn = da.code !== 'free';
  return {
    id: da.code,
    title: da.name.toLocaleUpperCase(),
    price: `$${(da.price / 100).toString()}`,
    description: da.features.freeDescription,
    billingCycle: da.code === 'custom' ? 'custom' : '/month',
    ...(btn ? { button: { label: 'Join waitlist', loading: loading.value, onClick: async () => { await register(da.id); } } } : {})
  };
 });

 return tiers;
});
const sections = computed<PricingTableSection[]>(() => {
  if (!data.value) return [];
  const plans = data.value.plans;
  
  const buildTiers = <T extends string | boolean | number>(extractor: (plan: typeof plans[0]) => T): Record<string, T> => {
    return plans.reduce<Record<string, T>>((acc, plan) => {
      acc[plan.code] = extractor(plan);
      return acc;
    }, {});
  };

  return [
    {
      title: 'Features',
      features: [
        {
          title: 'Always fresh data',
          tiers: buildTiers(() => true)
        },
        {
          title: 'Access to 14 datasets',
          tiers: buildTiers(() => true)
        },
        {
          title: 'Bulk lookup',
          tiers: buildTiers((p) => p.features.bulkLookup)
        },
        {
          title: 'API Keys',
          tiers: buildTiers((p) => p.code === 'custom' ? 'Contact us' : p.features.apiKeyLimit)
        },
        {
          title: 'Support',
          tiers: buildTiers((p) => p.features.supportIncluded ? (p.code === 'custom' ? 'Priority' : 'Basic') : false)
        },
        {
          title: 'Custom datasets',
          tiers: buildTiers((p) => p.code === 'custom' ? 'Contact us' : (p.features.customDatasets > 0 ? p.features.customDatasets : false))
        },
        {
          title: 'Rate limits',
          tiers: buildTiers((p) => p.code === 'custom' ? 'Contact us' : `${p.requestsPerMinute.toString()} requests/min, ${p.monthlyQuota.toString()} total for month`)
        }
      ]
    },
    {
      title: 'Early adopter benefits',
      features: [
        {
          title: 'Rate limits from your selected plan',
          tiers: buildTiers((p) => p.code === 'pro' ? 'Free for the first 2 months' : (p.code === 'custom' ? 'Contact us' : false))
        }
      ]
    }
  ];
});


</script>

<template>
  <UDashboardPanel id="plans">
    <template #header>
      <UDashboardNavbar title="Plans">
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
      <LazySpinner
        v-if="pending && !data"
        class="mt-10"
      />
      <UAlert
        v-if="error"
        title="Error!"
        :description="error.message"
        color="error"
        variant="outline"
        :actions="[
          {
            label: 'Refresh',
            color: 'neutral',
            variant: 'subtle',
            onClick: () => refresh()
          }
        ]"
      />
      <UPageHero
        title="IP Shield Public Preview"
        description="The standard plan is free and always will be. We are currently finalizing premium tiers for custom data hosting and expanded API rate limits. Register today to lock in an early-adopter credit for your first months of premium usage."
      />

      <UPricingTable
        :tiers="tiers ?? []"
        :sections="sections"
        class="mb-20"
      />
    </template>
  </UDashboardPanel>
</template>