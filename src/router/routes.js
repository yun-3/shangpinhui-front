// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"


export default [
    {
        path:"/home",
        component:Home,
        // 路由懒加载的书写方式
        // component: ()=>import("@/pages/Home")
        // 路由元信息key不能瞎写，只能叫做meta
        meta:{show:true}
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter:(to,from,next) => {
            if(from.path == '/trade'){
                next();
            }else{
                next(false)
            }
        },
    },
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        children:[
            {
                path:"myorder",
                component:MyOrder,
            },
            {
                path:"grouporder",
                component:GroupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true},
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter:(to,from,next) => {
            if(from.path == '/shopcart'){
                next();
            }else if(from.path == '/login'){
                next('/home')
            }else{
                next(false)
            }
        },
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:"search",
        // 路由组件能不能传props数据
        // 布尔值写法
        // props:true,
        // 对象写法：额外给路由组件传递一些props
        // props:{a:1,b:2},
        // 函数写法，可以把params参数，query参数，通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }

    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta: {isShow:true}
    },
    {
        path:"/shopcart",
        name:"shopcart",
        component:ShopCart,
        meta: {isShow:true}
    },
    // 重定向，在项目起来的时候，立马重定向
    {
        path: '/',
        redirect: "/home"
    }
]