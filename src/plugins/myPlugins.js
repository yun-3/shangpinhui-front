// Vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue,options){
    // 这个a是Vue，拿到了之后插件可以给Vue的原型添加东西，全局都有然后......
    // console.log(Vue);
    // 外面传进来的配置对象{},Vue.use(myPlugins,{ name:'upper'})
    // console.log(options);
    // Vue.prototype.$bus:任何组件都能使用
    // Vue.directive(options.name,(element,params)=>{console.log('执行')}) 自定义
    // 上面这个指令在外面这么用：<h1 v-upper="msg"></h1>
    // 下面data里面放msg:"abc"，这样子b就能拿到msg，并且对他做改动
    // 拿到options里面还有modifiers修饰符，比如v-upper.erha="msg"，这样子就能拿到erha:true，比如阻止默认行为
    // Vue.component
    // Vue.filters
    console.log('调用');
}

export default myPlugins;