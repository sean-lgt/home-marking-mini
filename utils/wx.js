//  微信小程序原生API格式化处理


/**
 * @description: 将原生小程序API转成Promise形式
 * @return {*}
 * @param {*} method    api名字
 * @param {*} options 内容
 */
function wxToPromise(method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = resolve //将成功的resolve出去 sucecess变为resolve
    options.fail = err => {
      reject(err)
    }
    wx[method](options)
  })
}

export { wxToPromise }