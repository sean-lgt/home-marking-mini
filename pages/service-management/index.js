// pages/service-management/index.js
import Service from "../../models/service";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    formData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const service = JSON.parse(options.service);
    this.init(service)
  },
  async handleSubmit(event) {
    const modalRes = await wx.showModal({
      title: '提示',
      content: '是否确认修改该服务？提交后会重新进入审核状态',
      showCancel: true,
    })

    if (!modalRes.confirm) {
      return
    }
    wx.showLoading({ title: '正在提交...', mask: true })

    try {
      await Service.updateService(this.data.id, event.detail.formData)
    } finally {
      wx.hideLoading()
    }

    wx.redirectTo({ url: `/pages/publisher-success/index?type=${event.detail.formData.type}` })

  },

  init(service) {
    const formData = {
      type: service.type,
      title: service.title,
      category_id: service.category.id,
      description: service.description,
      designated_place: service.designated_place,
      cover_image: service.cover_image,
      begin_date: service.begin_date,
      end_date: service.end_date,
      price: service.price,
    }

    this.setData({
      id: service.id,
      formData
    })
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