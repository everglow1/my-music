<template>
  <scroll class="listview" :data="data" ref="listView">
    <!-- 左侧歌手 -->
    <ul>
      <li class="list-group" v-for="(group, index) in data" :key="index" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, i) in group.items" :key="i">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 右侧字母菜单 .stop.prevent:阻止冒泡和浏览器的原生滚动-->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, i) in shortcutList" :key="i" :data-index="i">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import { getData } from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18    // 单个字母的高度
export default {
  name: 'listview',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll
  },
  created() {
    // 存放touch值
    this.touch = {

    }
  },
  computed: {
    shortcutList() {
      let letters = this.data.map((group) => {
        return group.title.substr(0, 1)
      })
      return letters
    }
  },
  methods: {
    // 触摸开始, 点击
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')   // 获取索引值
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY  // 记录y轴值
      this.touch.anchorIndex = anchorIndex    // 记录当前点击的索引
      // console.log('e', e)
      this._scrollTo(anchorIndex)
    },
    // 滚动事件
    onShortcutTouchMove(e) {
      // console.log('move', e)
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0    // y轴的移动量  | 0(向下取整)
      console.log('delta', delta)
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta                   // 移动的索引值
      console.log('anchorIndex', anchorIndex)
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      this.$refs.listView.scrollToElement(this.$refs.listgroup[index], 0)   // 滚动到对应索引值的分组
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
</style>
