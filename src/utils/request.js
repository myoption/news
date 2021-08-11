/**
 * @description 封装axios请求
 */
import axios from 'axios'
import * as types from './types'
import router from '../router'
// 超时时间
const timeout = 6000
const baseURL = 'http://ttapi.research.itcast.cn/'
// const baseURL = 'http://localhost:4444'
// 设置post请求头
axios.defaults.headers['Content-Type'] = 'application/json'
// 创建axios实例
const request = axios.create({
  timeout,
  baseURL
})
/**
 * @desc 为请求添加token
 */
const addToken = config => {
  const token = localStorage.getItem(types.TOKEN_KEY)
  config.headers.Authorization = `Bearer ${token}`
  return config
}
request.interceptors.request.use(config => {
  return Promise.resolve(config)
    .then(addToken)
})
/**
 * @desc 拦截请求
 * @param {*} response
 * @returns axios response
 */
const checkAuthorization = response => {
  const codes = [401]
  // console.log('response.status', response.status)
  if (codes.includes(response.status)) {
    // 清空已存储的token
    localStorage.removeItem(types.TOKEN_KEY)
    sessionStorage.removeItem(types.IS_AUTHORIZED)
    // 保存当前路由
    sessionStorage.setItem(types.REDIRECT_URL, location.href)
    // 重新登录
    router.push('/login')
  }
  return response
}
request.interceptors.response.use(response => {
  return Promise.resolve(response)
    .then(checkAuthorization)
    // 请求正常 返回数据
    .then(response => response)
})

// 导出实例
export default request
