// 封装请求库
import APIConfig from "../config/api";
// 将微信API转成Promise
import { wxToPromise } from "./wx";
// 错误信息映射
import exceptionMessage from '../config/exception-message';
// 使用全局全局状态
//导入user模型
import User from "../models/user"

class Http {
  /**
   * @description: 封装请求方法
   * @return {*}
   * @param {*} url 请求的路径
   * @param {*} data 请求的数据
   * @param {*} method 请求的方法
   * @param {*} refetch 请求失败时是否需要再次调用,先登录
   */
  static async request({ url, data, method = 'GET', refetch = true }) {
    let res
    try {
      res = await wxToPromise('request', {
        url: `${APIConfig.baseUrl}/${url}`,
        data,
        method,
        // 设置请求头
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        }
      })
    } catch (e) {
      // 代码逻辑异常、无网络、请求超时会走这里
      console.log("错误", e)
      Http._showError(-1)
      throw new Error(e.errMsg)
    }

    // 如果http请求状态码小于400
    if (res.statusCode < 400) {
      return res.data.data //直接返回数据
    }

    if (res.statusCode === 401) {
      wx.getStorageSync('isLogin', false) //存缓存，判断是否已经登录了


      // 获取接口的状态码
      if (res.data.error_code === 10001) {
        if (Http.isReady()) { //是否已经初始化了
          await Http.logout() // 退出
        }
        wx.navigateTo({
          url: '/pages/login/index',
        });
        throw Error("请求未携带令牌")
      }

      // 是否需要再次调用接口
      if (refetch) {
        return await Http._refetch({ url, data, method, refetch })
      }
      // 如果已经初始化
      if (Http.isReady()) {
        await Http.logout()
      }

    }
    // 弹窗展示错误信息
    this._showError(res.data.error_code, res.data.message)

    // 抛出错误信息
    throw new Error(typeof res.data.message === 'object' ? Object.values(res.data.message).join(";") : res.data.message)
  }
  /**
   * @description: 请求出现错误时，重置刷新接口，一般用于更新token
   * @return {*}
   * @param {*} data 
   */
  static async _refetch(data) {
    try {
      await User.login()
    } catch (error) {
      console.log('🚀【refetch-login失败】', error);
    }
    data.refetch = false //如果登录后再次请求失败则不刷新
    return await Http.request(data)
  }
  /**
   * @description: 展示错误信息弹窗
   * @return {*}
   * @param {*} errorCode 错误码
   * @param {*} message 错误信息
   */
  static _showError(errorCode, message = '') {
    let title
    const errorMessage = exceptionMessage[errorCode]
    title = errorMessage || message || '系统异常，请稍后再试'
    title = typeof title === 'object' ? Object.values(title).join(";") : title
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 3000,
    });
  }

}

export default Http