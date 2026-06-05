export interface HomeTokenList {
    id: number;
    created_at: Date
    expires_at: Date | null
    last_used: Date | null
    totalUsageCount: number
    usage_count: number;
    restricted_to_ip_address: string | string[]
    active: boolean;
    name: string
    privilege_type: "custom" | "demo" | "restricted" | "protected" | "full"
}
export interface SortingItem {
  id: string;
  desc: boolean;
}

export interface SortableColumn {
  getIsSorted: () => false | 'asc' | 'desc';
  clearSorting: () => void;
  toggleSorting: (desc?: boolean) => void;
}

export interface FilterableColumn {
  getFilterValue: () => unknown;
  setFilterValue: (value: string | undefined) => void;
}

export interface FilterableTableApi {
  getColumn: (id: string) => FilterableColumn | undefined;
}