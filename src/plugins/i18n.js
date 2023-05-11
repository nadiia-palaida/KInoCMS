import {nextTick} from 'vue'
import {createI18n} from 'vue-i18n'

export const SUPPORT_LOCALES = ['ua', 'ru']

export function setupI18n() {
  const i18n = createI18n({
    locale: 'ua',
    fallbackLocale: 'ru',
    legacy: false,
    globalInjection: true
  })

  return i18n
}

export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `../locales/${locale}.json`
    )

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  console.log('  i18n.global',   i18n.global)

  return nextTick()
}