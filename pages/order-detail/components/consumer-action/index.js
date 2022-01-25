// pages/order-detail/components/consumer-action/index.js
import behavior from "../behavior"

Component({
  behaviors: [behavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击支付
    handlePay(event) {
      this.triggerEvent('pay')
    },
    // 点击退款
    handleRefund() {
      this.triggerEvent('refund')
    },
    // 点击评价
    handleRating() {
      this.triggerEvent('rating')
    }
  }
})