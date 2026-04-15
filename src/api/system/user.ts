export interface UserQuery {
  pageNum: number
  pageSize: number
  userName?: string
}

export interface UserItem {
  userId: number
  userName: string
  phonenumber: string
  roleName: string
  status: '0' | '1'
}

const DEMO_USERS: UserItem[] = [
  { userId: 1, userName: 'admin', phonenumber: '13800000001', roleName: 'Administrator', status: '0' },
  { userId: 2, userName: 'demo', phonenumber: '13800000002', roleName: 'Operator', status: '0' },
  { userId: 3, userName: 'readonly', phonenumber: '13800000003', roleName: 'Viewer', status: '1' },
]

export async function listUser(query: UserQuery) {
  const keyword = query.userName?.trim().toLowerCase() || ''
  const filtered = keyword
    ? DEMO_USERS.filter((item) =>
        [item.userName, item.phonenumber, item.roleName].some((value) => value.toLowerCase().includes(keyword)),
      )
    : DEMO_USERS

  const start = (query.pageNum - 1) * query.pageSize
  const rows = filtered.slice(start, start + query.pageSize)

  return Promise.resolve({
    rows,
    total: filtered.length,
  })
}
