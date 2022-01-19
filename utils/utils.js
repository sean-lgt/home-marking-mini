/**
 * @description: 节流函数
 * @return {*}
 * @param {Function} callback 需要被节流的函数
 * @param {Number} duration 距离上次执行超过多少毫秒才会执行被节流函数
 */
function throttle(callback, duration = 500) {
  // 最后执行函数时的时间戳
  let lastTime = 0
  // 闭包 -> 函数中嵌套函数并返回
  return function() {
    // 获取当前时间戳
    const now = new Date().getTime()
    //判断当前时间距离上一次执行函数的时间是否超过了duration设定的毫秒数
    if (now - lastTime >= duration) { //超过了
      //因为需要再page中this.setData 所以需要借助call改变this指向
      //利用call() 方法 实现保留原函数的this指向，利用JavaScript的arguments对象实现动态接受参数
      callback.call(this, ...arguments)
      //更新最后执行函数的时间戳
      lastTime = now;
    }
    // 没超过就啥也不干
  }
}

/**
 * @description: 获取事件回调函数的自定义属性
 * @return {*}
 * @param {*} event
 * @param {*} target
 */
function getDataSet(event, target) {
  return event.currentTarget.dataset[target]
}
/**
 * @description: 获取自定义组件事件参数
 * @return {*}
 * @param {*} event
 * @param {*} target
 */
function getEventParam(event, target) {
  return event.detail[target]
}

export { throttle, getDataSet, getEventParam }