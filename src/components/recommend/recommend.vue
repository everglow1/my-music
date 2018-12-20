<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="(item, index) in recommends" :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'

import Slider from 'base/slider/slider.vue'

export default {
  name: 'recommend',
  data() {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  created() {
    this. _getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if(res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 150
        // padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
</style>
