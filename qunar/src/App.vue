<template>
  <div id="app">
    <!-- 缓存数据 减少异步请求 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
