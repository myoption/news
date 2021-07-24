import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.css'
// 引入UI组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// rem适配 动态设定rem值
import 'amfe-flexible'

// 使用组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
