//引入封装好的请求方法
import { request } from "../../request/index.js"
//引入组件支持es7的async await 语法
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索结果
    goods: [],
    //取消按钮是否隐藏
    isFocus: false,
    inputValue: ''
  },
  //定时器
  time: 0,
  //输入框的值改变触发
  input (e) {
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        isFocus: false
      })
      return
    }
    this.setData({
      isFocus: true
    })
    //防抖
    clearTimeout(this.time)
    this.time = setTimeout(() => {
      this.search(value)
    }, 2000)
  },
  //发请求搜索
  async search (query) {
    const res = await request({ url: '/goods/qsearch', data: { query } })
    this.setData({
      goods: res
    })
  },
  //取消按钮
  cancel () {
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
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