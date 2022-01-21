import Http from "../utils/http";
import Token from "./token"

class User {
  /**
   * @description: 登录
   * @return {*}
   */
  static async login() {
    const token = await Token.getToken()
    // 将数据存缓存
    wx.setStorageSync("token", token);
    wx.setStorageSync("isLogin", true);
  }
  /**
   * @description: 从本地缓存中获取用户信息
   * @return {*}
   */
  static getUserInfoByLocal() {
    return wx.getStorageSync("userInfo");
  }
  /**
   * @description:获取用户信息 
   * @return {*}
   */
  static async getUserInfo() {
    const userInfo = await Http.request({ url: 'v1/user' })
    if (userInfo) {
      return userInfo
    } else {
      return null
    }
  }
  /**
   * @description: 获取用户签名
   * @return {*}
   */
  static async getUserSign() {
    return await Http.request({
      url: 'v1/user/sign'
    })
  }
  /**
   * @description: 更新用户信息
   * @return {*}
   * @param {*} data 数据
   */
  static async updateUserInfo(data) {
    const res = await Http.request({
      url: "v1/user",
      data: {
        nickname: data.nickname,
        avatar: data.avatar,
        gender: data.gender
      },
      method: 'PUT'
    })
    // 将用户信息存缓存
    wx.setStorageSync("userInfo", res)
  }
}

export default User