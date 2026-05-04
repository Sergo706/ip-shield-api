<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useAuthRedirect } from '~/composables/useAuthRedirect';
// await useAuthRedirect('/', undefined);
definePageMeta({
    layout: 'dashboard'
});

// TODO: Composoble to create tokens
// TODO: API data

const data = ref([
  {
    id: 4600,
    created_at: new Date('2024-03-11T15:30:00'),
    expires_at: new Date('2024-07-11T15:30:00'),
    last_used: new Date('2024-04-01T09:12:00'),
    totalUsageCount: 10000,
    usage_count: 142,
    restricted_to_ip_address: '1.1.1.1',
    active: true,
    name: 'james.anderson@example.com',
  },
  {
    id: 4601,
    created_at: new Date('2024-02-03T08:20:00'),
    expires_at: null,
    last_used: new Date('2024-04-21T21:44:00'),
    totalUsageCount: 10000,
    usage_count: 991,
    restricted_to_ip_address: ['203.0.113.5', '203.0.113.9'],
    active: true,
    name: 'olivia.brown@example.com',
  },
  {
    id: 4602,
    created_at: new Date('2024-01-15T12:11:00'),
    expires_at: new Date('2024-05-30T12:00:00'),
    last_used: new Date('2024-04-27T05:31:00'),
    totalUsageCount: 10000,
    usage_count: 12,
    restricted_to_ip_address: '198.51.100.44',
    active: true,
    name: 'sara.lee@example.com',
  },
  {
    id: 4603,
    created_at: new Date('2023-11-08T17:03:00'),
    expires_at: null,
    last_used: new Date('2024-04-29T13:17:00'),
    totalUsageCount: 10000,
    usage_count: 0,
    restricted_to_ip_address: '192.0.2.10',
    active: false,
    name: 'inactive.token@example.com',
  },
  {
    id: 4604,
    created_at: new Date('2024-04-14T07:45:00'),
    expires_at: new Date('2024-12-31T23:59:59'),
    last_used: new Date('2024-04-30T11:09:00'),
    totalUsageCount: 10000,
    usage_count: 64,
    restricted_to_ip_address: ['10.0.0.25', '10.0.0.26'],
    active: true,
    name: 'ops-automation@example.com',
  }
]);

</script>

<template>
  <UDashboardPanel id="manage">
    <template #header>
      <UDashboardNavbar title="Manage Tokens">
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
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-10 pb-4">
        <DashboardManageTokens
          v-if="data.length > 0"
          :data="data"
          class="flex-1 min-h-[350px]"
        />

        <UEmpty 
          v-else
          class="flex-1 min-h-[550px] grid place-content-center text-center"
          icon="i-lucide-key-round"
          title="No tokens yet" 
          description="It looks like you haven't created any tokens yet. Create one to get started."
          :ui="{ root: 'ring-0' }"
          :actions="[
            {
              icon: 'i-lucide-key-round',
              label: 'Create token',
              class: 'cursor-pointer',
              variant: 'subtle',
              color: 'primary'
            },
            {
              icon: 'i-lucide-flask-conical',
              label: 'Playground',
              to: '/dashboard/playground',
              class: 'cursor-pointer',
              color: 'primary',
              variant: 'outline'
            }
          ]"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>