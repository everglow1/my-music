<template>
  <div class="v-header">
    <div class="icon"></div>
    <h1 class="text">Iron Music</h1>
  </div>
</template>

<script>
export default {
  name: 'v-header'
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .v-header
    position relative
    height 44px
    text-align center
    color $color-theme
    font-size 0
    .icon
      display inline-block
      vertical-align top 
      margin-top 6px
      margin-right 6px
      width 30px
      height 30px
      border-radius 50%
      bg-image(default)
      background-size 30px 32px
    .text
      display inline-block
      vertical-align top 
      line-height 44px
      font-size $font-size-large
</style>
