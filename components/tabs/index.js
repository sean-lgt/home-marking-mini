// components/tabs/index.js
// 引进节流函数
import { throttle } from "../../utils/utils"

Component({
  options: {
    // 开启多插槽模式
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: Array, //tabs栏配置数组
    // 激活项
    active: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //当前tab栏的索引
    currentTabIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    aaaa(e) {
      console.log("sdfas", e)
    },
    /**
     * @description: 点击tab栏切换 使用节流反正重复点击请求
     * @return {*}
     */
    handleSwitchTab: throttle(async function(event) {
      const index = event.currentTarget.dataset.index;
      if (this.data.currentTabIndex === index) {
        return false
      }
      this.setData({
        currentTabIndex: index
      })
      // 触发父组件绑定的事件
      this.triggerEvent('change', { index })
    }),
    /**
     * @description: wxs 函数触发实例方法 移动tab
     * @return {*}
     * @param {*} event
     */
    handleTouchmove(event) {
      const direction = event.direction

      const currentTabIndex = this.data.currentTabIndex
      const targetTabIndex = currentTabIndex + direction

      if (targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1) {
        return
      }

      const customEvent = {
        currentTarget: {
          dataset: {
            index: targetTabIndex
          }
        }
      }
      this.handleSwitchTab(customEvent)
    }


  }
})