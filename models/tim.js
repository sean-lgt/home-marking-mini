import TIM from "tim-wx-sdk"
import TIMUploadPlugin from "tim-upload-plugin"
import User from "./user"
import timConfig from "../config/tim"

class Tim {
  static instance = null
  _SDKInstance = null
  _nextReqMessageID = ''
  isComleted = false
  _messageList = []

  get messageList() {
    return this._messageList
  }

  constructor() {
    this._initTim()
  }

  // 静态方法 获取实例
  static getInstance() {
    if (!Tim.instance) {
      Tim.instance = new Tim()
    }
    return Tim.instance
  }

  // 初始化Tim
  _initTim() {
    let options = {
      SDKAppID: timConfig.appId //接入时需要填写您的即时通信 IM 应用的 SDKAppID
    }
    // 创建 SDK 实例， TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
    let SDKInstance = TIM.create(options); // SDK 实例通常用 tim 表示
    // 设置 SDK 日志输出级别，详细分级参见 setLogLevel 接口的说明
    SDKInstance.setLogLevel(timConfig.logLevel) //普通级别 日志量较多时建议使用

    // 注册 COS SDK 插件
    SDKInstance.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
    this._SDKInstance = SDKInstance
  }

  // 获取 SDK,返回实例
  getSDK() {
    return this._SDKInstance
  }

  // 登录，获取userSig
  async login() {
    const userSign = await User.getUserSign()
    await this._SDKInstance.login({
      userID: userSign.user_id.toString(),
      userSig: userSign.sign
    })
  }

  // 退出
  async logout() {
    const res = await this._SDKInstance.logout()
    return res.data
  }

  // 获取会话列表
  async getConversationList() {
    const res = await this._SDKInstance.getConversationList()
    return res.data.conversationList
  }

  /**
   * @description: 获取消息信息数据
   * @return {*}
   * @param {*} targetUserId 目标用户ID
   * @param {*} count 数目
   */
  async getMessageList(targetUserId, count = 10) {
    if (this.isComleted) {
      return this._messageList
    }

    const res = this._SDKInstance.getMessageList({
      conversationID: `C2C${targetUserId}`,
      nextReqMessageID: this._nextReqMessageID,
      count: count > 15 ? 15 : count
    })

    this._nextReqMessageID = res.data.nextReqMessageID
    this.isComleted = res.data.isComleted
    this._messageList = res.data.messageList

    return this._messageList
  }

  /**
   * @description: 获取用户信息
   * @return {*}
   * @param {*} userId 用户ID
   */
  async getUserProfile(userId) {
    const res = this._SDKInstance.getUserProfile({
      // 请注意 即使只拉取一个用户的资料，也需要数组类型
      userIDList: [userId]
    })
    return res.data
  }

  /**
   * @description: 更新用户信息
   * @return {*}
   * @param {*} userInfo 信息
   */
  async updateMyProfile(userInfo) {
    await this._SDKInstance.updateMyProfile({
      nick: userInfo.nickname,
      avatar: userInfo.avatar,
      gender: userInfo.gender === 1 ? TIM.TYPES.GENDER_MALE : TIM.TYPES.GENDER_FEMALE
    })
    wx.setStorageSync('userInfo', userInfo)
  }

  /**
   * @description: 创建消息内容
   * @return {*} 返回具体消息
   * @param {*} type 类型
   * @param {*} content 内容
   * @param {*} targetUserId 目标用户ID
   * @param {*} extension 扩展
   */
  createMessage(type, content, targetUserId, extension = null) {
    let message
    const params = {
      to: targetUserId,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: null
    }
    switch (type) {
      case TIM.TYPES.MSG_TEXT:
        params.payload = { text: content }
        message = this._SDKInstance.createTextMessage({ ...params })
        break;
      case TIM.TYPES.MSG_FILE:
        params.payload = { file: content }
        message = this._SDKInstance.createImageMessage({ ...params })
        break;
      case TIM.TYPES.MSG_CUSTOM:
        params.payload = {
          data: 'service',
          description: JSON.stringify(content),
          extension
        }
        message = this._SDKInstance.createCustomMessage({ ...params })
        break;
      default:
        throw Error("未知消息类型")
    }
    return message
  }

  /**
   * @description: 发送信息
   * @return {*}
   * @param {*} message
   */
  async sendMessage(message) {
    const res = await this._SDKInstance.sendMessage(message)
    return res.data
  }

  /**
   * @description: 设置消息已读状态
   * @return {*}
   * @param {*} targetUserId 目标用户id
   */
  async setMessageRead(targetUserId) {
    const res = await this._SDKInstance.setMessageRead({ conversationID: `C2C${targetUserId}` });
    return res.data
  }

  /**
   * @description: 创建自定义消息信息
   * @return {*}
   * @param {*} to 目标
   * @param {*} payload pla 
   * @param {*} showType 类型
   */
  createCustomMessage(to, payload, showType = 'link') {
    return this._SDKInstance.createCustomMessage({
      to,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        data: 'service',
        description: payload,
        extension: showType
      }
    });
  }

  // 重置
  reset() {
    this._nextReqMessageID = ''
    this.isCompleted = false
    this._messageList = []
    return this
  }


}

export default Tim