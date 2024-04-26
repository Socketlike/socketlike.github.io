import HomeView from '@/views/HomeView.vue'

export default [
  {
    path: '/:path(.*)*',
    name: '404',
    component: () => import('@/views/NotFoundView.vue'),
  },
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
  {
    path: '/replugged',
    name: 'replugged',
    component: () => import('@/views/RepluggedView.vue'),
  },
  {
    path: '/shelter',
    name: 'shelter',
    component: () => import('@/views/ShelterView.vue'),
  },
  {
    path: '/shelter/plugins/:plugin',
    name: 'shelter plugins',
    component: () => import('@/views/ShelterPluginsView.vue'),
  },
]

export const hidden = ['/test/styling', '/:path(.*)*', '/shelter/plugins/:plugin']
