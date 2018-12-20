/**
 * dom操作
 */

// 添加类名 el:dom对象  className: 类名
export function addClass(el, className) {
  if(hasClass(el, className)) {
    return
  } else {
    let newClass = el.className.split('')
    newClass.push(className)
    el.className = newClass.join('')
  }
}

// 判断是否有类名
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s\$)');
  return reg.test(el.className)
}