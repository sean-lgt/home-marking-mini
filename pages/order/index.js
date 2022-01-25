// pages/order/index.js
import Order from "../../models/order"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null, //服务
    address: null, //地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const service = JSON.parse(options.service)
    this.setData({
      service
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userInfo = wx.getStorageSync("userInfo")
    if (userInfo.id === this.data.service.publisher.id) {
      wx.redirectTo({
        url: '/pages/service-detail/index'
      })
    }
  },

  // 选择地址
  async handleSelectAddress() {
    let address
    try {
      address = await wx.chooseAddress();
    } catch (e) {
      address = null
    }
    this.setData({
      address
    })
  },

  //预约订单服务
  async handleOrder() {
    if (this.data.service.designated_place && !this.data.address) {
      await wx.showModal({
        title: '错误',
        content: '该服务必须指定服务地点',
        showCancel: false
      })
    }
    const modalRes = await wx.showModal({
      title: '注意',
      content: '是否确认预约该服务',
      showCancel: true
    })

    if (!modalRes.confirm) return
    const order = {
      service_id: this.data.service.id,
      address: this.data.address
    }

    wx.showLoding({
      title: '正在预约中...',
      mask: true
    })

    try {
      await Order.createOrder(order)
      wx.navigateTo({
        url: "/pages/order-success/index"
      })
      wx.hideLoading()
    } catch (e) {
      wx.hideLoading()
    }

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