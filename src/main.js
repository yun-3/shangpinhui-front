import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav"

import Carousel from "@/components/Carousel"
Vue.component(Carousel.name,Carousel)
import Pagination from "@/components/Pagination"
Vue.component(Pagination.name,Pagination)
// 第一个参数：全局组件名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
import{Button,MessageBox} from "element-ui"
Vue.config.productionTip = false
Vue.component(Button.name,Button)
// elementui注册时还有一种写法，挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert= MessageBox.alert;
// 引入mockServe.js----mock数据
import '@/mock/mockServe'
import "swiper/css/swiper.css"
// 统一接口api文件夹里面的全部请求参数
import * as API from "@/api"
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import atm from "@/assets/1.gif"
// 注册图片懒加载插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: atm,
})
// 引入表单校验插件
import "@/plugins/validate"
// 引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  },
  // 注册路由
  router,
  store,
}).$mount('#app')
