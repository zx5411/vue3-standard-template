# 项目目录结构

本文基于当前仓库实际目录整理，目录树后面直接附带职责说明，便于查阅和后续维护。

## 当前目录树

```text
vue3-standard-template/                         # 项目根目录
├─ dist/                                        # Vite 构建输出目录，执行 build 后生成
├─ docs/                                        # 项目文档目录
│  ├─ project-structure.md                      # 当前项目目录结构说明
│  └─ superpowers/                              # 开发过程中的计划与记录
│     └─ plans/                                 # 任务计划文档
│        ├─ 2026-04-15-lite-admin-template.md  # 轻量后台模板实现计划
│        └─ 2026-04-15-pms-navigation-expansion.md # 商品模块导航扩展计划
├─ node_modules/                                # npm 安装的依赖目录，通常不手工维护
├─ public/                                      # 不参与模块打包、构建时原样拷贝的静态资源
│  └─ logo.svg                                  # 项目 Logo
├─ src/                                         # 业务源码根目录
│  ├─ api/                                      # 接口请求层，统一收口 mock/HTTP 请求
│  │  ├─ pms/                                   # 商品模块相关接口
│  │  │  ├─ brand.ts                            # 品牌管理 mock 接口
│  │  │  ├─ category.ts                         # 商品分类 mock 接口
│  │  │  ├─ product-type.ts                     # 商品类型 mock 接口
│  │  │  └─ product.ts                          # 商品列表、详情、编辑相关 mock 接口
│  │  ├─ dashboard/                             # 首页仪表盘接口目录
│  │  │  └─ index.ts                            # 首页仪表盘 mock 接口
│  │  └─ request.ts                             # 请求实例与通用请求封装
│  ├─ assets/                                   # 参与打包的静态资源
│  │  ├─ images/                                # 图片资源目录
│  │  │  └─ empty-state.svg                     # 空状态插图
│  │  └─ styles/                                # 全局样式与样式变量
│  │     ├─ index.scss                          # 全局样式入口
│  │     └─ variables.scss                      # 主题色、阴影等样式变量
│  ├─ components/                               # 跨页面复用组件
│  │  ├─ BaseChart/                             # ECharts 基础图表容器
│  │  │  └─ index.vue                           # 图表组件入口
│  │  ├─ BaseDialog/                            # 通用弹窗组件
│  │  │  └─ index.vue                           # 弹窗组件入口
│  │  ├─ Pagination/                            # 分页组件
│  │  │  ├─ index.spec.ts                       # 分页组件测试示例
│  │  │  └─ index.vue                           # 分页组件入口
│  │  ├─ RightToolbar/                          # 列表页右侧工具栏
│  │  │  └─ index.vue                           # 工具栏组件入口
│  │  ├─ SearchToolbar/                         # 列表查询工具栏
│  │  │  └─ index.vue                           # 搜索工具栏组件入口
│  │  └─ StatusSwitch/                          # 通用状态开关组件
│  │     └─ index.vue                           # 开关组件入口
│  ├─ composables/                              # Composition API 复用逻辑
│  │  ├─ index.ts                               # composables 统一导出
│  │  ├─ usePagination.ts                       # 分页状态封装
│  │  ├─ useTableQuery.ts                       # 列表查询状态封装
│  │  └─ useToggle.ts                           # 布尔开关状态封装
│  ├─ constants/                                # 项目常量
│  │  ├─ app.ts                                 # 应用标题等常量
│  │  ├─ i18n.ts                                # 国际化常量
│  │  ├─ index.ts                               # 常量统一导出
│  │  └─ storage.ts                             # 本地存储键名常量
│  ├─ directive/                                # 全局自定义指令
│  │  └─ permission.ts                          # 权限指令
│  ├─ i18n/                                     # 国际化文案与实例
│  │  ├─ en.ts                                  # 英文文案
│  │  ├─ index.ts                               # i18n 实例入口
│  │  └─ zh-cn.ts                               # 中文文案
│  ├─ layout/                                   # 后台布局壳
│  │  └─ index.vue                              # 侧边栏、顶栏、内容区布局
│  ├─ plugins/                                  # 插件注册入口
│  │  └─ index.ts                               # 全局插件安装逻辑
│  ├─ router/                                   # 路由管理
│  │  ├─ guards.ts                              # 路由守卫
│  │  ├─ index.ts                               # 路由实例入口
│  │  └─ routes.ts                              # 静态路由与异步路由配置
│  ├─ store/                                    # Pinia 状态管理
│  │  ├─ modules/                               # 按领域拆分的 store 模块
│  │  │  ├─ app.ts                              # 应用级状态
│  │  │  ├─ permission.spec.ts                  # 权限模块测试示例
│  │  │  ├─ permission.ts                       # 权限状态
│  │  │  └─ user.ts                             # 用户状态
│  │  └─ index.ts                               # Pinia 入口
│  ├─ types/                                    # 全局共享 TypeScript 类型
│  │  ├─ api.ts                                 # 通用接口响应类型
│  │  ├─ brand.ts                               # 品牌模块类型
│  │  ├─ category.ts                            # 分类模块类型
│  │  ├─ common.ts                              # 通用业务类型
│  │  ├─ dashboard.ts                           # 仪表盘类型
│  │  ├─ index.ts                               # 类型统一导出
│  │  ├─ product-type.ts                        # 商品类型模块类型
│  │  ├─ product.ts                             # 商品模块类型
│  ├─ utils/                                    # 通用工具函数
│  │  ├─ auth.ts                                # 鉴权与 token 工具
│  │  └─ date.ts                                # 日期处理工具
│  ├─ views/                                    # 页面目录
│  │  ├─ error/                                 # 错误页
│  │  │  ├─ 401.vue                             # 401 页面
│  │  │  └─ 404.vue                             # 404 页面
│  │  ├─ pms/                                   # 商品后台模块页面
│  │  │  ├─ brand/                              # 品牌管理页
│  │  │  │  └─ index.vue                        # 品牌管理入口页
│  │  │  ├─ product/                            # 商品列表与详情页
│  │  │  │  ├─ components/                      # 商品页私有组件
│  │  │  │  │  └─ ProductEditDialog.vue         # 商品编辑弹窗
│  │  │  │  ├─ detail.vue                       # 商品详情页
│  │  │  │  └─ index.vue                        # 商品列表页
│  │  │  ├─ product-category/                   # 商品分类页
│  │  │  │  └─ index.vue                        # 商品分类入口页
│  │  │  ├─ product-create/                     # 添加商品页
│  │  │  │  └─ index.vue                        # 添加商品入口页
│  │  │  └─ product-type/                       # 商品类型页
│  │  │     └─ index.vue                        # 商品类型入口页
│  │  ├─ index.vue                              # 首页仪表盘
│  │  └─ login.vue                              # 登录页
│  ├─ App.vue                                   # 应用根组件
│  ├─ main.ts                                   # 应用启动入口
│  └─ vite-env.d.ts                             # Vite 类型声明
├─ .env.development                             # 开发环境变量
├─ .env.production                              # 生产环境变量
├─ .gitignore                                   # Git 忽略规则
├─ index.html                                   # Vite HTML 模板入口
├─ package-lock.json                            # npm 依赖锁定文件
├─ package.json                                 # 项目依赖与脚本配置
├─ README.md                                    # 项目说明
├─ tsconfig.json                                # TypeScript 配置
├─ vite.config.ts                               # Vite 配置
└─ vitest.config.ts                             # Vitest 配置
```

## 根目录说明

### `vue3-standard-template/`

- 仓库根目录，聚合源码、文档、构建配置与依赖声明。
- 所有相对路径都以该目录为基准。
- 新增模块、文档或脚本时，优先在根目录下按职责归类后再创建子目录。

### `dist/`

- 生产构建输出目录。
- 由 `npm run build` 生成，通常不手动修改。
- 用于部署静态站点或交付前端打包结果。

### `docs/`

- 项目文档目录。
- 适合存放目录说明、开发规范、部署说明、接口约定等文档。
- 当前 `project-structure.md` 位于该目录。

### `node_modules/`

- 项目依赖安装目录。
- 由包管理器自动维护，不纳入业务代码管理。
- 依赖异常时优先重装依赖，不直接编辑目录内容。

### `public/`

- 静态资源目录。
- 构建时会按原文件名与目录结构拷贝到产物中。
- 适合放置不参与打包、需通过固定路径访问的资源。

### `src/`

- 业务源码根目录。
- 页面、路由、状态、接口、工具函数与复用组件均在此维护。
- 是日常开发最核心的目录，提交变更主要集中在该路径下。

### `.env.development`

- 开发环境变量文件。
- 本地开发启动时加载，用于区分开发态配置。
- 前端代码中需要注入的变量请使用 `VITE_` 前缀。

### `.env.production`

- 生产环境变量文件。
- 生产构建时加载，用于覆盖生产态配置。
- 与开发环境变量保持同名键有助于降低环境切换成本。

### `.gitignore`

- Git 忽略规则文件。
- 用于排除构建产物、依赖目录和本地临时文件。
- 新增本地专用文件时应先评估是否需要加入忽略规则。

### `index.html`

- Vite 应用 HTML 入口模板。
- 挂载根节点与基础 `meta` 配置在此定义。
- 一般只做全局入口层修改，不放业务结构。

### `package-lock.json`

- 依赖锁定文件。
- 记录精确依赖树，保证不同环境安装结果一致。
- 升级依赖后应与 `package.json` 一并提交。

### `package.json`

- 项目依赖与脚本命令配置文件。
- 定义运行、构建、测试、检查等标准命令入口。
- 团队成员通过该文件统一开发与交付流程。

### `README.md`

- 项目说明文档入口。
- 建议包含启动方式、构建命令、目录规范与常见问题。
- 面向新成员快速上手，应保持与当前实现同步。

### `tsconfig.json`

- TypeScript 编译配置文件。
- 统一类型检查策略、路径别名与编译目标。
- 修改后应验证编辑器提示和构建结果是否一致。

### `vite.config.ts`

- Vite 构建与开发服务器配置文件。
- 可配置别名、代理、插件与打包行为。
- 涉及构建链路变更时，优先在此集中管理。

### `vitest.config.ts`

- Vitest 测试配置文件。
- 控制测试环境、覆盖率与测试文件匹配规则。
- 测试策略调整时应同步更新该文件并验证测试通过。

## src 一级目录细化

### `src/api/`

- 接口请求封装目录，按业务域拆分 API 文件。
- `request.ts` 负责统一请求实例、拦截器与通用请求能力。
- 页面层通过 API 模块调用接口，避免在视图中直接散写请求细节。

### `src/assets/`

- 参与构建的静态资源目录。
- `images/` 用于图片资源，`styles/` 用于全局样式与样式变量。
- 全局样式优先在此集中维护，减少页面内重复定义。

### `src/components/`

- 跨页面复用组件目录。
- 组件应具备明确输入输出，避免耦合具体业务页面状态。
- 仅单页使用的组件优先放到对应页面目录下，不提前上提。

### `src/composables/`

- Composition API 复用逻辑目录。
- 推荐按“一个可复用行为一个文件”组织，如分页、查询、开关状态。
- 通过 `index.ts` 统一导出可减少引用路径分散。

### `src/constants/`

- 项目常量目录。
- 放置应用级常量、i18n 常量、本地存储键名等稳定配置。
- 常量应按用途拆分，避免在业务代码中出现魔法值。

### `src/directive/`

- 全局自定义指令目录。
- 适合沉淀权限控制、行为增强等可复用指令能力。
- 指令逻辑应保持轻量，并在插件注册阶段统一挂载。

### `src/i18n/`

- 国际化资源与实例目录。
- 文案文件按语言拆分，实例初始化逻辑集中在入口文件。
- 新增文案时应同步多语言键，避免运行时缺失翻译。

### `src/layout/`

- 后台布局壳层目录。
- 负责侧边栏、顶部栏与内容区等通用页面骨架。
- 业务页面通过路由插槽注入，避免在布局层实现业务逻辑。

### `src/plugins/`

- 全局插件注册目录。
- 用于集中安装第三方插件与项目级扩展能力。
- 插件初始化顺序应稳定，避免副作用依赖顺序问题。

### `src/router/`

- 路由管理目录。
- `routes.ts` 维护路由配置，`guards.ts` 维护导航守卫，`index.ts` 创建路由实例。
- 路由层聚焦导航与权限，不承担页面数据处理职责。

### `src/store/`

- Pinia 状态管理目录。
- `modules/` 下按领域拆分状态，`index.ts` 负责统一创建与导出。
- 状态模块应保持边界清晰，跨模块依赖通过 action 协作而非直接耦合。

### `src/types/`

- 全局 TypeScript 类型目录。
- 按业务域拆分类型定义，并通过 `index.ts` 统一导出。
- 接口响应类型与页面模型类型应清晰区分，减少类型歧义。

### `src/utils/`

- 通用工具函数目录。
- 适合放置无状态、可复用的纯函数能力。
- 工具函数应保持职责单一，避免混入业务侧状态读取。

### `src/views/`

- 页面目录，按模块分组组织页面文件。
- 推荐路径结构为 `src/views/<module>/<page>/index.vue`。
- 页面私有组件优先放在当前页面目录的 `components/` 下。

### `src/App.vue`

- 应用根组件。
- 负责承载路由视图与全局容器层结构。
- 通常保持轻量，避免堆积业务逻辑。

### `src/main.ts`

- 应用启动入口文件。
- 负责创建应用实例并注册路由、状态、插件与全局能力。
- 启动链路变更应优先在此文件集中管理。

### `src/vite-env.d.ts`

- Vite 环境类型声明文件。
- 用于补充 `import.meta.env` 与静态资源导入的类型支持。
- 新增全局环境变量类型时应同步维护该文件。

## 目录约定

- 页面优先放在 `src/views/<module>/<page>/index.vue`，页面私有组件就近放在当前页面目录下。
- API 按业务域拆分到 `src/api/<domain>/`，页面不要直接散写请求逻辑。
- 可复用组件统一沉淀到 `src/components/`，只服务单页的组件不要提前上提。
- 共享类型集中放在 `src/types/`，通过 `src/types/index.ts` 对外导出。
- 全局样式和设计变量统一维护在 `src/assets/styles/`，避免页面内重复定义基础样式。
- 布局、路由、状态分别固定在 `src/layout/`、`src/router/`、`src/store/`，职责不要混放。
- `docs/` 只放文档和计划记录，结构调整后要同步更新本文件。
