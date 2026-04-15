<template>
  <button
    type="button"
    :class="['status-switch', { 'status-switch--active': modelValue }]"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="status-switch__track">
      <span class="status-switch__thumb" />
    </span>
    <span v-if="label" class="status-switch__label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped lang="scss">
.status-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #475569;
}

.status-switch__track {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: #cbd5e1;
  transition: background-color 0.2s ease;
}

.status-switch__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.18);
  transition: transform 0.2s ease;
}

.status-switch__label {
  font-size: 13px;
}

.status-switch--active .status-switch__track {
  background: #409eff;
}

.status-switch--active .status-switch__thumb {
  transform: translateX(18px);
}
</style>
