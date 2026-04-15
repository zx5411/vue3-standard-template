<template>
  <div class="layout">
    <aside class="layout__sidebar">
      <div class="layout__brand">
        <div class="layout__logo-wrap">
          <img src="/logo.svg" alt="logo" class="layout__logo" />
        </div>
        <div>
          <strong>{{ t('app.title') }}</strong>
          <p>{{ t('page.workspaceSubtitle') }}</p>
        </div>
      </div>

      <nav class="layout__nav">
        <template v-for="section in menuSections" :key="section.key">
          <RouterLink
            v-if="!section.children && section.to"
            :to="section.to"
            :class="['layout__menu', { 'layout__menu--active': currentMenuKey === section.menuKey }]"
          >
            <span class="layout__menu-icon" v-html="getSectionIcon(section.icon)" />
            <span class="layout__menu-text">{{ section.label }}</span>
          </RouterLink>

          <section v-else class="layout__menu-group">
            <button
              type="button"
              :class="['layout__menu', { 'layout__menu--open': isSectionOpen(section.key) }]"
              @click="toggleSection(section.key)"
            >
              <span class="layout__menu-icon" v-html="getSectionIcon(section.icon)" />
              <span class="layout__menu-text">{{ section.label }}</span>
              <span class="layout__menu-arrow">{{ isSectionOpen(section.key) ? '-' : '+' }}</span>
            </button>

            <div v-if="isSectionOpen(section.key)" class="layout__submenu">
              <RouterLink
                v-for="item in section.children"
                :key="item.menuKey"
                :to="item.to"
                :class="['layout__submenu-link', { 'layout__submenu-link--active': currentMenuKey === item.menuKey }]"
              >
                <span class="layout__submenu-dot" />
                <span>{{ item.label }}</span>
              </RouterLink>
            </div>
          </section>
        </template>
      </nav>
    </aside>

    <main class="layout__main">
      <header class="layout__header">
        <div class="layout__header-left">
          <button type="button" class="layout__trigger" aria-label="menu">
            <span />
            <span />
            <span />
          </button>
          <nav class="layout__breadcrumb">
            <span v-for="(item, index) in breadcrumbs" :key="`${item}-${index}`" class="layout__crumb">
              <strong v-if="index === breadcrumbs.length - 1">{{ item }}</strong>
              <span v-else>{{ item }}</span>
            </span>
          </nav>
        </div>

        <div class="layout__user">
          <div class="layout__avatar">AD</div>
          <div class="layout__user-meta">
            <strong>Admin</strong>
            <small>{{ t('page.headerStatus') }}</small>
          </div>
        </div>
      </header>

      <section class="layout__content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

interface MenuItem {
  key: string
  label: string
  to: string
  menuKey: string
}

interface MenuSection {
  key: string
  label: string
  icon: 'home' | 'product'
  to?: string
  menuKey?: string
  children?: MenuItem[]
}

const { t } = useI18n()
const route = useRoute()
const expandedSections = ref(['product'])

const currentMenuKey = computed(() => {
  const match = [...route.matched].reverse().find((item) => typeof item.meta.menuKey === 'string')
  return (match?.meta.menuKey as string | undefined) || 'dashboard'
})

const breadcrumbs = computed(() => {
  const match = [...route.matched].reverse().find((item) => Array.isArray(item.meta.breadcrumbKeys))
  const keys = (match?.meta.breadcrumbKeys as string[] | undefined) || ['route.dashboard']
  return keys.map((key) => t(key))
})

const menuSections = computed<MenuSection[]>(() => [
  {
    key: 'home',
    label: t('route.dashboard'),
    icon: 'home',
    to: '/index',
    menuKey: 'dashboard',
  },
  {
    key: 'product',
    label: t('nav.merchandise'),
    icon: 'product',
    children: [
      { to: '/pms/product', label: t('route.productList'), menuKey: 'product-list', key: 'product-list' },
      { to: '/pms/product/create', label: t('route.productCreate'), menuKey: 'product-create', key: 'product-create' },
      { to: '/pms/product/category', label: t('route.productCategory'), menuKey: 'product-category', key: 'product-category' },
      { to: '/pms/product/type', label: t('route.productType'), menuKey: 'product-type', key: 'product-type' },
      { to: '/pms/product/brand', label: t('route.brandManage'), menuKey: 'brand-manage', key: 'brand-manage' },
    ],
  },
])

function isSectionOpen(key: string) {
  return expandedSections.value.includes(key) || route.path.startsWith('/pms')
}

function toggleSection(key: string) {
  if (expandedSections.value.includes(key)) {
    expandedSections.value = expandedSections.value.filter((item) => item !== key)
    return
  }
  expandedSections.value = [...expandedSections.value, key]
}

function getSectionIcon(kind: 'home' | 'product') {
  if (kind === 'home') {
    return `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 11.5L12 5l8 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 10.5V19h10v-8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  }

  return `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 8.5h15v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.layout__sidebar {
  width: 250px;
  padding: 16px 0;
  background: linear-gradient(180deg, #263445 0%, #1f2d3d 100%);
  color: #c0c4cc;
}

.layout__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.layout__brand strong {
  display: block;
  color: #fff;
  font-size: 17px;
}

.layout__brand p {
  margin: 4px 0 0;
  color: #9aa7b5;
  font-size: 12px;
}

.layout__logo-wrap {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
}

.layout__logo {
  width: 28px;
  height: 28px;
}

.layout__nav {
  padding: 12px 0 0;
}

.layout__menu,
.layout__submenu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 48px;
  padding: 0 20px;
  border: 0;
  background: transparent;
  color: inherit;
  text-decoration: none;
}

.layout__menu:hover,
.layout__submenu-link:hover {
  background: rgba(64, 158, 255, 0.08);
  color: #fff;
}

.layout__menu--active,
.layout__menu--open {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.layout__menu-icon {
  width: 18px;
  height: 18px;
  color: #c0c4cc;
}

.layout__menu--active .layout__menu-icon,
.layout__menu--open .layout__menu-icon {
  color: #fff;
}

.layout__menu-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.layout__menu-text {
  flex: 1;
  font-size: 15px;
  text-align: left;
}

.layout__menu-arrow {
  color: #909399;
  font-size: 14px;
}

.layout__submenu {
  padding: 4px 0 8px;
  background: rgba(0, 0, 0, 0.08);
}

.layout__submenu-link {
  min-height: 44px;
  padding-left: 44px;
  color: #b9c4cf;
  font-size: 14px;
}

.layout__submenu-link--active {
  background: #1f2d3d;
  color: #409eff;
}

.layout__submenu-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.7;
}

.layout__main {
  flex: 1;
  min-width: 0;
}

.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #e4e7ed;
  background: #fff;
}

.layout__header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.layout__trigger {
  display: grid;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
}

.layout__trigger span {
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: #303133;
}

.layout__breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #909399;
  font-size: 14px;
}

.layout__crumb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.layout__crumb::after {
  content: '/';
}

.layout__crumb:last-child {
  color: #303133;
}

.layout__crumb:last-child::after {
  content: '';
}

.layout__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.layout__avatar {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #67c23a, #85ce61);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.layout__user-meta {
  display: grid;
  gap: 2px;
}

.layout__user-meta small {
  color: #909399;
}

.layout__content {
  padding: 20px;
}

@media (max-width: 1100px) {
  .layout {
    flex-direction: column;
  }

  .layout__sidebar {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .layout__header {
    height: auto;
    padding: 16px;
  }

  .layout__header,
  .layout__header-left {
    align-items: flex-start;
    flex-direction: column;
  }

  .layout__content {
    padding: 16px;
  }
}
</style>
