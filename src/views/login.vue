<template>
  <section class="login-page">
    <div class="login-page__panel card">
      <p class="login-page__eyebrow">RuoYi Style Lite</p>
      <h1>{{ t('route.login') }}</h1>
      <p>{{ t('page.loginDesc') }}</p>
      <RouterLink to="/index">{{ t('route.dashboard') }}</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.login-page {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
}

.login-page__panel {
  width: min(420px, 100%);
  padding: 28px;
}

.login-page__eyebrow {
  margin: 0 0 8px;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
}
</style>
