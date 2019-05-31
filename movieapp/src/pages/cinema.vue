<template>
  <div class="container">
    <Header class="header">
      <h1 class="title" slot="title">影院</h1>
    </Header>
    <div v-if="errorTip" class="error">数据库中暂无该城市相关信息 请在热门城市中重新选择</div>
    <div v-else class="content">
      <ul class="list">
        <li class="item border-bottom" v-for="it in cinemaList" :key="it.id">
          <div class="left">
            <div class="title">{{it.title}}</div>
            <div class="address">{{it.address}}</div>
            <div class="version">
              <span v-for="item in  it.version" :key="item.key">
                <i :class="'iconfont icon-' + item"></i>
              </span>
            </div>
          </div>
          <div class="right">
            <div>
              <span class="price">{{it.price}}元</span>
              <span>起</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Loading v-show="showLoading" class="loading"/>

    <TapBar/>
  </div>
</template>

<script>
import Header from "../components/header";
import TapBar from "../components/tapbar";
import Loading from "../components/loading";
import { mapState } from "vuex";

import { CinemaRequest } from "../models/cinema";
const cinemaRequest = new CinemaRequest();
export default {
  components: { Header, TapBar, Loading },
  data() {
    return {
      cinemaList: [],
      showLoading: false,
      errorTip: false
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

      cinemaRequest
        .readCityCinema({
          where: { city: this.city }
        })
        .then(r => {
          this.showLoading = false;
          if (r.data) {
            this.cinemaList = r.data[0].list;
          } else {
            this.errorTip = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 1;
}
.content {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
}
.content .list {
  margin: 0 0.24rem 1rem 0.24rem;
}
.list .item {
  padding: 0.24rem 0;
}
.list .item:last-child:before {
  border-bottom: 0;
}
.list .item:before,
.list .item:after {
  display: block;
  clear: both;
  content: "";
}
.item .left,
.item .right {
  float: left;
}

.item .left {
  width: 70%;
}
.item .left .title {
  font-size: 0.36rem;
  line-height: 0.5rem;
  padding-bottom: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item .right {
  width: 30%;
  text-align: right;
  line-height: 0.5rem;
}
.right .price {
  font-size: 0.38rem;
  color: #ff4d64;
  padding-right: 0.1rem;
}

.item .left .address {
  font-size: 0.28rem;
  line-height: 0.36rem;
  color: #777;
  padding-bottom: 0.1rem;
}

.left .version .iconfont {
  font-size: 0.5rem;
  padding-right: 0.2rem;
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

