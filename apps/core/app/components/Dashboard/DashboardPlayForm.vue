<script setup lang="ts">
defineEmits<(e: 'check', ip: string) => void>();

const ipAddress = ref('');

const exampleAddresses = [
  '203.0.113.42',
  '1.1.1.1',
  '8.8.8.8'
];


</script>

<template>
  <div>
    <div class="grid gap-4 grid-cols-[minmax(0,1fr)_auto] items-end">
      <UFormField
        label="IP address"
        description="Use any IPv4 value to simulate the request context."
        name="ip-address"
        class="w-full"
      >
        <UInput
          v-model="ipAddress"
          icon="i-lucide-globe"
          placeholder="203.0.113.42"
          size="md"
          class="w-full"
          :ui="{ base: 'font-mono' }"
        />
      </UFormField>
      <UButton
        label="Send"
        color="primary"
        variant="subtle"
        icon="lucide:send"
        class="justify-self-start"
        @click="$emit('check', ipAddress)"
      />
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <span class="text-xs font-medium uppercase tracking-[0.18em] text-toned">Quick fill</span>

      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="address in exampleAddresses"
          :key="address"
          :label="address"
          color="neutral"
          variant="outline"
          size="sm"
          class="font-mono"
          @click="ipAddress = address"
        />
      </div>
    </div>
  </div>
</template>