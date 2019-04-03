<template>
  <div class="container">
    <div>
      <ul class="nav-link-group">
        <li class="single-link">
          <a href="#">
            <span class="iconfont">&#xe69e;</span>
            机票
          </a>
        </li>
        <li class="single-link">
          <a href="#">
            <span class="iconfont">&#xe614;</span>
            酒店
          </a>
        </li>
        <li class="single-link">
          <a href="#">
            <span class="iconfont">&#xe8e9;</span>
            公寓
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul class="login-link-group">
        <li class="single-link">
          <a href="#">登录</a>
        </li>
        <li class="single-link">
          <a href="#">我的订单</a>
        </li>
        <li class="single-link">
          <a href="#">关于我们</a>
        </li>
      </ul>
    </div>
    <div class="meta">
      <span>Qunar 京ICP备05021087</span>
      <a>意见反馈</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.container {
  padding: 0.2rem 0;
  background-color: #eee;

  .nav-link-group {
    display: flex;
    width: 6rem;
    margin: 0 auto;
    padding-bottom: 0.1rem;

    .single-link {
      float: left;
      margin: auto;

      a {
        font-size: 0.25rem;
        color: #9e9e9e;
      }
    }
  }

  .login-link-group {
    display: flex;
    align-items: center;
    height: 0.7rem;
    border-bottom: 1px solid #cacaca;

    .single-link {
      float: left;
      padding-left: 0.4rem;
    }
  }

  .meta {
    padding-top: 0.2rem;
    text-align: center;
    color: #9e9e9e;

    a {
      margin-left: 0.1rem;
      color: inherit;
    }
  }
}
</style>


