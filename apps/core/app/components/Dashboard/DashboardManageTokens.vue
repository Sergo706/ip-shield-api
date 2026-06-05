<script setup lang="ts">
import type { FilterableTableApi, HomeTokenList, SortingItem } from '~~/shared/types/DashboardTokenList';
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import { upperFirst } from 'scule';
import AuthApiModal from '~/components/Auth/AuthApiModal.vue';
import { getSortableHeader } from '~~/app/utils/sortableHeader';
import { useDateFormatter } from '~/composables/useDateFormatter';
import { useApiTokens } from '~~/app/composables/useTokens';

const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const { dtFmt, formatDate } = useDateFormatter();
const { rotate, rotatedToken, revoke, revokedToken, error: tokensError } = useApiTokens();
const showLoadingModal = ref(false);
const showRotateModal = ref(false);
const toast = useToast();

const props = defineProps<{
  data: HomeTokenList[];
}>();

const emit = defineEmits(['submitted']);

const sorting = ref<SortingItem[]>([
  {
    id: 'created_at',
    desc: true
  }
]);


const columns = computed<TableColumn<HomeTokenList>[]>(() => [
  {
    accessorKey: 'id',
    header: ({ column }) => getSortableHeader(column, '# ID', {UButton, UDropdownMenu}),
    cell: ({ row }) => `#${String(row.getValue<number>('id'))}`
  },
  {
    accessorKey: 'name',
    header: ({ column }) => getSortableHeader(column, 'Name', {UButton, UDropdownMenu})
  },
  {
    accessorKey: 'active',
    header: ({ column }) => getSortableHeader(column, 'Status', {UButton, UDropdownMenu}),
    cell: ({ row }) => {
      const active = row.getValue<boolean>('active');
      return h(UBadge, { class: 'capitalize', variant: 'subtle', color: active ? 'success' as const : 'error' as const }, () =>
        active ? 'Active' : 'Inactive'
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => getSortableHeader(column, 'Created', {UButton, UDropdownMenu}),
    cell: ({ row }) => dtFmt.value.format(new Date(row.getValue<Date>('created_at')))
  },
  {
    accessorKey: 'expires_at',
    header: ({ column }) => getSortableHeader(column, 'Expires', {UButton, UDropdownMenu}),
    cell: ({ row }) => {
      const val = row.getValue<Date | null>('expires_at');
      if (!val) return '—';
      return dtFmt.value.format(new Date(val));
    }
  },
  {
    accessorKey: 'last_used',
    header: ({ column }) => getSortableHeader(column, 'Last Used', {UButton, UDropdownMenu}),
    cell: ({ row }) => formatDate(new Date(row.getValue<Date>('last_used')))
  },
  {
    accessorKey: 'usage_count',
    header: ({ column }) => getSortableHeader(column, 'Usage', {UButton, UDropdownMenu}),
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
    header: ({ column }) => getSortableHeader(column, 'Restricted to IPs', {UButton, UDropdownMenu}),
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
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: 'end'
          },
          items: getRowItems(row.getValue<number>('id')),
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
]);


function getRowItems(tokenId: number) {
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
      async onSelect() {
        const overlay = useOverlay();
        const modal = overlay.create(AuthApiModal);
        const instance = modal.open({
          title: 'Token Rotation',
          msg: `You sure you want to proceed? the old couldn't be used after this point, and the new one will have the settings the old want did.`,
          action: 'rotate',
          tokenId
        }); 

        if ((await instance.result) === true) {
          try {
            tokensError.value = '';
            showLoadingModal.value = true;
            await rotate(tokenId);

            if (rotatedToken.value) {
                showRotateModal.value = true;
                emit('submitted');
                return;
            }

            else if (tokensError.value) {
             toast.add({
                  title: 'Error',
                  description: tokensError.value,
                  color: 'error',
                  duration: 10000,
                });
            }
            return;
          } finally {
            showLoadingModal.value = false;
          }
        }

        return;
      }
    },
    {
      label: 'Set new Ip restrictions',
      async onSelect() {
        const overlay = useOverlay();
        const modal = overlay.create(AuthApiModal);
        const instance = modal.open({
          title: 'Set new Ip restrictions',
          msg: 'Update the hosts allowed to use this token',
          action: 'ip-restriction',
          tokenId
        });

       await instance.result;
       emit('submitted');
       return;
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Revoke Token',
      color: 'error',
      async onSelect() {
        const overlay = useOverlay();
        const modal = overlay.create(AuthApiModal);
        const instance = modal.open({
          title: 'Revoke Token',
          msg: `You sure you want to proceed? the old token couldn't be used after this point.`,
          action: 'revoke',
          tokenId
        });

        if ((await instance.result) === true) {
          try {
            tokensError.value = '';
            showLoadingModal.value = true;
            await revoke(tokenId);

            if (revokedToken.value) {
              const data = typeof revokedToken.value === 'object' ? revokedToken.value.msg : revokedToken.value;
              toast.add({
                title: 'Success',
                description: data,
                color: 'success',
                type: 'foreground',
                duration: 10000,
              });
              emit('submitted');
            } else if (tokensError.value) {
                toast.add({
                  title: 'Error',
                  description: tokensError.value,
                  color: 'error',
                  duration: 10000,
                });
            }
            return;
          } finally {
            showLoadingModal.value = false;
          }
        }
        return;
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
  <LoadingModal v-model="showLoadingModal" />

  <GeneralModal
    :show-btn="false"
    :open="showRotateModal"
    title="Rotated Token!"
    :msg="'Your old token is no longer valid'"
    @close="(e) => { rotatedToken = undefined; showRotateModal = e }"
  > 
    <template #contentModal>
      <NewApiKey
        v-if="rotatedToken?.newRawToken"
        :raw-api-key="rotatedToken.newRawToken"
      />
    </template>
  </GeneralModal>

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
          .filter((column: any) => column.getCanHide())
          .map((column: any) => ({
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
  <ClientOnly>
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
  </ClientOnly>
</template>
