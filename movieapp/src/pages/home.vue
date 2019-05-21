<template>
  <div class="container">
    <Header class="header">
      <h1 class="title" slot="title">电影</h1>
    </Header>
    <nav class="nav">
      <div class="item city">
        <router-link to="/city">
          {{city}}
          <i class="iconfont icon-jiantou"></i>
        </router-link>
      </div>
      <div
        :class="'item now '+ (currentTab=='NowPlaying'?'active':'')"
        @click="switchTab('NowPlaying')"
      >正在热映</div>
      <div
        :class="'item soon '+ (currentTab=='CommingSoon'?'active':'')"
        @click="switchTab('CommingSoon')"
      >即将上线</div>
      <div class="item search">
        <router-link to="/search">
          <i class="iconfont icon-xiazai17"></i>
        </router-link>
      </div>
    </nav>
    <div v-if="errorTip" class="error">数据库中暂无该城市相关信息 请在热门城市中重新选择</div>
    <div v-else>
      <div class="wrapper">
        <div :is="currentTab" :list="CommingSoonList" :arr="NowPlayingList"></div>
      </div>
    </div>
    <Loading v-show="showLoading" class="loading"/>
    <TapBar/>
  </div>
</template>

<script>
import Header from "../components/header";
import TapBar from "../components/tapbar";
import Loading from "../components/loading";
import NowPlaying from "../components/home/now_playing";
import CommingSoon from "../components/home/comming_soon";
import { mapState } from "vuex";

import { HomeRequest } from "../models/home";
const homeRequest = new HomeRequest();
export default {
  components: { Header, TapBar, Loading, NowPlaying, CommingSoon },
  data() {
    return {
      currentTab: "NowPlaying",
      NowPlayingList: [],
      CommingSoonList: [],
      errorTip: false,
      showLoading: false,
      longitude: 0,
      latitude: 0,
      locationCity: ""
    };
  },
  mounted() {
    this.readData();
  },
  computed: {
    ...mapState(["city"])
  },
  methods: {
    readData() {
      this.showLoading = true;
      homeRequest.read({ where: { city: this.city } }).then(r => {
        this.showLoading = false;
        if (r.data) {
          this.NowPlayingList = r.data[0].now_playing;
          this.CommingSoonList = r.data[0].comming_soon;
        } else {
          this.errorTip = true;
        }
      });
    },
    switchTab(tab) {
      this.currentTab = tab;
    }
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 1;
}
.nav {
  position: fixed;
  top: 1rem;
  display: flex;
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #ebe8e3;
  z-index: 1;
  background-color: #fff;
}
.nav .item {
  line-height: 0.8rem;
  font-size: 0.28rem;
  flex: 1;
  text-align: center;
}
.nav .item.city {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav .item.city,
.nav .item.search {
  flex-basis: 25%;
}
.nav .item.now,
.nav .item.soon {
  flex: 40%;
  margin: 0 0.2rem;
  font-size: 0.32rem;
}

.nav .item.active {
  color: #f03d37;
  border-bottom: 2px solid #f03d37;
}

.city i {
  font-size: 0.2rem;
}
.nav .item.search {
  font-weight: bold;
}

.wrapper {
  position: absolute;
  top: 1.82rem;
  left: 0;
  right: 0;
  bottom: 0;
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

.error {
  position: absolute;
  top: 2.82rem;
}
</style>

