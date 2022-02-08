// pages/service-detail/index.js

import Rating from "../../models/rating"
import Service from "../../models/service"
import ServiceStatus from "../../enum/service-status"
import ServiceAction from "../../enum/service-action"
import User from "../../models/user"
import serviceType from "../../enum/service-type"
import { getEventParam } from "../../utils/utils"

const ratingModel = new Rating() //实例化

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ServiceStatus, //服务状态
    ServiceAction,
    serviceType,
    isPublisher: false, //是不是服务的所有者
    id: null,
    service: null,
    ratingList: [],
    noRefresh: false, //是否需要重新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.data.id = options.id
    await this.getService(this.data.id)
    await this._getServiceRatingList()
    this._checkRole()
  },
  // 获取服务详情
  async getService(serviceId) {
    const service = await Service.getServiceById(serviceId)
    this.setData({
      service
    })
  },
  // 获取评价列表
  async _getServiceRatingList() {
    const ratingList = await ratingModel.reset().getRatingListByServiceId(this.data.service.id)
    this.setData({
      ratingList
    })
  },
  // 更改服务状态
  async handleUpdateServiceStatus(event) {
    const action = getEventParam(event, 'action')
    // 弹出提示框操作
    const content = this._generateModalContent(action)
    const modalRes = await wx.showModal({
      title: '注意',
      content,
      showCancel: true
    })
    if (!modalRes.confirm) {
      // 如果不是点击确定
      return false
    }
    await Service.updateServiceStatus(this.data.id, action)
    await this.getService(this.data.id)
  },

  // 修改服务
  handleUpdateService() {
    wx.navigateTo({
      url: `/pages/service-management/index?service=${JSON.stringify(this.data.service)}`
    })
  },
  // 立即聊天
  handleChat() {
    wx.navigateTo({
      url: `/pages/conversation/index?targetUserId=${this.data.service.publisher.id}&service=${JSON.stringify(this.data.service)}`
    })
  },
  // 点击支付
  handleOrder() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: "/pages/login/index",
        //页面事件 页面间通信接口，用于监听被打开页面发送到当前页面的数据。
        events: {
          // 登录页通知事件
          login: () => {
            this._checkRole() // 检查角色
          }
        }
      });
      return false
    }
    const service = JSON.stringify(this.data.service)
    wx.navigateTo({
      url: `pages/order/index?service=${service}`
    })
  },

  //检查角色身份
  _checkRole() {
    const userInfo = User.getUserInfoByLocal(); //从缓存中拿
    if (userInfo && userInfo.id === this.data.service.publisher.id) {
      // 是发布服务的所有人
      this.setData({
        isPublisher: true
      })
    }
  },
  // 显示二次确认框
  _generateModalContent(action) {
    let content
    switch (action) {
      case serviceAction.PAUSE:
        content = '暂停后服务状态变为“待发布”，' +
          '可在个人中心操作重新发布上线，' +
          '是否确认暂停发布该服务？'
        break;
      case serviceAction.PUBLISH:
        content = '发布后即可在广场页面中被浏览到，是否确认发布？'
        break;
      case serviceAction.CANCEL:
        content = '取消后不可恢复，需要重新发布并提交审核；' +
          '已关联该服务的订单且订单状态正在进行中的，仍需正常履约；' +
          '是否确认取消该服务？'
        break;
    }

    return content
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if (!ratingModel.hasMoreData) {
      return
    }
    const ratingList = await ratingModel.getRatingListByServiceId(this.data.id);
    this.setData({
      ratingList
    })
  },
  // 预览图片
  handlePreview() {
    this.data.noRefresh = true
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})