<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { contactSchema } from '#layers/shared-layer/shared/types/ContactSchema';

const state = ref({
  email: '',
  message: '',
  fullname: '',
  subject: '',
});


const loading = ref(false);
const token = ref('');
const turnstile = ref<{ reset: () => void } | null>(null);
const toast = useToast();

async function onSubmit() {
  loading.value = true;
  try {
    if (!token.value) {
      toast.add({
        title: 'Error!',
        description: 'Please complete the captcha',
        type: 'foreground',
        color: 'error'
      });
      loading.value = false;
      return;
    }

    await $fetch('/contact', {
      method: 'POST',
      body: {
        ...state.value,
        token: token.value,
      },
    });

    state.value = {
      email: '',
      message: '',
      fullname: '',
      subject: '',
    };
    token.value = ''; 
    toast.add({
        title: 'Success!',
        description: 'Your message has been sent successfully',
        type: 'foreground',
        color: 'success'
    });
  }
  catch {
    toast.add({
        title: 'Error!',
        description: 'Oups, an error occurred while sending your message',
        type: 'foreground',
        color: 'error'
    });
  }
  finally {
    turnstile.value?.reset();
    loading.value = false;
  }
}
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col pt-4 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="flex flex-col sm:items-center sm:justify-between">
      <UForm
        :state
        :schema="contactSchema"
        class="flex w-full max-w-[40rem] flex-col gap-3"
        @submit="onSubmit"
      >
        <UFormField
          label="Fullname"
          name="fullname"
          required
        >
          <UInput
            v-model="state.fullname"
            type="text"
            autocomplete="name"
            class="w-full"
            placeholder="John Doe"
          />
        </UFormField>

        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            autocomplete="email"
            class="w-full"
            placeholder="john.doe@gmail.com"
          />
        </UFormField>


        <UFormField
          label="Subject"
          name="subject"
          required
        >
          <UInput
            v-model="state.subject"
            class="w-full"
            placeholder="Subject"
          />
        </UFormField>

        <UFormField
          label="Message"
          name="message"
          required
        >
          <UTextarea
            v-model="state.message"
            autoresize
            class="w-full"
            :rows="4"
            placeholder="You message..."
          />
        </UFormField>
        <NuxtTurnstile 
          ref="turnstile"
          v-model="token"
          class="w-full"
          :options="{ size: 'flexible' }"
        />
        <div class="flex justify-center">
          <UButton
            :loading="loading"
            type="submit"
            block
          >
            Send Message
          </UButton>
        </div>
      </UForm>
    </div>
  </section>
</template>