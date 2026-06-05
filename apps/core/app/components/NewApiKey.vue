<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
const {  copy, copied } = useClipboard({copiedDuring: 5000, legacy: true});

defineProps<{
    rawApiKey: string
}>();
</script>

<template>
  <UPageCard
    title="Your API Key"
    icon="i-lucide-key"
    class="w-full"
    :ui="{ footer: 'w-full'}"
    description="Make sure you copy your key, as it the last time it will be displayed"
  > 
    <template #footer>
      <UInput
        :model-value="rawApiKey"
        readonly
        class="w-full font-mono"
        variant="soft"
        color="primary"
        size="lg"
        :ui="{ trailing: 'pr-0.5' }"
        @focus="$event.target.select()"
      >
        <template
          v-if="rawApiKey"
          #trailing
        >
          <UTooltip
            text="Copy to clipboard"
            :content="{ side: 'right' }"
          >
            <UButton
              :color="copied ? 'success' : 'neutral'"
              variant="link"
              size="sm"
              :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
              aria-label="Copy to clipboard"
              @click="copy(rawApiKey || '')"
            />
          </UTooltip>
        </template>
      </UInput>
    </template>
  </UPageCard>
</template>