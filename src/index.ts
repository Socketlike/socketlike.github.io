import * as vue from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'

import App from '@/App.vue'

import BreakLine from '@/components/BreakLine.vue'
import ContentSection from '@/components/ContentSection.vue'

import * as util from '@/util'
import * as stores from '@/stores'
import router from '@/router'

import 'floating-vue/style.css'
import '@/css/index.less'

declare const window: CustomWindow

const app = vue.createApp(App)
const pinia = createPinia()

const appDOM = document.getElementById('app')

window.__internals__ = {
  App,
  app,

  router,
  util,
  stores,

  vue,
}

app
  .component('Brk', BreakLine)
  .component('content-section', ContentSection)
  .use(router)
  .use(pinia)
  .use(FloatingVue)
  .mount('#app')

const themeStore = stores.theme.useThemeStore()

vue.watchEffect(() => {
  appDOM?.setAttribute?.('data-theme', themeStore.theme as string)

  document.documentElement.setAttribute('data-theme', themeStore.theme as string)
})

vue.watchEffect(() => {
  if (themeStore.reduceMotion) {
    appDOM?.setAttribute?.('data-reduce-motion', '')
    document.documentElement.setAttribute('data-reduce-motion', '')
  } else {
    appDOM?.removeAttribute?.('data-reduce-motion')
    document.documentElement.removeAttribute('data-reduce-motion')
  }
})

const resizeListener = () => {
  const clientSize = document.documentElement.getBoundingClientRect()

  document.documentElement.style.setProperty(
    '--omori-background-animation-time',
    `${(Math.max(Number(clientSize?.width) || 0, 512) / 512) * 5 || 5}s`,
  )
}

addEventListener('resize', resizeListener)

resizeListener()
