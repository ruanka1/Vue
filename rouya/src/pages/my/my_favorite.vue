<template>
  <div class="wrap">
    <div class="main-title">收藏</div>
    <el-row class="card-group" :gutter="20">
      <el-col class="new-list single-card" v-for="it in favoriteList" :key="it.id" :span="6">
        <el-card :body-style="{ padding: '0px'}" shadow="hover">
          <router-link :to="`/product/${it.$product.id}`">
            <div v-if="it.$product.main_img">
              <img
                :src="'https://' + it.$product.main_img[0]._base_url + '/' + it.$product.main_img[0]._key"
                style="width:250px;height:120px"
              >
            </div>
            <div v-else>
              <img src="https://dummyimage.com/260x150">
            </div>
          </router-link>
          <div style="padding: 16px;">
            <router-link :to="`/product/${it.$product.id}`">
              <span class="product-title">{{it.$product.title}}</span>
            </router-link>
            <div class="product-price">
              <div class="discount" v-if="it.$product.discount&&it.$product.discount!=1">
                <span
                  class="discount-price"
                >￥{{(it.$product.price*it.$product.discount).toFixed(2)}}</span>
                <span class="origin-price">￥{{it.$product.price}}</span>
              </div>
              <div class="origin" v-else>
                <div class="price">￥{{it.$product.price}}</div>
              </div>
            </div>
          </div>
          <span v-if="it.discount&&it.discount!=1" class="discount-board">优惠</span>
          <span class="sales">月售 : {{it.$product.sales}}</span>
        </el-card>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
        :page-size="readParam.limit"
        :current-page="readParam.page"
        layout="prev, pager, next"
        :total="total"
        @current-change="flip"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import api from "../../lib/api";
import session from "../../lib/session";

export default {
  data() {
    return {
      readParam: {
        limit: 8,
        page: 1
      },
      total: 0,
      favoriteList: []
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    read() {
      api("favorite/read", {
        where: {
          and: {
            user_id: session.user("id")
          }
        },
        with: ["belongs_to:product"],
        ...this.readParam
      }).then(r => {
        this.favoriteList = r.data;
        this.total = r.total;
      });
    },
    flip(page) {
      this.readParam.page = page;
      this.read();
    }
  }
};
</script>
<style scoped>
.main-title {
  margin-bottom: 1rem;
}
.el-card {
  margin-bottom: 1rem;
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
.single-card .el-card .discount-board,
.single-card .el-card .sales {
  position: absolute;
  display: inline-block;
  padding: 0.1rem 0.3rem;
  font-size: 0.7rem;
}
.single-card .el-card .sales {
  background-color: #fff;
  right: 0;
  bottom: 0;
}
.single-card .discount-board {
  background-color: red;
  color: #fff;
  right: 0;
  top: 0;
}
.single-card .product-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
}
</style>
