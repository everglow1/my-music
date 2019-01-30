<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scroll',
  data() {
    return {
    }
  },
  props: {
    // 滚动类型
    probeType: {
      type: Number,
      default: 3
    },
    // 是否点击
    click: {
      type: Boolean,
      default: true
    },
    // 数据变化,
    data: {
      type: Array,
      default: null
    },
    // 是否监听滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 500)
  },
  methods: {
    // 初始化scroll
    _initScroll() {
      if(!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      // 监听滚动事件  pos(位置)
      if(this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
    },
    // better-scroll 的enable方法
    enable() {
      this.scroll && this.scroll.enable()
    },
    // better-scroll 的disenable方法
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 滚动到指定位置
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      this.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
