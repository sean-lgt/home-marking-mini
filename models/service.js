// 服务模型
import Http from "../utils/http";
import Base from "./base";

class Service extends Base { //继承的方式
  /**
   * @description: 发布服务
   * @return {*}
   * @param {*} data
   */
  static async publishService(data) {
    return await Http.request({
      url: 'v1/service',
      data,
      method: 'POST'
    })
  }
  /**
   * @description: 获取服务状态
   * @return {*}
   * @param {*} type
   */
  static async getServiceStatus(type) {
    return Http.request({
      url: `v1/service/count?type=${type}`
    })
  }
  /**
   * @description: 获取服务相亲
   * @return {*}
   * @param {*} id 服务id
   */
  static async getServiceById(id) {
    return Http.request({
      url: `url/service/${id}`
    })
  }
  /**
   * @description: 更新服务状态
   * @return {*}
   * @param {*} id 服务id
   * @param {*} action 状态
   */
  static async updateServiceStatus(id, action) {
    return await Http.request({
      url: `v1/service/${id}`,
      data: {
        action: action
      },
      method: 'POST'
    })
  }
  /**
   * @description: 更新服务内容
   * @return {*}
   * @param {*} id 服务id
   * @param {*} data 内容
   */
  static async updateService(id, data) {
    return await Http.request({
      url: `v1/service/${id}`,
      data,
      method: 'PUT'
    })
  }
  /**
   * @description: 获取服务列表
   * @return {*}
   * @param {*} type 类型
   * @param {*} category_id 分类id
   */
  async getServiceList(type = null, category_id = null) {
    if (!this.hasMoreData) {
      // 如果没有数据了，则不再请求
      return this.data
    }
    const serviceList = await Http.request({
      url: 'v1/service/list',
      data: {
        page: this.page,
        count: this.count,
        type: type || '',
        category_id: category_id | ''
      }
    });

    //合并数据
    this.data = this.data.concat(serviceList.data)
    //判断是否已无更多数据
    this.hasMoreData = !(this.page === serviceList.last_page)
    this.page++
    return this.data

  }
  /**
   * @description: 获取我的服务列表
   * @return {*}
   * @param {*} type 类型
   * @param {*} status 状态
   */
  async getMyServiceList(type, status) {
    if (!this.hasMoreData) {
      // 如果没有数据了，则不再请求
      return this.data
    }
    const serviceList = await Http.request({
      url: 'v1/service/my',
      data: {
        page: this.page,
        count: this.count,
        type,
        status
      }
    });

    //合并数据
    this.data = this.data.concat(serviceList.data)
    //判断是否已无更多数据
    this.hasMoreData = !(this.page === serviceList.last_page)
    this.page++
    return this.data
  }


}

export default Service