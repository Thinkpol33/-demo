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
    tabs: [
      { id: 0, name: '综合', isAction: true },
      { id: 1, name: '销量', isAction: false },
      { id: 2, name: '价格', isAction: false }
    ],
    goods_list: []
  },
  //请求商品列表参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //商品总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options是传递过来的参数
    // console.log(options)
    this.queryParams.cid = options.cid || ''
    this.queryParams.query = options.query || ''
    // this.queryParams.cid = options.cid || "";
    // this.queryParams.query = options.query || "";
    // console.log(this.queryData)
    this.getGoodsList()
  },
  //切换tbas的自定义事件
  tabsItemChange (e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((item, i) => i === index ? item.isAction = true : item.isAction = false)
    this.setData({
      tabs
    })
  },
  //获取商品列表
  async getGoodsList () {
    const res = await request({ url: '/goods/search', data: this.queryParams })
    //获取总条数
    const total = res.total
    //计算总页数
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)

    this.setData({
      // 下拉加载要把新的数据拼接进旧数据，不能直接覆盖
      goods_list: [...this.data.goods_list, ...res.goods]
    })
    //手动关闭下拉效果
    wx.stopPullDownRefresh()

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
    //下拉重置商品列表和页码
    this.setData({
      goods_list: []
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.queryParams.pagenum >= this.totalPages) {
      //没有下一页显示提示框
      wx.showToast({
        title: '没有下一页'
      });

    } else {
      //有下一页的话当前页数+1，继续获取数据
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})