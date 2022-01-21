// 评价内容模块
import Http from "../utils/http";
import Base from "./base";

class Rating extends Base {
  /**
   * @description: 创建评价内容
   * @return {*}
   * @param {*} order_id 订单id
   * @param {*} score 分数，星星
   * @param {*} content 内容
   * @param {*} illustration 图片
   */
  static async createRating(order_id, score, content, illustration = []) {
    return Http.request({
      url: "v1/rating",
      data: {
        order_id,
        score,
        content,
        illustration
      },
      method: 'POST'
    })
  }
  /**
   * @description: 通过订单id获取评价
   * @return {*}
   * @param {*} orderId 订单id
   */
  static getRatingByOrderId(orderId) {
    return Http.request({
      url: "v1/rating/order",
      data: {
        order_id: orderId
      },
      method: 'GET'
    })
  }
  /**
   * @description: 获取我的服务评价
   * @return {*}
   * @param {*} id 服务id
   */
  async getMyRatingByServiceId(id) {
    return await Http.request({
      url: 'v1/rating/my',
      data: {
        service_id: id
      }
    })
  }
  /**
   * @description: 获取服务评价列表
   * @return {*}
   * @param {*} id 服务id
   */
  async getRatingListByServiceId(id) {
    if (!this.hasMoreData) {
      return this.data
    }
    const ratingList = await Http.request({
      url: "v1/rating/service",
      data: {
        service_id: id,
        page: this.page,
        count: this.count
      }
    })
    this.data = this.data.concat(ratingList.data)
    this.hasMoreData = !(this.page >= ratingList.last_page)
    this.page++
    return this.data
  }

}

export default Rating