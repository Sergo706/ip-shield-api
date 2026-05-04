<script setup lang="ts">
const props = defineProps<{data: string }>();

const value = `
\`\`\`json
${props.data}
\`\`\`
`;
</script>

<template>
  <MDC :value="value" />
</template>