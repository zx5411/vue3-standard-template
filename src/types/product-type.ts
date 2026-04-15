export interface ProductTypeItem {
  id: number
  name: string
  attributeCount: number
  paramCount: number
  sort: number
  enabled: boolean
  description: string
}

export interface ProductTypeUpdatePayload {
  id: number
  name: string
  sort: number
  enabled: boolean
  description: string
}
