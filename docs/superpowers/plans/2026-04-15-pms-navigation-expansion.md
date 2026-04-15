# PMS Navigation Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the admin shell with the reference product-management layout and expand the `pms` module to include list, create, category, type, and brand pages.

**Architecture:** Keep the existing Vue 3 + TypeScript + SCSS stack and extend it with a configuration-driven sidebar, breadcrumb-aware route metadata, and mock `pms` APIs separated by domain. Preserve the current lightweight approach by avoiding any UI library and building the missing admin interactions with focused page components and shared primitives.

**Tech Stack:** Vue 3, TypeScript, Vue Router, Pinia, Vue I18n, SCSS, ECharts

---

### Task 1: Navigation Shell Refresh

**Files:**
- Modify: `src/layout/index.vue`
- Modify: `src/router/routes.ts`
- Modify: `src/assets/styles/index.scss`
- Modify: `src/assets/styles/variables.scss`
- Modify: `src/i18n/en.ts`
- Modify: `src/i18n/zh-cn.ts`

- [ ] Replace the current grouped card sidebar with a compact dark admin sidebar that supports top-level sections and expanded product submenus.
- [ ] Add breadcrumb metadata to routes so the top header can show compact navigation context instead of the current large hero card.
- [ ] Add or adjust shared design tokens and utility classes needed by the denser admin layout.

### Task 2: PMS Domain Data Model

**Files:**
- Modify: `src/types/product.ts`
- Modify: `src/types/index.ts`
- Create: `src/types/category.ts`
- Create: `src/types/product-type.ts`
- Create: `src/types/brand.ts`
- Modify: `src/api/pms/product.ts`
- Create: `src/api/pms/category.ts`
- Create: `src/api/pms/product-type.ts`
- Create: `src/api/pms/brand.ts`

- [ ] Extend product list records to support the denser table fields shown in the reference layout.
- [ ] Add category, type, and brand mock records with async list/update helpers.
- [ ] Keep all APIs local and promise-based so the pages remain backend-ready.

### Task 3: Product List Alignment

**Files:**
- Modify: `src/views/pms/product/index.vue`
- Modify: `src/views/pms/product/components/ProductEditDialog.vue`

- [ ] Rework the product list page into a compact `筛选搜索 + 数据列表` layout.
- [ ] Add product number, brand, publish status, and verify status filters.
- [ ] Update the table to show image/identifier, price + SN, label switches, sort, stock, sales, verify status, and denser actions.

### Task 4: Additional PMS Subpages

**Files:**
- Create: `src/views/pms/product-create/index.vue`
- Create: `src/views/pms/product-category/index.vue`
- Create: `src/views/pms/product-type/index.vue`
- Create: `src/views/pms/brand/index.vue`

- [ ] Build a single-page `添加商品` form with grouped sections for base info, price/inventory, attributes, and publish settings.
- [ ] Build `商品分类` with hierarchical rows, visibility/status toggles, sort, and edit actions.
- [ ] Build `商品类型` with attribute/parameter counts and simple management actions.
- [ ] Build `品牌管理` with brand name, initials, recommend state, sort order, story summary, and actions.

### Task 5: Final Verification

**Files:**
- Modify any of the above only if verification reveals issues.

- [ ] Run `npm.cmd run build`.
- [ ] Fix any type, route, or runtime-facing regressions revealed by the build.
