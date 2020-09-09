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
      { id: 0, name: '全部', isAction: true },
      { id: 1, name: '待付款', isAction: false },
      { id: 2, name: '待发货', isAction: false },
      { id: 3, name: '退款/退货', isAction: false },
    ]
  },
  //点击改变标签页
  tabsItemChange (e) {
    const { index } = e.detail
    this.ItemChange(index)
    //发请求获取订单数据，type=index+1
    this.getOrders(index + 1)
  },
  //改变标签页
  ItemChange (index) {
    let { tabs } = this.data
    tabs.forEach((item, i) => i === index ? item.isAction = true : item.isAction = false)
    this.setData({
      tabs
    })
  },
  //获取订单数据
  async getOrders (type) {
    const res = await request({ url: '/my/orders/all', data: { type } })
    this.setData({
      orders: res.orders.map(item => ({ ...item, create_time_cn: (new Date(item.create_time * 1000)).toLocaleString() }))
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //获取微信小程序页面栈
    let Pages = getCurrentPages();
    //获取最新页的参数
    let currentPages = Pages[Pages.length - 1]
    let type = currentPages.options.type
    // 根据获取到的参数发请求获取订单数据
    this.getOrders(type)
    //tab标签页当type=1时显示第0页
    this.ItemChange(type - 1)
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