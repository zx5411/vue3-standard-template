<template>
  <div class="layout">
    <aside class="layout__sidebar card">
      <div class="layout__brand">
        <img src="/logo.svg" alt="logo" class="layout__logo" />
        <strong>{{ t('app.title') }}</strong>
      </div>
      <nav class="layout__nav">
        <RouterLink to="/index">{{ t('route.dashboard') }}</RouterLink>
        <RouterLink to="/system/user">{{ t('route.systemUser') }}</RouterLink>
      </nav>
    </aside>
    <main class="layout__content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
  min-height: 100vh;
  padding: 20px;
}

.layout__sidebar {
  padding: 20px;
}

.layout__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.layout__logo {
  width: 40px;
  height: 40px;
}

.layout__nav {
  display: grid;
  gap: 10px;
}

.layout__nav a {
  padding: 10px 12px;
  border-radius: 12px;
}

.layout__nav a.router-link-active {
  background: #ccfbf1;
  color: #0f766e;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
