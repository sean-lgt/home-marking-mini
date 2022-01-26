// 图片上传组件封装
import { wxToPromise } from "./wx";
import APIConfig from "../config/api";
import Http from "./http";

class FileUploader extends Http {
  /**
   * @description: 
   * @return {*}
   * @param {*} filePath 图片路径
   * @param {*} key 文件类型,文件名称
   */
  static async upload(filePath, key = 'file') {
    let res
    try {
      res = await wxToPromise('uploadFile', {
        url: APIConfig.baseUrl + '/v1/file',
        filePath: filePath,
        name: key
      })
    } catch (error) {
      FileUploader._showError(-1)
      throw new Error(error.errMsg)
    }
    const serverData = JSON.parse(res.data)
    if (res.statusCode !== 201) {
      FileUploader._showError(serverData.error_code, serverData.message)
      throw new Error(serverData.message)
    }
    return serverData.data
  }
}

export default FileUploader