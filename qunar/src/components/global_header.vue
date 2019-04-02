<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header-middle">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <div class="header-right">
      北京
      <span class="iconfont">&#xe64a;</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '../css/varibles.styl';

.header {
  line-height: 0.86rem;
  display: flex;
  color: #fff;
  background-color: $mainColor;

  .header-left {
    width: 0.64rem;
    float: left;
    font-weight: bold;
    display: inline-block;
    text-align: center;
  }

  .header-middle {
    flex: 1;
    margin: 0.13rem 0 0.13rem 0.2rem;
    padding-left: 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: rgba(0, 0, 0, 0.15);
    background: #fff;
    border-radius: 0.06rem;

    .iconfont {
      font-weight: bold;
    }
  }

  .header-right {
    float: right;
    width: 1.24rem;
    text-align: center;

    .iconfont {
      font-size: 0.1rem;
    }
  }
}
</style>



