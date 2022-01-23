// components/grid-item/index.js
Component({
  relations: {
    "../grid/index": {
      type: 'parent', //关联的目标节点为父节点
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    icon: String,
    iconSize: {
      type: String,
      value: '50'
    },
    text: String,
    showBadge: Boolean,
    badgeCount: Number
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
    //点击具体某一项
    handleSelect() {
      this.triggerEvent('select', {
        cell: this.data.cell
      }, {
        bubbles: true, //事件是否冒泡
        composed: true //事件是否可以穿越组件便捷，为false时，事件只能在引用组件的节点树上触发，不进入其他任何组件内部
      })
    }
  }
})