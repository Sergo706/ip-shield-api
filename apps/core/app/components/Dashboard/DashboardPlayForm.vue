<script setup lang="ts">
import z from 'zod';

const emit = defineEmits<(e: 'check', value: string, endpoint: string) => void>();
defineProps<{ loading: boolean }>();

const ipv4 = z.ipv4('Invalid ip address');
const email = z.email('Invalid email address');
const useragent = z.string('User agent needs to be a string');
const endpoint = ref('/api/v1/lookup/ip/:ip');

const items = [
  { label: 'IP Lookup',value: '/api/v1/lookup/ip/:ip', icon: 'i-lucide-search', inputType: 'ip', placeholder: '203.0.113.42' },
  { label: 'Email Domain', value: '/api/v1/check/email-domain/:email', icon: 'i-lucide-mail', inputType: 'email', placeholder: 'user@example.com' },
  { label: 'User Agent', value: '/api/v1/check/user-agent/:agent', icon: 'i-lucide-monitor', inputType: 'text',  placeholder: 'Mozilla/5.0...' },
  { label: 'Geo Check', value: '/api/v1/check/geo/:ip', icon: 'i-lucide-map-pin', inputType: 'ip', placeholder: '203.0.113.42' },
  { label: 'Network', value: '/api/v1/network/:ip', icon: 'i-lucide-network', inputType: 'ip', placeholder: '203.0.113.42' },
  { label: 'Summary', value: '/api/v1/summary/:ip', icon: 'i-lucide-bar-chart-2', inputType: 'ip', placeholder: '203.0.113.42' },
];

const selected = computed(() => items.find(i => i.value === endpoint.value));

const schema = computed(() => {
  const validator = 
    selected.value?.inputType === 'email' ? email :
    selected.value?.inputType === 'text'  ? useragent :
    ipv4;
  return z.object({ input: validator });
});
const state = reactive({ input: '' });

const quickFill = computed(() => {
  if (selected.value?.inputType === 'email') return [
    "alice@0clickemail.com",
    "bob@0n0ff.net",
    "jhon@0nelce.com",
    "mosses@0rg.fr",
  ];
  if (selected.value?.inputType === 'text') return [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'curl/7.68.0',
    'python-requests/2.28.0'
  ];
  return ['203.0.113.42', '1.1.1.1', '8.8.8.8'];
});

watch(() => selected.value?.inputType, () => { state.input = ''; });
function onSubmit() {
  emit('check', state.input, endpoint.value);
} 
</script>

<template>
  <div class="flex flex-col gap-5">
    <UForm
      :schema="schema" 
      :state="state"
      :validate-on="[]"
      @submit="onSubmit"
    >
      <UFormField
        label="Playground"
        :description="`GET ${selected?.value}`"
        name="input"
        :ui="{ description: 'font-mono text-xs' }"
      >
        <div class="flex gap-2 w-full">
          <UInputMenu
            v-model="endpoint"
            :items="items"
            value-key="value"
            label-key="label"
            icon="i-lucide-route"
            :loading="loading"
            :disabled="loading"
            class="w-52 shrink-0"
          />

          <UInput
            v-model="state.input"
            :icon="selected?.icon"
            :placeholder="selected?.placeholder"
            :type="selected?.inputType === 'email' ? 'email' : 'text'"
            class="flex-1"
            :disabled="loading"
            :ui="{ base: 'font-mono' }"
            @keyup.enter="$emit('check', state.input, endpoint)"
          />

          <UButton
            type="submit"
            icon="i-lucide-send"
            label="Send"
            color="primary"
            :loading="loading"
            :disabled="!state.input || !endpoint"
          />
        </div>
      </UFormField>
    </UForm>
    
    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium uppercase tracking-[0.18em] text-toned">Quick fill</span>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="val in quickFill"
          :key="val"
          :label="val"
          color="neutral"
          variant="outline"
          size="sm"
          class="font-mono truncate max-w-[220px]"
          @click="state.input = val"
        />
      </div>
    </div>
  </div>
</template>