// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)
import routes from "./routes"
import store from "@/store"

let originPush = VueRouter.prototype.push;
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }

}
// 配置路由
let router =  new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to,from,savePosition){
        // 这个u:0，指 滚动条在最上方
        return {y:0}
    }
})

// 全局守卫：前置守卫（在路由跳转之间判断）
router.beforeEach(async (to,from,next)=>{
    // next();
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;

    if(token){
        // 用户登陆了还想去login，不行
        if(to.path == '/login'){
            next('/');
        }else{
            // 登录了但不去login
            // 如果用户名已有
            if(name){
                next();
            }else{
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 后台给的token失效了，需要重新登录
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        // 未登录不能去交易相关的、支付相关的、不能去个人中心
        if(to.path.indexOf('/trade')!=-1 || to.path.indexOf('/pay')!=-1 || to.path.indexOf('/center')!=-1){
            // 把未登录时想去没有去的信息存在地址中，这样子一登录就能立刻重定向到你想去的地方
            next('/login?redirect='+to.path)
        }else{
            next()
        }
    }
})

export default router;
