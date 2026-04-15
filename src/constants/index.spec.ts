import { describe, expect, it } from 'vitest'
import i18n from '@/i18n'
import { APP_TITLE, DEFAULT_LOCALE, FALLBACK_LOCALE, ROUTE_WHITE_LIST, TOKEN_KEY } from '@/constants'

describe('constants module', () => {
  it('exports shared application constants', () => {
    expect(APP_TITLE).toBe('Vue3 Standard Template')
    expect(DEFAULT_LOCALE).toBe('zh-CN')
    expect(FALLBACK_LOCALE).toBe('en')
    expect(ROUTE_WHITE_LIST).toContain('/login')
    expect(TOKEN_KEY).toBe('ruoyi-style-lite-token')
  })

  it('keeps i18n default locale aligned with exported constants', () => {
    expect(i18n.global.locale.value).toBe(DEFAULT_LOCALE)
  })
})
