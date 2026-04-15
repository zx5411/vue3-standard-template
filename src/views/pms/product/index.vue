<template>
  <section class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="product-list__title">{{ t('route.productList') }}</h2>
        <p class="page-lead">{{ t('page.productListDesc') }}</p>
      </div>
      <div class="page-header__actions">
        <RouterLink to="/pms/product/create" class="btn">{{ t('common.add') }}</RouterLink>
      </div>
    </header>

    <article class="card product-list__panel">
      <div class="product-list__panel-head">
        <h3>{{ t('page.filterSearchTitle') }}</h3>
        <div class="product-list__toolbar-actions">
          <button type="button" class="btn btn--ghost" @click="handleReset">{{ t('common.reset') }}</button>
          <button type="button" class="btn" @click="handleSearch">{{ t('page.searchResult') }}</button>
        </div>
      </div>

      <div class="product-list__filter-grid">
        <label class="product-list__field">
          <span>{{ t('page.productKeywordLabel') }}</span>
          <input v-model.trim="queryParams.keyword" class="input" :placeholder="t('page.productNamePlaceholder')" />
        </label>

        <label class="product-list__field">
          <span>{{ t('page.productSnLabel') }}</span>
          <input v-model.trim="queryParams.productSn" class="input" :placeholder="t('page.productSnPlaceholder')" />
        </label>

        <label class="product-list__field">
          <span>{{ t('page.productCategoryLabel') }}</span>
          <select v-model="queryParams.category" class="select">
            <option value="all">{{ t('product.filters.allCategory') }}</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </label>

        <label class="product-list__field">
          <span>{{ t('page.productBrandLabel') }}</span>
          <select v-model="queryParams.brand" class="select">
            <option value="all">{{ t('product.filters.allBrand') }}</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </label>

        <label class="product-list__field">
          <span>{{ t('page.productPublishLabel') }}</span>
          <select v-model="queryParams.publishStatus" class="select">
            <option value="all">{{ t('product.filters.allStatus') }}</option>
            <option value="published">{{ t('product.status.published') }}</option>
            <option value="draft">{{ t('product.status.draft') }}</option>
          </select>
        </label>

        <label class="product-list__field">
          <span>{{ t('page.productVerifyLabel') }}</span>
          <select v-model="queryParams.verifyStatus" class="select">
            <option value="all">{{ t('product.filters.allVerify') }}</option>
            <option value="approved">{{ t('product.verify.approved') }}</option>
            <option value="reviewing">{{ t('product.verify.reviewing') }}</option>
            <option value="pending">{{ t('product.verify.pending') }}</option>
          </select>
        </label>
      </div>
    </article>

    <article class="card product-list__panel">
      <div class="product-list__panel-head">
        <h3>{{ t('page.dataListTitle') }}</h3>
        <div class="product-list__toolbar-actions">
          <button type="button" class="btn btn--ghost" @click="loadData">{{ t('common.refresh') }}</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table product-list__table">
          <thead>
            <tr>
              <th class="product-list__checkbox-col">
                <input type="checkbox" :checked="isAllSelected" @change="handleSelectAll" />
              </th>
              <th>{{ t('product.table.id') }}</th>
              <th>{{ t('product.table.product') }}</th>
              <th>{{ t('product.table.priceAndSn') }}</th>
              <th>{{ t('product.table.tags') }}</th>
              <th>{{ t('product.table.sort') }}</th>
              <th>{{ t('product.table.inventory') }}</th>
              <th>{{ t('product.table.sales') }}</th>
              <th>{{ t('product.table.verifyStatus') }}</th>
              <th>{{ t('product.table.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="rows.length === 0">
              <td colspan="10" class="product-list__empty">{{ t('page.productEmpty') }}</td>
            </tr>
            <tr v-for="row in rows" :key="row.id">
              <td>
                <input type="checkbox" :checked="selectedIds.includes(row.id)" @change="toggleSelect(row.id)" />
              </td>
              <td>{{ row.id }}</td>
              <td>
                <div class="product-list__product">
                  <span class="product-list__cover" :style="{ background: row.coverColor }">{{ row.coverLabel }}</span>
                  <div>
                    <strong>{{ row.name }}</strong>
                    <p>{{ row.subtitle }}</p>
                    <small>{{ t('product.detail.brand') }}: {{ row.brand }}</small>
                  </div>
                </div>
              </td>
              <td>
                <strong>{{ formatCurrency(row.price) }}</strong>
                <p class="product-list__subtext">{{ t('product.detail.marketPrice') }}: {{ formatCurrency(row.originalPrice) }}</p>
                <p class="product-list__subtext">{{ t('product.detail.sku') }}: {{ row.sku }}</p>
              </td>
              <td>
                <div class="product-list__switches">
                  <StatusSwitch :model-value="row.status === 'published'" :label="t('product.labels.publish')" @update:model-value="togglePublish(row, $event)" />
                  <StatusSwitch :model-value="row.isNew" :label="t('product.labels.new')" @update:model-value="toggleFlag(row.id, 'isNew', $event)" />
                  <StatusSwitch :model-value="row.recommended" :label="t('product.labels.recommend')" @update:model-value="toggleFlag(row.id, 'recommended', $event)" />
                </div>
              </td>
              <td>{{ row.sort }}</td>
              <td>
                <strong>{{ row.stock }}</strong>
                <p class="product-list__subtext">{{ t(`product.stock.${getStockLabel(row.stock)}`) }}</p>
              </td>
              <td>{{ row.sales.toLocaleString('zh-CN') }}</td>
              <td>
                <span :class="['badge', getVerifyBadgeClass(row.verifyStatus)]">
                  {{ t(`product.verify.${row.verifyStatus}`) }}
                </span>
                <button type="button" class="product-list__link" @click="openDialog(row)">{{ t('page.verifyDetail') }}</button>
              </td>
              <td>
                <div class="product-list__actions">
                  <RouterLink :to="`/pms/product/${row.id}`" class="btn btn--ghost">{{ t('common.view') }}</RouterLink>
                  <button type="button" class="btn btn--secondary" @click="openDialog(row)">{{ t('common.edit') }}</button>
                  <button type="button" class="btn btn--danger" @click="handleDelete(row.id)">{{ t('common.delete') }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        :model-value="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :total="total"
        @update:model-value="handlePageChange"
      />
    </article>

    <ProductEditDialog v-model="dialogVisible" :product="editingProduct" @save="handleSave" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Pagination from '@/components/Pagination/index.vue'
import StatusSwitch from '@/components/StatusSwitch/index.vue'
import { deleteProduct, listProduct, patchProductMeta, updateProduct } from '@/api/pms/product'
import ProductEditDialog from '@/views/pms/product/components/ProductEditDialog.vue'
import type {
  ProductListItem,
  ProductQuery,
  ProductStatus,
  ProductUpdatePayload,
  VerifyStatus,
} from '@/types'

const { t } = useI18n()

const queryParams = reactive<ProductQuery>({
  pageNum: 1,
  pageSize: 5,
  keyword: '',
  productSn: '',
  category: 'all',
  brand: 'all',
  publishStatus: 'all',
  verifyStatus: 'all',
  stockStatus: 'all',
})

const rows = ref<ProductListItem[]>([])
const categories = ref<string[]>([])
const brands = ref<string[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const editingProduct = ref<ProductListItem | null>(null)
const selectedIds = ref<number[]>([])

const isAllSelected = computed(() => rows.value.length > 0 && rows.value.every((item) => selectedIds.value.includes(item.id)))

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value)
}

function getStockLabel(stock: number) {
  return stock < 80 ? 'low' : 'healthy'
}

function getVerifyBadgeClass(status: VerifyStatus) {
  switch (status) {
    case 'approved':
      return 'badge--success'
    case 'reviewing':
      return 'badge--warning'
    default:
      return 'badge--neutral'
  }
}

async function loadData() {
  const response = await listProduct(queryParams)
  rows.value = response.rows
  categories.value = response.categories
  brands.value = response.brands
  total.value = response.total
  selectedIds.value = selectedIds.value.filter((id) => rows.value.some((item) => item.id === id))
}

function handleSearch() {
  queryParams.pageNum = 1
  void loadData()
}

function handleReset() {
  queryParams.keyword = ''
  queryParams.productSn = ''
  queryParams.category = 'all'
  queryParams.brand = 'all'
  queryParams.publishStatus = 'all'
  queryParams.verifyStatus = 'all'
  queryParams.pageNum = 1
  void loadData()
}

function handlePageChange(page: number) {
  queryParams.pageNum = page
  void loadData()
}

function toggleSelect(id: number) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
    return
  }
  selectedIds.value = [...selectedIds.value, id]
}

function toggleSelectAll(checked: boolean) {
  selectedIds.value = checked ? rows.value.map((item) => item.id) : []
}

function handleSelectAll(event: Event) {
  const target = event.target as HTMLInputElement
  toggleSelectAll(target.checked)
}

function openDialog(row: ProductListItem) {
  editingProduct.value = row
  dialogVisible.value = true
}

async function togglePublish(row: ProductListItem, value: boolean) {
  await patchProductMeta({
    id: row.id,
    status: value ? 'published' : 'draft',
  })
  await loadData()
}

async function toggleFlag(id: number, key: 'isNew' | 'recommended', value: boolean) {
  await patchProductMeta({
    id,
    [key]: value,
  })
  await loadData()
}

async function handleDelete(id: number) {
  await deleteProduct(id)
  await loadData()
}

async function handleSave(payload: ProductUpdatePayload) {
  await updateProduct(payload)
  dialogVisible.value = false
  editingProduct.value = null
  await loadData()
}

onMounted(() => {
  void loadData()
})
</script>

<style scoped lang="scss">
.product-list__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 34px);
}

.product-list__panel {
  padding: 20px 20px 16px;
}

.product-list__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.product-list__panel-head h3 {
  margin: 0;
  font-size: 18px;
}

.product-list__toolbar-actions {
  display: flex;
  gap: 12px;
}

.product-list__filter-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px 16px;
}

.product-list__field {
  display: grid;
  gap: 8px;
}

.product-list__field span {
  color: #606266;
  font-size: 14px;
}

.product-list__checkbox-col {
  width: 44px;
}

.product-list__table :deep(td) {
  vertical-align: top;
}

.product-list__product {
  display: flex;
  gap: 14px;
  min-width: 260px;
}

.product-list__cover {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.product-list__product p,
.product-list__subtext {
  margin: 6px 0 0;
  color: #909399;
}

.product-list__product small {
  display: block;
  margin-top: 6px;
  color: #909399;
}

.product-list__switches {
  display: grid;
  gap: 10px;
}

.product-list__actions {
  display: grid;
  gap: 10px;
}

.product-list__actions :deep(a),
.product-list__actions button {
  text-decoration: none;
}

.product-list__link {
  margin-top: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #409eff;
}

.product-list__empty {
  padding: 32px 0;
  color: #909399;
  text-align: center;
}

@media (max-width: 1200px) {
  .product-list__filter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .product-list__panel-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .product-list__toolbar-actions {
    flex-wrap: wrap;
  }

  .product-list__filter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
