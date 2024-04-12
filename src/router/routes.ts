import HomeView from '@/views/HomeView.vue'
import FormattingGuideView from '@/views/FormattingGuideVIew.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/formatting-guide',
    name: 'formatting guide',
    component: FormattingGuideView,
  },
]

export const hidden = ['/formatting-guide']
