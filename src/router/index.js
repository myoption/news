import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './login'
import home from './home'
import workbench from './workbench'
import appMarket from './appmarket'
import eduResource from './eduresource'
import news from './news'

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

export default router
