<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type Component } from 'vue';
import AuthPasswordResetForm from '~/components/Auth/AuthPasswordResetForm.vue';
import AuthMfaForm from '~/components/Auth/AuthMfaForm.vue';
import AuthChangeEmail from '~/components/Auth/AuthChangeEmail.vue';
import {useMagicLink} from '@riavzon/auth-h3client/client';
const result = await useMagicLink(); 


if ('error' in result) {
    throw createError({
        statusCode: 404,
        statusText: 'Not Found',
        message: `The page you are looking for doesn't exists`
    });  
}

const activeComponent = computed<Component | null>(() => {
    switch (result.reason) {
        case 'PASSWORD_RESET':
            return AuthPasswordResetForm as Component;
        case 'MAGIC_LINK_MFA_CHECKS':
            return AuthMfaForm as Component;
        case 'change_email':
            return AuthChangeEmail as Component; 
        default:
            return AuthMfaForm as Component;
    }
});
const title = computed(() => result.reason === 'PASSWORD_RESET' ? 'Enter your new password' : result.reason === 'change_email' ? 'Change your email' : 'Enter your security code');

const componentProps = computed(() => ({
    ...result
}));
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 m-auto">
    <UPageCard 
      class="w-full max-w-md"
      variant="outline"
      :ui="{
        wrapper: 'flex flex-col flex-1 items-center justify-center',
      }"
    >
      <template
        #header
      >
        <div class="mx-auto flex w-fit flex-col items-center justify-center gap-4 text-center">
          <UIcon
            name="i-lucide-lock"
            class="size-10"
          />
          {{ title }}
        </div>
      </template>
      <component
        :is="activeComponent"
        v-if="activeComponent"
        v-bind="componentProps"
      />
    </UPageCard>
  </div>
</template>