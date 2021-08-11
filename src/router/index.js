import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './login'
import home from './home'
import workbench from './workbench'
import appMarket from './appmarket'
import eduResource from './eduresource'
import news from './news'
import { IS_AUTHORIZED } from '../utils/types'

Vue.use(VueRouter)

const routes = [
  ...login,
  ...home,
  ...workbench,
  ...appMarket,
  ...eduResource,
  ...news
]

const router = new VueRouter({
  routes
})
// 导航守卫 拦截页面
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem(IS_AUTHORIZED)
  if (to.name !== 'Login' && !isLogin) next({ name: 'Login' })
  else next()
})
export default router
