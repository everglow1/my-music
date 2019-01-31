import * as types from './mutation-types.js'

// mutations 是唯一能提交state状态的。
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default mutations