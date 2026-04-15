<template>
  <section class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="page-title">{{ t('route.brandManage') }}</h2>
        <p class="page-lead">{{ t('page.brandManageDesc') }}</p>
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
              <th>{{ t('brand.table.brand') }}</th>
              <th>{{ t('brand.table.firstLetter') }}</th>
              <th>{{ t('brand.table.productCount') }}</th>
              <th>{{ t('brand.table.recommend') }}</th>
              <th>{{ t('product.table.sort') }}</th>
              <th>{{ t('brand.table.story') }}</th>
              <th>{{ t('product.table.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>
                <div class="brand__cell">
                  <span class="brand__logo" :style="{ background: row.logoColor }">{{ row.logoLabel }}</span>
                  <strong>{{ row.name }}</strong>
                </div>
              </td>
              <td>{{ row.firstLetter }}</td>
              <td>{{ row.productCount }}</td>
              <td>
                <StatusSwitch :model-value="row.recommend" @update:model-value="toggleRecommend(row, $event)" />
              </td>
              <td>{{ row.sort }}</td>
              <td>{{ row.story }}</td>
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
      :title="t('page.brandEditorTitle')"
      :eyebrow="t('page.brandEditorHint')"
      :close-text="t('common.close')"
    >
      <form class="page-dialog__form" @submit.prevent="handleSave">
        <label class="page-dialog__field">
          <span>{{ t('brand.table.brand') }}</span>
          <input v-model.trim="form.name" class="input" required />
        </label>
        <label class="page-dialog__field">
          <span>{{ t('brand.table.firstLetter') }}</span>
          <input v-model.trim="form.firstLetter" class="input" maxlength="1" required />
        </label>
        <label class="page-dialog__field">
          <span>{{ t('product.table.sort') }}</span>
          <input v-model.number="form.sort" class="input" type="number" min="0" step="1" required />
        </label>
        <label class="page-dialog__toggle">
          <StatusSwitch v-model="form.recommend" :label="t('brand.table.recommend')" />
        </label>
        <label class="page-dialog__field page-dialog__field--full">
          <span>{{ t('brand.table.story') }}</span>
          <textarea v-model.trim="form.story" class="textarea" rows="4" />
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
import { listBrand, updateBrand } from '@/api/pms/brand'
import type { BrandItem } from '@/types'

const { t } = useI18n()

const rows = ref<BrandItem[]>([])
const dialogVisible = ref(false)
const editingRow = ref<BrandItem | null>(null)

const form = reactive({
  name: '',
  firstLetter: '',
  recommend: false,
  sort: 0,
  story: '',
})

async function loadData() {
  rows.value = await listBrand()
}

async function toggleRecommend(row: BrandItem, value: boolean) {
  await updateBrand({
    id: row.id,
    name: row.name,
    firstLetter: row.firstLetter,
    recommend: value,
    sort: row.sort,
    story: row.story,
  })
  await loadData()
}

function openEdit(row: BrandItem) {
  editingRow.value = row
  form.name = row.name
  form.firstLetter = row.firstLetter
  form.recommend = row.recommend
  form.sort = row.sort
  form.story = row.story
  dialogVisible.value = true
}

async function handleSave() {
  if (!editingRow.value) {
    return
  }

  await updateBrand({
    id: editingRow.value.id,
    name: form.name.trim(),
    firstLetter: form.firstLetter.trim().slice(0, 1).toUpperCase(),
    recommend: form.recommend,
    sort: Number(form.sort),
    story: form.story.trim(),
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

.brand__cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand__logo {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  color: #fff;
  font-weight: 700;
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
