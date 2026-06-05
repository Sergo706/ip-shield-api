<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';
import { useGetAvatar } from '~/composables/useGetAvatar';

const { data } = useGetAvatar();

const open = ref(false);
const colorMode = useColorMode();
const toast = useToast();
  
const props = withDefaults(defineProps<{
    badge?: number | string | undefined;
}>(), {
    badge: undefined
});

const userName = computed(() => (data.value?.name || data.value?.lastName) ? `${data.value.name} ${data.value.lastName}` : 'User');
const userAvatar = computed(() => data.value?.avatar ?? undefined);


const links = [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/dashboard',
  badge: props.badge,
  onSelect: () => {
    open.value = false;
  }
}, {
  label: 'Manage API Tokens',
  icon: 'i-lucide-key-round',
  to: '/dashboard/manage',
  badge: props.badge,
  onSelect: () => {
    open.value = false;
  }
}, 
{
  label: 'Playground',
  icon: 'i-lucide-flask-conical',
  to: '/dashboard/playground',
  badge: props.badge,
  onSelect: () => {
    open.value = false;
  }
}, 
{
  label: 'Plans',
  icon: 'i-lucide-credit-card',
  to: '/dashboard/plans',
  badge: props.badge,
  onSelect: () => {
    open.value = false;
  }
},
 {
  label: 'Settings',
  to: '/dashboard/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger',
}], 
[{
  label: 'Documentation',
  icon: 'i-lucide-book-open',
  to: '/docs',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-life-buoy',
  to: '/contact',
  target: '_blank'
}]] satisfies NavigationMenuItem[][];

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}]);


const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [{
        label: 'Light',
        icon: 'i-lucide-sun',
        type: 'checkbox',
        checked: colorMode.preference === 'light',
        onUpdateChecked(checked: boolean) {
          if (checked) {
            colorMode.preference = 'light';
          }
        },
        onSelect(e: Event) {
          e.preventDefault();
          colorMode.preference = 'light';
        }
      }, {
        label: 'Dark',
        icon: 'i-lucide-moon',
        type: 'checkbox',
        checked: colorMode.preference === 'dark',
        onUpdateChecked(checked: boolean) {
          if (checked) {
            colorMode.preference = 'dark';
          }
        },
        onSelect(e: Event) {
          e.preventDefault();
          colorMode.preference = 'dark';
        }
      }]
    },
  ],
  [    
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      type: 'link',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async onSelect() {
          const event = useRequestEvent();
          const fetcher = useRequestFetch();
          const headers = useRequestHeaders();
          interface LogoutResponse { ok: boolean; redirectTo?: string; reason?: string; data?: { ok: boolean } };

          const res = await executeRequest<unknown>('/logout', 'POST', undefined, {
            'Accept': 'application/json'
          }, {}, {event, fetcher, headers}) as LogoutResponse;
          if (res.ok && res.redirectTo) {
            toast.add({
              title: 'Success',
              description: 'Successfully logged out!',
              color: 'success',
              type: 'foreground',
              duration: 12000,
            });
             window.location.href = res.redirectTo ?? '/';
             return;
          } else {
            toast.add({
              title: 'Error',
              description: res.reason ?? 'Error logging out!',
              color: 'error',
              duration: 12000,
            });
          }
      }  
    }
]
]);
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      toggle-side="right"
      :toggle="{
        color: 'primary',
        variant: 'subtle',
        class: 'rounded-full'
      }"
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <LayoutLogo :is-text="!collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          class="bg-transparent ring-default"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UDropdownMenu
          :items="items"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
        >
          <UButton
            v-bind="{
              avatar: {
                src: userAvatar,
                alt: userName
              },
              label: collapsed ? undefined : userName,
              trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
            }"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="data-[state=open]:bg-elevated"
            :ui="{
              trailingIcon: 'text-dimmed'
            }"
          />
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />


    <slot />
  </UDashboardGroup>
</template>