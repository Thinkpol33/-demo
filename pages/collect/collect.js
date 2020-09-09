// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, name: '商品收藏', isAction: true },
      { id: 1, name: '品牌收藏', isAction: false },
      { id: 2, name: '店铺收藏', isAction: false },
      { id: 3, name: '足迹', isAction: false },
    ],
    collect: []
  },
  //点击改变标签页
  tabsItemChange (e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((item, i) => i === index ? item.isAction = true : item.isAction = false)
    this.setData({
      tabs
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
    let collect = wx.getStorageSync('collect');
    this.setData({
      collect
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