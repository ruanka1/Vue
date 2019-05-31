<template>
  <div class="container">
    <Header class="header">
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
      <!-- <div class="test-account">
        <div class="account">测试账号：123456</div>
        <div class="password">测试密码：123123</div>
      </div>-->
    </div>
    <div v-else>
      <div class="user-info border-bottom">
        <div class="username">欢迎 {{session.user().phone}}</div>
        <div class="logout" @click="clickToSetting">设置</div>
        <div class="logout" @click="logOut">登出</div>
      </div>
      <div v-if="!noComment" class="comment-list">
        <ul class="list">
          <div v-if="myCommentList" class="title">我评论过的电影</div>
          <div v-else class="title">还没有评论过电影</div>
          <router-link
            :to="`/movie/${it.movie_id}`"
            class="item border-bottom"
            v-for="it in myCommentList"
            :key="it.id"
            tag="li"
          >
            <SingleMovie class="single-movie-cmp" :detail="it.$movie"/>
            <div class="meta">
              <div class="user">我的评论</div>
              <div class="time">{{(it.date).substring(0, 10)}}</div>
            </div>
            <div class="text">{{it.text}}</div>
          </router-link>
        </ul>
      </div>
      <div v-else>还没有评论过</div>
    </div>
    <TapBar/>
  </div>
</template>

<script>
import Header from "../components/header";
import TapBar from "../components/tapbar";
import Login from "../components/my/login";
import Signup from "../components/my/signup";
import SingleMovie from "../components/single_movie";

import session from "../lib/session";
import { HomeRequest } from "../models/home";
const homeRequest = new HomeRequest();
export default {
  components: { Header, TapBar, Login, Signup, SingleMovie },
  data() {
    return {
      currentTab: "login",
      loggedIn: null,
      session,
      myCommentList: [],
      noComment: null,
      showSetting: false
    };
  },
  mounted() {
    if (session.loggedIn()) this.readMyComment();
  },

  methods: {
    readMyComment() {
      homeRequest
        .readComment({
          where: {
            and: {
              user_id: session.user().id
            }
          },
          with: ["belongs_to:movie"]
        })
        .then(r => {
          if (r) {
            this.myCommentList = r.data;
          } else {
            this.noComment = true;
          }
        });
    },

    logOut() {
      session.logOut();
    },
    switchTab(tab) {
      this.currentTab = tab;
    },
    clickToSetting() {
      this.$router.push("/setting");
    }
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 1;
}

.container .wrapper {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
}
.nav {
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

.user-info {
  position: fixed;
  z-index: 1;
  top: 1rem;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.4rem;
  background-color: #fff;
}

.username {
  flex-basis: 80%;
  margin-left: 0.3rem;
}

.logout {
  flex-basis: 20%;
  border: 1px solid #f03d37;
  border-radius: 5px;
  text-align: center;
  padding: 0.1rem;
  margin-right: 0.2rem;
}

.comment-list {
  position: absolute;
  top: 2.02rem;
  left: 0;
  right: 0;
  bottom: 0;
}

.comment-list .list {
  margin: 0 0.24rem 1.5rem 0.24rem;
  overflow: hidden;
}

.comment-list .list .title {
  padding-top: 0.24rem;
  font-size: 0.32rem;
}

.comment-list .list .item {
  padding-bottom: 0.2rem;
}

.comment-list .list .item:last-child:before {
  border-bottom: 0;
}

.comment-list .list .meta {
  padding-bottom: 0.2rem;
  font-size: 0.3rem;
}

.comment-list .list .meta::before,
.comment-list .list .meta::after {
  display: block;
  content: "";
  clear: both;
}

.comment-list .list .meta .user {
  width: 50%;
  float: left;
}

.comment-list .list .meta .time {
  width: 50%;
  float: left;
  text-align: right;
}

.test-account {
  position: absolute;
  top: 7rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  line-height: 1rem;
}

.item .text {
  line-height: 0.4rem;
}
</style>
