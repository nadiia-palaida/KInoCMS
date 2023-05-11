import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {loadLocaleMessages, setupI18n, SUPPORT_LOCALES} from '../plugins/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      name: 'home',
      component: HomeView
    },
/*    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

const i18n = setupI18n()
const locale = 'ua'

router.beforeEach(async (to, from, next) => {
  const paramsLocale = to.params.locale

  if (!SUPPORT_LOCALES.includes(paramsLocale)) {
    return next(`/${locale}`)
  }

  await loadLocaleMessages(i18n, paramsLocale)

  i18n.global.locale.value = paramsLocale

  return next()
})

export default router
