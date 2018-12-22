<template>
  <div id="app">
    <v-header></v-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header.vue'
import Tab from 'components/tab/tab.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus">

</style>
