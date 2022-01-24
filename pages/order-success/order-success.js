// pages/order-success/order-success.js
import orderStatus from "../../enum/order-status"
import roleType from "../../enum/role-type"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //检查订单的状态
  handleCheckOrder() {
    wx.redirectTo({
      url: `/pages/my-order/index?role=${roleType.CONSUMER}&status=${orderStatus.UNAPPROVED}`
    })
  },
  handleNavToHome: function(event) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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