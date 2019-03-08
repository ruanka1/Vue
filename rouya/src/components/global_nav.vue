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
          <span>
            <a>注册</a>
            <a>登录</a>
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
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
  color: #333;
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
