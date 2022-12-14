import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import config from '@/config/config'
import { Message } from 'element-ui'

var baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = config.development
} else {
  baseURL = config.production
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 300 * 1000, // 请求超时时间
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
  tack_exceptionCheck: true,
  withCredentials: true,
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    return dataAxios
    const { code } = dataAxios
    // // 根据 code 进行判断
    // if (code === undefined) {
    //   // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本\
    //   if (dataAxios.authCode === -99999) {
    //     router.push({
    //       path: '/login'
    //     })
    //   }
    //   return dataAxios
    // } else {
    //   // 有 code 代表这是一个后端接口 可以进行进一步的判断
    //   switch (code) {
    //     case 0:
    //       return dataAxios
    //     case 1:
    //       // [ 示例 ] code === 1 代表没有错误
    //       return dataAxios
    //     case 2:
    //       // [ 示例 ] code === 1 代表没有错误
    //       return dataAxios
    //     case -1:
    //       // [ 示例 ] code === 1 代表没有错误
    //       return dataAxios
    //     case -99999:
    //       router.push({
    //         path: '/login'
    //       })
    //       break
    //   }
    // }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    Message.error(JSON.parse(JSON.stringify(error)).message)
    return Promise.reject(error)
  }
)

export default service
