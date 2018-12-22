<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <div class="slider-content">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="(item, index) in songLists" :key="index" class="item">
            <div class="icon">
              <img width="60" height="60" :src="item.imgurl" />
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import {getRecommend, getSongList} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'

import Slider from 'base/slider/slider.vue'

export default {
  name: 'recommend',
  data() {
    return {
      recommends: [],
      songLists: []
    }
  },
  components: {
    Slider
  },
  created() {
    this. _getRecommend()
    this._getSongList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if(res.code === ERR_OK) {
          this.recommends = res && res.data && res.data.slider || []
        }
      })
    },
    _getSongList() {
      getSongList().then((res) => {
        if(res.code === ERR_OK) {
          this.songLists = res && res.data && res.data.list || []
          console.log(this.songLists)
        }
      }).catch((err) => {
        console.log(err)
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
        height: 0
        padding-top: 40%
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
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
</style>
