import './styles/index.less'
import 'floating-vue/style.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'

import App from './App.vue'
import SectionBlock from './components/SectionBlock.vue'

import router from './router'
import { getTheme, applyTheme } from './util/theme'

applyTheme(getTheme())

const app = createApp(App)

app.component('SectionBlock', SectionBlock)

// app.use(createPinia())
app.use(router).use(FloatingVue)

app.mount('#app')
