// components/rating-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: Object
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
    //预览图片
    handlePreview(event) {
      this.triggerEvent('preview')
      const index = event.currentTarget.dataset.index
      wx.previewImage({
        current: this.data.rating.illustration[index],
        urls: this.data.rating.illustration,
      });
    }
  }
})