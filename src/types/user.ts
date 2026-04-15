import type { PageQuery } from './api'
import type { StatusValue } from './common'

export type UserStatus = StatusValue

export interface UserQuery extends PageQuery {
  userName?: string
}

export interface UserItem {
  userId: number
  userName: string
  phonenumber: string
  roleName: string
  status: UserStatus
}
