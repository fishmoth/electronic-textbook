

// // pages/user/user.js
// Page({
  

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     user:{
//       userId:'',
//       name:'',
//       avatarUrl:''
//     }
      
//   },
//   onShow() {
//     this.getTabBar().init();
//   },
//   //登录
//   login(){
//     const db = wx.cloud.database()
//     //查询是否已注册
//    db.collection('users').where({
//       _openid:this.data.user.userId
//     }).get({
//       success:function(res){
//       wx.setStorageSync('users', res.data[0])
//         console.log(res.data[0])
//       },
//       fail:function(res){

//       }
//     })
//     wx.navigateTo({
//       url: '/pages/getUserInfo/getUserInfo',
//     })
//     // this.setData({
//     //   user:{
//     //     name:'小猫',
//     //     avatarUrl:'https://img.yzcdn.cn/vant/cat.jpeg'
//     //   }
//     // })
//   },
//   //退出登录
//   logOut(){
//     this.setData({
//       user:{
//         name:'',
//         avatarUrl:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
//       }
//     })
//     // wx.setStorageSync('users', null)
//     wx.removeStorageSync('users')
//   },
//   onLoad(options) {
//     this.getOpenid()
//     // try {
//     //   var value = wx.getStorageSync('users')
//     //   console.log(value)
//     //   console.log(value.nickname)
//     //   if (value) {
//     //     // Do something with return value
//     //     this.setData({
//     //       // name:value.nickname
//     //       user:{
//     //         name:value.nickname
//     //       }
//     //     })
//     //   }
//     // } catch (e) {
//     //   // Do something when catch error
//     // }
//   },
// getOpenid(){//获取用户的openid
//   wx.cloud.callFunction({
//     name:'openId'
//   })
//   .then(res=>{
//     //获取用户的openid
//     // wx.setStorageSync('openid', res.result)
//     this.setData({
//       // userId:res.result.data[0].nickname
//       user:{
//         userId:res.result.data[0]._openid,
//         name:res.result.data[0].nickname
//       }
//     })
//   })
//   .catch(err=>{
//     console.log('获取失败',err);
//   })
// }
// })
const db=wx.cloud.database();
const app=getApp();
Page({
  data:{
    user:null
  },
  onLoad(options){
    let that=this;
    //获取当前用户的openId
    wx.cloud.callFunction({
      name:"openId",
      success:function(res){
        console.log(res.result.openid);
        //去users表中查询该openid是否已经存在
        let openid=res.result.openid;
        db.collection('users').where({
          _openid:openid,
        })
        .get({
          success:function(res){
            //res.data是包含以上定义的两条记录的数组
            console.log(res.data);
            that.setData({
              user:res.data[0]
            })
          }
        })
      }
    })
  },
  logIn(){
    //跳转到登录页
    wx.redirectTo({
      url: '/pages/getUserInfo/getUserInfo'
    })      
  },
  logOut(){
    this.setData({
      user:null
    })
    let that=this;
    //获取当前用户的openId
    wx.cloud.callFunction({
      name:"openId",
      success:function(res){
        console.log(res.result.openid);
        //去users表中查询该openid是否已经存在
        let openid=res.result.openid;
        db.collection('users').where({
          _openid:openid,
        })
        .remove({
          success:function(res){
            console.log('删除成功',res.data);
          }
        })
      }
    })
  }
})