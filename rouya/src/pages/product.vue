<template>
  <div>
    <GlobalHeader/>
    <div class="main">
      <div class="preview">
        <el-row class="container">
          <el-col class="product-image" :span="8">
            <el-carousel height="360px">
              <el-carousel-item>
                <img src="https://dummyimage.com/500x500">
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col class="product-info" :span="14">
            <div class="product-name">新疆伊犁特产伊力特酒50度伊力柔雅蓝花瓷10十年500ML</div>
            <div class="main-info">
              <dl class="origin">
                <dt class="title">价格</dt>
                <dd class="price">999</dd>
              </dl>
              <dl class="service">
                <dt class="title">本店活动</dt>
                <dd class="text">满100元包邮</dd>
              </dl>
              <dl class="carriage">
                <dt class="title">运费</dt>
                <dd class="price">10</dd>
              </dl>
            </div>
            <div class="other-info">
              <el-row class="sales">
                <el-col :span="8">
                  <span class="title">月销量</span>
                  <span class="amount">999</span>
                </el-col>
                <el-col :span="8">
                  <span class="title">好评数</span>
                  <span class="amount">999</span>
                </el-col>
                <el-col :span="8">
                  <span class="title">累计评价</span>
                  <span class="amount">9999</span>
                </el-col>
              </el-row>
            </div>
            <div class="caution">
              <div class="prop-option">
                <dl class="prop">
                  <dt class="title">属性名1</dt>
                  <button class="prop-button selected">属性值1</button>
                  <button class="prop-button">属性值2</button>
                  <button class="prop-button">属性值3</button>
                </dl>
              </div>
            </div>
            <div class="other-option">
              <dl class="amount">
                <dt class="title">数量</dt>
                <el-input-number :min="1" :max="999" size="mini"></el-input-number>
                <dt class="remain">
                  库存
                  <span>999</span>
                </dt>
              </dl>
            </div>
            <div class="main-button">
              <button class="buy">立即购买</button>
              <button class="add-cart">加入购物车</button>
            </div>
            <div class="other-option promise">
              <dl>
                <dt>服务承诺</dt>
                <a class="item" href="#">正品保障</a>
                <a class="item" href="#">破损包退</a>
                <a class="item" href="#">假一赔十</a>
              </dl>
            </div>
          </el-col>
          <el-col class="side" :span="2">
            <div class="side-item">
              <div class="img-box">
                <a target="_blank">
                  <img class="side-img" src="https://dummyimage.com/100x100">
                </a>
                <span class="tag">热卖</span>
                <p class="side-price price">99</p>
              </div>
              <a class="side-title" target="_blank">伊力柔雅青翠5号白酒 浓香型 50度500克 粮食白酒</a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="detail">
        <div class="container">
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
          <div class="img">
            <div>
              <img src="https://dummyimage.com/1080x500">
            </div>
          </div>
        </div>
      </div>
      <Service/>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "../components/global_header.vue";
import Service from "../components/service.vue";

export default {
  components: { GlobalHeader, Service }
};
</script>



<style scoped>
.preview {
  margin-bottom: 1rem;
  background-color: #fff;
}
.detail {
  background-color: #f9f9f9;
  padding: 1rem 0;
}
.product-info {
  padding: 0 1rem;
}
.product-name {
  padding: 0 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
}
.main-info {
  padding: 0 0.8rem;
}
dl > * {
  display: inline-block;
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
.main-info .origin .price {
  color: #ff0036;
  font-weight: bold;
  font-size: 1.5rem;
}
.main-info .service .text {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  font-weight: bold;
}
.other-info {
  margin-bottom: 1rem;
}
.other-info .carriage,
.other-option {
  padding: 0 0.8rem;
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
  padding-left: 0.5rem;
}
.prop-option:first-of-type .prop {
  padding-top: 0.5rem;
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
  padding-left: 16.5%;
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
.side-item {
  margin-bottom: 1rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
.side-item .side-title {
  font-size: 0.8rem;
}
.side-item .img-box {
  position: relative;
}

.side-item .tag {
  position: absolute;
  top: 0;
  left: 30%;
  padding: 0.1rem 0.3rem;
  background-color: #ff0036;
  color: #fff;
  font-size: 0.5rem;
}
.side-item .side-price {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: #ff0036;
  font-weight: bold;
}
.side-item .side-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  vertical-align: middle;
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
  margin-top: 1rem;
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