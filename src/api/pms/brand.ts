import type { BrandItem, BrandUpdatePayload } from '@/types'

const BRAND_DATA: BrandItem[] = [
  {
    id: 1,
    name: 'Auralab',
    firstLetter: 'A',
    recommend: true,
    sort: 100,
    story: '聚焦通勤与轻运动场景的消费电子品牌。',
    productCount: 16,
    logoLabel: 'AU',
    logoColor: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
  },
  {
    id: 2,
    name: 'Homescape',
    firstLetter: 'H',
    recommend: true,
    sort: 88,
    story: '面向年轻家庭的轻家居与空间整理品牌。',
    productCount: 24,
    logoLabel: 'HO',
    logoColor: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
  },
  {
    id: 3,
    name: 'NutriOne',
    firstLetter: 'N',
    recommend: false,
    sort: 72,
    story: '专注日常营养补充与健康生活方式。',
    productCount: 12,
    logoLabel: 'NU',
    logoColor: 'linear-gradient(135deg, #b45309, #f59e0b)',
  },
]

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export async function listBrand(): Promise<BrandItem[]> {
  return Promise.resolve(cloneValue(BRAND_DATA).sort((a, b) => b.sort - a.sort))
}

export async function updateBrand(payload: BrandUpdatePayload): Promise<BrandItem | null> {
  const index = BRAND_DATA.findIndex((item) => item.id === payload.id)
  if (index < 0) {
    return Promise.resolve(null)
  }

  BRAND_DATA[index] = {
    ...BRAND_DATA[index],
    ...payload,
  }

  return Promise.resolve(cloneValue(BRAND_DATA[index]))
}
