import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth-token'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

// 钩子函数(前置执行)
router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 页面标题
      document.title = getPageTitle(to.meta.title)
      // 获取已经登陆用户的信息
      const hasRoles = store.getters.routes && store.getters.routes.length > 0
      console.log(store.getters.routes)
      // 判断用户权限
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 备注: 角色必须是数组 ! 例: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('GetInfo')
          // const roles = []
          // 通过角色生成允许访问的路由
          const accessRoutes = await store.dispatch('GenerateRoutes')
          // 动态添加路由
          router.addRoutes(accessRoutes)
          console.log('router', router)
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
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

// 钩子函数(后置执行)
router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
