# 项目目录结构

本文档基于当前仓库的实际目录整理，说明每个主要目录的职责、适用场景和维护建议。

## 当前目录树

```text
vue3-standard-template/
├─ dist/
├─ docs/
│  └─ project-structure.md
├─ node_modules/
├─ public/
│  └─ logo.svg
├─ src/
│  ├─ api/
│  │  ├─ system/
│  │  │  └─ user.ts
│  │  └─ request.ts
│  ├─ assets/
│  │  ├─ images/
│  │  │  └─ empty-state.svg
│  │  └─ styles/
│  │     ├─ index.scss
│  │     └─ variables.scss
│  ├─ components/
│  │  ├─ Pagination/
│  │  │  ├─ index.spec.ts
│  │  │  └─ index.vue
│  │  ├─ RightToolbar/
│  │  │  └─ index.vue
│  │  └─ SearchToolbar/
│  │     └─ index.vue
│  ├─ constants/
│  │  ├─ app.ts
│  │  ├─ i18n.ts
│  │  ├─ index.spec.ts
│  │  ├─ index.ts
│  │  └─ storage.ts
│  ├─ directive/
│  │  └─ permission.ts
│  ├─ i18n/
│  │  ├─ en.ts
│  │  ├─ index.ts
│  │  └─ zh-cn.ts
│  ├─ layout/
│  │  └─ index.vue
│  ├─ plugins/
│  │  └─ index.ts
│  ├─ router/
│  │  ├─ guards.ts
│  │  ├─ index.ts
│  │  └─ routes.ts
│  ├─ store/
│  │  ├─ modules/
│  │  │  ├─ app.ts
│  │  │  ├─ permission.spec.ts
│  │  │  ├─ permission.ts
│  │  │  └─ user.ts
│  │  └─ index.ts
│  ├─ utils/
│  │  ├─ auth.ts
│  │  └─ date.ts
│  ├─ views/
│  │  ├─ error/
│  │  │  ├─ 401.vue
│  │  │  └─ 404.vue
│  │  ├─ system/
│  │  │  └─ user/
│  │  │     └─ index.vue
│  │  ├─ index.vue
│  │  └─ login.vue
│  ├─ App.vue
│  ├─ main.ts
│  └─ vite-env.d.ts
├─ .env.development
├─ .env.production
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ vitest.config.ts
```

## 根目录说明

### `dist/`

- 生产构建输出目录。
- 由 `npm run build` 生成，通常不手动修改。
- 用于部署静态站点或交付打包结果。

### `docs/`

- 项目文档目录。
- 适合存放目录说明、开发规范、部署说明、接口约定等文档。
- 当前 `project-structure.md` 就放在这里。

### `node_modules/`

- 项目依赖安装目录。
- 由包管理器自动维护，不纳入业务代码管理。
- 出现异常时通常通过重新安装依赖修复，不直接编辑内部文件。

### `public/`

- 静态资源目录。
- 这里的文件会在构建时原样拷贝到产物中，适合放不需要参与打包处理的资源。
- 例如网站图标、公开访问的图片、第三方静态文件。

### `.env.development`

- 开发环境变量配置。
- 一般用于本地联调时的接口地址、标题、开关配置。

### `.env.production`

- 生产环境变量配置。
- 一般用于线上构建时注入生产环境参数。

### `.gitignore`

- Git 忽略规则配置。
- 用来排除构建产物、依赖目录、本地临时文件等不应提交的内容。

### `index.html`

- Vite 应用入口 HTML 模板。
- 挂载点通常为 `#app`，前端应用会从这里启动。

### `package.json`

- 项目元数据与脚本配置入口。
- 包含依赖声明、`npm scripts`、项目名称和版本信息。

### `package-lock.json`

- 依赖锁定文件。
- 用于保证团队和 CI 安装到一致的依赖版本。

### `tsconfig.json`

- TypeScript 编译配置文件。
- 控制路径别名、类型检查范围、严格模式等行为。

### `vite.config.ts`

- Vite 构建工具配置文件。
- 适合放插件、别名、构建行为、开发服务器等配置。

### `vitest.config.ts`

- Vitest 测试配置文件。
- 用于配置测试环境、别名、全局变量、测试运行方式等。

## `src` 目录说明

### `src/`

- 项目核心源码目录。
- 页面、组件、路由、状态管理、工具函数、样式等主要代码都集中在这里。

### `src/api/`

- 接口访问层目录。
- 按业务域拆分接口文件，负责与后端或 mock 数据交互。
- 不建议在页面组件里直接散写请求逻辑，统一收敛到这里更易维护。

### `src/api/system/`

- 系统管理相关接口目录。
- 当前用于放用户管理相关接口文件。
- 后续可继续扩展角色、菜单、部门等系统模块接口。

### `src/assets/`

- 项目静态资源目录。
- 存放需要参与打包处理的图片、字体、全局样式等资源。
- 与 `public/` 的区别是这里的资源可以被模块化引用。

### `src/assets/images/`

- 图片资源目录。
- 适合放页面插图、空状态图、业务图片等。

### `src/assets/styles/`

- 全局样式目录。
- 存放样式变量、reset、通用类、全局主题配置等。
- 当前 `index.scss` 负责全局样式入口，`variables.scss` 负责样式变量。

### `src/components/`

- 通用组件目录。
- 放跨页面复用的组件，优先沉淀真正可复用的能力。
- 如果组件只服务某一个页面，建议后续下沉到对应业务模块目录，避免这里过度膨胀。

### `src/components/Pagination/`

- 分页组件目录。
- 组件与测试就近放置，便于维护和验证。

### `src/components/RightToolbar/`

- 列表页右侧工具栏组件目录。
- 当前承载刷新、显示/隐藏搜索等交互入口。

### `src/components/SearchToolbar/`

- 列表搜索工具栏组件目录。
- 当前封装了搜索、重置等常见查询栏交互。

### `src/constants/`

- 常量目录。
- 适合放应用标题、存储键名、国际化默认值、白名单等不会频繁变化的共享常量。
- 通过 `index.ts` 统一导出，方便业务侧引用。

### `src/directive/`

- 全局自定义指令目录。
- 适合放权限控制、懒加载、拖拽等需要复用的 DOM 指令。
- 当前包含权限指令实现。

### `src/i18n/`

- 国际化目录。
- 负责创建 i18n 实例并管理多语言文案。
- 当前包含中文、英文语言包，以及国际化入口文件。

### `src/layout/`

- 布局目录。
- 用于放应用的整体骨架，如侧栏、顶栏、内容区容器等。
- 业务页面通常通过 `RouterView` 挂载到这里。

### `src/plugins/`

- 插件注册目录。
- 负责统一安装 Vue 插件、全局能力和启动期扩展逻辑。
- 例如国际化、全局指令、后续可能增加的 UI 库或埋点插件。

### `src/router/`

- 路由管理目录。
- 负责路由实例、路由表、导航守卫等与页面跳转相关的逻辑。
- 当前拆分为 `index.ts`、`routes.ts`、`guards.ts`，职责相对清晰。

### `src/store/`

- 全局状态管理目录。
- 当前使用 Pinia 管理跨页面共享状态。
- `index.ts` 负责创建 store，`modules/` 负责按模块拆分状态。

### `src/store/modules/`

- 状态模块目录。
- 每个文件聚焦一个状态领域，例如应用状态、用户状态、权限状态。
- 对应测试也可以就近放在这里。

### `src/utils/`

- 通用工具函数目录。
- 适合放无副作用或轻副作用的公共方法，例如时间处理、鉴权工具、格式化函数等。
- 这里的函数应尽量保持纯净，避免混入页面级业务逻辑。

### `src/views/`

- 页面目录。
- 按业务域组织页面文件，是路由组件的主要落点。
- 当前采用偏 RuoYi 风格的目录方式，例如 `system/user/index.vue`。

### `src/views/error/`

- 错误页目录。
- 用于承载 401、404 等异常访问页面。

### `src/views/system/`

- 系统管理页面目录。
- 用于收纳系统管理相关业务页面。

### `src/views/system/user/`

- 用户管理页面目录。
- 当前用户列表页放在该目录下，采用 `index.vue` 作为页面入口。

### `src/App.vue`

- 根组件。
- 一般只保留应用级容器能力，例如根级 `RouterView`。

### `src/main.ts`

- 前端应用启动入口。
- 负责创建 Vue 应用、注册路由、状态管理、插件，并最终挂载到页面。

### `src/vite-env.d.ts`

- Vite 类型声明文件。
- 用于补充 `import.meta.env` 等 Vite 相关类型。

## 当前目录组织约定

- 页面放在 `src/views/<业务域>/<页面>/index.vue`，简单页面可直接放在 `src/views/` 下。
- 接口按业务域放在 `src/api/<domain>/` 下，公共请求实例集中在 `src/api/request.ts`。
- 通用组件放在 `src/components/<ComponentName>/` 下，组件测试尽量与组件同目录维护。
- 全局共享状态放在 `src/store/modules/` 下，避免把页面私有状态提升到全局。
- 全局样式与样式变量放在 `src/assets/styles/` 下，避免在页面中重复定义基础设计 token。
- 目录文档发生变化时，应同步更新本文件，确保文档与实际结构一致。
