<template>
  <div>
    <GlobalHeader/>
    <div class="main">
      <div class="preview">
        <el-row class="container">
          <el-col class="product-image" :span="10">
            <el-row>
              <el-carousel height="250px">
                <el-carousel-item v-for="it in row.main_img" :key="it.id">
                  <img
                    :src="  'https://' + it._base_url + '/' + it._key"
                    style="width:450px;height:260px"
                  >
                </el-carousel-item>
              </el-carousel>
            </el-row>
            <el-row>
              <el-button @click="addToFavorite">
                <span v-if="isFavorite">★已收藏</span>
                <span v-else>☆收藏</span>
              </el-button>
            </el-row>
          </el-col>
          <el-col class="product-info" :span="14">
            <div class="product-name">{{row.title}}</div>
            <div class="main-info">
              <div class="discount" v-if="row.discount&&row.discount!=1">
                <dl>
                  <dt class="title">价格</dt>
                  <dd class="price origin-price">{{row.price}}</dd>
                </dl>
                <dl>
                  <dt class="title">优惠价</dt>
                  <dd class="price discount-price">{{(row.price*row.discount).toFixed(2)}}</dd>
                </dl>
              </div>
              <dl class="origin" v-else>
                <dt class="title">价格</dt>
                <dd class="price">{{row.price}}</dd>
              </dl>
              <dl class="service">
                <dt class="title">本店活动</dt>
                <dd class="text blank-link">暂无活动</dd>
              </dl>
              <dl class="carriage">
                <dt class="title">运费</dt>
                <dd class="price">{{row.carriage}}</dd>
              </dl>
            </div>
            <div class="other-info">
              <el-row class="sales">
                <el-col :span="8">
                  <span class="title">月销量</span>
                  <span class="amount blank-link">{{row.sales?row.sales:'0'}}</span>
                </el-col>
                <el-col :span="8">
                  <span class="title">好评数</span>
                  <span class="amount blank-link">999</span>
                </el-col>
                <el-col :span="8">
                  <span class="title">累计评价</span>
                  <span class="amount blank-link">9999</span>
                </el-col>
              </el-row>
            </div>
            <div :class="caution?'caution':''">
              <div class="prop-option" v-for="(item,key) in row.prop" :key="item.value">
                <dl class="prop">
                  <dt class="title">{{key}}</dt>
                  <button
                    :class=" 'prop-button ' + (form.prop[key]===it ? 'selected' : '')"
                    @click="setProp(key,it)"
                    v-for="it in item"
                    :key="it"
                  >{{it}}</button>
                </dl>
              </div>
            </div>
            <div class="other-option">
              <dl class="amount">
                <dt class="title">数量</dt>
                <el-input-number v-model="form.count" :min="1" :max="row.stock" size="mini"></el-input-number>
                <dt class="remain">
                  库存
                  <span>{{row.stock}}</span>
                </dt>
              </dl>
            </div>
            <div class="main-button">
              <button class="buy" @click="confirmOrder">立即购买</button>
              <button class="add-cart" @click="addToShopCart">加入购物车</button>
            </div>
            <div class="promise">
              <dl>
                <dt>服务承诺</dt>
                <a class="item blank-link" href="#!">正品保障</a>
                <a class="item blank-link" href="#!">破损包退</a>
                <a class="item blank-link" href="#!">假一赔十</a>
              </dl>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="detail">
        <div class="container">
          <el-tabs type="border-card">
            <el-tab-pane label="商品详情">
              <div class="list">
                <div>详细参数</div>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
                <span class="item" :span="8">...</span>
              </div>
              <div v-if="!row.detail">
                <img src="https://dummyimage.com/1080x500">
              </div>
              <div v-else v-for="it in row.detail" :key="it.id">
                <div class="part" v-if="it.type==='text'">
                  <div class="text">{{it.value}}</div>
                </div>
                <div class="part" v-else>
                  <div class="img">
                    <img :src="'https://' + it.value._base_url + '/' + it.value._key">
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane class="review-list" label="累计评价">
              <el-row class="single-review" v-for="it in reviewList" :key="it.id">
                <el-row class="meta">
                  <el-col class="name" :span="21">{{it.$user.username}}</el-col>
                  <el-col class="time" :span="3">{{it.review_at}}</el-col>
                </el-row>
                <el-row class="content">{{it.text}}</el-row>
              </el-row>
              <div v-if="reviewList&&reviewList.length!=0" class="pagination">
                <el-pagination
                  :page-size="readParam.limit"
                  :current-page="readParam.page"
                  layout="prev, pager, next"
                  :total="reviewTotal"
                  @current-change="flip"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <Service/>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "../components/global_header.vue";
import Service from "../components/service.vue";
import api from "../lib/api.js";
import session from "../lib/session.js";
import { createOrder } from "../lib/create_order.js";
import { mapActions } from "vuex";

export default {
  components: { GlobalHeader, Service },
  data() {
    return {
      row: {
        id: null
      },
      form: {
        count: 1,
        prop: {}
      },
      caution: false,
      reviewList: [],
      readParam: {
        where: {
          and: {
            product_id: this.$route.params.id
          }
        },
        with: ["belongs_to:user"],
        limit: 5,
        page: 1
      },
      reviewTotal: 0,
      isFavorite: false,
      favoriteId: ""
    };
  },
  mounted() {
    this.row.id = this.$route.params.id;
    this.find();
    this.readReview();
    this.readFavorite();
  },
  methods: {
    ...mapActions(["addToCart"]),
    find() {
      this.disableBtn = false;
      api("product/find", this.row).then(r => {
        this.row = r.data;
        this.handleProp();
      });
    },
    handleProp() {
      let p = this.row.prop;
      let propValue = {};
      for (let key in p) {
        let options = p[key];
        propValue[key] = options.split("|");
      }
      this.$set(this.row, "prop", propValue);
    },

    addToShopCart() {
      if (session.isAdmin()) {
        alert("管理员别闹");
        return;
      }
      if (!this.allPropSelected()) {
        this.caution = true;
        return;
      }

      let product = {
        product_id: this.row.id,
        count: this.form.count,
        product_snapshoot: this.row,
        prop: this.form.prop
      };
      if (session.loggedIn()) product.user_id = session.user("id");

      this.addToCart(product);

      this.caution = false;
    },

    confirmOrder() {
      this.caution = false;
      if (!session.loggedIn()) {
        this.$router.push("/login");
        return;
      }
      if (session.isAdmin()) {
        alert("管理员别闹");
        return;
      }
      if (!this.allPropSelected()) {
        this.caution = true;
        return;
      }
      this.form.product_id = this.row.id;
      //创建商品快照
      this.form.product_snapshoot = this.row;

      createOrder([this.form], session.user("id")).then(r => {
        {
          this.$router.push(`/order/${r.data.id}`);
        }
      });
    },
    //检查属性是否全选
    allPropSelected() {
      let p = this.row.prop;
      for (let key in p) {
        if (!this.form.prop[key]) return false;
      }
      return true;
    },
    setProp(key, value) {
      this.$set(this.form.prop, key, value);
    },
    readReview() {
      api("review/read", this.readParam).then(r => {
        this.reviewList = r.data;
        this.reviewTotal = r.total;
      });
    },
    flip(page) {
      this.readParam.page = page;
      this.readReview();
    },
    readFavorite() {
      api("favorite/read", {
        where: {
          and: {
            user_id: session.user("id"),
            product_id: this.$route.params.id
          }
        }
      }).then(r => {
        if (r.data == null) return (this.isFavorite = false);
        else return (this.isFavorite = true), (this.favoriteId = r.data[0].id);
      });
    },
    addToFavorite() {
      if (!this.isFavorite) {
        api("favorite/create", {
          user_id: session.user("id"),
          product_id: this.$route.params.id
        });
      } else {
        api("favorite/delete", {
          id: this.favoriteId
        });
      }
      return (this.isFavorite = !this.isFavorite);
    }
  }
};
</script>



<style scoped>
.preview {
  margin-bottom: 1rem;
  background-color: #fff;
}
.detail {
  padding: 1rem 0;
}
.product-info {
  padding: 0 1rem;
}
.product-name {
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
}
.main-info {
  padding: 0.5rem 0.8rem;
  background-image: url("../img/bg.png");
}
.main-info > * {
  padding-bottom: 0.5rem;
}
.main-info > :last-child {
  padding: 0;
}
dl > * {
  display: inline-block;
}
dl {
  margin: 0;
}
dl dt {
  width: 15%;
  color: #999;
  font-size: 0.8rem;
}
dl dd {
  width: 30%;
  margin: 0;
}
.price:before {
  content: "￥";
}
.main-info .origin .price,
.main-info .discount-price {
  color: #ff0036;
  font-weight: bold;
  font-size: 1.5rem;
}
.main-info .discount .origin-price {
  text-decoration: line-through;
}
.main-info .service .text {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  font-weight: bold;
}
.other-info {
  margin-bottom: 0.5rem;
}
.other-option {
  margin-top: 0.5rem;
}
.other-info .carriage,
.other-option,
.promise {
  padding: 0 0.5rem;
}
.other-info .sales {
  text-align: center;
}
.carriage .price {
  font-size: 0.8rem;
  color: #666;
}
.sales {
  padding: 0.7rem 0;
  font-size: 0.8rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.sales .title {
  color: #999;
}
.sales .amount {
  margin-left: 0.5rem;
  color: #ff0036;
  font-weight: bold;
}
.sales > :nth-child(2) {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.preview .caution {
  outline: 1px solid #ff0036;
}
.prop-option .prop {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}

.prop-option:last-of-type .prop {
  padding-bottom: 0.5rem;
}
.prop-option .prop-button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.5rem;
}
.prop-option > dl {
  margin: 0;
}
.prop-option .selected,
.main-button .buy {
  color: #fff;
  background-color: #ff0036;
  border-color: #ff0036;
}

.other-option .remain {
  margin-left: 1rem;
}

.main-button {
  margin: 1rem 0;
  padding-left: 16%;
}
.main-button > button {
  font-size: 1rem;
  width: 35%;
  margin-right: 1rem;
}
.main-button .add-cart {
  background-color: #ffeded;
  border: 1px solid #ff0036;
  color: #ff0036;
}
.promise .item {
  font-size: 0.7rem;
  color: #999;
  margin-right: 1rem;
}
.detail .list {
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #fff;
}
.detail .item {
  display: inline-block;
  width: 31%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
  margin-right: 1rem;
}
.detail .part {
  padding: 1rem;
  background-color: #fff;
}
.detail .part .img {
  text-align: center;
}
.el-tabs--border-card {
  box-shadow: none;
}
.single-review {
  padding: 1rem 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.single-review:last-child {
  border-bottom: 0;
}
.pagination {
  padding-bottom: 0;
}
.single-review .meta {
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
}
.meta .name {
  font-size: 0.9rem;
}
.meta .time {
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
}
.product-name,
.meta .name,
.single-review .content {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
/* 轮播样式开始 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 轮播样式结束 */
</style>