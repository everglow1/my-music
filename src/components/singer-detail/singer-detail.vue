<template>
  <transition name="slide">
    <music-list :bgImage="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list.vue'

import { mapGetters } from 'vuex'

import { getSingerDetail } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import { createSong, Song, processSongsUrl } from 'common/js/song.js'

export default {
  name: 'singer-detail',
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getDetail()
  },
  computed: {
    // 获取state的歌手信息
    ...mapGetters([
      'singer'
    ]),
    title() {
      console.log('singername', this.singer.name)
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
  },
  methods: {
    // 获取歌手详情数据
    _getDetail() {
      // 在详情页刷新时，返回歌手列表页。
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      // 根据歌手id获取歌手详情数据
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            this.songs = songs
            console.log('songs', this.songs)
          })
          // this.songs = this._normalizeSongs(res.data.list)
          console.log('songs', this.songs)
        }
      })
    },
    // 整合歌手详情数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item   // 对象解构赋值， musicData = item.musicData
        if(musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
