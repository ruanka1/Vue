<template>
  <div class="global-nav">
    <div class="container">
      <el-row class="nav">
        <el-col class="nav-left" :span="12">
          <router-link to="/">首页</router-link>
          <a href="#">品牌</a>
          <a href="#">排行</a>
          <a href="#">经销商查询</a>
          <a href="#">下载App</a>
          <a href="#">周边服务</a>
        </el-col>
        <el-col class="nav-right" :span="12">
          <span v-if="cartList.length==0">
            <a @click="cartVisible=!cartVisible">购物车</a>
          </span>
          <span v-else>
            <el-badge class="item" :value="cartList.length">
              <a @click="cartVisible=!cartVisible">购物车</a>
            </el-badge>
          </span>
          <span v-if="session.loggedIn()&&!session.isAdmin()">
            <router-link to="/my">{{session.user('username')}}</router-link>
            <a class="logout" @click="session.logOut()">登出</a>
          </span>
          <span v-else-if="session.loggedIn()&&session.isAdmin()">
            <router-link to="/admin">管理</router-link>
            <a class="logout" @click="session.logOut()">登出</a>
          </span>
          <span v-else>
            <router-link to="/signup">注册</router-link>
            <router-link to="/login">登录</router-link>
          </span>
        </el-col>
      </el-row>
    </div>
    <Cart @hideCart="cartVisible=false" v-show="cartVisible"/>
  </div>
</template>

<script>
import session from "../lib/session.js";
import Cart from "./cart.vue";
import { mapGetters } from "vuex";

export default {
  components: { Cart },
  data() {
    return {
      session,
      cartVisible: false
    };
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped>
.global-nav {
  background-color: #f1f1f1;
  height: 2rem;
  font-size: 0.7rem;
  padding: 0.5rem 0;
}
.global-nav a {
  color: #b0b0b0;
}
.global-nav a:hover {
  color: #922b2f;
}
.nav-left a {
  padding-right: 1.5rem;
}
.nav-right {
  text-align: right;
}
.nav-right a {
  padding-left: 1.5rem;
}
.logout {
  text-decoration: none;
  cursor: pointer;
}
.el-badge {
  display: inline-block;
  margin: 0;
  vertical-align: top;
}
</style>
