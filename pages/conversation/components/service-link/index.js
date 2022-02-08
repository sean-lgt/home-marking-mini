// pages/conversation/components/service-link/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    service: Object
  },
  // 监听数据
  observers: {
    'service': function(service) {
      this.setData({
        _service: JSON.parse(service.payload.description)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _service: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击选择
    handleSelect() {
      this.triggerEvent('select', { service: this.data._service })
    },
    //点击发送链接
    handleSendLink() {
      this.triggerEvent('send', { service: this.data._service })
    }
  }
})