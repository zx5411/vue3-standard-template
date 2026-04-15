<template>
  <section class="exception card">
    <h1>404</h1>
    <p>{{ t('page.notFound') }}</p>
    <RouterLink to="/index">{{ t('common.back') }}</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.exception {
  max-width: 520px;
  margin: 80px auto;
  padding: 32px;
}
</style>
