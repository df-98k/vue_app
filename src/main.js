// 入口文件
import Vue from 'vue'


import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'


// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)



// 导入缩略图

import VuePreview from 'vue-preview'

Vue.use(VuePreview)



// 下载时间插件 coment 
// 定义全局过滤器
import moment from 'moment'
Vue.filter('dateNew', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {

  return moment(dataStr).format(pattern)

})


// 设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005";


// 导入 mui 的样式文件
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// 需要什么组件就在{input}里面加,用bootrapt就不需要这么写
import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload,
  Switch

} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);




// 引入并且注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
// 注意 这里的Store一定要大写
var store = new Vuex.Store({
  state: {
    car:car
  },

  mutations: {
    addCart(state, carinfo) {
      let flag = false
      state.car.some(item => {
        if (item.id == carinfo.id) {
          item.count += parseInt(carinfo.count)
          flag = true
          return true
        }
      });
      if(!flag) state.car.push(carinfo)
      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count)
          return true
        }
      })
      // 购车内修改商品的数量。本地存储也会改变
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state,id){
       // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true;
        }
      })
        // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
        localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
        }
      })
        // 把最新的 所有购物车商品的状态保存到 store 中去
        localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters:{
    getAllCount(state){
      let c=0;
      state.car.forEach(element => {
        c+=element.count
      });
      return c

    },
    getGoodsCound(state){
      var x={}
      state.car.forEach(item=>{
       x[item.id]=item.count
      })
      return x
  
    },
    getGoodsSelected(state){
      var f={}
      state.car.forEach(item=>{
       f[item.id]=item.selected
      })
      return f
    },
    // 结算区域的操作
    getAllgoodsPlay(state){
      var z ={
        number:0,//勾选的总数量
        price:0,//勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
           z.number+=item.count
           z.price+=item.price*item.count
        }
      })
      return z
    }

  },



})


// 导入 App 根组件
import app from './App.vue'

let vm = new Vue({
  el: "#app",
  render: c => c(app),
  router,
  store
})