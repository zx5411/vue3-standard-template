<template>
  <section v-if="product" class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="product-detail__title">{{ product.name }}</h2>
        <p class="page-lead">{{ t('page.productDetailDesc') }}</p>
      </div>
      <div class="page-header__actions">
        <button type="button" class="btn btn--ghost" @click="router.push('/pms/product')">{{ t('common.back') }}</button>
      </div>
    </header>

    <article class="card product-detail__hero">
      <div class="product-detail__cover" :style="{ background: product.coverColor }">{{ product.coverLabel }}</div>
      <div class="product-detail__hero-content">
        <div class="product-detail__hero-top">
          <div>
            <span :class="['badge', product.status === 'published' ? 'badge--success' : 'badge--warning']">
              {{ t(`product.status.${product.status}`) }}
            </span>
            <h3>{{ product.name }}</h3>
            <p>{{ product.subtitle }}</p>
          </div>
          <div class="product-detail__tags">
            <span v-for="tag in product.tags" :key="tag" class="badge badge--neutral">{{ tag }}</span>
          </div>
        </div>

        <p class="product-detail__description">{{ product.description }}</p>

        <div class="product-detail__overview">
          <article v-for="metric in overviewMetrics" :key="metric.label" class="card product-detail__metric">
            <p>{{ metric.label }}</p>
            <strong>{{ metric.value }}</strong>
          </article>
        </div>
      </div>
    </article>

    <div class="product-detail__grid">
      <article class="card product-detail__section">
        <h3>{{ t('page.productBasicInfo') }}</h3>
        <dl class="product-detail__info-list">
          <div>
            <dt>{{ t('product.detail.sku') }}</dt>
            <dd>{{ product.sku }}</dd>
          </div>
          <div>
            <dt>{{ t('product.detail.brand') }}</dt>
            <dd>{{ product.brand }}</dd>
          </div>
          <div>
            <dt>{{ t('product.detail.category') }}</dt>
            <dd>{{ product.category }}</dd>
          </div>
          <div>
            <dt>{{ t('product.detail.marketPrice') }}</dt>
            <dd>{{ formatCurrency(product.originalPrice) }}</dd>
          </div>
          <div>
            <dt>{{ t('product.detail.updatedAt') }}</dt>
            <dd>{{ product.updatedAt }}</dd>
          </div>
        </dl>
      </article>

      <article class="card product-detail__section">
        <h3>{{ t('page.productServiceTags') }}</h3>
        <div class="product-detail__tags">
          <span v-for="tag in product.serviceTags" :key="tag" class="badge badge--neutral">{{ tag }}</span>
        </div>
      </article>
    </div>

    <div class="product-detail__grid">
      <article class="card product-detail__section">
        <h3>{{ t('page.productAttributes') }}</h3>
        <div class="product-detail__attribute-list">
          <div v-for="item in product.attributes" :key="item.label" class="product-detail__attribute-item">
            <strong>{{ item.label }}</strong>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </article>

      <article class="card product-detail__section">
        <h3>{{ t('page.productSalesSnapshot') }}</h3>
        <div class="product-detail__snapshot">
          <div>
            <span>{{ t('product.detail.sales') }}</span>
            <strong>{{ product.sales.toLocaleString('zh-CN') }}</strong>
          </div>
          <div>
            <span>{{ t('product.detail.stock') }}</span>
            <strong>{{ product.stock }}</strong>
          </div>
          <div>
            <span>{{ t('product.detail.price') }}</span>
            <strong>{{ formatCurrency(product.price) }}</strong>
          </div>
          <div>
            <span>{{ t('product.detail.tags') }}</span>
            <strong>{{ product.tags.length }}</strong>
          </div>
        </div>
      </article>
    </div>

    <article class="card product-detail__section">
      <h3>{{ t('page.productTimeline') }}</h3>
      <ol class="product-detail__timeline">
        <li v-for="item in product.timeline" :key="`${item.time}-${item.title}`">
          <strong>{{ item.title }}</strong>
          <p>{{ item.detail }}</p>
          <small>{{ item.operator }} · {{ item.time }}</small>
        </li>
      </ol>
    </article>
  </section>

  <section v-else class="page-shell">
    <article class="card product-detail__empty">
      <img :src="emptyState" alt="empty" width="180" />
      <h3>{{ t('page.productNotFound') }}</h3>
      <p>{{ t('page.productEmpty') }}</p>
      <button type="button" class="btn btn--ghost" @click="router.push('/pms/product')">{{ t('common.back') }}</button>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import emptyState from '@/assets/images/empty-state.svg'
import { getProductDetail } from '@/api/pms/product'
import type { ProductDetail } from '@/types'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const product = ref<ProductDetail | null>(null)

const overviewMetrics = computed(() =>
  product.value
    ? [
        { label: t('product.detail.price'), value: formatCurrency(product.value.price) },
        { label: t('product.detail.sales'), value: product.value.sales.toLocaleString('zh-CN') },
        { label: t('product.detail.stock'), value: product.value.stock.toString() },
        { label: t('product.detail.status'), value: t(`product.status.${product.value.status}`) },
      ]
    : [],
)

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value)
}

async function loadDetail() {
  const id = Number(route.params.id)
  product.value = Number.isFinite(id) ? await getProductDetail(id) : null
}

watch(
  () => route.params.id,
  () => {
    void loadDetail()
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.product-detail__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 34px);
}

.product-detail__hero {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  padding: 24px;
}

.product-detail__cover {
  display: grid;
  place-items: center;
  min-height: 220px;
  border-radius: 24px;
  color: #fff;
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.product-detail__hero-content {
  display: grid;
  gap: 18px;
}

.product-detail__hero-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.product-detail__hero-top h3 {
  margin: 14px 0 8px;
  font-size: 28px;
}

.product-detail__hero-top p,
.product-detail__description {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.product-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-detail__overview {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.product-detail__metric {
  padding: 18px;
}

.product-detail__metric p {
  margin: 0;
  color: #64748b;
}

.product-detail__metric strong {
  display: inline-block;
  margin-top: 10px;
  font-size: 24px;
}

.product-detail__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.product-detail__section {
  padding: 22px;
}

.product-detail__section h3 {
  margin: 0 0 18px;
}

.product-detail__info-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
}

.product-detail__info-list div {
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fafc;
}

.product-detail__info-list dt {
  color: #64748b;
  font-size: 13px;
}

.product-detail__info-list dd {
  margin: 10px 0 0;
  font-weight: 700;
}

.product-detail__attribute-list {
  display: grid;
  gap: 12px;
}

.product-detail__attribute-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fafc;
}

.product-detail__attribute-item span {
  color: #475569;
}

.product-detail__snapshot {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.product-detail__snapshot div {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(180deg, #f8fafc 0%, #eef6f8 100%);
}

.product-detail__snapshot span {
  color: #64748b;
}

.product-detail__snapshot strong {
  font-size: 22px;
}

.product-detail__timeline {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.product-detail__timeline li {
  padding: 16px 18px;
  border-left: 4px solid #99f6e4;
  border-radius: 0 16px 16px 0;
  background: #f8fafc;
}

.product-detail__timeline p {
  margin: 8px 0;
  color: #475569;
}

.product-detail__timeline small {
  color: #64748b;
}

.product-detail__empty {
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 48px 24px;
  text-align: center;
}

.product-detail__empty h3,
.product-detail__empty p {
  margin: 0;
}

.product-detail__empty p {
  color: #64748b;
}

@media (max-width: 1100px) {
  .product-detail__hero,
  .product-detail__grid,
  .product-detail__overview {
    grid-template-columns: 1fr;
  }

  .product-detail__cover {
    min-height: 180px;
  }
}

@media (max-width: 720px) {
  .product-detail__hero-top,
  .product-detail__info-list,
  .product-detail__snapshot {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .product-detail__attribute-item {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
