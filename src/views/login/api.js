import axios from '../../utils/request'
/**
 * @desc 请求登录的接口
 * @param {*} data
 * @returns
 */
export const logIn = data => axios.post('/app/v1_0/authorizations', JSON.stringify(data))
/**
 * @desc 请求验证码的接口
 * @param {*} data
 * @returns
 */
export const getCode = mobile => axios.get(`/app/v1_0/sms/codes/${mobile}`)
