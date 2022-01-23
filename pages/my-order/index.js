// pages/my-order/index.js
import Order from "../../models/order"
import orderStatus from "../../enum/order-status"
import roleType from "../../enum/role-type"

// 实例化
const orderModel = new Order()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // loading状态配置
    loading: {
      hideTabsLoading: false,
      hideOrderLoading: false
    },
    tabs: ['全部订单', '待同意', '待支付', '待确认', '待评价'],
    currentTabIndex: 0,
    orderList: [],
    orderStatus,
    roleType,
    role: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // status: -1:全部  0：待同意、1:待支付、2：待确认、3：待评价
    // tabs:    0：全部  1：待同意、 2、待支付、 3 待确认 4 待评价
    const status = parseInt(options.status)
    const role = parseInt(options.role)
    //动态设置标题
    wx.setNavigationBarTitle({
      title: role === roleType.PUBLISHER ? '预约我的' : '我的预约'
    });
    this.setData({
      currentTabIndex: status + 1,
      role
    })
    this.data.status = status < 0 ? '' : status
  },

  //点击tab栏
  async handleTabChange(event) {
    const index = event.detail.index
    this.data.status = index < 1 ? '' : index - 1
    this.setData({
      currentTabIndex: index
    })
    await this._getOrderList()
  },
  // 获取订单列表
  async _getOrderList() {
    this.setData({
      'loading.hideOrderLoading': true,
    })
    const orderList = await orderModel.reset().getMyOrderList(this.data.role, this.data.status)
    this.setData({
      ['loading.hideOrderLoading']: true,
      orderList,
    })
  },
  // 点击具体某项
  handleNavDetail(event) {
    const order = event.detail.order
    wx.navigateTo({
      url: `/pages/order-detail/index?role=${this.data.role}&order=${JSON.stringify(order)}`
    })
  },

  handleRefund(event) {
    const order = event.detail.order
    wx.navigateTo({
      url: `/pages/refund/index?order=${JSON.stringify(order)}`
    })
  },

  handleChat(event) {
    const { order } = event.detail
    const targetUserId = order[this.data.role === roleType.PUBLISHER ? 'consumer' : 'publisher'].id

    wx.navigateTo({ url: `/pages/conversation/index?targetUserId=${targetUserId}&service=${JSON.stringify(order.service_snap)}` })
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
    this._getOrderList()
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
  onPullDownRefresh: async function() {
    await this._getOrderList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    if (!orderModel.hasMoreData) {
      return
    }
    const orderList = await orderModel.getMyOrderList(this.data.role, this.data.status);
    this.setData({
      orderList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})