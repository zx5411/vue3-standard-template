export interface BrandItem {
  id: number
  name: string
  firstLetter: string
  recommend: boolean
  sort: number
  story: string
  productCount: number
  logoLabel: string
  logoColor: string
}

export interface BrandUpdatePayload {
  id: number
  name: string
  firstLetter: string
  recommend: boolean
  sort: number
  story: string
}
