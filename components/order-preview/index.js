// components/order-preview/index.js
import orderStatus from "../../enum/order-status";
import roleType from "../../enum/role-type";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideTop: {
      type: Boolean,
      value: false
    },
    role: Number,
    order: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    OrderStatus: orderStatus,
    RoleType: roleType
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 前往服务详情
    handleNavToServiceDetail() {
      const serviceId = this.data.order.service_snap.id
      wx.navigateTo({ url: `/pages/service-detail/index?id=${serviceId}` })
    },
  }
})