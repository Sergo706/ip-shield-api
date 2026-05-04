<script setup lang="ts">
import type { FilterableTableApi, HomeTokenList, SortableColumn, SortingItem } from '~~/shared/types/DashboardTokenList';
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import { DateFormatter } from '@internationalized/date';
import { upperFirst } from 'scule';

// TODO: // CRUD Actions
const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');
const UDropdownMenu = resolveComponent('UDropdownMenu');


const props = defineProps<{
  data: HomeTokenList[];
}>();

const locale = ref(import.meta.client ? navigator.language : 'en-US');
onMounted(() => {
  locale.value = navigator.language;
});

const dtFmt = computed(() => new DateFormatter(locale.value, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}));

const timeFmt = computed(() => new DateFormatter(locale.value, {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}));


const sorting = ref<SortingItem[]>([
  {
    id: 'created_at',
    desc: true
  }
]);


function getSortableHeader(column: SortableColumn, label: string) {
  const isSorted = column.getIsSorted();

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start'
      },
      'aria-label': `${label} sorting options`,
      items: [
        {
          label: 'Asc',
          type: 'checkbox' as const,
          icon: 'i-lucide-arrow-up-narrow-wide',
          checked: isSorted === 'asc',
          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting();
              return;
            }

            column.toggleSorting(false);
          }
        },
        {
          label: 'Desc',
          type: 'checkbox' as const,
          icon: 'i-lucide-arrow-down-wide-narrow',
          checked: isSorted === 'desc',
          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting();
              return;
            }

            column.toggleSorting(true);
          }
        }
      ]
    },
    () =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label,
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 data-[state=open]:bg-elevated',
        'aria-label': `Sort ${label}`
      })
  );
}

const columns: TableColumn<HomeTokenList>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => getSortableHeader(column, '# ID'),
    cell: ({ row }) => `#${String(row.getValue<number>('id'))}`
  },
  {
    accessorKey: 'name',
    header: ({ column }) => getSortableHeader(column, 'Name')
  },
  {
    accessorKey: 'active',
    header: ({ column }) => getSortableHeader(column, 'Status'),
    cell: ({ row }) => {
      const active = row.getValue<boolean>('active');
      return h(UBadge, { class: 'capitalize', variant: 'subtle', color: active ? 'success' as const : 'error' as const }, () =>
        active ? 'Active' : 'Inactive'
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => getSortableHeader(column, 'Created'),
    cell: ({ row }) => dtFmt.value.format(new Date(row.getValue<Date>('created_at')))
  },
  {
    accessorKey: 'expires_at',
    header: ({ column }) => getSortableHeader(column, 'Expires'),
    cell: ({ row }) => {
      const val = row.getValue<Date | null>('expires_at');
      if (!val) return '—';
      return dtFmt.value.format(new Date(val));
    }
  },
  {
    accessorKey: 'last_used',
    header: ({ column }) => getSortableHeader(column, 'Last Used'),
    cell: ({ row }) => timeFmt.value.format(new Date(row.getValue<Date>('last_used')))
  },
  {
    accessorKey: 'usage_count',
    header: ({ column }) => getSortableHeader(column, 'Usage'),
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium'
      }
    },
    cell: ({ row }) => row.getValue<number>('usage_count').toLocaleString()
  },
  {
    accessorKey: 'restricted_to_ip_address',
    header: ({ column }) => getSortableHeader(column, 'Restricted to IPs'),
    cell: ({ row }) => {
      const val = row.getValue<string | string[]>('restricted_to_ip_address');
      return Array.isArray(val) ? val.join(', ') : val;
    }
  },
  {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    meta: {
      class: {
        td: 'text-right'
      }
    },
    cell: () => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: 'end'
          },
          items: getRowItems(),
          'aria-label': 'Actions dropdown'
        },  
        () =>
          h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'primary',
            variant: 'ghost',
            'aria-label': 'Actions dropdown'
          })
      );
    }
  }
];


function getRowItems() {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      type: 'separator'
    },
    {
      label: 'Rotate Token',
      onSelect() {
        // TODO
      }
    },
    {
      label: 'Set new Ip restrictions',
      onSelect() {
        // TODO
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Revoke Token',
      color: 'error',
      onSelect() {
        // TODO
      }
    },

  ];
}
const table = useTemplateRef('table');

const name = computed({
  get: (): string => {
    const tableApi = table.value?.tableApi as FilterableTableApi | undefined;
    const filterValue = tableApi?.getColumn('name')?.getFilterValue();
    return typeof filterValue === 'string' ? filterValue : '';
  },
  set: (value: string) => {
    const tableApi = table.value?.tableApi as FilterableTableApi | undefined;
    tableApi?.getColumn('name')?.setFilterValue(value || undefined);
  }
});

</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
    <UInput
      v-model="name"
      class="w-full sm:max-w-sm"
      icon="i-lucide-search"
      placeholder="Filter by name..."
      @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
    />

    <UDropdownMenu
      class="w-full sm:w-auto"
      :items="
        table?.tableApi
          ?.getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => ({
            label: upperFirst(column.id),
            type: 'checkbox' as const,
            checked: column.getIsVisible(),
            onUpdateChecked(checked: boolean) {
              table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
            },
            onSelect(e?: Event) {
              e?.preventDefault()
            }
          }))
      "
      :content="{ align: 'end' }"
    >
      <UButton
        label="Display"
        color="neutral"
        variant="outline"
        class="w-full sm:ml-auto sm:w-auto"
        trailing-icon="i-lucide-settings-2"
      />
    </UDropdownMenu>
  </div>

  <UTable
    ref="table"
    v-model:sorting="sorting"
    :data="props.data"
    :columns="columns"
    sticky
    :loading="false"
    loading-color="primary"
    loading-animation="carousel"
    :ui="{
      base: 'table-fixed border-separate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
      td: 'border-b border-default'
    }"
  />
</template>
