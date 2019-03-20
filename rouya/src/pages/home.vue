<template>
  <div class="main">
    <GlobalHeader/>
    <div class="first-screen">
      <div class="slide">
        <el-row class="container">
          <el-carousel :interval="3000" type="card" height="300px">
            <el-carousel-item v-for="it in slideProduct_list" :key="it.id">
              <router-link :to="`/product/${it.id}`">
                <img
                  v-if="it.slide_img"
                  :src="'https://' + it.slide_img._base_url + '/' + it.slide_img._key"
                >
                <img src="https://dummyimage.com/600x300">
              </router-link>
            </el-carousel-item>
          </el-carousel>
        </el-row>
      </div>
      <div class="shortcut-box">
        <el-row class="container">
          <el-row class="short-group" :gutter="20">
            <el-col class="single-shortcut" :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img src="https://dummyimage.com/253x152" class="image">
                <div style="padding: 14px;">
                  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </div>
    <div class="section">
      <div class="new-product">
        <div class="container">
          <div class="title">
            <h2>新品</h2>
            <span class="more">
              <a class="fr" href="#">查看更多</a>
            </span>
          </div>
          <el-row class="card-group" :gutter="20">
            <el-col
              class="new-list single-card"
              v-for="it in newProduct_list"
              :key="it.id"
              :span="6"
            >
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <router-link :to="`/product/${it.id}`">
                  <div v-if="it.main_img">
                    <img :src="'https://' + it.main_img[0]._base_url + '/' + it.main_img[0]._key">
                  </div>
                  <div v-else>
                    <img src="https://dummyimage.com/275x165">
                  </div>
                </router-link>
                <div style="padding: 14px;">
                  <router-link :to="`/product/${it.id}`">
                    <span class="product-title">{{it.title}}</span>
                  </router-link>
                  <div class="product-price">￥{{it.price}}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="hot-product">
        <div class="container">
          <div class="title">
            <h2>热销</h2>
            <span class="more">
              <a class="fr" href="#">查看更多</a>
            </span>
          </div>
          <el-row class="card-group" :gutter="20">
            <el-col
              class="hot-list single-card"
              v-for="it in hotProduct_list"
              :key="it.id"
              :span="6"
            >
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <router-link :to="`/product/${it.id}`">
                  <img :src="'https://' + it.main_img[0]._base_url + '/' + it.main_img[0]._key">
                </router-link>
                <div style="padding: 14px;">
                  <router-link :to="`/product/${it.id}`">
                    <span class="product-title">{{it.title}}</span>
                  </router-link>
                  <div class="product-price">￥{{it.price}}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <Service/>
  </div>
</template>

<script>
import GlobalHeader from "../components/global_header.vue";
import Service from "../components/service.vue";
import api from "../lib/api.js";

export default {
  components: { GlobalHeader, Service },
  data() {
    return {
      newProduct_list: [],
      hotProduct_list: [],
      slideProduct_list: []
    };
  },
  mounted() {
    this.read("new");
    this.read("hot");
    this.read("slide");
  },
  methods: {
    read(type) {
      api("product/read", {
        where: { and: { [type + "_product"]: true } }
      }).then(r => {
        this[type + "Product_list"] = r.data;
      });
    }
  }
};
</script>


<style scoped>
.section {
  padding: 1rem 0;
  background-color: #f7f7f7;
}
h2 {
  display: inline-block;
  margin: 0;
}
.slide,
.shortcut-box {
  margin: 1rem 0 1.5rem 0;
}
.sidebar {
  height: 300px;
  background: rgba(0, 0, 0, 0.1);
}
.sidebar .link-item {
  display: block;
  font-size: 1.2rem;
  padding: 0.77rem 0 0.77rem 1rem;
}
.sidebar .link-item:hover {
  text-decoration: none;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
.single-card {
  padding-bottom: 1rem;
}
.title {
  padding: 1rem 0 1.5rem 0;
}
.title .more a {
  padding: 0.5rem 0;
}

.single-card .product-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
}
.long-image-banner {
  margin: 1rem auto;
}
.product-price {
  padding-top: 0.5rem;
  color: #e10;
  text-align: center;
  font-weight: bold;
}
/* slide样式开始 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* slider样式结束 */
</style>
