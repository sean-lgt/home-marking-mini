// pages/login/index.js
import User from "../../models/user"
// TODO:引入 mobx-miniprogram-bindings
// TODO:引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // TODO:创建链接
  },
  // 获取用户信息
  async handleUserInfo(event) {
    const res = await wx.getUserInfo({
      desc: '完善用户信息'
    });
    wx.showLoading({ title: '正在授权', mask: true })
    try {
      await User.login()
      await User.updateUserInfo(res.userInfo)
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('login')
      wx.navigateBack()
    } catch (e) {
      wx.showModal({
        title: '注意',
        content: '登录失败，请稍后重试',
        showCancel: false,
      });
      wx.hideLoading()
    }
  },
  //点击返回首页
  handleBackHome() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //TODO:销毁链接
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})