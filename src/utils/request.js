/**
 * @description 封装axios请求
 */
import axios from 'axios'
// 超时时间
const timeout = 6000
const baseURL = 'http://ttapi.research.itcast.cn/'
// 设置post请求头
axios.defaults.headers['Content-Type'] = 'application/json'
// 创建axios实例
const request = axios.create({
  timeout,
  baseURL
})

// 导出实例
export default request
