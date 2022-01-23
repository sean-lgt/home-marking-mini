// pages/My/My.js
import Service from "../../models/service"
import Order from "../../models/order"
import roleType from "../../enum/role-type"
// TODO: 动态设置tabbar
import serviceType from "../../enum/service-type"
import Token from "../../models/token"
import { appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid } from "../../config/grid";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '点击授权登录',
      avatar: ''
    },
    //状态展示
    appointWithMeStatus: null,
    myAppointStatus: null,
    provideServiceStatus: null,
    seekServiceStatus: null,

    //宫格配置
    // 预约我的宫格
    appointWithMeGrid: appointWithMeGrid,
    // 我的预约宫格
    myProvideGird: myProvideGird,
    // 在提供宫格
    myAppointGrid: myAppointGrid,
    // 正在找宫格
    mySeekGrid: mySeekGrid

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    const unreadCount = wx.getStorageSync("unread-count");
    //TODO:动态设置tabbar
    const res = await Token.verifyToken()
    if (res.valid) {
      const userInfo = wx.getStorageSync("userInfo")
      this.setData({
        'userInfo.nickname': userInfo.nickName,
        'userInfo.avatar': userInfo.avatar
      })
      this._getOrderStatus()
      this._getServiceStatus()
    }
  },

  // 获取订单状态
  async _getOrderStatus() {
    const appointWithMeStatus = Order.getOrderStatus(roleType.PUBLISHER)
    const myAppointStatus = Order.getOrderStatus(roleType.CONSUMER)

    this.setData({
      provideServiceStatus: await provideServiceStatus,
      seekServiceStatus: await seekServiceStatus
    })
  },
  // 获取服务状态
  async _getServiceStatus() {
    const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE);
    const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK);
    this.setData({
      provideServiceStatus: await provideServiceStatus,
      seekServiceStatus: await seekServiceStatus
    })
  },

  // 点击登录
  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },

  handleNavToMyOrder(event) {
    const cell = event.detail.cell
    if (!('status' in cell)) {
      wx.navigateTo({
        url: `pages/refund-list/index?role=${cell.role}`,
      })
      return false
    }
    wx.navigateTo({
      url: `pages/my-order/index?role=${cell.role}&status=${cell.status}`,
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