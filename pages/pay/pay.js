// pages/cart/cart.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"

import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/async.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //收货地址
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
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
    //获取地址
    const address = wx.getStorageSync("address");
    //计算结算总数和价格
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(item => item.checked)

    let totalPrice = 0
    let totalNum = 0

    cart.forEach(i => {
      totalPrice += i.num * i.goods_price
      totalNum += i.num
    })
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
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