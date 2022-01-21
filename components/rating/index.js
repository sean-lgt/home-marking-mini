// components/rating/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 需要高亮的数量
    selected: {
      type: Number,
      value: 0
    },
    // 需要展示的数量
    count: {
      type: Number,
      value: 5
    },
    // 默认颜色
    defaultColor: {
      type: String,
      value: '#888888'
    },
    // 选中颜色
    selectedColor: {
      type: String,
      value: '#f3d066'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score: 0, //得分
    currentIndex: -1, //当前点击的索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击具体某项
    handleSelect(event) {
      if (this.data.selected > 0) {
        return
      }
      const index = event.curretTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      const score = index + 1
      this.triggerEvent('rating', { rating: score })
    }
  }
})