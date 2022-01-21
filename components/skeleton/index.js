// components/skeleton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否展示骨架屏
    show: Boolean,
    // 骨架屏行数
    rows: Number,
    // 骨架屏高度和宽度
    rowWidth: Number,
    rowHeight: Number,
    // 左侧盒子宽度
    leftBox: {
      type: Number,
      value: 150
    },
    // 右侧盒子宽度
    rightBox: {
      type: Number,
      value: 150
    },
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

  }
})