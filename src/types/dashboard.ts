export type DashboardMetricKey = 'gmv' | 'orders' | 'conversion' | 'refundRate'

export type DashboardMetricFormat = 'currency' | 'number' | 'percent'

export interface DashboardMetric {
  key: DashboardMetricKey
  value: number
  delta: number
  format: DashboardMetricFormat
}

export interface DashboardTrendPoint {
  label: string
  sales: number
  orders: number
  customers: number
}

export type DashboardCategoryKey = 'digital' | 'home' | 'wellness' | 'seasonal'

export interface DashboardCategoryItem {
  key: DashboardCategoryKey
  value: number
}

export type DashboardAlertLevel = 'critical' | 'warning' | 'normal'

export type DashboardAlertKey = 'refundPending' | 'lowInventory' | 'campaign'

export interface DashboardAlertItem {
  key: DashboardAlertKey
  count: number
  level: DashboardAlertLevel
  eta: string
}

export interface DashboardPayload {
  metrics: DashboardMetric[]
  trend: DashboardTrendPoint[]
  categories: DashboardCategoryItem[]
  alerts: DashboardAlertItem[]
}
