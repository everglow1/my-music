<template>
  <div class="singer">
    <listview :data="singers"></listview>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer.js'
import {ERR_OK} from 'api/config.js'
import Singer from 'common/js/singer.js'
import Listview from 'base/listview/listview.vue'


const HOT_NAME = '热门'
const HOT_LIST_LENGTH = 10
export default {
  name: 'singer',
  data() {
    return {
      singers: []
    }
  },
  components: {
    Listview
  },
  created() {
    this._getSingerList()
  },
  methods: {
    // 获取歌手数据
    _getSingerList() {
      getSingerList().then((res) => {
        if(res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data && res.data.list || [])
          // 传入所有歌手数据
          // this._normalizeSinger(this.singers)
        }
      })
    },
    // 重新整合歌手数据
    _normalizeSinger(singers) {
      // 数据结构
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 生成热门和字母数据结构
      singers.forEach((item, index) => {
        // 热门
        if(index < HOT_LIST_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 字母
        let key = item.Findex
        if(!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      // 处理map数据，变为有序列表
      let hot = []
      let ret = []
      for(let key in map) {
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if(val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 排序字母数据, a~z
      ret.sort((a, b) => {
        return a.title.charCodeAt[0] - b.title.charCodeAt[0]
      })
      console.log('map', map)
      hot.concat(ret)
      console.log('hot', hot.concat(ret))
      return hot.concat(ret)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
