import { createRouter, createWebHistory, type RouteRecordNormalized } from 'vue-router'

import Home from '@/views/Home.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '404',
      path: '/:void(.*)*',
      component: () => import('@/views/404.vue'),
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
      name: 'util',
      path: '/util',
      component: () => import('@/views/Util.vue'),
    },
  ].sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB)),
})

export const filter = (route: RouteRecordNormalized): boolean => {
  return route.name !== '404'
}
