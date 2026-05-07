<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useAuthRedirect } from '~/composables/useAuthRedirect';
import type { PricingTableTier, PricingTableSection } from '@nuxt/ui';
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

// TODO: Fetch data from db
const tiers = ref<PricingTableTier[]>([
  {
    id: 'free',
    title: 'FREE',
    price: '$0',
    description: 'Free forever',
    billingCycle: '/month',
  },
  {
    id: 'pro',
    title: 'Pro',
    price: '$50',
    description: 'More generous limits',
    billingCycle: '/month',
    button: {
      label: 'Join waitlist'
    }
  },
  {
    id: 'custom',
    title: 'Custom',
    price: 'Custom',
    description: 'Best for large teams & enterprises',
    button: {
      label: 'Join waitlist',
      color: 'neutral'
    }
  }
]);

const sections = ref<PricingTableSection[]>([
  {
    title: 'Features',
    features: [
      {
        title: 'Always fresh data',
        tiers: {
          free: true,
          pro: true,
          custom: true
        }
      },
      {
        title: 'Access to 14 datasets',
        tiers: {
          free: true,
          pro: true,
          custom: true
        }
      },
     {
        title: 'Custom datasets',
        tiers: {
          free: false,
          pro: 1,
          custom: 'Contact us'
        }
      },
      {
        title: 'Rate limits',
        tiers: {
          free: '50 requests/min, 1000 total for month',
          pro: '100 requests/min, 3000 total for month',
          custom: 'Contact us'
        }
      },
    ]
  },
  {
    title: 'Early adopter benefits',
    features: [
      {
        title: 'Rate limits from your selected plan',
        tiers: {
          free: false,
          pro: 'Free for the first 2 months',
          custom: 'Contact us'
        }
      }
    ]
  }
]);

// TODO: Register the user for the waitlist

</script>

<template>
  <UDashboardPanel id="plans">
    <template #header>
      <UDashboardNavbar title="Plans">
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
      <UPageHero
        title="IP Shield Public Preview"
        description="The standard plan is free and always will be. We are currently finalizing premium tiers for custom data hosting and expanded API rate limits. Register today to lock in an early-adopter credit for your first months of premium usage."
      />

      <UPricingTable
        :tiers="tiers"
        :sections="sections"
        class="mb-20"
      />
    </template>
  </UDashboardPanel>
</template>