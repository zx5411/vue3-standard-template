<template>
  <div class="right-toolbar">
    <button type="button" @click="$emit('refresh')">{{ t('common.refresh') }}</button>
    <button type="button" @click="$emit('toggle-search')">
      {{ showSearch ? t('common.hideSearch') : t('common.showSearch') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  showSearch: boolean
}>()

defineEmits<{
  refresh: []
  'toggle-search': []
}>()

const { t } = useI18n()
</script>

<style scoped>
.right-toolbar {
  display: flex;
  gap: 12px;
}

button {
  border: 1px solid #dbe4ee;
  border-radius: 10px;
  padding: 10px 14px;
  background: #fff;
  cursor: pointer;
}
</style>
