// pages/conversation/components/message/index.js
import { formatTime } from "../../../../utils/date"
import TIM from "tim-wx-sdk"


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: Object //消息内容
  },
  // 数据内容监听
  observers: {
    'message': function(message) {
      //格式化处理
      message.time = formatTime(message.time)
      this.setData({
        _message: message
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _message: Object,
    TIM: TIM,
    flowEnum: {
      IN: 'in',
      OUT: 'out'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图片
    async handleImageTap(event) {
      await wx.previewImage({
        urls: [event.currentTarget.dataset.image.url],
        current: event.currentTarget.dataset.image.url
      })
    },
    // 点击发送链接
    handleSendLink(event) {
      this.triggerEvent('send', { service: event.detail.service })
    },
    // 点击选择
    handleSelect(event) {
      this.triggerEvent('select', { service: event.detail.service })
    }
  }
})