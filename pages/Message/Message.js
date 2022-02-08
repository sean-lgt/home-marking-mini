// pages/Message/Message.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { timStore } from "../../store/tim";
import { setTabBarBadge } from "../../utils/wx";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sdkReady: false,
    conversationList: [],
    updateConversationList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady', 'conversationList'],
      actions: ['getConversationList']
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.updateConversationList) {
      this.getConversationList()
      this.data.updateConversationList = false
    }
    const unreadCount = wx.getStorageSync('unread-count')
    setTabBarBadge(unreadCount)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.storeBindings.destroyStoreBindings()
  },
  // 点击前往聊天
  async handleTapConversation(event) {
    this.data.updateConversationList = true
    const item = event.currentTarget.dataset.item
    const user = item.userProfile
    wx.navigateTo({
      url: `/pages/conversation/index?targetUserId=${user.userID}&service=`,
      events: {
        sendMessage: () => {
          this.data.updateConversationList = false
        }
      }
    })
  },
  // 前往登录
  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
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