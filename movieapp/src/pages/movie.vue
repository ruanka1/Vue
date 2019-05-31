<template>
  <div class="container">
    <Header class="header">
      <h1 class="title" slot="title">详情</h1>
      <a class="iconfont icon-fanhui back" slot="back" @click="goBack"></a>
    </Header>
    <div v-if="detail.movie_id" class="content">
      <div class="prev">
        <div class="bg-img" :style="{background: 'url(' + detail.img + ')'}"></div>
        <div class="cover"></div>
        <div class="wrap">
          <div class="main-img">
            <img :src="detail.img">
          </div>
          <div class="text">
            <div class="title text-item">{{detail.title}}</div>
            <div class="text-item">{{detail.country}} / {{detail.duration}}分钟</div>
            <div class="text-item">{{detail.type}}</div>
            <div class="text-item">{{handelDate(detail.date)}}日上映</div>
          </div>
        </div>
      </div>
      <div class="intro">
        <div class="title">剧情简介</div>
        <div class="text">{{detail.intro}}</div>
      </div>
      <div class="comment">
        <div class="title">精选评论</div>
        <div class="comment-content">
          <div class="no-comment" v-if="!commentList.length">撒子都莫得</div>
          <ul class="list">
            <li class="comment-item" v-for="it in commentList" :key="it.id">
              <div class="meta">
                <div class="user">
                  第{{it.user_id}}号用户
                  <span
                    class="my"
                    v-if="session.loggedIn()&&(it.user_id==session.user().id)"
                  >我</span>
                </div>
                <div class="time">{{handelDate(it.date)}}</div>
              </div>
              <div class="text">{{it.text}}</div>
            </li>
          </ul>
        </div>
      </div>
      <form
        class="comment-form"
        v-if="session.loggedIn()&&!commented"
        @submit.prevent="submitComment"
      >
        <input class="add-comment" v-model="commentText" placeholder="添加评论 不可超过50字符">
        <button class="btn" type="submit">提交</button>
      </form>
    </div>
    <Loading v-else class="loading"/>
  </div>
</template>

<script>
import Header from "../components/header";
import Loading from "../components/loading";
import session from "../lib/session";
import { commentTime } from "../lib/createTime";
import { HomeRequest } from "../models/home";
const homeRequest = new HomeRequest();
export default {
  components: { Header, Loading },
  data() {
    return {
      session,
      commentText: "",
      detail: {
        date: ""
      },
      commented: false,
      commentList: [],
      myComment: {}
    };
  },
  mounted() {
    this.readData();
    this.readComment();
  },
  methods: {
    readData() {
      homeRequest
        .readMovieDetail({
          where: { movie_id: this.$route.params.id }
        })
        .then(r => {
          this.detail = r.data[0];
        });
    },
    readComment() {
      homeRequest
        .readComment({
          where: { movie_id: this.$route.params.id }
        })
        .then(r => {
          if (r.data) {
            this.commentList = r.data;
            if (session.loggedIn()) {
              r.data.forEach(it => {
                if (it.user_id == session.user().id) {
                  this.myComment = it;
                  return (this.commented = true);
                }
              });
            }
          }
        });
    },

    submitComment() {
      if (!this.commentText) return;
      if (this.commentText.length > 50) {
        alert("不可超过50字符");
        return;
      }
      homeRequest
        .createComment({
          user_id: session.user().id,
          text: this.commentText,
          movie_id: this.$route.params.id,
          date: commentTime()
        })
        .then(() => {
          alert("评论成功");
          this.reloadPage();
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    handelDate(str) {
      return str.substring(0, 10);
    },
    reloadPage() {
      location.reload();
    }
  }
};
</script>

<style scoped>
.container .header {
  position: fixed;
  z-index: 999;
}
.container .content {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.content .prev {
  position: relative;
  width: 100%;
  height: 3.6rem;
  overflow: hidden;
}

.content .prev .bg-img {
  width: 100%;
  height: 100%;
  filter: blur(0.25rem);
  position: absolute;
  left: 0;
  top: 0;
}
.content .prev .cover {
  width: 100%;
  height: 100%;
  background-color: #40454d;
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.prev .wrap {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}
.prev .wrap .main-img {
  width: 2.16rem;
  height: 3rem;
  border: 1px solid #efeff0;
  margin: 0.3rem;
}
.prev .wrap .main-img img {
  width: 100%;
  height: 100%;
}

.prev .wrap .text {
  color: #efeff0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem 0;
}
.prev .wrap .text .text-item {
  font-size: 0.3rem;
  line-height: 0.7rem;
}
.prev .wrap .text .title {
  line-height: 0.6rem;
  font-size: 0.46rem;
}
.content .intro {
  margin: 0.3rem;
}

.content .intro .text {
  padding: 0.3rem 0;
  font-size: 0.3rem;
  line-height: 0.46rem;
}

.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment {
  margin: 0 0.3rem 0.3rem 0.3rem;
}
.intro .title,
.comment .title {
  color: #f03d37;
  font-size: 0.36rem;
  font-weight: bold;
}
.comment .comment-item {
  padding: 0.3rem 0;
}
.comment-item .meta {
  font-size: 0.3rem;
  margin-bottom: 0.15rem;
}
.comment-item .meta::before,
.comment-item .meta::after {
  display: block;
  content: "";
  clear: both;
}
.comment-item .meta .user {
  width: 50%;
  float: left;
}

.comment-item .meta .user .my {
  padding-left: 0.2rem;
  color: #f03d37;
}
.comment-item .meta .time {
  width: 50%;
  float: left;
  text-align: right;
}
.comment-item .text {
  font-size: 0.26rem;
  line-height: 0.36rem;
  color: #999;
}

.comment-form {
  padding: 0.1rem 0.3rem;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}

.comment-form .add-comment {
  width: 90%;
}
.comment-form .btn {
  width: 10%;
  background-color: #fff;
}

.no-comment {
  display: flex;
  width: 100%;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.3rem;
}
</style>
