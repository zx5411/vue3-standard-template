import type {
  ProductCreatePayload,
  ProductDetail,
  ProductListResponse,
  ProductMetaPatchPayload,
  ProductOptionPayload,
  ProductQuery,
  ProductUpdatePayload,
} from '@/types'

const PRODUCT_DATA: ProductDetail[] = [
  {
    id: 1001,
    name: '轻享蓝牙耳机 Pro',
    subtitle: '主动降噪与 32 小时续航的通勤型单品',
    sku: 'PMS-1001',
    category: '手机数码',
    brand: 'Auralab',
    price: 299,
    originalPrice: 399,
    stock: 128,
    sales: 2160,
    status: 'published',
    verifyStatus: 'approved',
    isNew: true,
    recommended: true,
    sort: 100,
    tags: ['新品', '热销'],
    updatedAt: '2026-04-14 16:20',
    coverLabel: 'EAR',
    coverColor: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
    description: '主打轻量化与稳定连接，适合通勤、健身和会议场景。',
    serviceTags: ['48 小时发货', '7 天无忧退', '一年质保'],
    attributes: [
      { label: '蓝牙版本', value: '5.4' },
      { label: '续航时间', value: '32 小时' },
      { label: '充电接口', value: 'USB-C' },
    ],
    timeline: [
      { time: '2026-04-14 16:20', title: '信息更新', operator: 'Mall Admin', detail: '同步耳机续航文案与宣传标签。' },
      { time: '2026-04-12 09:30', title: '库存补货', operator: 'Warehouse', detail: '补充 80 件安全库存。' },
    ],
  },
  {
    id: 1002,
    name: '桌面空气循环扇',
    subtitle: '小空间静音送风，适合办公室和卧室',
    sku: 'PMS-1002',
    category: '家居生活',
    brand: 'Homescape',
    price: 189,
    originalPrice: 229,
    stock: 64,
    sales: 1280,
    status: 'published',
    verifyStatus: 'reviewing',
    isNew: true,
    recommended: false,
    sort: 90,
    tags: ['场景款'],
    updatedAt: '2026-04-13 11:10',
    coverLabel: 'AIR',
    coverColor: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
    description: '针对桌面场景配置三档风速与可拆洗网罩，用于演示家居类商品详情结构。',
    serviceTags: ['全国包邮', '只换不修'],
    attributes: [
      { label: '风速档位', value: '3 档' },
      { label: '摆头角度', value: '90°' },
      { label: '噪音', value: '低于 35dB' },
    ],
    timeline: [
      { time: '2026-04-13 11:10', title: '活动调价', operator: 'Mall Admin', detail: '参加春季家居活动，调整展示价。' },
      { time: '2026-04-10 14:20', title: '商品上架', operator: 'Category Team', detail: '首批上架并同步详情页卖点。' },
    ],
  },
  {
    id: 1003,
    name: '深海鱼油胶囊',
    subtitle: '高纯度 Omega-3，日常营养补充',
    sku: 'PMS-1003',
    category: '营养保健',
    brand: 'NutriOne',
    price: 129,
    originalPrice: 159,
    stock: 42,
    sales: 1740,
    status: 'published',
    verifyStatus: 'pending',
    isNew: false,
    recommended: true,
    sort: 88,
    tags: ['复购高'],
    updatedAt: '2026-04-11 19:40',
    coverLabel: 'O3',
    coverColor: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    description: '保健品类示例，页面可用于展示规格、服务标签和运维时间线等后台信息。',
    serviceTags: ['顺丰冷链', '正品保障'],
    attributes: [
      { label: '规格', value: '60 粒 / 瓶' },
      { label: '建议人群', value: '成人日常补充' },
      { label: '保质期', value: '24 个月' },
    ],
    timeline: [
      { time: '2026-04-11 19:40', title: '低库存预警', operator: 'System', detail: '库存低于安全阈值，进入补货队列。' },
      { time: '2026-04-08 10:00', title: '详情优化', operator: 'Operation', detail: '增加适用人群和规格说明。' },
    ],
  },
  {
    id: 1004,
    name: '春日轻烘焙坚果礼盒',
    subtitle: '节日礼赠与办公室分享场景',
    sku: 'PMS-1004',
    category: '时令好物',
    brand: 'Season Lab',
    price: 239,
    originalPrice: 299,
    stock: 90,
    sales: 860,
    status: 'draft',
    verifyStatus: 'pending',
    isNew: false,
    recommended: false,
    sort: 82,
    tags: ['节日款', '礼盒'],
    updatedAt: '2026-04-15 09:15',
    coverLabel: 'BOX',
    coverColor: 'linear-gradient(135deg, #b45309, #f59e0b)',
    description: '季节礼盒商品，当前处于草稿状态，用于演示列表与详情中的状态切换。',
    serviceTags: ['支持定制卡片', '企业团购'],
    attributes: [
      { label: '净含量', value: '980g' },
      { label: '包装形式', value: '双层礼盒' },
      { label: '适用场景', value: '节庆赠礼 / 团购' },
    ],
    timeline: [
      { time: '2026-04-15 09:15', title: '待发布', operator: 'Mall Admin', detail: '等待营销素材与详情图审校完成。' },
      { time: '2026-04-13 18:20', title: '创建商品', operator: 'Category Team', detail: '新建季节活动商品草稿。' },
    ],
  },
  {
    id: 1005,
    name: '便携电热咖啡杯',
    subtitle: '随车随行的恒温饮品解决方案',
    sku: 'PMS-1005',
    category: '家居生活',
    brand: 'Warmio',
    price: 159,
    originalPrice: 199,
    stock: 73,
    sales: 1160,
    status: 'published',
    verifyStatus: 'reviewing',
    isNew: false,
    recommended: true,
    sort: 76,
    tags: ['通勤'],
    updatedAt: '2026-04-12 08:45',
    coverLabel: 'MUG',
    coverColor: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    description: '提供恒温、防漏和车载适配信息，可作为家居生活类商品模板。',
    serviceTags: ['30 天质保', '次日达'],
    attributes: [
      { label: '容量', value: '420ml' },
      { label: '恒温区间', value: '45°C - 55°C' },
      { label: '电源', value: 'Type-C / 车载双供电' },
    ],
    timeline: [
      { time: '2026-04-12 08:45', title: '文案优化', operator: 'Mall Admin', detail: '补充通勤场景和车载供电描述。' },
      { time: '2026-04-07 15:20', title: '规格确认', operator: 'Supplier', detail: '确认双供电版本为当前主推款。' },
    ],
  },
  {
    id: 1006,
    name: '轻便筋膜放松枪',
    subtitle: '运动后肌群恢复的入门器械',
    sku: 'PMS-1006',
    category: '营养保健',
    brand: 'Flexcore',
    price: 269,
    originalPrice: 329,
    stock: 58,
    sales: 980,
    status: 'published',
    verifyStatus: 'pending',
    isNew: false,
    recommended: false,
    sort: 72,
    tags: ['运动恢复'],
    updatedAt: '2026-04-10 17:00',
    coverLabel: 'FIT',
    coverColor: 'linear-gradient(135deg, #ef4444, #fb7185)',
    description: '以便携和低噪为主要卖点，适合演示保健器械类商品信息。',
    serviceTags: ['一年换新', '配件齐全'],
    attributes: [
      { label: '挡位', value: '5 档' },
      { label: '续航', value: '6 小时' },
      { label: '附件', value: '4 个按摩头' },
    ],
    timeline: [
      { time: '2026-04-10 17:00', title: '首页推荐', operator: 'Operation', detail: '加入运动恢复专题位。' },
      { time: '2026-04-06 13:10', title: '评价回收', operator: 'CRM', detail: '同步五星用户反馈至详情页。' },
    ],
  },
]

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function getStockStatus(stock: number) {
  return stock < 80 ? 'low' : 'healthy'
}

function formatNow() {
  const date = new Date()
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function appendTimeline(index: number, title: string, detail: string) {
  PRODUCT_DATA[index].updatedAt = formatNow()
  PRODUCT_DATA[index].timeline.unshift({
    time: PRODUCT_DATA[index].updatedAt,
    title,
    operator: 'Mall Admin',
    detail,
  })
}

export async function listProduct(query: ProductQuery): Promise<ProductListResponse> {
  const keyword = query.keyword?.trim().toLowerCase() || ''
  const productSn = query.productSn?.trim().toLowerCase() || ''
  const category = query.category || 'all'
  const brand = query.brand || 'all'
  const publishStatus = query.publishStatus || 'all'
  const verifyStatus = query.verifyStatus || 'all'
  const stockStatus = query.stockStatus || 'all'

  const filtered = PRODUCT_DATA.filter((item) => {
    if (keyword) {
      const target = [item.name, item.subtitle].join(' ').toLowerCase()
      if (!target.includes(keyword)) {
        return false
      }
    }

    if (productSn && !item.sku.toLowerCase().includes(productSn)) {
      return false
    }

    if (category !== 'all' && item.category !== category) {
      return false
    }

    if (brand !== 'all' && item.brand !== brand) {
      return false
    }

    if (publishStatus !== 'all' && item.status !== publishStatus) {
      return false
    }

    if (verifyStatus !== 'all' && item.verifyStatus !== verifyStatus) {
      return false
    }

    if (stockStatus !== 'all' && getStockStatus(item.stock) !== stockStatus) {
      return false
    }

    return true
  }).sort((a, b) => b.sort - a.sort)

  const start = (query.pageNum - 1) * query.pageSize
  const rows = filtered.slice(start, start + query.pageSize).map((item) => cloneValue(item))

  return Promise.resolve({
    rows,
    total: filtered.length,
    categories: Array.from(new Set(PRODUCT_DATA.map((item) => item.category))),
    brands: Array.from(new Set(PRODUCT_DATA.map((item) => item.brand))),
    summary: [
      { key: 'onSale', value: filtered.filter((item) => item.status === 'published').length },
      { key: 'lowStock', value: filtered.filter((item) => getStockStatus(item.stock) === 'low').length },
      { key: 'draft', value: filtered.filter((item) => item.status === 'draft').length },
      { key: 'monthlySales', value: filtered.reduce((total, item) => total + item.sales, 0) },
    ],
  })
}

export async function listProductOptions(): Promise<ProductOptionPayload> {
  return Promise.resolve({
    categories: Array.from(new Set(PRODUCT_DATA.map((item) => item.category))),
    brands: Array.from(new Set(PRODUCT_DATA.map((item) => item.brand))),
  })
}

export async function getProductDetail(id: number): Promise<ProductDetail | null> {
  const product = PRODUCT_DATA.find((item) => item.id === id)
  return Promise.resolve(product ? cloneValue(product) : null)
}

export async function updateProduct(payload: ProductUpdatePayload): Promise<ProductDetail | null> {
  const index = PRODUCT_DATA.findIndex((item) => item.id === payload.id)
  if (index < 0) {
    return Promise.resolve(null)
  }

  PRODUCT_DATA[index] = {
    ...PRODUCT_DATA[index],
    name: payload.name,
    price: payload.price,
    stock: payload.stock,
    status: payload.status,
    verifyStatus: payload.verifyStatus,
    tags: payload.tags,
    sort: payload.sort,
  }

  appendTimeline(index, '后台编辑', '更新了商品名称、价格、库存、排序或标签信息。')

  return Promise.resolve(cloneValue(PRODUCT_DATA[index]))
}

export async function patchProductMeta(payload: ProductMetaPatchPayload): Promise<ProductDetail | null> {
  const index = PRODUCT_DATA.findIndex((item) => item.id === payload.id)
  if (index < 0) {
    return Promise.resolve(null)
  }

  PRODUCT_DATA[index] = {
    ...PRODUCT_DATA[index],
    ...payload,
  }

  appendTimeline(index, '状态更新', '更新了商品发布状态、审核状态或运营标签。')

  return Promise.resolve(cloneValue(PRODUCT_DATA[index]))
}

export async function createProduct(payload: ProductCreatePayload): Promise<ProductDetail> {
  const nextId = PRODUCT_DATA.reduce((max, item) => Math.max(max, item.id), 1000) + 1
  const created: ProductDetail = {
    id: nextId,
    name: payload.name,
    subtitle: payload.subtitle,
    sku: payload.sku,
    category: payload.category,
    brand: payload.brand,
    price: payload.price,
    originalPrice: payload.originalPrice,
    stock: payload.stock,
    sales: 0,
    status: payload.status,
    verifyStatus: payload.verifyStatus,
    isNew: payload.isNew,
    recommended: payload.recommended,
    sort: payload.sort,
    tags: payload.tags,
    updatedAt: formatNow(),
    coverLabel: payload.name.slice(0, 3).toUpperCase() || 'NEW',
    coverColor: 'linear-gradient(135deg, #2563eb, #60a5fa)',
    description: payload.description,
    serviceTags: payload.serviceTags,
    attributes: payload.attributes,
    timeline: [
      {
        time: formatNow(),
        title: '新建商品',
        operator: 'Mall Admin',
        detail: '通过添加商品页面创建了新的商品草稿。',
      },
    ],
  }

  PRODUCT_DATA.unshift(created)
  return Promise.resolve(cloneValue(created))
}

export async function deleteProduct(id: number): Promise<boolean> {
  const index = PRODUCT_DATA.findIndex((item) => item.id === id)
  if (index < 0) {
    return Promise.resolve(false)
  }

  PRODUCT_DATA.splice(index, 1)
  return Promise.resolve(true)
}
