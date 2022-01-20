// index.js
import Service from "../../models/service";
import Category from "../../models/category";
import { throttle } from "../../utils/utils";
import { setTabBarBadge } from "../../utils/wx";
// 获取应用实例
const app = getApp()
const serviceModel = new Service()
Page({
  data: {
    loading: true, //是否展示骨架屏组件
    tabs: ['所有服务', '在提供', '正在找'], //tab栏配置
    serviceList: [], //服务列表
    currentCategoryId: 0,
    multiple: 0, //是否多选
    categoryList: [], //分类列表
    currentTabIndex: 0,
    showStatus: false, //展示状态
  },
  // 页面第一次加载
  onLoad: async function(options) {
    const categoryList = await Category.getCategoryListWithAll();
    this.setData({
      categoryList,
      multiple: 2
    })
    await this._getInitServiceList(this.data.currentTabIndex)
    this.setData({
      loading: false
    })

  },

  // 页面每次进入都执行
  onShow: function() {
    const unreadCount = wx.getStorageSync('unread-count')
    // setTabBarBadge(unreadCount)
  },
  //改变tab栏事件
  handleTabChange(event) {
    const index = event.detail.index
    this._getInitServiceList(index, this.data.currentCategoryId)
  },
  //切换分类栏
  handleChangeCategory: throttle(function(event) {
    const categoryId = event.currentTarget.dataset.id
    if (categoryId === this.data.currentCategoryId) {
      // 点击的id等于当前的id 则return
      return false
    }
    this._getInitServiceList(this.data.currentTabIndex, categoryId)
  }),
  // 点击具体某项
  handleSelect(event) {
    console.log("点击了具体某项")
  },

  /**
   * @description: 获取服务列表数据
   * @return {*}
   * @param {*} currentTabIndex tab栏激活项
   * @param {*} categoryId  分类id
   */
  async _getInitServiceList(currentTabIndex = 0, categoryId = 0) {
    this.setData({
      currentTabIndex: currentTabIndex,
      currentCategoryId: categoryId,
      showStatus: false
    })
    const serviceList = await serviceModel.reset().getServiceList(currentTabIndex, categoryId);

    this.setData({
      showStatus: !serviceList.length,
      serviceList
    })
  },
  handleNavRemark: function() {
    wx.navigateTo({
      url: "/pages/remark/index"
    })
  },
  // 下拉更新
  onPullDownRefresh: function() {
    this._getInitServiceList(this.data.currentTabIndex, this.data.currentCategoryId)
    wx.stopPullDownRefresh()
  },
  // 滚动触底加载下一页数据
  onReachBottom: async function() {
    if (!serviceModel.hasMoreData) {
      return
    }
    const serviceList = await serviceModel.getServiceList(this.data.currentTabIndex, this.data.currentCategoryId);
    this.setData({
      serviceList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})