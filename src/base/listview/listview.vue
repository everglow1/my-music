<template>
  <scroll class="listview" 
    :data="data" 
    ref="listView" 
    :listenScroll="listenScroll" 
    :probeType="probeType"
    @scroll="scroll">
    <!-- 左侧歌手 -->
    <ul>
      <li class="list-group" v-for="(group, index) in data" :key="index" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" class="list-group-item" v-for="(item, i) in group.items" :key="i">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 右侧字母菜单 .stop.prevent:阻止冒泡和浏览器的原生滚动-->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, i) in shortcutList" 
          :key="i" 
          :data-index="i"
          :class="{'current': currentIndex === i}"
        >{{item}}</li>
      </ul>
    </div>
    <!-- 固定fixed头 -->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <!-- loading -->
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import Loading from 'base/loading/load.vue'
import { getData } from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18    // 单个字母的高度
const TITLE_HEIGHT = 30
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
  data() {
    return {
      // 观察的y值和索引
      scrollY: -1,
      currentIndex: 0,
      diff: -1  // 头部固定标题对比值
    }
  },
  components: {
    Scroll,
    Loading
  },
  created() {
    // 存放touch值
    this.touch = {}
    // 是否监听滚动事件
    this.listenScroll = true
    // 列表高度
    this.listHeight = [],
    // 实时监听
    this.probeType = 3
  },
  computed: {
    shortcutList() {
      let letters = this.data.map((group) => {
        return group.title.substr(0, 1)
      })
      return letters
    },
    // 固定头部
    fixedTitle() {
      if(this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    // 传递所点击的歌手
    selectItem(item) {
      this.$emit('select', item)
    },
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
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta                   // 移动的索引值
      this._scrollTo(anchorIndex)
    },
    // 滚动时
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      // 点击空白区域时
      if(!index && index !==0) {
        return
      }
      // 滚动到最顶部
      if(index < 0) {
        index = 0
      } else if(index > this.listHeight.length - 2) {  // 滚动到最底部
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listView.scrollToElement(this.$refs.listgroup[index], 0)   // 滚动到对应索引值的分组
    },
    // 计算列表高度区间
    _calculateHeight() {
      this.listHeight = []
      let list = this.$refs.listgroup
      let height = 0
      this.listHeight.push(height)
      for(let i = 0; i < list.length; i++) {
        let item = list[i]
        height = height + item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    // 当data变化时并且dom渲染后，计算高度
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 500)
    },
    // 监听scollY
    scrollY(newY) {
      // 当滚动到顶部  newY>0
      if(newY >= 0) {
        this.currentIndex = 0
        return
      }
      // 当滚动到中间
      let listHeight = this.listHeight
      for(let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if(-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，-newY大于最后一个元素的上限。
      this.currentIndex = listHeight.length - 2
    },
    // 固定标题偏移
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT ) ? newVal - TITLE_HEIGHT : 0
      if(this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px, 0)`
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
        &.current
          color $color-theme
    .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
