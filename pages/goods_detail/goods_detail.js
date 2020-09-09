//引入封装好的请求方法
import { request } from "../../request/index.js"
//引入组件支持es7的async await 语法
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //显示在页面上的商品数据
    goodsData: {},
    //判断商品是否收藏
    isCollect: false
  },
  //商品详情数据
  GoodsObj: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let Pages = getCurrentPages();
    let CurrentPage = Pages[Pages.length - 1]
    let options = CurrentPage.options
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail (goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    this.GoodsObj = res

    //获取本地缓存，判断改商品是否已经收藏
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(item => item.goods_id === this.GoodsObj.goods_id)
    this.setData({
      goodsData: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        pics: res.pics,
        goods_introduce: res.goods_introduce
      },
      isCollect
    })
  },
  //点击图片放大预览
  previewImage (e) {
    const urls = this.GoodsObj.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    //wx.previewImage()是微信小程序放大预览图片的api
    wx.previewImage({
      current,// 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    });

  },
  //加入购物车
  addCart () {
    //等于 let cart=wx.getStorageSync('cart')？wx.getStorageSync('cart'):[]
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsObj.goods_id)
    if (index === -1) {
      this.GoodsObj.num = 1
      this.GoodsObj.checked = true
      cart.push(this.GoodsObj)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      image: '',
      duration: 1500,
      //设置为true有防抖功能
      mask: true
    });

  },
  //点击收藏
  handleCollect () {
    let isCollect = false
    //获取本地缓存判断是否已经收藏
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(item => item.goods_id === this.GoodsObj.goods_id)
    if (index !== -1) {
      //已经收藏则删除收藏
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: false
      });

    } else {
      //没有收藏则添加收藏
      isCollect = true
      collect.push(this.GoodsObj)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: false
      });
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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