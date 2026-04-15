import { computed, ref } from 'vue'
import type { PageQuery } from '@/types'

export interface UsePaginationOptions extends Partial<PageQuery> {
  total?: number
}

export function usePagination(options: UsePaginationOptions = {}) {
  const pageNum = ref(options.pageNum ?? 1)
  const pageSize = ref(options.pageSize ?? 10)
  const total = ref(options.total ?? 0)

  const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
  const query = computed<PageQuery>(() => ({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }))

  function normalizePage(page: number) {
    return Math.min(Math.max(1, page), pageCount.value)
  }

  function setPage(page: number) {
    pageNum.value = normalizePage(page)
  }

  function setPageSize(size: number) {
    if (size <= 0) {
      return
    }

    pageSize.value = size
    pageNum.value = 1
  }

  function setTotal(value: number) {
    total.value = Math.max(0, value)
    pageNum.value = normalizePage(pageNum.value)
  }

  function reset() {
    pageNum.value = 1
  }

  return {
    pageNum,
    pageSize,
    total,
    pageCount,
    query,
    setPage,
    setPageSize,
    setTotal,
    reset,
  }
}
