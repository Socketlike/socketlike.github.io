import * as vue from 'vue'
import FloatingVue from 'floating-vue'

import App from '@/App.vue'

import * as util from '@/util'
import router from '@/router'

import '@/css/index.less'

declare const window: CustomWindow

const app = vue.createApp(App)

app.use(router).use(FloatingVue)

app.config.globalProperties.window = window

window.__internals__ = {
  App,
  app,

  router,
  util,

  vue,
}

app.mount('#app')
