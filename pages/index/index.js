//Page Object
//引入封装好的请求方法
import { request } from "../../request/index.js"
Page({
  data: {
    //轮播图数据
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList () {
    //获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    //使用promise避免回调地狱
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  getCateList () {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          cateList: result
        })
      })
  },
  getFloorList () {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
