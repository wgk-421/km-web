import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * fixedRoutes 固定路由存放
 */
const fixedRoutes = [
  {
    path: '',
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
  }
]

const createRouter = () => new Router({
  // mode: 'history', //需要后端服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: fixedRoutes
})

const router = createRouter()

// 导出重置路由方法
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 导出路由
export default router
