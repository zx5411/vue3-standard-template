<template>
  <section class="dashboard">
    <article class="card dashboard__hero">
      <p class="dashboard__eyebrow">{{ t('route.dashboard') }}</p>
      <h1>{{ t('app.title') }}</h1>
      <p>{{ t('page.dashboardDesc') }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.dashboard__hero {
  padding: 24px;
}

.dashboard__eyebrow {
  margin: 0 0 8px;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
}
</style>
