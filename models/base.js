// 基础模型
class Base {
  page = 1 //页码
  count = 4 //页数
  data = [] //数据清空
  hasMoreData = true //是否有更多数据

  // 重置数据
  reset() {
    this.page = 1
    this.count = 4 //页数
    this.data = [] //数据清空
    this.hasMoreData = true //是否有更多数据
    return this
  }
}

export default Base