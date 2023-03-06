// app.js
App({
  onLaunch() {
   wx.cloud.init({
     env:'cloud-4g2l19hk69583e93'//云开发环境id
   })
   this.globalData = {
     cur_user:{
       
     }
   };
  }
})
