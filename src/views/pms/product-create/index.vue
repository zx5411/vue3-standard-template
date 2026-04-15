<template>
  <section class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="product-create__title">{{ t('route.productCreate') }}</h2>
        <p class="page-lead">{{ t('page.productCreateDesc') }}</p>
      </div>
      <div class="page-header__actions">
        <button type="button" class="btn btn--ghost" @click="router.push('/pms/product')">{{ t('common.back') }}</button>
      </div>
    </header>

    <form class="page-shell" @submit.prevent="submit('published')">
      <article class="card product-create__section">
        <h3>{{ t('page.productCreateBasic') }}</h3>
        <div class="product-create__grid">
          <label class="product-create__field">
            <span>{{ t('product.table.product') }}</span>
            <input v-model.trim="form.name" class="input" required />
          </label>
          <label class="product-create__field">
            <span>{{ t('page.productSubtitleLabel') }}</span>
            <input v-model.trim="form.subtitle" class="input" required />
          </label>
          <label class="product-create__field">
            <span>{{ t('product.detail.sku') }}</span>
            <input v-model.trim="form.sku" class="input" required />
          </label>
          <label class="product-create__field">
            <span>{{ t('page.productCategoryLabel') }}</span>
            <select v-model="form.category" class="select">
              <option v-for="category in options.categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </label>
          <label class="product-create__field">
            <span>{{ t('page.productBrandLabel') }}</span>
            <select v-model="form.brand" class="select">
              <option v-for="brand in options.brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </label>
          <label class="product-create__field">
            <span>{{ t('page.productDescriptionLabel') }}</span>
            <textarea v-model.trim="form.description" class="textarea" rows="4" />
          </label>
        </div>
      </article>

      <article class="card product-create__section">
        <h3>{{ t('page.productCreatePrice') }}</h3>
        <div class="product-create__grid">
          <label class="product-create__field">
            <span>{{ t('product.detail.price') }}</span>
            <input v-model.number="form.price" class="input" type="number" min="0" step="1" required />
          </label>
          <label class="product-create__field">
            <span>{{ t('product.detail.marketPrice') }}</span>
            <input v-model.number="form.originalPrice" class="input" type="number" min="0" step="1" required />
          </label>
          <label class="product-create__field">
            <span>{{ t('product.detail.stock') }}</span>
            <input v-model.number="form.stock" class="input" type="number" min="0" step="1" required />
          </label>
          <label class="product-create__field">
            <span>{{ t('product.table.sort') }}</span>
            <input v-model.number="form.sort" class="input" type="number" min="0" step="1" required />
          </label>
        </div>
      </article>

      <article class="card product-create__section">
        <h3>{{ t('page.productCreateMeta') }}</h3>
        <div class="product-create__grid">
          <label class="product-create__field">
            <span>{{ t('page.productTagsLabel') }}</span>
            <input v-model.trim="form.tagsText" class="input" :placeholder="t('page.productTagsPlaceholder')" />
          </label>
          <label class="product-create__field">
            <span>{{ t('page.productServiceLabel') }}</span>
            <input v-model.trim="form.serviceTagsText" class="input" :placeholder="t('page.productServicePlaceholder')" />
          </label>
          <label class="product-create__field product-create__field--full">
            <span>{{ t('page.productAttributesLabel') }}</span>
            <textarea v-model.trim="form.attributesText" class="textarea" rows="4" :placeholder="t('page.productAttributesPlaceholder')" />
          </label>
        </div>
      </article>

      <article class="card product-create__section">
        <h3>{{ t('page.productCreatePublish') }}</h3>
        <div class="product-create__grid">
          <label class="product-create__field">
            <span>{{ t('product.detail.status') }}</span>
            <select v-model="form.status" class="select">
              <option value="published">{{ t('product.status.published') }}</option>
              <option value="draft">{{ t('product.status.draft') }}</option>
            </select>
          </label>
          <label class="product-create__field">
            <span>{{ t('page.productVerifyLabel') }}</span>
            <select v-model="form.verifyStatus" class="select">
              <option value="approved">{{ t('product.verify.approved') }}</option>
              <option value="reviewing">{{ t('product.verify.reviewing') }}</option>
              <option value="pending">{{ t('product.verify.pending') }}</option>
            </select>
          </label>
          <label class="product-create__toggle">
            <StatusSwitch v-model="form.isNew" :label="t('product.labels.new')" />
          </label>
          <label class="product-create__toggle">
            <StatusSwitch v-model="form.recommended" :label="t('product.labels.recommend')" />
          </label>
        </div>
      </article>

      <div class="product-create__footer">
        <button type="button" class="btn btn--ghost" @click="submit('draft')">{{ t('page.saveDraft') }}</button>
        <button type="submit" class="btn">{{ t('common.save') }}</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import StatusSwitch from '@/components/StatusSwitch/index.vue'
import { createProduct, listProductOptions } from '@/api/pms/product'
import type { ProductAttribute, ProductCreatePayload, ProductOptionPayload, ProductStatus, VerifyStatus } from '@/types'

const { t } = useI18n()
const router = useRouter()

const options = ref<ProductOptionPayload>({
  categories: [],
  brands: [],
})

const form = reactive<{
  name: string
  subtitle: string
  sku: string
  category: string
  brand: string
  price: number
  originalPrice: number
  stock: number
  sort: number
  description: string
  tagsText: string
  serviceTagsText: string
  attributesText: string
  status: ProductStatus
  verifyStatus: VerifyStatus
  isNew: boolean
  recommended: boolean
}>({
  name: '',
  subtitle: '',
  sku: 'PMS-2001',
  category: '',
  brand: '',
  price: 299,
  originalPrice: 399,
  stock: 100,
  sort: 60,
  description: '',
  tagsText: '新品',
  serviceTagsText: '7 天无忧退, 48 小时发货',
  attributesText: '颜色:曜石黑\n规格:标准版',
  status: 'published',
  verifyStatus: 'pending',
  isNew: true,
  recommended: false,
})

function parseTags(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseAttributes(value: string): ProductAttribute[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [label, rawValue] = item.split(':')
      return {
        label: label?.trim() || t('page.productAttributesFallbackLabel'),
        value: rawValue?.trim() || '',
      }
    })
}

async function loadOptions() {
  options.value = await listProductOptions()
  form.category = options.value.categories[0] || ''
  form.brand = options.value.brands[0] || ''
}

async function submit(nextStatus: ProductStatus) {
  const payload: ProductCreatePayload = {
    name: form.name.trim(),
    subtitle: form.subtitle.trim(),
    sku: form.sku.trim(),
    category: form.category,
    brand: form.brand,
    price: Number(form.price),
    originalPrice: Number(form.originalPrice),
    stock: Number(form.stock),
    description: form.description.trim(),
    serviceTags: parseTags(form.serviceTagsText),
    attributes: parseAttributes(form.attributesText),
    tags: parseTags(form.tagsText),
    status: nextStatus,
    verifyStatus: form.verifyStatus,
    isNew: form.isNew,
    recommended: form.recommended,
    sort: Number(form.sort),
  }

  await createProduct(payload)
  await router.push('/pms/product')
}

onMounted(() => {
  void loadOptions()
})
</script>

<style scoped lang="scss">
.product-create__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 34px);
}

.product-create__section {
  padding: 22px;
}

.product-create__section h3 {
  margin: 0 0 18px;
}

.product-create__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;
}

.product-create__field {
  display: grid;
  gap: 8px;
}

.product-create__field span {
  color: #606266;
  font-size: 14px;
}

.product-create__field--full {
  grid-column: 1 / -1;
}

.product-create__toggle {
  display: flex;
  align-items: center;
}

.product-create__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 720px) {
  .product-create__grid {
    grid-template-columns: 1fr;
  }

  .product-create__field--full {
    grid-column: auto;
  }

  .product-create__footer {
    flex-wrap: wrap;
  }
}
</style>
