# Vue3 Standard Template

A simplified Vue 3 admin template that follows a RuoYi-style directory layout.

## Quick Start

```bash
npm install
npm run dev
```

## 项目结构

本模板沿用 RuoYi 风格的目录组织方式。详细说明仍保留在
[docs/project-structure.md](./docs/project-structure.md)，这里同步保留一份，便于快速查阅。

结构要点：

- 页面入口统一放在 `src/views/<module>/<page>/index.vue`
- `src/api/<domain>` 按业务域拆分接口与请求封装
- `src/components/<Name>` 存放跨页面复用组件
- `src/types` 集中维护共享 TypeScript 类型
- `src/layout`、`src/router`、`src/store` 分别承载布局、路由和状态职责
- `docs` 用于存放项目文档和计划记录

### 目录树

```text
vue3-standard-template/                         # 项目根目录
|-- dist/                                       # Vite 构建输出目录，执行 build 后生成
|-- docs/                                       # 项目文档目录
|   |-- project-structure.md                    # 当前项目目录结构说明
|   `-- superpowers/                            # 开发过程中的计划与记录
|       `-- plans/                              # 任务计划文档
|           |-- 2026-04-15-lite-admin-template.md  # 轻量后台模板实现计划
|           `-- 2026-04-15-pms-navigation-expansion.md # 商品模块导航扩展计划
|-- node_modules/                               # npm 安装的依赖目录，通常不手工维护
|-- public/                                     # 不参与打包、构建时原样拷贝的静态资源
|   `-- logo.svg                                # 项目 Logo
|-- src/                                        # 业务源码根目录
|   |-- api/                                    # 接口请求层，统一收口 mock/HTTP 请求
|   |   |-- pms/                                # 商品模块相关接口
|   |   |   |-- brand.ts                        # 品牌管理 mock 接口
|   |   |   |-- category.ts                     # 商品分类 mock 接口
|   |   |   |-- product-type.ts                 # 商品类型 mock 接口
|   |   |   `-- product.ts                      # 商品列表、详情、编辑相关 mock 接口
|   |   |-- dashboard/                          # 首页仪表盘接口目录
|   |   |   `-- index.ts                        # 首页仪表盘 mock 接口
|   |   `-- request.ts                          # 请求实例与通用请求封装
|   |-- assets/                                 # 参与打包的静态资源
|   |   |-- images/                             # 图片资源目录
|   |   |   `-- empty-state.svg                 # 空状态插图
|   |   `-- styles/                             # 全局样式与样式变量
|   |       |-- index.scss                      # 全局样式入口
|   |       `-- variables.scss                  # 主题色、阴影等样式变量
|   |-- components/                             # 跨页面复用组件
|   |   |-- BaseChart/                          # ECharts 基础图表容器
|   |   |   `-- index.vue                       # 图表组件入口
|   |   |-- BaseDialog/                         # 通用弹窗组件
|   |   |   `-- index.vue                       # 弹窗组件入口
|   |   |-- Pagination/                         # 分页组件
|   |   |   |-- index.spec.ts                   # 分页组件测试示例
|   |   |   `-- index.vue                       # 分页组件入口
|   |   |-- RightToolbar/                       # 列表页右侧工具栏
|   |   |   `-- index.vue                       # 工具栏组件入口
|   |   |-- SearchToolbar/                      # 列表查询工具栏
|   |   |   `-- index.vue                       # 搜索工具栏组件入口
|   |   `-- StatusSwitch/                       # 通用状态开关组件
|   |       `-- index.vue                       # 开关组件入口
|   |-- composables/                            # Composition API 复用逻辑
|   |   |-- index.ts                            # composables 统一导出
|   |   |-- usePagination.ts                    # 分页状态封装
|   |   |-- useTableQuery.ts                    # 列表查询状态封装
|   |   `-- useToggle.ts                        # 布尔开关状态封装
|   |-- constants/                              # 项目常量
|   |   |-- app.ts                              # 应用标题等常量
|   |   |-- i18n.ts                             # 国际化常量
|   |   |-- index.ts                            # 常量统一导出
|   |   `-- storage.ts                          # 本地存储键名常量
|   |-- directive/                              # 全局自定义指令
|   |   `-- permission.ts                       # 权限指令
|   |-- i18n/                                   # 国际化文案与实例
|   |   |-- en.ts                               # 英文文案
|   |   |-- index.ts                            # i18n 实例入口
|   |   `-- zh-cn.ts                            # 中文文案
|   |-- layout/                                 # 后台布局壳
|   |   `-- index.vue                           # 侧边栏、顶栏、内容区布局
|   |-- plugins/                                # 插件注册入口
|   |   `-- index.ts                            # 全局插件安装逻辑
|   |-- router/                                 # 路由管理
|   |   |-- guards.ts                           # 路由守卫
|   |   |-- index.ts                            # 路由实例入口
|   |   `-- routes.ts                           # 静态路由与异步路由配置
|   |-- store/                                  # Pinia 状态管理
|   |   |-- modules/                            # 按领域拆分的 store 模块
|   |   |   |-- app.ts                          # 应用级状态
|   |   |   |-- permission.spec.ts              # 权限模块测试示例
|   |   |   |-- permission.ts                   # 权限状态
|   |   |   `-- user.ts                         # 用户状态
|   |   `-- index.ts                            # Pinia 入口
|   |-- types/                                  # 全局共享 TypeScript 类型
|   |   |-- api.ts                              # 通用接口响应类型
|   |   |-- brand.ts                            # 品牌模块类型
|   |   |-- category.ts                         # 分类模块类型
|   |   |-- common.ts                           # 通用业务类型
|   |   |-- dashboard.ts                        # 仪表盘类型
|   |   |-- index.ts                            # 类型统一导出
|   |   |-- product-type.ts                     # 商品类型模块类型
|   |   `-- product.ts                          # 商品模块类型
|   |-- utils/                                  # 通用工具函数
|   |   |-- auth.ts                             # 鉴权与 token 工具
|   |   `-- date.ts                             # 日期处理工具
|   |-- views/                                  # 页面目录
|   |   |-- error/                              # 错误页
|   |   |   |-- 401.vue                         # 401 页面
|   |   |   `-- 404.vue                         # 404 页面
|   |   |-- pms/                                # 商品后台模块页面
|   |   |   |-- brand/                          # 品牌管理页
|   |   |   |   `-- index.vue                   # 品牌管理入口页
|   |   |   |-- product/                        # 商品列表与详情页
|   |   |   |   |-- components/                 # 商品页私有组件
|   |   |   |   |   `-- ProductEditDialog.vue   # 商品编辑弹窗
|   |   |   |   |-- detail.vue                  # 商品详情页
|   |   |   |   `-- index.vue                   # 商品列表页
|   |   |   |-- product-category/               # 商品分类页
|   |   |   |   `-- index.vue                   # 商品分类入口页
|   |   |   |-- product-create/                 # 添加商品页
|   |   |   |   `-- index.vue                   # 添加商品入口页
|   |   |   `-- product-type/                   # 商品类型页
|   |   |       `-- index.vue                   # 商品类型入口页
|   |   |-- index.vue                           # 首页仪表盘
|   |   `-- login.vue                           # 登录页
|   |-- App.vue                                 # 应用根组件
|   |-- main.ts                                 # 应用启动入口
|   `-- vite-env.d.ts                           # Vite 类型声明
|-- .env.development                            # 开发环境变量
|-- .env.production                             # 生产环境变量
|-- .gitignore                                  # Git 忽略规则
|-- index.html                                  # Vite HTML 模板入口
|-- package-lock.json                           # npm 依赖锁定文件
|-- package.json                                # 项目依赖与脚本配置
|-- README.md                                   # 项目说明
|-- tsconfig.json                               # TypeScript 配置
|-- vite.config.ts                              # Vite 配置
`-- vitest.config.ts                            # Vitest 配置
```
