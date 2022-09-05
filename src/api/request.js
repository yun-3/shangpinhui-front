// 对于axios二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 在当前模块中引入store
import store from "@/store"
// 1.利用axios对象的方法create，去创建一个sxios实例
const requests  = axios.create({
    // 2.request就是axios，只不过稍微配置一下
    // 配置对象
    // 基础路径，发请求时，路径当中会出现api
    baseURL:"/api",
    // 代表请求超时的时间5s
    timeout: 5000,
    
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发之前做一些事情
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    //config：配置对象，对象里面有一个属性很重要，headers请求头
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    // 成功的回调函数：服务器响应数据回来之后，相应拦截器可以检测到并做一些事情
    return res
},(err)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
})


// 对外暴露
export default requests
