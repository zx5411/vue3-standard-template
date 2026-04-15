import type { CategoryUpdatePayload, ProductCategoryItem } from '@/types'

const CATEGORY_DATA: ProductCategoryItem[] = [
  {
    id: 1,
    name: '手机数码',
    parentName: '顶级分类',
    level: 1,
    productCount: 126,
    productUnit: '件',
    navStatus: true,
    showStatus: true,
    sort: 100,
    keywords: '耳机, 手机, 平板',
  },
  {
    id: 2,
    name: '耳机音频',
    parentName: '手机数码',
    level: 2,
    productCount: 38,
    productUnit: '件',
    navStatus: true,
    showStatus: true,
    sort: 88,
    keywords: '蓝牙耳机, 音箱',
  },
  {
    id: 3,
    name: '家居生活',
    parentName: '顶级分类',
    level: 1,
    productCount: 92,
    productUnit: '件',
    navStatus: true,
    showStatus: true,
    sort: 80,
    keywords: '风扇, 杯具, 厨电',
  },
  {
    id: 4,
    name: '营养保健',
    parentName: '顶级分类',
    level: 1,
    productCount: 54,
    productUnit: '件',
    navStatus: false,
    showStatus: true,
    sort: 72,
    keywords: '鱼油, 维生素, 器械',
  },
]

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export async function listProductCategory(): Promise<ProductCategoryItem[]> {
  return Promise.resolve(cloneValue(CATEGORY_DATA).sort((a, b) => b.sort - a.sort))
}

export async function updateProductCategory(payload: CategoryUpdatePayload): Promise<ProductCategoryItem | null> {
  const index = CATEGORY_DATA.findIndex((item) => item.id === payload.id)
  if (index < 0) {
    return Promise.resolve(null)
  }

  CATEGORY_DATA[index] = {
    ...CATEGORY_DATA[index],
    ...payload,
  }

  return Promise.resolve(cloneValue(CATEGORY_DATA[index]))
}
