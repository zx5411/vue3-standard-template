import type { ProductTypeItem, ProductTypeUpdatePayload } from '@/types'

const PRODUCT_TYPE_DATA: ProductTypeItem[] = [
  {
    id: 1,
    name: '手机数码规格',
    attributeCount: 8,
    paramCount: 5,
    sort: 100,
    enabled: true,
    description: '适用于耳机、手机、平板等数码商品的属性模型。',
  },
  {
    id: 2,
    name: '家居电器规格',
    attributeCount: 6,
    paramCount: 4,
    sort: 82,
    enabled: true,
    description: '适用于风扇、电热杯和轻家电商品。',
  },
  {
    id: 3,
    name: '保健品规格',
    attributeCount: 5,
    paramCount: 3,
    sort: 68,
    enabled: false,
    description: '适用于鱼油、营养补充品和康复器械。',
  },
]

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export async function listProductType(): Promise<ProductTypeItem[]> {
  return Promise.resolve(cloneValue(PRODUCT_TYPE_DATA).sort((a, b) => b.sort - a.sort))
}

export async function updateProductType(payload: ProductTypeUpdatePayload): Promise<ProductTypeItem | null> {
  const index = PRODUCT_TYPE_DATA.findIndex((item) => item.id === payload.id)
  if (index < 0) {
    return Promise.resolve(null)
  }

  PRODUCT_TYPE_DATA[index] = {
    ...PRODUCT_TYPE_DATA[index],
    ...payload,
  }

  return Promise.resolve(cloneValue(PRODUCT_TYPE_DATA[index]))
}
