//二次封装axios
import Axios from "axios"

export default function ajax(url = "", params = {}, type = "get") {
  let promise = null
  return new Promise((resolve, reject) => {
    // 判断请求数据方式
    if (type === "get") {
      let paramsStr = ""
      Object.keys(params).forEach(key => {
        paramsStr += key + "=" + params[key] + "&"
      })
      if (paramsStr != "") {
        // paramsStr = paramsStr.slice(0, -1)
        paramsStr = paramsStr.slice(0, paramsStr.lastIndexOf("&"))
      }
      url = url + "?" +paramsStr
      promise = Axios.get(url)
    } else if (type === "post") {
      promise = Axios.post(url, params)
    }

    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}