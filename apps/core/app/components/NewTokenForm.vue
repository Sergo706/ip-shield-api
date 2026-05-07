<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { newApiTokenSchema, type NewApiTokenInput } from '~~/shared/types/apiTokens';

const state: NewApiTokenInput = reactive({
    name: '',
    prefix: '',
    ipv4: [] as string[],
    expires: undefined as number | undefined
});
const errors = ref('');

const localTimeZone = getLocalTimeZone();
const minExpiryDate = today(localTimeZone);
const expiryModel = ref<DateValue | undefined>();
const inputDate = useTemplateRef('inputDate');

const getExpiryDuration = (value?: DateValue) => {
  if (!value) return undefined;
  
  // valid through the end of that local day.
  const expiresAt = value.add({ days: 1 }).toDate(localTimeZone).getTime() - 1;
  return Math.max(expiresAt - Date.now(), 1);
};

const submit = async () => {
    state.expires = getExpiryDuration(expiryModel.value);
    await new Promise(res => setTimeout(res, 5000));
    console.log(state);
   // TODO: SEND etc

};

</script>

<template>
  <div
    class="w-full"
  >
    <UForm
      :schema="newApiTokenSchema"
      :state="state"
      :validate-on="[]"
      :loading-auto="true"
      class="flex w-full flex-col gap-4"
      @submit="submit"
    >
      <UFormField
        label="Name"
        help="The name of your api key"
        name="name"
        required
        class="w-full"
      >
        <UInput
          v-model="state.name"
          class="w-full"
          variant="soft"
          color="neutral"
          icon="i-lucide-tag"
          highlight
        />
      </UFormField>
      
      <UFormField
        label="Prefix"
        name="prefix"
        help="The prefix that will be attach to your api key, eg. prefix_key***."
        required
        class="w-full"
      >
        <UInput
          v-model="state.prefix"
          class="w-full"
          variant="soft"
          color="neutral"
          icon="i-lucide-key-round"
          highlight
        />
      </UFormField>

      <UFormField
        label="Allowed IP's"
        name="ipv4"
        help="Provide an ip lists to restrict usage only to these ones"
        optional
        class="w-full"
      >
        <UInputMenu
          v-model="state.ipv4" 
          create-item
          multiple
          highlight
          variant="subtle"
          color="neutral"
          icon="i-lucide-network"
          class="w-full"
          delete-icon="i-lucide-trash"
          @create="(item: string) => state.ipv4?.push(item)"
        />
      </UFormField>

      <UFormField
        label="Expiry"
        name="expires"
        help="Optionally, set an expiry date for this token"
        optional
        class="w-full"
      >
        <UInputDate
          ref="inputDate"
          v-model="expiryModel"
          class="w-full"
          :min-value="minExpiryDate"
        >
          <template #leading>
            <UPopover 
              :content="{
                align: 'center',
                side: 'bottom',
                sideOffset: 8
              }"
              :reference="inputDate?.inputsRef[3]?.$el"
            >
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-calendar"
                aria-label="Select a date"
                class="px-0"
              />

              <template #content>
                <UCalendar
                  v-model="expiryModel"
                  :min-value="minExpiryDate"
                  color="primary"
                  variant="subtle"
                  class="p-2"
                />
              </template>
            </UPopover>
          </template>
        </UInputDate>
      </UFormField>
      
      <UButton
        type="submit"
        color="primary"
        variant="subtle"
        loading-auto
        icon="i-lucide-badge-plus"
        size="md"
        class="w-full cursor-pointer justify-center"
      >
        Submit
      </UButton>
    </UForm>
    
    <UAlert 
      v-if="errors"
      class="mt-4 w-full"
      icon="i-lucide-circle-alert"
      color="error"
      title="Error!"
      :description="errors"
      variant="subtle"
    />
  </div>
</template>