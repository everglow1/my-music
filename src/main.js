// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'     // 通过webpack引入编译
import fastclick from 'fastclick'     // 防止移动端点击300ms的延迟, 可能会拦截点击事件
import VueLazyLoad from 'vue-lazyload'  // vue官方图片懒加载
import { commonParam } from './api/config';

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})
fastclick.attach(document.body)       // 防止移动端点击300ms的延迟
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
