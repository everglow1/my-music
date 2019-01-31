/**
 * vuex入口文件,负责vuex初始化，暴露出去。
 */

import Vue from 'vue'
import Vuex from 'vuex'
// vuex下的一个工具，每次mutations改变state时，会console一个日志
import createLogger from 'vuex/dist/logger'

import state from './state.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'

// 注册vuex
Vue.use(Vuex)

// 报错处理，假如不是mutation修改的store，回报错。 （不建议在线上环境使用）
const debug = process.env.NODE_ENV !== 'production'

// 输出一个Vuex的实例（有点像单例模式）
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  // 辅助开发的一些调试啥的
  strict: debug,
  plugins: debug ? [createLogger()] : []
})