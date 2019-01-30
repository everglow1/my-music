import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend.vue'
import rank from 'components/rank/rank.vue'
import singer from 'components/singer/singer.vue'
import search from 'components/search/search.vue'
import singerdetail from 'components/singer-detail/singer-detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/rank',
      component: rank
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',  // 以id为变量，传入不同的id，跳到不同的子路由
          component: singerdetail
        }
      ]
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/',
      redirect: '/recommend'
    }
  ]
})
