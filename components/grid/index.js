// components/grid/index.js
Component({
  options: {
    multipleSlots: true, //在组件定义时的选项中启用多slot支持
  },
  // 定义和使用组件间的关系
  relations: {
    '../grid-item/index': {
      type: 'child', //关联的目标节点应为子节点
    }
  },
  lifetimes: {
    // 自定义组件的生命周期
    // 在组件在视图层布局完成后执行
    ready() {
      this._initGrid()
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 每行的数量
    rowNum: {
      type: Number,
      value: 3
    },
    title: String,
    extend: String,
    extendCell: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    gridItems: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //初始化 grid
    _initGrid() {
      const items = this.getRelationNodes("../grid-item/index") //获取子节点
      const gridItems = items.map((item, index) => {
        return {
          index
        }
      })
      this.setData({
        gridItems
      })
    },
    // 点击具体某一项
    handleSelect(event) {
      this.triggerEvent('itemtap', { cell: event.detail.cell })
    },
    // 点击extend
    handleExtend() {
      this.triggerEvent('extendtap', { cell: this.data.extendCell })
    }
  }
})