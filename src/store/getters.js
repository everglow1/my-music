/**
 * getter 可以认为是 store 的计算属性 依赖被缓存
 * 一般而已，常用getter取state的数据
 **/ 

const getters = {

}
export const singer = function (state) {
  return state.singer
}