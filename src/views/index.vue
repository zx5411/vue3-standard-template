<template>
  <section class="page-shell">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.workspace') }}</p>
        <h2 class="dashboard__title">{{ t('route.dashboard') }}</h2>
        <p class="page-lead">{{ t('page.dashboardDesc') }}</p>
      </div>
      <article class="card dashboard__highlight">
        <span class="badge badge--success">{{ t('page.dashboardHighlight') }}</span>
        <strong>{{ t('page.dashboardSyncTime') }}</strong>
        <p>{{ t('page.dashboardSyncTip') }}</p>
      </article>
    </header>

    <div class="dashboard__metrics">
      <article v-for="metric in metrics" :key="metric.key" class="card dashboard__metric">
        <p class="dashboard__metric-label">{{ t(`dashboard.metric.${metric.key}.label`) }}</p>
        <h3>{{ formatMetric(metric) }}</h3>
        <p class="dashboard__metric-foot">
          <span :class="['dashboard__delta', getMetricDeltaClass(metric)]">
            {{ formatDelta(metric) }}
          </span>
          <span>{{ t(`dashboard.metric.${metric.key}.hint`) }}</span>
        </p>
      </article>
    </div>

    <div class="dashboard__grid">
      <article class="card dashboard__panel">
        <div class="dashboard__panel-head">
          <div>
            <h3>{{ t('dashboard.chartTitle') }}</h3>
            <p>{{ t('dashboard.chartDesc') }}</p>
          </div>
        </div>
        <BaseChart :option="trendOption" />
      </article>

      <article class="card dashboard__panel">
        <div class="dashboard__panel-head">
          <div>
            <h3>{{ t('dashboard.categoryTitle') }}</h3>
            <p>{{ t('dashboard.categoryDesc') }}</p>
          </div>
        </div>
        <BaseChart :option="categoryOption" height="320px" />
      </article>
    </div>

    <article class="card dashboard__panel">
      <div class="dashboard__panel-head">
        <div>
          <h3>{{ t('dashboard.alertsTitle') }}</h3>
          <p>{{ t('dashboard.alertsDesc') }}</p>
        </div>
      </div>

      <ul class="dashboard__alerts">
        <li v-for="alert in alerts" :key="alert.key" class="dashboard__alert-item">
          <div>
            <div class="dashboard__alert-top">
              <strong>{{ t(`dashboard.alert.${alert.key}.title`) }}</strong>
              <span :class="['badge', getAlertBadgeClass(alert.level)]">{{ alert.count }}</span>
            </div>
            <p>{{ t(`dashboard.alert.${alert.key}.detail`) }}</p>
          </div>
          <small>{{ alert.eta }}</small>
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { useI18n } from 'vue-i18n'
import BaseChart from '@/components/BaseChart/index.vue'
import { getDashboardData } from '@/api/dashboard'
import type { DashboardAlertLevel, DashboardMetric, DashboardPayload } from '@/types'

const { t } = useI18n()
const dashboardData = ref<DashboardPayload | null>(null)

const metrics = computed(() => dashboardData.value?.metrics ?? [])
const trend = computed(() => dashboardData.value?.trend ?? [])
const alerts = computed(() => dashboardData.value?.alerts ?? [])

const trendOption = computed<EChartsOption>(() => ({
  color: ['#0f766e', '#1d4ed8', '#f59e0b'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 0,
  },
  grid: {
    left: 12,
    right: 12,
    bottom: 0,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: { color: '#cbd5e1' },
    },
    data: trend.value.map((item) => item.label),
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: { color: '#e2e8f0' },
    },
  },
  series: [
    {
      name: t('dashboard.metric.gmv.label'),
      type: 'line',
      smooth: true,
      areaStyle: {
        color: 'rgba(15, 118, 110, 0.08)',
      },
      data: trend.value.map((item) => item.sales),
    },
    {
      name: t('dashboard.metric.orders.label'),
      type: 'line',
      smooth: true,
      data: trend.value.map((item) => item.orders),
    },
    {
      name: t('dashboard.metric.conversion.hint'),
      type: 'line',
      smooth: true,
      data: trend.value.map((item) => item.customers),
    },
  ],
}))

const categoryOption = computed<EChartsOption>(() => ({
  color: ['#0f766e', '#1d4ed8', '#f59e0b', '#f97316'],
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 0,
  },
  series: [
    {
      type: 'pie',
      radius: ['52%', '74%'],
      avoidLabelOverlap: false,
      label: {
        formatter: '{b}\n{d}%',
      },
      data: (dashboardData.value?.categories ?? []).map((item) => ({
        name: t(`dashboard.category.${item.key}`),
        value: item.value,
      })),
    },
  ],
}))

function formatMetric(metric: DashboardMetric) {
  switch (metric.format) {
    case 'currency':
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        maximumFractionDigits: 0,
      }).format(metric.value)
    case 'percent':
      return `${metric.value.toFixed(1)}%`
    default:
      return metric.value.toLocaleString('zh-CN')
  }
}

function formatDelta(metric: DashboardMetric) {
  const prefix = metric.delta > 0 ? '+' : ''
  return `${prefix}${metric.delta.toFixed(1)}%`
}

function getMetricDeltaClass(metric: DashboardMetric) {
  const isPositive = metric.key === 'refundRate' ? metric.delta <= 0 : metric.delta >= 0
  return isPositive ? 'dashboard__delta--up' : 'dashboard__delta--down'
}

function getAlertBadgeClass(level: DashboardAlertLevel) {
  switch (level) {
    case 'critical':
      return 'badge--danger'
    case 'warning':
      return 'badge--warning'
    default:
      return 'badge--neutral'
  }
}

async function loadDashboard() {
  dashboardData.value = await getDashboardData()
}

onMounted(() => {
  void loadDashboard()
})
</script>

<style scoped lang="scss">
.dashboard__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 36px);
}

.dashboard__highlight {
  display: grid;
  gap: 10px;
  min-width: min(100%, 280px);
  padding: 18px 20px;
}

.dashboard__highlight p {
  margin: 0;
  color: #475569;
}

.dashboard__metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.dashboard__metric {
  padding: 20px;
}

.dashboard__metric h3 {
  margin: 10px 0;
  font-size: 28px;
}

.dashboard__metric-label {
  margin: 0;
  color: #64748b;
  font-weight: 600;
}

.dashboard__metric-foot {
  display: flex;
  gap: 10px;
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.dashboard__delta {
  font-weight: 700;
}

.dashboard__delta--up {
  color: #0f766e;
}

.dashboard__delta--down {
  color: #b91c1c;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(320px, 1fr);
  gap: 20px;
}

.dashboard__panel {
  display: grid;
  gap: 18px;
  padding: 20px;
}

.dashboard__panel-head h3 {
  margin: 0;
}

.dashboard__panel-head p {
  margin: 8px 0 0;
  color: #64748b;
}

.dashboard__alerts {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dashboard__alert-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
}

.dashboard__alert-item p {
  margin: 8px 0 0;
  color: #64748b;
}

.dashboard__alert-item small {
  color: #64748b;
  font-weight: 700;
}

.dashboard__alert-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 1100px) {
  .dashboard__metrics,
  .dashboard__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .dashboard__metrics,
  .dashboard__grid {
    grid-template-columns: 1fr;
  }

  .dashboard__alert-item {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
