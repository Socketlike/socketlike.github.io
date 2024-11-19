import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue'

const routes: RouteRecordRaw[] = []

routes.push(
  {
    name: '404',
    path: '/:void(.*)*',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true },
  },

  {
    name: 'home',
    path: '/',
    component: Home,
  },

  {
    name: 'projects',
    path: '/projects',
    component: () => import('@/views/Projects/View.vue'),
  },

  {
    name: 'fun',
    path: '/fun',
    component: () => import('@/views/Fun/Index.vue'),
  },

  {
    name: 'wterm',
    path: '/fun/wterm',
    component: () => import('@/views/Fun/WTerm.vue'),
    meta: {
      childOf: () => routes.find(({ name }) => name === 'fun'),
    },
  },

  {
    name: 'options',
    path: '/options',
    component: () => import('@/views/Options.vue'),
  },
)

routes.sort(({ name: nameA }, { name: nameB }) => (nameA as string).localeCompare(nameB as string))

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
