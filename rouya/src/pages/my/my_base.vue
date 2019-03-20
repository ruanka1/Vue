<template>
  <div class="main">
    <el-row class="container">
      <el-col :span="5">
        <el-menu class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="order">
            <i class="el-icon-document"></i>
            <span slot="title">订单</span>
          </el-menu-item>
          <el-menu-item index="setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <div class="container">
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
</style>


