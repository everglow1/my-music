<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

import { getSingerDetail } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'

export default {
  name: 'singer-detail',
  created() {
    this._getDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail() {
      // 在详情页刷新时，返回歌手列表页。
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      // 根据歌手id获取歌手详情数据
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK) {
          console.log('detail', res.data.list)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
