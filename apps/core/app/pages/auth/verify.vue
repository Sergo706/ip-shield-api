<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type Component } from 'vue';
import AuthPasswordResetForm from '~/components/Auth/AuthPasswordResetForm.vue'; // TODO 
import AuthMfaForm from '~/components/Auth/AuthMfaForm.vue'; // TODO 
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

const componentProps = computed(() => ({
    ...result
}));
</script>

<template>
  <component
    :is="activeComponent"
    v-if="activeComponent"
    v-bind="componentProps"
  />
</template>