<template>
  <div id="app">
    <Header />
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- 在Home和Search下显示，在注册、登录下隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发送请求，获取数据，存储在仓库里
    // 派发一个action，获取商品分类的三级列表
    // 不能放在main.js里面，因为main.js的this是undefined，只有App.vue里的this是Vue能拿到$store
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
</style>