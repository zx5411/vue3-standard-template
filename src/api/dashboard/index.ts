import type { DashboardPayload } from '@/types'

const DASHBOARD_DATA: DashboardPayload = {
  metrics: [
    { key: 'gmv', value: 286400, delta: 12.6, format: 'currency' },
    { key: 'orders', value: 1893, delta: 8.4, format: 'number' },
    { key: 'conversion', value: 6.8, delta: 0.7, format: 'percent' },
    { key: 'refundRate', value: 1.3, delta: -0.2, format: 'percent' },
  ],
  trend: [
    { label: '04-09', sales: 31800, orders: 210, customers: 1720 },
    { label: '04-10', sales: 35600, orders: 248, customers: 1830 },
    { label: '04-11', sales: 34100, orders: 232, customers: 1760 },
    { label: '04-12', sales: 39800, orders: 284, customers: 2010 },
    { label: '04-13', sales: 41200, orders: 306, customers: 2140 },
    { label: '04-14', sales: 46800, orders: 342, customers: 2360 },
    { label: '04-15', sales: 52100, orders: 371, customers: 2490 },
  ],
  categories: [
    { key: 'digital', value: 38 },
    { key: 'home', value: 24 },
    { key: 'wellness', value: 21 },
    { key: 'seasonal', value: 17 },
  ],
  alerts: [
    { key: 'refundPending', count: 7, level: 'warning', eta: '2h' },
    { key: 'lowInventory', count: 12, level: 'critical', eta: 'Today' },
    { key: 'campaign', count: 3, level: 'normal', eta: '18:00' },
  ],
}

export async function getDashboardData(): Promise<DashboardPayload> {
  return Promise.resolve(structuredClone(DASHBOARD_DATA))
}
