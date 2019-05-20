<template>
  <div class="container">
    <Header>
      <h1 class="title" slot="title">我的</h1>
    </Header>
    <div v-if="!session.loggedIn()" class="wrapper">
      <div class="nav">
        <div class="tab">
          <div
            :class="'login tab-item '+ (currentTab=='login'?'active':'')"
            @click="switchTab('login')"
          >登录</div>
          <div
            :class="'signup tab-item '+ (currentTab=='signup'?'active':'')"
            @click="switchTab('signup')"
          >注册</div>
        </div>
      </div>
      <div class="content">
        <div :is="currentTab"></div>
      </div>
    </div>
    <div v-else class="user-info">
      <div class="username">欢迎 {{session.user().phone}}</div>
      <div class="logout" @click="logOut">登出</div>
    </div>
    <TapBar/>
  </div>
</template>

<script>
import Header from "../components/header";
import TapBar from "../components/tapbar";
import Login from "../components/my/login";
import Signup from "../components/my/signup";
import session from "../lib/session";

export default {
  components: { Header, TapBar, Login, Signup },
  data() {
    return {
      currentTab: "login",
      loggedIn: null,
      session
    };
  },
  mounted() {},

  methods: {
    logOut() {
      session.logOut();
    },
    switchTab(tab) {
      this.currentTab = tab;
    }
  }
};
</script>

<style scoped>
.nav {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.9rem;
  background-color: #f03d37;
  padding: 0 0.2rem;
}

.nav .tab {
  border: 1px solid #fff;
  border-radius: 3px;
}

.tab .tab-item {
  line-height: 0.32rem;
  width: 1%;
  font-size: 0.16rem;
  display: table-cell;
  text-align: center;
  color: #fff;
  padding: 0.2rem;
  font-size: 0.36rem;
}
.tab-item.active {
  background-color: #fff;
  color: #f03d37;
  border-radius: 3px;
}
.content {
  position: absolute;
  top: 1.9rem;
  left: 0;
  right: 0;
  bottom: 0;
}

.user-info {
  width: 6rem;
  height: 5rem;
  margin: 0 auto;
  margin-top: 2rem;
  text-align: center;
  font-size: 0.6rem;
}
.username {
  padding-bottom: 1rem;
}
.logout {
  width: 100%;
  height: 0.8rem;
  background: #f03d37;
  border-radius: 5px;
  border: none;
  display: block;
  color: #fff;
  font-size: 0.5rem;
  margin-top: 0.5rem;
  line-height: 0.8rem;
}
</style>
