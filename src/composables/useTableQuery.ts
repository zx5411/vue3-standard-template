import { computed, reactive, ref } from 'vue'
import type { PageQuery } from '@/types'
import { usePagination } from './usePagination'

export type TableFilters = Record<string, unknown>

export type TableQueryParams<T extends TableFilters> = T &
  PageQuery & {
    keyword: string
  }

export interface UseTableQueryOptions {
  pageSize?: number
}

export function useTableQuery<T extends TableFilters>(
  initialFilters: T,
  options: UseTableQueryOptions = {},
) {
  function createInitialFilters() {
    return { ...initialFilters }
  }

  const keyword = ref('')
  const filters = reactive(createInitialFilters()) as T
  const pagination = usePagination({
    pageSize: options.pageSize ?? 10,
  })

  const queryParams = computed<TableQueryParams<T>>(
    () =>
      ({
        ...filters,
        keyword: keyword.value.trim(),
        pageNum: pagination.pageNum.value,
        pageSize: pagination.pageSize.value,
      }) as TableQueryParams<T>,
  )

  function setKeyword(value: string) {
    keyword.value = value.trim()
    pagination.reset()
  }

  function patchFilters(partial: Partial<T>) {
    Object.assign(filters, partial)
    pagination.reset()
  }

  function reset() {
    Object.assign(filters, createInitialFilters())
    keyword.value = ''
    pagination.reset()
  }

  return {
    keyword,
    filters,
    queryParams,
    ...pagination,
    setKeyword,
    patchFilters,
    reset,
  }
}
