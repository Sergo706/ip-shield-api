<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { PricingTableTier, PricingTableSection } from '@nuxt/ui';
import { useEarlyRegister } from '~/composables/useEarlyRegister';
import { usePlansData } from '~/composables/usePlansData';
import { useGetUserWaitlist } from '~/composables/getUserWaitlist';

definePageMeta({
    layout: 'dashboard'
});

const { data: plansData, pending: loadingPlans, refresh: refreshPlans, error: plansError } = usePlansData();
const { loading: registerLoading, register } = useEarlyRegister();
const { data: waitlistData, error: waitlistError, refresh: refreshWaitList ,pending: loadingWaitList  }  = useGetUserWaitlist();

const loading = computed(() => loadingPlans.value || loadingWaitList.value);
const hasErrors = computed(() => {
  if (plansError.value) return true;
  if (waitlistError.value && waitlistError.value.message !== 'Not registered') return true;
  return false;
});
const refresh = () => { void refreshPlans(); void refreshWaitList(); };


const tiers = computed(() => {
 if (!plansData.value) return;

  
 const tiers: PricingTableTier[] = plansData.value.plans.map((da) => {
  const isFree = da.code === 'free';
  const isCurrentPlan = waitlistData.value?.planId === da.id;
  const isSubscribedToOther = !!waitlistData.value && !isCurrentPlan;

  let btnProps = {};
  if (!isFree) {
    if (isCurrentPlan) {
      btnProps = {
        button: {
          label: 'Unsubscribe',
          color: 'error',
          loading: registerLoading.value,
          onClick: async () => { 
            await register(da.id); 
            await refreshWaitList();
          }
        }
      };
    } else if (isSubscribedToOther) {
      btnProps = {
        button: {
          label: `Resubscribe to ${da.name}`,
          loading: registerLoading.value,
          onClick: async () => { 
            await register(da.id); 
            await refreshWaitList();
          }
        }
      };
    } else {
      btnProps = {
        button: {
          label: 'Join waitlist',
          loading: registerLoading.value,
          onClick: async () => { 
            await register(da.id); 
            await refreshWaitList();
          }
        }
      };
    }
  }

  return {
    id: da.code,
    title: da.name.toLocaleUpperCase(),
    price: `$${(da.price / 100).toString()}`,
    description: da.features.freeDescription,
    billingCycle: da.code === 'custom' ? 'custom' : '/month',
    ...btnProps
  };
 });

 return tiers;
});
const sections = computed<PricingTableSection[]>(() => {
  if (!plansData.value) return [];
  const plans = plansData.value.plans;
  
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
        v-if="loading && (!plansData && waitlistData)"
        class="mt-10"
      />
      <UAlert
        v-if="hasErrors"
        title="Error!"
        :description="plansError?.message || (waitlistError?.message === 'Not registered' ? undefined : waitlistError?.message)"
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