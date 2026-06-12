<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ data?: string }>();

const highlightedJson = computed(() => {
  if (!props.data) return '';
  return props.data
    .replace(/("[^"]*")(?=:)/g, '<span class="text-indigo-400">$1</span>')
    .replace(/: ("[^"]*")/g, ': <span class="text-amber-300">$1</span>')
    .replace(/: ([0-9]+|true|false|null)/g, ': <span class="text-emerald-300">$1</span>');
});
</script>

<template>
  <pre class="text-blue-300 p-3 sm:p-4 rounded-md bg-gray-900/60 overflow-x-auto hide-scrollbar text-[10px] sm:text-xs leading-relaxed border border-gray-800/50">
    <code 
      v-if="data" 
      v-html="highlightedJson" 
    />
    <code v-else><slot />
    </code>
    </pre>
</template>