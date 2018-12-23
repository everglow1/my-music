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
      scroll: {}
    }
  },
  props: {
    // 滚动类型
    probType: {
      type: Number,
      default: 1
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
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 100)
  },
  methods: {
    // 初始化scroll
    _initScroll() {
      if(!this.$refs.wrapper) {
        return
      } else {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probType: this.probType,
          click: this.click
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
    }
  },
  watch: {
    data() {
      console.log('数据改变了')
      setTimeout(() => {
        this.refresh()
      }, 200);
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
