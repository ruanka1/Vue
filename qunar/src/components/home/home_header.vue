<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header-middle">
      <a href="#" class="link">
        <span class="iconfont">&#xe632;</span>
        输入城市/景点/游玩主题
      </a>
    </div>
    <div class="header-right">
      <router-link to="/city">
        {{cityModule.currentCity}}
        <span class="iconfont">&#xe64a;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["cityModule"])
  }
};
</script>
<style lang="stylus" scoped>
.header {
  line-height: 0.86rem;
  display: flex;
  color: #fff;
  background-color: #00afc7;

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
    background: #fff;
    border-radius: 0.06rem;

    .link {
      display: block;
      color: rgba(0, 0, 0, 0.15);
    }

    .iconfont {
      font-weight: bold;
    }
  }

  .header-right {
    float: right;
    min-width: 1.04rem;
    padding: 0 0.1rem;
    text-align: center;

    a {
      color: #fff;
    }

    .iconfont {
      font-size: 0.1rem;
    }
  }
}
</style>



