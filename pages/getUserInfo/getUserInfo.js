// // Page({
// //   //获取用户昵称
// //   getName(event){
// //     console.log('获取输入的用户名',event)
// //   }
// //   //获取用户头像

// // })
// // const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// // Page({
// //   data: {
// //     avatarUrl: defaultAvatarUrl,
// //   },
// //   onChooseAvatar(e) {
// //     const { avatarUrl } = e.detail 
// //     this.setData({
// //       avatarUrl,
// //     })
// //   }
// // })

// Page({
//   onLoad(){
    
//   },
//   onShareAppMessage() {
//     return {
//       title: 'form',
//       path: 'page/component/pages/form/form'
//     }
//   },
//   data: {
//     photo:'https://img.yzcdn.cn/vant/cat.jpeg',
//     pickerHidden: true,
//     chosen: ''
//   },

//   formSubmit(e) {
//     let name=e.detail.value.input
//     console.log('form发生了submit事件，携带数据为：', e.detail)
//     if(!name){
//       wx.showToast({
//         icon:'error',
//         title: '请输入昵称',
//         avatarUrl:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
//       })
//       return
//     }
//     wx.cloud.database().collection('users').add({
//       data:{
//         _id:name,
//         nickname:name
//       },
//       success(res){
//         console.log('登录成功',res)
//         wx.showToast({
//           title: '登录成功'
//         })
//         wx.navigateBack({
//           delta:0
//         })
//       },
//       fail(res){
//         console.log('登录失败',res)
//         wx.showToast({
//           icon:'error',
//           title: '该昵称已存在'
//         })
//       }
//     })
//   },

//   onChooseAvatar(e){
//     this.setData({
//         photo:e.detail.avatarUrl
//     })
//   },

//   onChange(event) {

//   },
// });

const defaultAvatarUrl ='https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const db=wx.cloud.database();
const app=getApp();
Page({
  //页面的初始数据
  data:{
    photoUrl:"defaultAvatarUrl",
    nickName:""
  },
  onChooseAvatar:function(res){
    console.log(res)
    console.log("头像临时url",res.detail.avatarUrl)
    this.setData({
      photoUrl:res.detail.avatarUrl
    })
  },
  onLoad(options){
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
            if(res.data.length>0){//已经注册过的用户可以直接跳转到个人信息页
              let user=res.data[0];
              app.globalData.cur_user=user;
              //跳转到个人信息页
              wx.redirectTo({
                url: '/pages/user/user'
              })      
            }
          }
        })
      }
    })
  },
  register:function(){
    let that=this;
    // 上传头像信息到云端储存
    wx.cloud.uploadFile({
      cloudPath:this.data.nickName+this.data.photoUrl.substring(this.data.photoUrl.lastIndexOf(".")),
      filePath:this.data.photoUrl,//文件路径
      success:res=>{
        console.log(res.fileID)
        //新增用户到users表(user_nickname,user_photo,user_regtime)
        let user={
          user_nickname:that.data.nickName,
          user_photo:res.fileID,
          user_regtime:new Date()
        }
        db.collection('users').add({
          data:user
        })
        .then(dbres=>{
          console.log("新增成功",dbres)
          //保存当前用户到全局作用域中
          user._id=dbres._id;
          app.globalData.cur_user=user;
          //跳转到个人信息页
          // wx.redirectTo({
          //   url: '/pages/user/user'
          // })      
          // wx.navigateBack({
          //   delta:0
          // })
          // wx.navigateTo({
          //   url: '/pages/user/user',
          // })
          wx.switchTab({
            url: '/pages/user/user',
          })
        })
      },
      fail:err=>{

      }
    })
  }
})