// pages/Publish/Publish.js
import Service from "../../models/service"
import { setTabBarBadge } from "../../utils/wx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      tye: null,
      title: '',
      category_id: null,
      description: '',
      designated_place: false,
      begin_data: '',
      end_date: '',
      price: '',
      cover_image: null
    }
  },
  // 点击提交
  async handleSubmit(event) {
    const modalRes = await wx.showModal({
      title: '提示',
      content: '是否确认申请发布该服务？',
      showCancel: true,
    })

    if (!modalRes.confirm) {
      return
    }
    wx.showLoading({ title: '正在发布...', mask: true })

    try {
      await Service.publishService(event.detail.formData)
      wx.hideLoading()
      this.resetForm()
      wx.navigateTo({ url: `/pages/publisher-success/index?type=${event.detail.formData.type}` })
    } catch (e) {
      console.log('🚀【出现错误】', e);
      wx.hideLoading()
    }
  },
  // 重置表单
  resetForm() {
    this.setData({
      formData: {
        type: null,
        title: '',
        category_id: null,
        description: '',
        designated_place: false,
        begin_date: '',
        end_date: '',
        price: '',
        coverImage: null
      },
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
    // TODO:需要setTabBar
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