//计算请求的次数
let ajaxTime = 0
export const request = (params) => {
  //每发一个请求请求次数加一
  ajaxTime++
  //显示加载中效果
  wx.showLoading({
    title: '加载中',
  })
  //判断如果请求的地址带有/my/字符串，请求头上带token发请求
  const header = { ...params.header }
  if (params.url.includes('/my/')) {
    header["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
  }
  const BaseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: BaseUrl + params.url,
      header: header,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: () => {
        reject(err)
      },
      complete: () => {
        //完成一个请求请求次数减一，请求全部完成关闭wx.hideLoading效果
        ajaxTime--
        if (ajaxTime === 0) {
          wx.hideLoading()
        }

      }
    });

  })
}