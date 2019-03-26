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
                  style="width:550px;height:300px"
                >
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
                <router-link to="/search?keyword=花瓷">
                  <img
                    src="https://mock-cdn.biaoyansu.com/MOCK-FILE-5c93a6d89f6664.55775665.gif"
                    class="image"
                  >
                  <div style="padding: 14px; text-align:center">伊力柔雅花瓷系列</div>
                </router-link>
              </el-card>
            </el-col>
            <el-col class="single-shortcut" :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <router-link to="/search?keyword=青翠">
                  <img
                    src="https://mock-cdn.biaoyansu.com/MOCK-FILE-5c93a4cd6bb2e4.74187379.gif"
                    class="image"
                  >
                  <div style="padding: 14px; text-align:center">伊力柔雅青翠系列</div>
                </router-link>
              </el-card>
            </el-col>
            <el-col class="single-shortcut" :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <router-link to="/search?keyword=典藏">
                  <img
                    src="https://mock-cdn.biaoyansu.com/MOCK-FILE-5c93aa6f3a36b2.40978679.png"
                    class="image"
                  >
                  <div style="padding: 14px; text-align:center">伊力典藏系列</div>
                </router-link>
              </el-card>
            </el-col>
            <el-col class="single-shortcut" :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <router-link to="/search?keyword=封坛">
                  <img
                    src="https://mock-cdn.biaoyansu.com/MOCK-FILE-5c93aa6aaf3768.41041496.gif"
                    class="image"
                  >
                  <div style="padding: 14px; text-align:center">伊力封坛年份系列</div>
                </router-link>
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
                    <img
                      :src="'https://' + it.main_img[0]._base_url + '/' + it.main_img[0]._key"
                      style="width:260px;height:150px"
                    >
                  </div>
                  <div v-else>
                    <img src="https://dummyimage.com/260x150">
                  </div>
                </router-link>
                <div style="padding: 14px;">
                  <router-link :to="`/product/${it.id}`">
                    <span class="product-title">{{it.title}}</span>
                  </router-link>
                  <div class="product-price">
                    <div class="discount" v-if="it.discount&&it.discount!=1">
                      <span class="discount-price">￥{{(it.price*it.discount).toFixed(2)}}</span>
                      <span class="origin-price">￥{{it.price}}</span>
                    </div>
                    <div class="origin" v-else>
                      <div class="price">￥{{it.price}}</div>
                    </div>
                  </div>
                </div>
                <span class="sales">月售 : {{it.sales}}</span>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="hot-product">
        <div class="container">
          <div class="title">
            <h2>热销</h2>
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
                  <div v-if="it.main_img">
                    <img
                      :src="'https://' + it.main_img[0]._base_url + '/' + it.main_img[0]._key"
                      style="width:260px;height:150px"
                    >
                  </div>
                  <div v-else>
                    <img src="https://dummyimage.com/260x150">
                  </div>
                </router-link>
                <div style="padding: 14px;">
                  <router-link :to="`/product/${it.id}`">
                    <span class="product-title">{{it.title}}</span>
                  </router-link>
                  <div class="product-price">
                    <div class="discount" v-if="it.discount&&it.discount!=1">
                      <span class="discount-price">￥{{(it.price*it.discount).toFixed(2)}}</span>
                      <span class="origin-price">￥{{it.price}}</span>
                    </div>
                    <div class="origin" v-else>
                      <div class="price">￥{{it.price}}</div>
                    </div>
                  </div>
                </div>
                <span class="sales">月销 : {{it.sales}}</span>
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
.product-price .origin-price {
  text-decoration: line-through;
  font-size: 0.8rem;
  color: #000;
  font-weight: lighter;
  padding-left: 0.5rem;
}

.single-card .el-card {
  position: relative;
}
.single-card .el-card .sales {
  position: absolute;
  display: inline-block;
  background-color: #fff;
  right: 0;
  bottom: 0;
  padding: 0.1rem 0.3rem;
  font-size: 0.7rem;
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
