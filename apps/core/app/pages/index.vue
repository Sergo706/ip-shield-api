<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">


type HeroFormState = 'login' | 'signup' | 'forgot-password';
const route = useRoute();
const router = useRouter();

const form = ref<HeroFormState>('login');
const openModal = ref(route.query.type === 'mfa' || route.query.type === 'login');
const modalMsg = computed(() => route.query.type === 'mfa' ? 
      'To continue with this action, please check your email first' : 'Please login to your account first');
const modalTitle = computed(() => route.query.type === 'mfa' ? 'Security Verification' : 'Login to Account');
  
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
watch(openModal, (isOpen) => {
  if (!isOpen && route.query.type) {
    const newQuery = { ...route.query };
    delete newQuery.type;
    void router.replace({ query: newQuery });
  }
});
</script>

<template>
  <AuthModalPopOver 
    v-model:open="openModal"
    :msg="modalMsg"
    :title="modalTitle"
  />
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