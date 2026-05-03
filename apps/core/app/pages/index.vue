<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

type HeroFormState = 'login' | 'signup' | 'forgot-password';

const form = ref<HeroFormState>('login');

const content = computed(() => {
  if (form.value === 'signup') {
    return {
      title: "Start Using Our Powerful API",
      description: "Get FREE Early access On ALL features on day ONE!",
      headline: "FREE Early access"
    };
  }

  return {
    title: 'Welcome Back!',
    description: 'Login to your account to continue from where you started',
    headline: 'Login'
  };
});
</script>

<template>
  <UPageHero
    class="w-full!"
    :title="content.title"
    :description="content.description"
    :headline="content.headline"
    orientation="horizontal"
  >
    <AuthForm @type-change="(e) => form = e" />
  </UPageHero>
</template>