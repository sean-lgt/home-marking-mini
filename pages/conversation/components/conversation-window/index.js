// pages/conversation/components/conversation-window/index.js
import Tim from "../../../../models/tim";
import TIM from "tim-wx-sdk";
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { timStore } from "../../../../store/tim";

const tim = Tim.getInstance() //实例化


Component({
  behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    targetUserId: String,
    service: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollHeight: 0,
    content: ''
  },
  // 全局状态管理
  storeBindings: {
    store: timStore,
    fields: ['messageList', 'intoView'],
    actions: [
      'getMessageList',
      'pushMessage',
      'scrollMessageList',
      'setTargetUserId'
    ],
  },
  // 生命周期函数
  lifetimes: {
    //在组件实例进入页面节点树时执行
    attached: async function() {
      this._setNavigationBarTitle()
      this.setScrollHeight()
      this.setTargetUserId(this.data.targetUserId)
      await this.getMessageList()
      if (this.data.service) {
        const createCustomMessage = tim.createMessage(TIM.TYPES.MSG_CUSTOM, this.data.service, this.data.targetUserId, 'link')
        this.pushMessage(createCustomMessage)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //设置标题
    async _setNavigationBarTitle() {
      const res = await tim.getUserProfile(this.data.targetUserId)
      wx._setNavigationBarTitle({
        title: res[0].nick || '自定义'
      })
    },
    // scorllview 滚动到顶部了 请求上一页数据
    async handleScrolltoupper(event) {
      if (tim.isCompleted) {
        return
      }
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      await this.scrollMessageList()
      setTimeout(() => wx.hideLoading(), 1000)
    },
    // 操作发送图片
    async handleSendPicture() {
      const chooseImage = await wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })
      this.triggerEvent('sendmessage', {
        type: TIM.TYPES.MSG_FILE,
        content: chooseImage
      })
    },
    // 点击发送
    async handleSend() {
      const text = this.data.content.trim()
      if (text === '') {
        return
      }
      this.triggerEvent('sendmessage', {
        type: TIM.TYPES.MSG_TEXT,
        content: text
      })
      this.setData({
        content: ''
      })
    },
    // 发送链接
    async handleSendLink(event) {
      const service = event.detail.service
      this.triggerEvent('sendmessage', {
        type: TIM.TYPES.MSG_CUSTOM,
        content: service
      })
    },
    // 点击选择
    async handleSelect(event) {
      const service = event.detail.service
      wx.navigateTo({ url: `/pages/service-detail/index?id=${service.id}` })
    },
    // 监听input输入框改变
    handleInput(event) {
      this.data.content = event.detail.value
    },
    // 设置滚动块高度
    async setScrollHeight() {
      const systemInfo = await wx.getSystemInfo() //获取系统信息，手机设备
      const scrollHeight = systemInfo.windowHeight - (systemInfo.screenHeight - systemInfo.safeArea.bottom) - 95
      this.setData({
        scrollHeight
      })
    }

  }
})