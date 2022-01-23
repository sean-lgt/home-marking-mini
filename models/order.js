import Http from "../utils/http";
import Base from "./base";

class Order extends Base {
  /**
   * @description: 获取订单状态
   * @return {*}
   * @param {*} role 角色
   */
  static async getOrderStatus(role) {
    return Http.request({
      url: `v1/order.count?role${role}`
    })
  }
  /**
   * @description: 创建订单
   * @return {*}
   * @param {*} serviceId 服务id
   * @param {*} address 地址
   */
  static async createOrder(serviceId, address) {
    return Http.request({
      url: 'v1/order',
      data: {
        service_id: serviceId,
        address
      },
      method: "POST"
    })
  }
  /**
   * @description: 更改订单状态
   * @return {*}
   * @param {*} orderId 订单id
   * @param {*} action  更改值
   */
  static async updateOrderStatus(orderId, action) {
    return Http.request({
      url: `v1/order/${orderId}`,
      data: {
        action
      },
      method: "POST"
    })
  }
  /**
   * @description: 获取订单相亲
   * @return {*}
   * @param {*} orderId 订单id
   */
  static async getOrderById(orderId) {
    return await Http.request({
      url: `v1/order/${orderId}`
    })
  }
  /**
   * @description: 获取我的订单列表
   * @return {*}
   * @param {*} role 角色
   * @param {*} status 状态
   */
  async getMyOrderList(role, status) {
    if (!this.hasMoreData) {
      return this.data
    }
    const orderList = await Http.request({
      url: 'v1/order/my',
      data: {
        page: this.page,
        count: this.count,
        role,
        status
      }
    });

    this.data = this.data.concat(orderList.data)
    this.hasMoreData = this.page !== orderList.last_page
    this.page++
    return this.data
  }

}

export default Order