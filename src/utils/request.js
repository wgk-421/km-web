import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from './auth-token'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.baseURL, // 请求根地址，随环境配置变化
  // withCredentials: true // 跨域请求时发送cookie
  timeout: 3000
})

// 请求(requset)拦截
service.interceptors.request.use(
  // 请求发送之前执行
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Basic' + getToken() // 每条请求头携带token
    }
    return config
  }, error => {
    console.log(error) // 记录日志
    Promise.reject(error)
  })

// 响应(response) 拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // 200 是成功状态
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3000
      })
      // 自定义code判断
      if (res.code === 10001) {
        MessageBox.confirm('用户登录已经失效,选择取消或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消'
        }).then(() => {
          // 清除token信息
          store.dispatch('resetToken').then(() => {
            location.reload()
          })
        })
      }
      /* TODO if (code !== ?) 根据业务，自定义状态判断 */
      return Promise.reject(new Error(res.message || 'error'))
    } else {
      return res
    }
  }, error => {
    console.log('error:%s', error) // 打印错误日志
    Message({
      message: error.message,
      type: 'error',
      duration: 3000
    })
  }
)
