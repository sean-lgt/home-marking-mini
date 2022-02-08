// pages/rating/index.js
import Rating from "../../models/rating";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    formData: {
      content: '',
      score: null
    },
    illustration: [],
    rules: [{
        name: 'score',
        rules: [
          { required: true, message: '请为该服务评分' },
        ],
      },
      {
        name: 'content',
        rules: [
          { required: true, message: '评价内容不能为空' },
          { minlength: 10, message: '评价内容不能少于 10 个字' },
        ],
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const order = JSON.parse(options.order)
    this.setData({
      order,
    })
  },
  // 提交
  async handleSubmit(event) {
    this.selectComponent('#form').validate(async (valid, errors) => {
      if (!valid) {
        const errMsg = errors.map(error => error.message)
        this.setData({
          error: errMsg.join('；'),
        })
        return
      }

      try {
        wx.showLoading({ title: '正在发布...', mask: true })

        const illustration = this.data.illustration.map(item => item.url)
        await Rating.createRating(this.data.order.id,
          this.data.formData.score,
          this.data.formData.content,
          illustration)
        wx.hideLoading()
        await wx.showModal({
          title: '提示',
          content: '评价成功，点击确定返回订单详情',
          showCancel: false
        })

        this.getOpenerEventChannel().emit('rating')
        wx.navigateBack()

      } catch (e) {
        wx.hideLoading()
      }
    })
  },
  // 评价
  handleRating(event) {
    this.setData({
      ['formData.score']: event.detail.rating
    })
  },
  // 监听输入框
  handleInputChange(event) {
    this.setData({
      ['formData.content']: event.detail.value
    })
  },
  // 上传成功
  handleUploadSuccess(event) {
    this.data.illustration = event.detail.files
  },
  // 删除图片
  handleUploadDelete: function(event) {
    const deleteIndex = this.data.illustration
      .findIndex(item => item.key === event.detail.item.key)
    this.data.illustration.splice(deleteIndex, 1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})