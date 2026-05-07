<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';



const open = ref(false);
const colorMode = useColorMode();

  
const props = withDefaults(defineProps<{
    badge: number | string | undefined;
    user?: {
        avatar?: string;
        name?: string
    }
}>(), {
  user: () => ({
    avatar: 'https://github.com/benjamincanac.png',
    name: 'John Doe'
  })
});



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
      type: 'link'  
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
                src: props.user.avatar,
                alt: props.user.name
              },
              label: collapsed ? undefined : props.user.name,
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