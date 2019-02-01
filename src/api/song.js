// 添加获取 UID
import { getUid } from 'common/js/uid'
import {commonParam, options} from './config.js'
import axios from 'axios'

// 添加获取 URL
export function getSongsUrl(songs) {
  const url = '/api/getPurlUrl'
  let mids = []
  let types = []

songs.forEach(song => {
  mids.push(song.mid)
  types.push(0)
})
 
const data = Object.assign({}, commonParam, {
  g_tk: 5381,
  format: 'json',
  platform: 'h5',
  needNewCode: 1,
  uin: 0
})
 
return axios.post(url, {
  comm: data,
  url_mid: genUrlMid(mids, types)
})
.then((res) => {
    return Promise.resolve(res.data)
  })
}
 
// 添加获取 URL MID
function genUrlMid(mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: "CgiGetVkey",
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}