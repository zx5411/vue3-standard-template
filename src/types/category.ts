export interface ProductCategoryItem {
  id: number
  name: string
  parentName: string
  level: 1 | 2
  productCount: number
  productUnit: string
  navStatus: boolean
  showStatus: boolean
  sort: number
  keywords: string
}

export interface CategoryUpdatePayload {
  id: number
  name: string
  sort: number
  navStatus: boolean
  showStatus: boolean
  keywords: string
}
