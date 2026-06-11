<script setup lang="ts">
defineProps<{
  title?: string;
  animate: boolean;
}>();
</script>

<template>
  <div class="relative group">
    <div
      v-if="animate"
      class="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/10 dark:from-primary/20 via-emerald-500/5 dark:via-emerald-500/10 to-amber-500/5 dark:to-amber-500/10 blur-2xl opacity-40 dark:opacity-60 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-700"
    />
    
    <div class="relative h-full flex flex-col rounded-xl overflow-hidden ring-1 ring-neutral-200 dark:ring-white/5 shadow-2xl shadow-primary/5 dark:shadow-primary/10">
      <div class="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-white/5">
        <span class="w-3 h-3 rounded-full bg-red-500/80" />
        <span class="w-3 h-3 rounded-full bg-amber-500/80" />
        <span class="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span
          v-if="title"
          class="ml-3 text-xs text-neutral-500 font-mono"
        >{{ title }}</span>
      </div>
      
      <slot />
    </div>
  </div>
</template>