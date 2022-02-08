// components/detail-chat/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: Object, //用户信息
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
    //前往聊天
    handleToChat() {
      const targetUserId = this.data.userInfo.id // 目标用户id
      this.triggerEvent('chat', { targetUserId })
    }
  }
})