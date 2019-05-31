<template>
  <div class="container">
    <Header class="header">
      <h1 class="title" slot="title">设置</h1>
      <router-link to="/my" class="iconfont icon-fanhui back" slot="back"/>
    </Header>
    <div class="content"></div>
  </div>
</template>

<script>
import Header from "../components/header";
export default {
  components: { Header }
};
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 1;
}
</style>
