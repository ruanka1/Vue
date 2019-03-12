<template>
  <div>
    <el-row class="container">
      <el-col class="side" :span="4">
        <el-menu class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="product">
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="order">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="brand">
            <i class="el-icon-document"></i>
            <span slot="title">品牌管理</span>
          </el-menu-item>
          <el-menu-item index="cat">
            <i class="el-icon-document"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="containr">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.side {
  padding: 1rem 0;
}
</style>