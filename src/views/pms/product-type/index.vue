<template>
  <section class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="page-title">{{ t('route.productType') }}</h2>
        <p class="page-lead">{{ t('page.productTypeDesc') }}</p>
      </div>
    </header>

    <article class="card page-card">
      <div class="page-card__head">
        <h3>{{ t('page.dataListTitle') }}</h3>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>{{ t('type.table.name') }}</th>
              <th>{{ t('type.table.attributeCount') }}</th>
              <th>{{ t('type.table.paramCount') }}</th>
              <th>{{ t('product.table.sort') }}</th>
              <th>{{ t('type.table.status') }}</th>
              <th>{{ t('type.table.description') }}</th>
              <th>{{ t('product.table.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td><strong>{{ row.name }}</strong></td>
              <td>{{ row.attributeCount }}</td>
              <td>{{ row.paramCount }}</td>
              <td>{{ row.sort }}</td>
              <td>
                <StatusSwitch :model-value="row.enabled" @update:model-value="toggleEnabled(row, $event)" />
              </td>
              <td>{{ row.description }}</td>
              <td>
                <button type="button" class="btn btn--secondary" @click="openEdit(row)">{{ t('common.edit') }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <BaseDialog
      v-model="dialogVisible"
      :title="t('page.typeEditorTitle')"
      :eyebrow="t('page.typeEditorHint')"
      :close-text="t('common.close')"
    >
      <form class="page-dialog__form" @submit.prevent="handleSave">
        <label class="page-dialog__field">
          <span>{{ t('type.table.name') }}</span>
          <input v-model.trim="form.name" class="input" required />
        </label>
        <label class="page-dialog__field">
          <span>{{ t('product.table.sort') }}</span>
          <input v-model.number="form.sort" class="input" type="number" min="0" step="1" required />
        </label>
        <label class="page-dialog__field page-dialog__field--full">
          <span>{{ t('type.table.description') }}</span>
          <textarea v-model.trim="form.description" class="textarea" rows="4" />
        </label>
        <label class="page-dialog__toggle">
          <StatusSwitch v-model="form.enabled" :label="t('type.table.status')" />
        </label>

        <div class="page-dialog__footer">
          <button type="button" class="btn btn--ghost" @click="dialogVisible = false">{{ t('common.cancel') }}</button>
          <button type="submit" class="btn">{{ t('common.save') }}</button>
        </div>
      </form>
    </BaseDialog>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseDialog from '@/components/BaseDialog/index.vue'
import StatusSwitch from '@/components/StatusSwitch/index.vue'
import { listProductType, updateProductType } from '@/api/pms/product-type'
import type { ProductTypeItem } from '@/types'

const { t } = useI18n()

const rows = ref<ProductTypeItem[]>([])
const dialogVisible = ref(false)
const editingRow = ref<ProductTypeItem | null>(null)

const form = reactive({
  name: '',
  sort: 0,
  enabled: true,
  description: '',
})

async function loadData() {
  rows.value = await listProductType()
}

async function toggleEnabled(row: ProductTypeItem, value: boolean) {
  await updateProductType({
    id: row.id,
    name: row.name,
    sort: row.sort,
    enabled: value,
    description: row.description,
  })
  await loadData()
}

function openEdit(row: ProductTypeItem) {
  editingRow.value = row
  form.name = row.name
  form.sort = row.sort
  form.enabled = row.enabled
  form.description = row.description
  dialogVisible.value = true
}

async function handleSave() {
  if (!editingRow.value) {
    return
  }

  await updateProductType({
    id: editingRow.value.id,
    name: form.name.trim(),
    sort: Number(form.sort),
    enabled: form.enabled,
    description: form.description.trim(),
  })
  dialogVisible.value = false
  await loadData()
}

onMounted(() => {
  void loadData()
})
</script>

<style scoped lang="scss">
.page-title {
  margin: 0;
  font-size: clamp(28px, 4vw, 34px);
}

.page-card {
  padding: 20px;
}

.page-card__head {
  margin-bottom: 18px;
}

.page-card__head h3 {
  margin: 0;
}

.page-dialog__form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.page-dialog__field {
  display: grid;
  gap: 8px;
}

.page-dialog__field span {
  color: #606266;
}

.page-dialog__field--full {
  grid-column: 1 / -1;
}

.page-dialog__toggle {
  display: flex;
  align-items: center;
}

.page-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  grid-column: 1 / -1;
}

@media (max-width: 720px) {
  .page-dialog__form {
    grid-template-columns: 1fr;
  }
}
</style>
