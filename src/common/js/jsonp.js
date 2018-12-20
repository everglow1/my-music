/**
 * jsonp封装 jsonp(url, opts, fn)
 */
import originJsonp from 'jsonp'    // 引入jsonp插件

export default function jsonp(url, data, option) {
  url = url + (url.indexOf('?') < 0 ? '?' : '&' ) + param(data)
  return new Promise ((resolve, reject) =>{
    originJsonp(url, option,(err, data) => {  // err, data 为jsonp回掉函数传的参数， err为空即为成功
      if(!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 转化json对象为url格式
function param(data) {
  let url = '';
  for(let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url = url + `&${k}=${encodeURIComponent(value)}`;     // 拼接url
  }
  return url ? url.substring(1) : '';
}