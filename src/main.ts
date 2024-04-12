import './styles/index.less'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import SectionBlock from './components/SectionBlock.vue'

import router from './router'

const app = createApp(App)

app.component('SectionBlock', SectionBlock)

// app.use(createPinia())
app.use(router)

app.mount('#app')
