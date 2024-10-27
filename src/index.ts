import * as vue from 'vue'
import FloatingVue from 'floating-vue'

import App from '@/App.vue'

import BreakLine from '@/components/BreakLine.vue'
import ContentSection from '@/components/ContentSection.vue'

import * as util from '@/util'
import router from '@/router'

import 'floating-vue/style.css'
import '@/css/index.less'

declare const window: CustomWindow

const app = vue.createApp(App)

window.__internals__ = {
  App,
  app,

  router,
  util,

  vue,
}

/* eslint-disable-next-line vue/multi-word-component-names */
app.component('brk', BreakLine).component('content-section', ContentSection).use(router).use(FloatingVue).mount('#app')
