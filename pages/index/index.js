// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    activeNames: ['1'],
    active: 0,
    swiperList:[{
      id:1,
      image:'cloud://cloud-4g2l19hk69583e93.636c-cloud-4g2l19hk69583e93-1317101639/swiper/sw1.jpg'
    },{
      id:2,
      image:'cloud://cloud-4g2l19hk69583e93.636c-cloud-4g2l19hk69583e93-1317101639/swiper/sw2.jpg'
    },{
      id:3,
      image:'cloud://cloud-4g2l19hk69583e93.636c-cloud-4g2l19hk69583e93-1317101639/swiper/sw3.jpg'
    },{
      id:4,
      image:'cloud://cloud-4g2l19hk69583e93.636c-cloud-4g2l19hk69583e93-1317101639/swiper/sw4.jpg'
    },{
      id:5,
      image:'cloud://cloud-4g2l19hk69583e93.636c-cloud-4g2l19hk69583e93-1317101639/swiper/sw4.jpg'
    }]
  },
  
  onShow() {
		this.getTabBar().init();
	},
  onChange(event) {
    this.setData({
      activeNames: event.detail,
      active: event.detail
    })
  },
  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none',
    });
  },
  onLoad() {

  },

})
