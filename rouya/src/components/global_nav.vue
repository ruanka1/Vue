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
          <a>购物车</a>
          <span v-if="session.loggedIn()&&!session.isAdmin()">
            <a>{{session.user('username')}}</a>
            <a class="logout" @click="session.logOut()">登出</a>
          </span>
          <span v-else-if="session.loggedIn()&&session.isAdmin()">
            <a>管理</a>
            <a class="logout" @click="session.logOut()">登出</a>
          </span>
          <span v-else>
            <router-link to="/signup">注册</router-link>
            <router-link to="/login">登录</router-link>
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import session from "../lib/session.js";

export default {
  data() {
    return {
      session
    };
  }
};
</script>

<style scoped>
.global-nav {
  background-color: #f7f7f7;
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
</style>
