import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      name: 'epiphanies',
      path: '/epips',
      component: () => import('@/views/Epiphanies.vue'),
    },
  ].sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB)),
})
