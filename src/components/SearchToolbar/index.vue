<template>
  <form v-if="visible" class="search-toolbar card" @submit.prevent="submit">
    <input v-model="keyword" placeholder="Search username / phone" />
    <button type="submit">{{ t('common.search') }}</button>
    <button type="button" class="secondary" @click="reset">{{ t('common.reset') }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    visible?: boolean
  }>(),
  {
    visible: true,
  },
)

const emit = defineEmits<{
  search: [keyword: string]
  reset: []
}>()

const { t } = useI18n()
const keyword = ref('')

function submit() {
  emit('search', keyword.value.trim())
}

function reset() {
  keyword.value = ''
  emit('reset')
}
</script>

<style scoped lang="scss">
.search-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding: 18px 20px;
  margin-bottom: 18px;
}

input {
  min-width: 260px;
  padding: 10px 12px;
  border: 1px solid #dbe4ee;
  border-radius: 10px;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 10px 16px;
  background: #0f766e;
  color: #fff;
  cursor: pointer;
}

.secondary {
  background: #e2e8f0;
  color: #0f172a;
}
</style>
