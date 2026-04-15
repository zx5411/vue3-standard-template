import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, FALLBACK_LOCALE } from '@/constants'
import en from '@/i18n/en'
import zhCN from '@/i18n/zh-cn'

export const messages = {
  en,
  'zh-CN': zhCN,
}

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages,
})

export default i18n
