export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

export interface PageQuery {
  pageNum: number
  pageSize: number
}

export interface PageResult<T> {
  rows: T[]
  total: number
}
