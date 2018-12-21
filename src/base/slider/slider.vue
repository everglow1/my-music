<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{'active': currentIndex == index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom.js'

export default {
  name: 'slider',
  data() {
    return {
      dots: [],   // 定义dots
      currentIndex: 0
    }
  },
  props: {
    // 是否可以循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否可以自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()  // 计算图片列表宽度
      this._initDots()        // 初始化dots
      this._initSlider()      // 初始化
      if(this.autoPlay) {     // 自动播放
        this._play()
      }
    }, 20);
    window.addEventListener('resize', () => {
      console.log('11111')
      setTimeout(() => {
        if(!this.slider) {
          return
        } else {
          this._setSliderWidth(true)
          this.slider.refresh()
        }
      }, 1000);
    })
  },
  methods: {
    // 计算区域宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children   // this.children  直接挂在this上
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth  // 一个图的宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width = width + sliderWidth
      }
      if (this.loop && !isResize) {
        width = width + sliderWidth + sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'   // 整个图列表的宽度
    },
    // 初始化dots数组
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    // 初始化滚动
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
      })
      // 绑定滚动结束事件,赋值给currentIndex
      this.slider.on('scrollEnd', () => {
        let PageIndex = this.slider.getCurrentPage().pageX
        this.currentIndex = PageIndex
        if(this.autoPlay) {       // 滚动完毕后再次调用滚动
          this._play()
        }
        console.log('currentIndex', PageIndex)
      })
    },
    // 自动播放
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()    // next方法
        console.log('sss')
      }, this.interval)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          border-radius: 5px
          background: $color-theme
</style>
