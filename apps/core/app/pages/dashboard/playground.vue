<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useAuthRedirect } from '~/composables/useAuthRedirect';
import z from 'zod';

const ipv = z.ipv4(); // validate

// await useAuthRedirect('/', undefined);
definePageMeta({
    layout: 'dashboard'
});

const data = `
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
`;
const errors = ref(undefined);

// TODO: fetch
</script>

<template>
  <UDashboardPanel id="playground">
    <template #header>
      <UDashboardNavbar title="Playground">
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
      <UCard 
        title="Playground"
        description="Enter an ip address below to get a response"
      >
        <DashboardPlayForm @check="(e) => console.log(e)" />
        <UBadge 
          v-if="data"
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
          v-else-if="!data && errors" 
          class="w-full mt-5"
          icon="i-lucide-circle-alert"
          color="error"
          title="Snap!"
          description="The message of the error"
          variant="subtle"
        />
      </UCard>
    </template>
  </UDashboardPanel>
</template>