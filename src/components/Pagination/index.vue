<template>
  <div class="pagination">
    <span class="pagination__total">{{ t('common.total', { total }) }}</span>
    <div class="pagination__actions">
      <button type="button" :disabled="modelValue <= 1" @click="changePage(modelValue - 1)">
        {{ t('common.prev') }}
      </button>
      <span class="pagination__page">{{ t('common.page', { page: modelValue }) }}</span>
      <button type="button" :disabled="modelValue >= pageCount" @click="changePage(modelValue + 1)">
        {{ t('common.next') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    total: number
    modelValue: number
    pageSize?: number
  }>(),
  {
    pageSize: 10,
  },
)

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const { t } = useI18n()
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

function changePage(page: number) {
  if (page < 1 || page > pageCount.value || page === props.modelValue) {
    return
  }
  emit('update:modelValue', page)
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
}

.pagination__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  border: 1px solid #dbe4ee;
  border-radius: 10px;
  padding: 8px 14px;
  background: #fff;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
