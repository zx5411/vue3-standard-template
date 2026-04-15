<template>
  <Teleport to="body">
    <div v-if="modelValue" class="dialog" @click.self="$emit('update:modelValue', false)">
      <section class="dialog__panel card" :style="{ width }">
        <header class="dialog__header">
          <div>
            <p v-if="eyebrow" class="page-header__eyebrow">{{ eyebrow }}</p>
            <h3>{{ title }}</h3>
          </div>
          <button type="button" class="dialog__close" @click="$emit('update:modelValue', false)">
            {{ closeText }}
          </button>
        </header>
        <slot />
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    eyebrow?: string
    width?: string
    closeText?: string
  }>(),
  {
    eyebrow: '',
    width: 'min(720px, 100%)',
    closeText: '关闭',
  },
)

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(6px);
}

.dialog__panel {
  padding: 24px;
}

.dialog__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.dialog__header h3 {
  margin: 0;
}

.dialog__close {
  border: 0;
  background: transparent;
  color: #64748b;
}

@media (max-width: 720px) {
  .dialog {
    padding: 12px;
  }
}
</style>
