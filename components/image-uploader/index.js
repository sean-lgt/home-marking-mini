import FileUploader from "../../utils/file-uploader";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 默认展示的图片文件
    files: {
      type: Array,
      value: []
    },
    // 最大上传图片数量
    maxCount: {
      type: Number,
      value: 4
    },
    // 单个图片文件大小限制，单位 M
    size: {
      type: Number,
      value: 2
    },
    // 可选图片大小类型，original：原图，compressed：压缩图
    // 默认都可以
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    // 可选图片来源，album: 从相册选图, camera：使用相机
    // 默认都可以
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
  },
  // 数据监听
  observers: {
    files: function(newValue) {
      if (!newValue.length) {
        return
      }
      const _files = []
      // 自定义格式化
      newValue.forEach((item, index) => {
        const file = {
          id: item.id,
          key: index + '',
          path: item.path,
          status: this.data.uploadStatusEnum.SUCCESS,
          error: ''
        }
        _files.push(file)
      })
      this.setData({
        _files
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //图片数组
    _files: [],
    uploadStatusEnum: {
      ERROR: 0,
      UPLOADING,
      SUCCESS: 2
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击预览图片
    handlePreview: function(event) {
      this.triggerEvent('hidepage')
      const index = event.currentTarget.dataset.index
      this.triggerEvent('preview', { index, item: this.data._files })
      const urls = this.data._files.map(item => item.path)
      wx.previewImage({
        urls: urls,
        current: urls[index]
      })
    }
  }
})