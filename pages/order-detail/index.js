// pages/order-detail/index.js
import orderStatus from "../../enum/order-status"
import roleType from "../../enum/role-type"
import orderAction from "../../enum/order-action"
import Order from "../../models/order"
import Rating from "../../models/rating"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    role: null,
    rating: null,
    OrderStatus: orderStatus,
    RoleType: roleType
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const order = JSON.parse(options.order)
    const role = parseInt(options.role)
    this.setData({
      order,
      role
    })
    if (order.status === OrderStatus.COMPLETED) {
      this._getRating(order.id)
    }
  },
  // 获取评价内容
  async _getRating(orderId) {
    const rating = await Rating.getRatingByOrderId(orderId)
    this.setData({
      rating
    })
  },
  // 获取订单内容
  async _getOrderById() {
    const order = await Order.getOrderById(this.data.order.id)
    this.setData(({
      order
    }))
  },
  // 进入聊天
  handleToChat: function(event) {
    const { targetUserId } = event.detail
    wx.navigateTo({
      url: `/pages/conversation/index?targetUserId=${targetUserId}&service=${JSON.stringify(this.data.order.service_snap)}`
    })
  },
  handleRefund() {
    // 跳转售后服务页面
    wx.navigateTo({
      url: `/pages/refund/index?order=${JSON.stringify(this.data.order)}`
    })
  },
  handleRating() {
    // 跳转评价页面
    wx.navigateTo({
      url: `/pages/rating/index?order=${JSON.stringify(this.data.order)}`,
      // 评价页面传递过来的事件
      events: {
        rating: () => {
          this._getOrderById()
          this._getRating(this.data.order.id)
        }
      },
    })
  },
  // 点击支付
  async handlePay() {
    const modalRes = await wx.showModal({
      title: '注意',
      content: `您即将支付该服务费用：￥${this.data.order.price}元，是否确认支付`,
      showCancel: true,
    })
    if (!modalRes.confirm) return
    //模拟支付后订单状态改变
    await Order.updateOrderStatus(this.data.order.id, orderAction.PAY)
    //跳转到支付成功页面
    wx.navigateTo({
      url: '/pages/pay-success/index'
    })
    this._getOrderById()
  },

  // 更新订单状态
  async handleUpdateOrderStatus(event) {
    const action = event.detail.action
    const content = this._generateModalContent(action)
    const modalRes = await wx.showModal({
      title: '注意',
      content,
      showCancel: true
    })
    if (!modalRes.confirm) return
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    try {
      await Order.updateOrderStatus(this.data.order.id, action)
    } catch (e) {
      return
    }
    wx.hideLoading()
    this._getOrderById()
  },
  // 弹窗内容
  _generateModalContent(action) {
    let content
    switch (action) {
      case orderAction.AGREE:
        content = '是否确认同意本次服务预约，同意后不可以撤销。'
        break;
      case orderAction.DENY:
        content = '是否确认拒绝本次服务预约，同意后不可以撤销。'
        break;
      case orderAction.CONFIRM:
        content = '是否确认本次服务已完成？'
        break;
      case orderAction.CANCEL:
        content = '是否确认取消本次服务订单，确认取消后不可以撤销。'
        break;
    }

    return content
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