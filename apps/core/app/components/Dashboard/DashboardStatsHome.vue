<script setup lang="ts">
import type { Period, Range } from '#layers/shared-layer/shared/types/TimePeriod';

const props = withDefaults(defineProps<{
    period: Period
    range: Range
    tokensCount?: number;
    requestsCount?: number;
    quotaCount?: number;
    remainingCount?: number;
}>(), {
    tokensCount: 10,
    requestsCount: 2000,
    quotaCount: 2313,
    remainingCount: 3131
});

const stats = [{
  title: 'total valid Tokens',
  icon: 'i-lucide-users',
  value: props.tokensCount,
}, {
  title: 'Requests This month',
  icon: 'i-lucide-chart-pie',
  value: props.requestsCount,
}, {
  title: 'Total Quota',
  icon: 'i-lucide-circle-dollar-sign',
  value: props.quotaCount,
}, {
  title: 'Remaining Quota This Month',
  icon: 'i-lucide-shopping-cart',
  value: props.remainingCount,
}];

</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>
      </div>
    </UPageCard>
  </UPageGrid>
</template>