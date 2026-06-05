<!-- eslint-disable @typescript-eslint/no-unnecessary-condition -->
<script setup lang="ts">
import type { HomeTokenList } from '~~/shared/types/DashboardTokenList';
import type { TableColumn } from '@nuxt/ui';
import { useDateFormatter } from '~/composables/useDateFormatter';

const UBadge = resolveComponent('UBadge');
const { formatDate } = useDateFormatter();
const props = defineProps<{
  data: HomeTokenList[];
}>();

const locale = ref(import.meta.client ? navigator.language : 'en-US');
onMounted(() => { locale.value = navigator.language; });


const columns: TableColumn<HomeTokenList>[] = [
  {
    accessorKey: 'id',
    header: '# ID',
    cell: ({ row }) => `#${String(row.getValue<number>('id'))}`
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.getValue<boolean>('active');
      return h(UBadge, { class: 'capitalize', variant: 'subtle', color: active ? 'success' as const : 'error' as const }, () =>
        active ? 'Active' : 'Inactive'
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => formatDate(row.getValue<Date>('created_at'))
  },
  {
    accessorKey: 'expires_at',
    header: 'Expires',
    cell: ({ row }) => {
      const val = row.getValue<Date | null>('expires_at');
      if (!val) return '—';
      return formatDate(val);
    }
  },
  {
    accessorKey: 'last_used',
    header: 'Last Used',
    cell: ({ row }) => {
      const val = row.getValue<Date | null>('last_used');
      if (!val || isNaN(val.getTime())) return 'Never used';
      return formatDate(val);
    }
  },
  {
    accessorKey: 'usage_count',
    header: 'Usage',
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
    header: 'Restricted to IPs',
    cell: ({ row }) => {
      const val = row.getValue<string | string[]>('restricted_to_ip_address');
        if (Array.isArray(val) && val.length > 0) {
          return val.join(', ');
        } else if(typeof val === 'string') return val;
        else {
          return '—';
        }
    }
  }
];

</script>

<template>
  <UTable
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