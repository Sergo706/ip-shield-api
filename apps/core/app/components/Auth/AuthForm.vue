<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';
import { loginSchema, signUpSchema, resetPassword } from '~~/shared/types/auth';
import { onSendAuth } from '~~/app/utils/sendAuth';
import { useToast } from '#imports';

type FormType = 'login' | 'signup' | 'forgot-password'
const props = withDefaults(defineProps<{ type?: FormType }>(), {
  type: 'login'
});

defineEmits<(e: 'typeChange', type: FormType) => void>();

const type = ref(props.type);

const emailField: AuthFormField = {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'example@gmail.com',
  required: true
};

const passwordField: AuthFormField = {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
};


const fields = computed<AuthFormField[]>(() => {
  const loginFields: AuthFormField[] = [emailField, passwordField];

  if (type.value === 'signup') {
    const signupFields: AuthFormField[] = [
      {
        name: 'firstname',
        label: 'Firstname',
        type: 'text',
        placeholder: 'Enter your firstname',
        required: true
      },
      {
        name: 'lastname',
        label: 'Lastname',
        type: 'text',
        placeholder: 'Enter your lastname',
        required: true
      },
      ...loginFields,
      {
        name: 'confirmedPassword',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Please confirm your password',
        required: true
      }
    ];

    return signupFields;
  }

  if (type.value === 'forgot-password') {
    return [emailField];
  }

  return loginFields;

});

const schema = computed(() => type.value === 'signup' ? signUpSchema : type.value === 'forgot-password' ? resetPassword : loginSchema);

const formCopy = computed(() => {
  if (type.value === 'signup') { 
    return {
      title: 'Sign up',
      submitLabel: 'Create account'
    };
  }
  else if (type.value === 'forgot-password') {
    return {
        title: 'Reset Password',
        submitLabel: 'Reset password'
    };
  } else {
      return {
          title: 'Login',
          submitLabel: 'Login'
        };
    }
});

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: async () => {
    await navigateTo('/oauth/google', { external: true });
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: async () => {
    await navigateTo('/oauth/github', { external: true });
  }
}];


type LoginSchema = z.infer<typeof loginSchema>
type SignupSchema = z.infer<typeof signUpSchema>
type ResetPass = z.infer<typeof resetPassword>
const ajaxError = ref<string | undefined>('');

async function onSubmit(payload: FormSubmitEvent<LoginSchema | SignupSchema | ResetPass>) {
  ajaxError.value = '';
  const toast = useToast();

  if (type.value === 'forgot-password') {
     const res = await onSendAuth(payload, 'forgot-password');
     if (!res.ok) {
        ajaxError.value = res.reason;
        return;
     }
     
     toast.add({
        title: 'Success',
        description: typeof res.data === 'string' ? res.data : 'An link reset your password have been send to your email successfully!',
        color: 'success'
     });

  } 

  else if (type.value === 'signup') {
     const res = await onSendAuth(payload, 'signup');
     if (!res.ok) {
        ajaxError.value = res.reason;
        return;
     }

       await navigateTo(String(res.data), { external: true });
       return;
  }
 
  else {
    const res = await onSendAuth(payload, 'login');
    if (!res.ok) {
        ajaxError.value = res.reason;
        return;
    }
  await navigateTo(String(res.data), { external: true });
  return;
} 
   ajaxError.value = 'Unexpected error! please try again later';
   return;
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <UPageCard class="w-full!">
      <UAuthForm
        :validate-on="[]"
        :schema="schema"
        :loading-auto="true"
        :title="formCopy.title"
        icon="i-lucide-user"
        :fields="fields"
        :providers="type === 'forgot-password' ? [] : providers"
        :submit="{
          label: formCopy.submitLabel
        }"
        @submit="onSubmit"
      >
        <template
          v-if="type === 'login'"
          #description
        >
          Don't have an account? <ULink
            class="text-primary font-medium cursor-pointer"
            @click.prevent="$emit('typeChange', 'signup'); type = 'signup'"
          >
            Sign up
          </ULink>
        </template>
        
        <template
          v-else-if="type === 'signup'"
          #description
        >
          Already have an account? <ULink
            class="text-primary font-medium cursor-pointer"
            @click.prevent="$emit('typeChange', 'login'); type = 'login'"
          >
            Login
          </ULink>
        </template>

        <template
          v-else
          #description
        >
          Enter your email to reset your password or go back to <ULink
            class="text-primary font-medium cursor-pointer"
            @click.prevent="$emit('typeChange', 'login'); type = 'login'"
          >
            Login
          </ULink>
        </template>

        <template
          v-if="type === 'login'"
          #password-hint
        >
          <ULink
            class="text-primary font-medium"
            tabindex="-1"
            @click.prevent="type = 'forgot-password'"
          >
            Forgot password?
          </ULink>
        </template>

        <template #validation>
          <UAlert
            v-if="ajaxError"
            color="error"
            variant="subtle"
            :description="ajaxError"
          />
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

