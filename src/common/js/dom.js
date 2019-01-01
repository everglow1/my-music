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

// 获取值 el:dom对象  Name: 名称  val: 值   设置值
export function getData(el, name, val) {
  let prefix = 'data-'
  name = prefix + name
  // 常用设计技巧， get ，set
  if(val) {
    return el.setAttribute(name, val)  // 设置dom属性名，属性值
  } else {
    return el.getAttribute(name)      // 获取dom对象属性名，属性值
  }
}