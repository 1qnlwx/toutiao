import Vue from 'vue'
import Vuex from 'vuex'
import { getLocal, setLocal } from './store'
Vue.use(Vuex)
const tokenKey = 'userToken'
export default new Vuex.Store({
  state: {
    // count: 0,
    // user: {
    //   name: '张三'
    // }
    user: getLocal(tokenKey)
  },
  getters: {},
  mutations: {
    // changeCount(state) {
    //   state.count++
    // },
    // changeName(state) {
    //   state.user.name = '李四'
    // },
    // changeCount2(state, num) {
    //   state.count += num
    // }
    setUser(state, user) {
      state.user = user
      setLocal(tokenKey, user)
      // localStorage.setItem(tokenKey, JSON.stringify(user))
    }
  },
  actions: {},
  modules: {}
})
