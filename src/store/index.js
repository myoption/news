import Vue from 'vue'
import Vuex from 'vuex'
import * as storage from '../utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'token'

export default new Vuex.Store({
  state: {
    user: storage.getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, user) {
      // 需要转化
      storage.setItem(TOKEN_KEY, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
