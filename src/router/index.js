import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * fixedRoutes 固定路由存放
 */
const fixedRoutes = [
  {
    path: '/home',
    name: 'home',
    rediect: '/home',
    component: () => import('@/page/home'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login'),
    hidden: true
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/page/layout'),
    hidden: true
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: fixedRoutes
})
