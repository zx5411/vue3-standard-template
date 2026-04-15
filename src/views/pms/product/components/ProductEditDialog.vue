<template>
  <BaseDialog
    :model-value="modelValue"
    :title="t('page.productEditorTitle')"
    :eyebrow="t('page.productEditorHint')"
    :close-text="t('common.close')"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <form class="dialog__form" @submit.prevent="submit">
      <label class="dialog__field">
        <span>{{ t('product.table.product') }}</span>
        <input v-model.trim="form.name" class="input" required />
      </label>

      <label class="dialog__field">
        <span>{{ t('product.detail.price') }}</span>
        <input v-model.number="form.price" class="input" type="number" min="0" step="1" required />
      </label>

      <label class="dialog__field">
        <span>{{ t('product.detail.stock') }}</span>
        <input v-model.number="form.stock" class="input" type="number" min="0" step="1" required />
      </label>

      <label class="dialog__field">
        <span>{{ t('product.table.sort') }}</span>
        <input v-model.number="form.sort" class="input" type="number" min="0" step="1" required />
      </label>

      <label class="dialog__field">
        <span>{{ t('product.detail.status') }}</span>
        <select v-model="form.status" class="select">
          <option value="published">{{ t('product.status.published') }}</option>
          <option value="draft">{{ t('product.status.draft') }}</option>
        </select>
      </label>

      <label class="dialog__field">
        <span>{{ t('page.productVerifyLabel') }}</span>
        <select v-model="form.verifyStatus" class="select">
          <option value="approved">{{ t('product.verify.approved') }}</option>
          <option value="reviewing">{{ t('product.verify.reviewing') }}</option>
          <option value="pending">{{ t('product.verify.pending') }}</option>
        </select>
      </label>

      <label class="dialog__field dialog__field--full">
        <span>{{ t('product.detail.tags') }}</span>
        <input
          v-model="form.tagsText"
          class="input"
          :placeholder="t('page.productTagsPlaceholder')"
        />
      </label>

      <footer class="dialog__footer">
        <button type="button" class="btn btn--ghost" @click="emit('update:modelValue', false)">{{ t('common.cancel') }}</button>
        <button type="submit" class="btn">{{ t('common.save') }}</button>
      </footer>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseDialog from '@/components/BaseDialog/index.vue'
import type { ProductListItem, ProductStatus, ProductUpdatePayload, VerifyStatus } from '@/types'

const props = defineProps<{
  modelValue: boolean
  product: ProductListItem | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  save: [payload: ProductUpdatePayload]
}>()

const { t } = useI18n()

const form = reactive<{
  id: number
  name: string
  price: number
  stock: number
  sort: number
  status: ProductStatus
  verifyStatus: VerifyStatus
  tagsText: string
}>({
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  sort: 0,
  status: 'draft',
  verifyStatus: 'pending',
  tagsText: '',
})

function syncForm(product: ProductListItem | null) {
  form.id = product?.id ?? 0
  form.name = product?.name ?? ''
  form.price = product?.price ?? 0
  form.stock = product?.stock ?? 0
  form.sort = product?.sort ?? 0
  form.status = product?.status ?? 'draft'
  form.verifyStatus = product?.verifyStatus ?? 'pending'
  form.tagsText = product?.tags.join(', ') ?? ''
}

function submit() {
  if (!form.id) {
    return
  }

  emit('save', {
    id: form.id,
    name: form.name.trim(),
    price: Number(form.price),
    stock: Number(form.stock),
    sort: Number(form.sort),
    status: form.status,
    verifyStatus: form.verifyStatus,
    tags: form.tagsText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  })
}

watch(
  () => [props.modelValue, props.product] as const,
  ([visible, product]) => {
    if (visible) {
      syncForm(product)
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.dialog__form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.dialog__field {
  display: grid;
  gap: 8px;
}

.dialog__field span {
  color: #475569;
  font-size: 14px;
  font-weight: 600;
}

.dialog__field--full {
  grid-column: 1 / -1;
}

.dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  grid-column: 1 / -1;
  margin-top: 8px;
}

@media (max-width: 720px) {
  .dialog__form {
    grid-template-columns: 1fr;
  }
}
</style>
