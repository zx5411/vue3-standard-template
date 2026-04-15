<template>
  <section class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="page-title">{{ t('route.productCategory') }}</h2>
        <p class="page-lead">{{ t('page.productCategoryDesc') }}</p>
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
              <th>{{ t('category.table.name') }}</th>
              <th>{{ t('category.table.level') }}</th>
              <th>{{ t('category.table.parent') }}</th>
              <th>{{ t('category.table.count') }}</th>
              <th>{{ t('category.table.navStatus') }}</th>
              <th>{{ t('category.table.showStatus') }}</th>
              <th>{{ t('product.table.sort') }}</th>
              <th>{{ t('category.table.keywords') }}</th>
              <th>{{ t('product.table.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>
                <strong :class="{ 'page-indent': row.level === 2 }">{{ row.name }}</strong>
              </td>
              <td>
                <span class="badge badge--neutral">{{ t(`category.level.${row.level}`) }}</span>
              </td>
              <td>{{ row.parentName }}</td>
              <td>{{ row.productCount }} {{ row.productUnit }}</td>
              <td>
                <StatusSwitch :model-value="row.navStatus" @update:model-value="toggleField(row, 'navStatus', $event)" />
              </td>
              <td>
                <StatusSwitch :model-value="row.showStatus" @update:model-value="toggleField(row, 'showStatus', $event)" />
              </td>
              <td>{{ row.sort }}</td>
              <td>{{ row.keywords }}</td>
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
      :title="t('page.categoryEditorTitle')"
      :eyebrow="t('page.categoryEditorHint')"
      :close-text="t('common.close')"
    >
      <form class="page-dialog__form" @submit.prevent="handleSave">
        <label class="page-dialog__field">
          <span>{{ t('category.table.name') }}</span>
          <input v-model.trim="form.name" class="input" required />
        </label>
        <label class="page-dialog__field">
          <span>{{ t('product.table.sort') }}</span>
          <input v-model.number="form.sort" class="input" type="number" min="0" step="1" required />
        </label>
        <label class="page-dialog__field page-dialog__field--full">
          <span>{{ t('category.table.keywords') }}</span>
          <input v-model.trim="form.keywords" class="input" />
        </label>
        <label class="page-dialog__toggle">
          <StatusSwitch v-model="form.navStatus" :label="t('category.table.navStatus')" />
        </label>
        <label class="page-dialog__toggle">
          <StatusSwitch v-model="form.showStatus" :label="t('category.table.showStatus')" />
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
import { listProductCategory, updateProductCategory } from '@/api/pms/category'
import type { ProductCategoryItem } from '@/types'

const { t } = useI18n()

const rows = ref<ProductCategoryItem[]>([])
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  name: '',
  sort: 0,
  navStatus: true,
  showStatus: true,
  keywords: '',
})

async function loadData() {
  rows.value = await listProductCategory()
}

async function toggleField(row: ProductCategoryItem, key: 'navStatus' | 'showStatus', value: boolean) {
  await updateProductCategory({
    id: row.id,
    name: row.name,
    sort: row.sort,
    navStatus: key === 'navStatus' ? value : row.navStatus,
    showStatus: key === 'showStatus' ? value : row.showStatus,
    keywords: row.keywords,
  })
  await loadData()
}

function openEdit(row: ProductCategoryItem) {
  editingId.value = row.id
  form.name = row.name
  form.sort = row.sort
  form.navStatus = row.navStatus
  form.showStatus = row.showStatus
  form.keywords = row.keywords
  dialogVisible.value = true
}

async function handleSave() {
  if (!editingId.value) {
    return
  }

  await updateProductCategory({
    id: editingId.value,
    name: form.name.trim(),
    sort: Number(form.sort),
    navStatus: form.navStatus,
    showStatus: form.showStatus,
    keywords: form.keywords.trim(),
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

.page-indent {
  padding-left: 18px;
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
