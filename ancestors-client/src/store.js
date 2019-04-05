import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

// 储存初始化数据
const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {}   // 存储用户信息
}

//  对State 里面的数据二次处理（对数据进行过滤类似filter的作用）
// 比如State返回的为一个对象，我们想取对象中一个键的值用这个方法
const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user
}

//  对数据进行计算的方法全部写在里面（类似computed） 
// 在页面中触发时使用this.$store.commit('mutationName') 触发Mutations方法改变state的值
const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  }
}

// 处理Mutations中已经写好的方法 其直接触发方式是 this.$store.dispatch(actionName)
const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  // 清除状态
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
