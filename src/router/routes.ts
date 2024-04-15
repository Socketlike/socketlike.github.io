import HomeView from '@/views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/test/styling',
    name: 'styling',
    component: () => import('@/views/StylingTestView.vue'),
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('@/views/ConfigView.vue'),
  },
]

export const hidden = ['/test/styling']
