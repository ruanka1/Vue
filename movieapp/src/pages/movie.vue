<template>
  <div class="container">
    <Header>
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
      <div class="intro">{{detail.intro}}</div>
    </div>
    <Loading v-else class="loading"/>
  </div>
</template>

<script>
import Header from "../components/header";
import Loading from "../components/loading";
import { HomeRequest } from "../models/home";
const homeRequest = new HomeRequest();
export default {
  components: { Header, Loading },
  data() {
    return {
      detail: {
        date: ""
      }
    };
  },
  mounted() {
    this.readData();
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
    goBack() {
      this.$router.go(-1);
    },
    handelDate(str) {
      return str.substring(0, 10);
    }
  }
};
</script>

<style scoped>
.container .content {
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
  z-index: 1;
}
.prev .wrap {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
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
  padding: 0.3rem;
  font-size: 0.32rem;
  line-height: 0.5rem;
  text-indent: 0.7rem;
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
</style>
