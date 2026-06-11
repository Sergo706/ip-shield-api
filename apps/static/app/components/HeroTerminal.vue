<script setup lang="ts">
import JsonSnippet from './JsonSnippet.vue';

const endpoints = [
  {
    id: 'network',
    label: 'Network',
    commands: [
      '> curl -X GET https://api.ip-shield.com/v1/network/8.8.8.8 \\',
      '-H "Authorization: Bearer YOUR_API_KEY"'
    ],
    response: 
`
{
  "ok": true,
  "date": "${new Date().toISOString()}",
  "data": {
    "ip": "8.8.8.8",
    "proxy": false,
    "vpn": false,
    "threat_level": "low",
    "is_known_bot": false,
    "bot_details": null,
    "is_tor_node": false,
    "tor_details": null,
    "asn": {
      "asn_id": 15169,
      "asn_name": "GOOGLE",
      "classification": "hosting",
      "route_visibility_count": 8945
    }
  },
  "meta": {
    "total_credits": 10000,
    "credits_remaining": 9999
  }
}`
  }
];

const selectedTab = ref(0);
const typedCommand = ref('');
const showResponse = ref(false);
const showCursor = ref(true);
let typeInterval: ReturnType<typeof setInterval>;
let blinkInterval: ReturnType<typeof setInterval>;

const currentEndpoint = computed(() => endpoints[selectedTab.value] ?? endpoints[0]);

const startTyping = () => {
  clearInterval(typeInterval);
  typedCommand.value = '';
  showResponse.value = false;
  showCursor.value = true;
  
  let charIndex = 0;
  const fullCommand = currentEndpoint.value?.commands.join('\n');
  
  typeInterval = setInterval(() => {
    if (fullCommand && charIndex < fullCommand.length) {
      typedCommand.value += fullCommand.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        showResponse.value = true;
        showCursor.value = false;
      }, 300);
    }
  }, 30);
};


watch(selectedTab, () => {
  startTyping();
});

onMounted(() => {
  startTyping();
  blinkInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
});

onUnmounted(() => {
  clearInterval(typeInterval);
  clearInterval(blinkInterval);
});
</script>

<template>
  <WindowFrame
    :animate="false"
    :title="'/v1/network/8.8.8.8'"
    class="w-full overflow-hidden rounded-xl bg-gray-950/90 shadow-2xl border border-gray-800 backdrop-blur-md animate-fade-in relative z-10 flex flex-col h-[550px]"
  >
    <div class="p-4 sm:p-5 font-mono text-[11px] sm:text-sm overflow-y-auto flex-1 text-left hide-scrollbar bg-gray-950/50">
      <div class="text-emerald-400 whitespace-pre-wrap break-all pb-2">
        {{ typedCommand }}<span
          v-if="showCursor"
          class="inline-block w-1.5 sm:w-2 h-3 sm:h-4 ml-1 bg-emerald-400 align-middle"
        />
      </div>
      
      <div
        v-if="showResponse"
        class="mt-3 sm:mt-4 animate-fade-in"
      >
        <div class="text-gray-500 mb-2 text-[10px] sm:text-xs">
          HTTP/1.1 200 OK
        </div>
        
        <JsonSnippet
          v-if="currentEndpoint?.response"
          :data="currentEndpoint.response"
        />
      </div>
    </div>
  </WindowFrame>
</template>

<style scoped>
.animate-fade-in {
  animation: fade-in 0.3s ease-out both;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
