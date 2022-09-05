<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航，必须要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    // 退出登录
    async logout() {
      try {
        // 1、发请求通知服务器退出登录
        // 清除项目中的数据
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        slert(error.message);
      }
    },
    goSearch() {
      // 路由传参
      // this.$router.push("/search/" + this.keyword + "?k=" + this.keyword.toUpperCase());
      if (this.$route.query) {
        let location = {
          name: "search",
          params: {
            keyword: this.keyword || undefined,
          },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
      // query: { k: this.keyword.toUpperCase() },}
      // 路由传递参数（对象写法）path是否可以结合params参数一起使用
      // 相当于把name改成path，不可以这么用
      // 如何确定params参数可传可不传，也就是说:keyword我不传怎么样？路径会出现问题，也就是search没了
      // 配置路由的时候在占位后面加一个问好，代表可有可无
      // 如果我穿得keyword是空的会怎么样？路径还是出错，search还是没有
      // 使用undefined解决：params参数可传递，不传递（空的）
      // this.$router.push({name:'search',params:{keyword:''||undefined}})
      // 路由组件能不能传props数据
      // 可以的，有三种写法
      // 编程式路由多次执行会有NavigationDuplicated的警告错误，因为push（）返回的是一个promise函数,给push传递成功失败函数
      // 声明式导航没有，因为vue-router底层已经处理好了
      // 这种做法治标不治本，每次都要在后面传这个
      // this.$router.push({name:'search',params:{keyword:''||undefined}},()=>{},()=>{})
    },
    mounted() {
      // 通过bus清楚关键字
      this.$bus.$on("clear", () => {
        this.keyword = "";
      });
    },
  },
};
</script>

<style <style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>>