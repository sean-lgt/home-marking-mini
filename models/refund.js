import Http from "../utils/http";
import Base from "./base";

class Refund extends Base {
  /**
   * @description: 创建退款
   * @return {*}
   * @param {*} data 数据
   */
  static async createRefund(data) {
    return Http.request({
      url: 'v1/refund',
      data,
      method: 'POST'
    })
  }
  /**
   * @description: 更新退款服务状态
   * @return {*}
   * @param {*} refundId 退款id
   * @param {*} status 状态
   */
  static async updateRefundStatus(refundId, status) {
    return Http.request({
      url: `v1/refund/${refundId}`,
      data: {
        action: status
      },
      method: 'POST'
    })
  }
  /**
   * @description: 获取退款详细信息
   * @return {*}
   * @param {*} refundId 退款id
   */
  static async getRefundById(refundId) {
    return await Http.request({
      url: `v1/refund/${refundId}`
    })
  }
  /**
   * @description: 根据状态获取退款列表
   * @return {*}
   * @param {*} role 角色
   * @param {*} status 状态
   */
  async getRefundListByStatus(role, status) {
    if (!this.hasMoreData) {
      return this.data
    }
    const refundList = await Http.request({
      url: 'v1/refund',
      data: {
        page: this.page,
        count: this.count,
        role,
        status
      }
    })
    this.data = this.data.concat(refundList.data)
    this.hasMoreData = !(this.page === refundList.last_page)
    this.page++
    return this.data
  }
  /**
   * @description: 获取进度列表
   * @return {*}
   * @param {*} role
   */
  async getProcessingRefundList(role) {
    if (!this.hasMoreData) {
      return this.data
    }

    const refundList = await Http.request({
      url: 'v1/refund/process',
      data: {
        page: this.page,
        count: this.count,
        role
      }
    });

    this.data = this.data.concat(refundList.data)
    this.hasMoreData = !(this.page === refundList.last_page)
    this.page++
    return this.data
  }

}