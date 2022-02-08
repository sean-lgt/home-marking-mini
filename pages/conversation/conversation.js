// pages/conversation/conversation.js
import { timStore } from "../../store/tim"
import { createStoreBindings } from "mobx-miniprogram-bindings"
import Tim from "../../models/tim"

const tim = Tim.getInstance() //实例化

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null,
    targetUserId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
      actions: ['pushMessage', 'resetMessage']
    })
    this.setData({
      service: options.service ? JSON.parse(options.service) : null,
      targetUserId: options.targetUserId,
    })

  },
  // 发送消息
  async handleSendMessage(event) {
    const { type, content } = event.detail
    const message = tim.createMessage(type, content, this.data.targetUserId)
    this.pushMessage(message)
    await tim.sendMessage(message)
    this.getOpenerEventChannel().emit('sendMessage');
  },
  handleToLogin() {
    wx.navigateTo({ url: '/pages/login/index', })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.resetMessage()
    this.storeBindings.destroyStoreBindings()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log('🚀【】', );
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