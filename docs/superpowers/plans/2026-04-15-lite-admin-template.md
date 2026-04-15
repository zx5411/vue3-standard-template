# Lite Admin Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a lightweight e-commerce-style admin template with a dashboard, product list, product detail page, and edit dialog using local mock data.

**Architecture:** Keep the current Vue 3 + Vite structure and expand it with route-driven pages under `src/views`, mock APIs under `src/api`, and focused page-local components for product-specific UI. Use `echarts` for the dashboard while keeping all list, detail, and dialog interactions in plain Vue + SCSS.

**Tech Stack:** Vue 3, TypeScript, Vue Router, Pinia, Vue I18n, SCSS, ECharts

---

### Task 1: Route and Layout Shell

**Files:**
- Modify: `src/router/routes.ts`
- Modify: `src/layout/index.vue`
- Modify: `src/assets/styles/index.scss`
- Modify: `src/assets/styles/variables.scss`

- [ ] Add `/` and fallback redirects to `/index`.
- [ ] Register `/pms/product` and `/pms/product/:id` routes under the main layout.
- [ ] Replace the current sidebar shell with a compact admin layout that includes grouped navigation and a top content header.
- [ ] Extend shared styling tokens and utility classes needed by the new dashboard and product pages.

### Task 2: Dashboard Module

**Files:**
- Create: `src/api/dashboard.ts`
- Create: `src/components/BaseChart/index.vue`
- Modify: `src/views/index.vue`
- Modify: `src/types/index.ts`
- Create: `src/types/dashboard.ts`

- [ ] Add mock dashboard summary, trend, category, and alert data APIs.
- [ ] Add a reusable ECharts wrapper component for responsive charts.
- [ ] Replace the current placeholder home page with KPI cards, a trend chart, a category chart, and an operations list.

### Task 3: Product Domain Types and Mock API

**Files:**
- Create: `src/api/pms/product.ts`
- Create: `src/types/product.ts`
- Modify: `src/types/index.ts`

- [ ] Define product list, detail, filter, metric, and timeline types.
- [ ] Add in-memory product records with list, detail, and update helpers.
- [ ] Keep the API surface async so it can be swapped with a backend later without page rewrites.

### Task 4: Product List and Edit Dialog

**Files:**
- Create: `src/views/pms/product/index.vue`
- Create: `src/views/pms/product/components/ProductEditDialog.vue`

- [ ] Build the product list page with filter cards, summary chips, action buttons, a data table, and pagination.
- [ ] Add row actions for viewing details and editing products.
- [ ] Add a local edit dialog for product name, price, stock, status, and tags.

### Task 5: Product Detail Page and Copy Updates

**Files:**
- Create: `src/views/pms/product/detail.vue`
- Modify: `src/i18n/en.ts`
- Modify: `src/i18n/zh-cn.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] Build a product detail page with overview cards, descriptive sections, sales snapshots, and an operation timeline.
- [ ] Add route and page copy for the new dashboard and product module in both locales.
- [ ] Add the chart dependency required by the dashboard.

### Task 6: Verification

**Files:**
- No source file changes required unless fixes are needed.

- [ ] Run dependency installation for the new chart package.
- [ ] Run `npm run build`.
- [ ] Fix any build issues before closing the task.
