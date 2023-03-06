// custom-tab-bar/index.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../store/store'
Component({
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      sum:'sum',
      active:'activeTabBarIndex'
    },
    actions:{
      updateActive:'updateActiveTabBarIndex'
    },
  },
  obeservers:{
    'sum':function(val){

    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
		list: [
			{
				icon: 'home-o',
				text: '首页',
				url: '/pages/index/index'
			},
			{
				icon: 'user-o',
				text: '个人',
				url: '/pages/user/user'
			}
		]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // this.setData({ active: event.detail });
      this.updateActive(event.detail)
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
  }
});
