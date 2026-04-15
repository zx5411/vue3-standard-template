import type { PageQuery, PageResult } from './api'

export type ProductStatus = 'published' | 'draft'
export type VerifyStatus = 'pending' | 'reviewing' | 'approved'
export type StockStatus = 'healthy' | 'low'
export type ProductSummaryKey = 'onSale' | 'lowStock' | 'draft' | 'monthlySales'

export interface ProductQuery extends PageQuery {
  keyword?: string
  productSn?: string
  category?: string
  brand?: string
  publishStatus?: ProductStatus | 'all'
  verifyStatus?: VerifyStatus | 'all'
  stockStatus?: StockStatus | 'all'
}

export interface ProductListSummary {
  key: ProductSummaryKey
  value: number
}

export interface ProductAttribute {
  label: string
  value: string
}

export interface ProductTimelineItem {
  time: string
  title: string
  operator: string
  detail: string
}

export interface ProductListItem {
  id: number
  name: string
  subtitle: string
  sku: string
  category: string
  brand: string
  price: number
  originalPrice: number
  stock: number
  sales: number
  status: ProductStatus
  verifyStatus: VerifyStatus
  isNew: boolean
  recommended: boolean
  sort: number
  tags: string[]
  updatedAt: string
  coverLabel: string
  coverColor: string
}

export interface ProductDetail extends ProductListItem {
  description: string
  serviceTags: string[]
  attributes: ProductAttribute[]
  timeline: ProductTimelineItem[]
}

export interface ProductListResponse extends PageResult<ProductListItem> {
  categories: string[]
  brands: string[]
  summary: ProductListSummary[]
}

export interface ProductUpdatePayload {
  id: number
  name: string
  price: number
  stock: number
  status: ProductStatus
  verifyStatus: VerifyStatus
  tags: string[]
  sort: number
}

export interface ProductMetaPatchPayload {
  id: number
  status?: ProductStatus
  verifyStatus?: VerifyStatus
  isNew?: boolean
  recommended?: boolean
  sort?: number
}

export interface ProductCreatePayload {
  name: string
  subtitle: string
  sku: string
  category: string
  brand: string
  price: number
  originalPrice: number
  stock: number
  description: string
  serviceTags: string[]
  attributes: ProductAttribute[]
  tags: string[]
  status: ProductStatus
  verifyStatus: VerifyStatus
  isNew: boolean
  recommended: boolean
  sort: number
}

export interface ProductOptionPayload {
  categories: string[]
  brands: string[]
}
