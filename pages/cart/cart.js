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
    //全选
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  //获取地址
  async ChooseAddress () {
    try {
      //获取授权状态wx.getSetting()
      const res = await getSetting()
      //用[""]的方式获取属性名称带.的属性
      const scopeAddress = res.authSetting["scope.address"]
      //判断授权状态
      if (scopeAddress === false) {
        //如果从来未授权或者不允许获取权限，调用wx.openSetting()让用户自己给予权限
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }


  },
  //商品选中
  ItemChange (e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex((item) => item.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)

  },
  //封装计算购物车总数总价格功能
  setCart (cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(i => {
      if (i.checked) {
        totalPrice += i.num * i.goods_price
        totalNum += i.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart)
  },
  //全选反选
  itemAllChange () {
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach(item => item.checked = allChecked)
    this.setCart(cart)
  },
  //商品数量加减
  async itemNumEdit (e) {
    const { operation, id } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex(item => item.goods_id === id)
    //如果num=1，则弹窗提示
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: "是否从购物车删除？" })
      if (res.confirm) {
        //从cart中删除对应项
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }

  },
  //结算
  async pay () {
    const { address, totalNum } = this.data
    if (!address.userName) {
      await showToast({ title: "请选择收货地址" })
      return
    }
    if (totalNum === 0) {
      await showToast({ title: "还没有选择商品" })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });

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
    //计算购物车总数和价格
    const cart = wx.getStorageSync("cart") || [];

    //every()数组遍历方法，接受一个回调函数，每一个回调函数都是true则every()返回true
    //空数组调用every()会返回true
    // const allChecked = cart.length ? cart.every(i => i.checked) : false
    this.setData({
      address
    })
    this.setCart(cart)

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