import Http from "../utils/http";

class Category {
  /**
   * @description: 获取分类列表
   * @return {*}
   */
  static async getCategoryList() {
    return await Http.request({
      url: `v1/category`
    })
  }

  static async getCategoryListWithAll() {
    const categoryList = await Category.getCategoryList();
    categoryList.unshift({ id: 0, name: '全部' })
    return categoryList
  }
}

export default Category