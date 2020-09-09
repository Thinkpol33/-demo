// pages/category/category.js
//引入封装好的请求方法
import { request } from "../../request/index.js"
//引入组件支持es7的async await 语法
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catesList: [],
    onMenu: 0,
    scrollTop: 0
  },
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //判断本地有没有数据并且有没有过时，如果有则不发请求直接用本地的数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCatesList()
    } else {
      //判断数据是否过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCatesList()
      } else {
        this.cates = Cates.data
        let leftMenuList = this.cates.map(item => item.cat_name)
        let rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  async getCatesList () {
    // request({ url: '/categories' })
    //   .then(result => {
    //     this.cates = result
    //     //设置本地缓存wx.setStorageSync()
    //     wx.setStorageSync('cates', { time: Date.now(), data: this.cates });

    //     let leftMenuList = this.cates.map(item => item.cat_name)
    //     let rightContent = this.cates[0].children
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    //使用async await 
    const res = await request({ url: '/categories' })
    this.cates = res
    //设置本地缓存wx.setStorageSync()
    wx.setStorageSync('cates', { time: Date.now(), data: this.cates });

    let leftMenuList = this.cates.map(item => item.cat_name)
    let rightContent = this.cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //点击左边菜单切换右边内容
  itemTap (e) {
    // 根据索引改变右边内容
    const i = e.currentTarget.dataset.index

    console.log(i)
    let rightContent = this.cates[i].children
    this.setData({
      onMenu: i,
      rightContent,
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})