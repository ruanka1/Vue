<template>
  <div class="container border-top">
    <ul class="tap">
      <router-link to="/home" class="item" tag="li">
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link to="/cinema" class="item" tag="li">
        <i class="iconfont icon-yingyuana"></i>
        <p>影院</p>
      </router-link>
      <router-link to="/my" class="item" tag="li">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1rem;
  background-color: #fff;
}

.container .tap {
  display: flex;
  align-items: center;
  height: 1rem;
  text-align: center;
}

.tap .item {
  flex: 1;
  height: 0.8rem;
}
.tap .item.router-link-active {
  color: #f03d37;
}

.item .iconfont {
  font-size: 0.4rem;
}

.item p {
  line-height: 0.5rem;
  font-size: 0.24rem;
}
</style>
