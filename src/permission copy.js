import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 登录信息里面获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect'] // 路由白名单

// 钩子函数(前置执行)
router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 页面标题
  document.title = getPageTitle(to.meta.title)

  // 用户登录token
  const hasToken = getToken()

  // 判断用户是否登录
  if (hasToken) {
    if (to.path === '/login') {
      // 已登录，跳转首页
      next({ path: '/' })
      NProgress.done() // 进度条
    } else {
      // 获取已经登陆用户的信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 判断用户权限
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 备注: 角色必须是数组 ! 例: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('GetInfo')

          // 通过角色生成允许访问的路由
          const accessRoutes = await store.dispatch('GenerateRoutes', roles)

          // 动态添加路由
          router.addRoutes(accessRoutes)

          // replace: true, 清除导航缓存
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('ResetToken')
          Message.error(error || '验证不通过，返回登陆页面重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 无token
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单，不需要重定向
      next()
    } else {
      // 无权限，重新登录
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 钩子函数(后置执行)
router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
