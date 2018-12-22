/**
 * 推荐api
 */
import jsonp from 'common/js/jsonp.js'
import {commonParam, options} from './config.js'
import axios from 'axios'

// 获取轮播图的数据
 export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  let data = Object.assign({}, commonParam, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
 }

// 获取歌单列表数据，node服务器配置代理
export function getSongList() {
  let url = '/api/getDiscList'

  let data = Object.assign({}, commonParam, {
    picmid: 1,
    rnd: Math.random(),
    platform: 'h5',
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 20
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}