<template>
  <div>
    <div class="wrap">
      <div class="container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-if="!list._paid">
              <h1>订单提交成功 待支付</h1>
            </span>
            <span v-else>
              <h1>订单已支付</h1>
            </span>
            <router-link
              v-if="!session.isAdmin()"
              class="my-order"
              to="/my/order"
              style="float: right; padding: 3px 0"
            >我的订单</router-link>
          </div>
          <div class="text item">
            <span class="title">订单编号</span>
            <span class="content">{{list.id}}</span>
          </div>
          <div class="text item">
            <span class="title">订单总价</span>
            <span class="content price">￥{{list.sum}}</span>
          </div>
          <div class="text item">
            <span class="title">下单时间</span>
            <span class="content">{{list.created_at}}</span>
          </div>
          <div class="text item" v-if="list._paid">
            <span class="title">支付时间</span>
            <span class="content">{{list._paid_at}}</span>
          </div>
          <div class="text item">
            <span class="title">收货人</span>
            <span class="content">{{userInfo.username}}</span>
          </div>
          <div class="text item">
            <span class="title">联系方式</span>
            <span class="content">{{userInfo.phone}}</span>
          </div>
          <div class="text item">
            <span class="title">收货地址</span>
            <span class="content">{{userInfo.address?userInfo.address:'-'}}</span>
          </div>
        </el-card>
        <div class="list" v-for="it in list.detail" :key="it.id">
          <el-card>
            <el-row class="title" :gutter="10">
              <el-col :span="2">商品图片</el-col>
              <el-col :span="5">商品名称</el-col>
              <el-col :span="4">规格</el-col>
              <el-col :span="3">原价</el-col>
              <el-col :span="3">售价</el-col>
              <el-col :span="2">数量</el-col>
              <el-col :span="2">运费</el-col>
              <el-col :span="3">总计</el-col>
            </el-row>
            <el-row class="content" :gutter="10">
              <el-col class="item" :span="2">
                <img
                  :src="it.product_snapshoot.main_img ? 
              'https://' + it.product_snapshoot.main_img[0]._base_url + '/' + 
               it.product_snapshoot.main_img[0]._key :
               '' "
                >
              </el-col>
              <el-col class="item" :span="5">
                <span>
                  <router-link :to="`/product/${it.product_id}`">{{it.product_snapshoot.title}}</router-link>
                </span>
              </el-col>
              <el-col class="item" :span="4">
                <span v-if="!it.prop">-</span>
                <span v-else>
                  <span v-for="item in it.prop" :key="item.id">{{item}} </span>
                </span>
              </el-col>
              <el-col class="item" :span="3">
                <span>￥{{it.product_snapshoot.price}}</span>
              </el-col>
              <el-col class="item" :span="3">
                <span>￥{{(it.product_snapshoot.price*(it.product_snapshoot.discount||1)).toFixed(2)}}</span>
              </el-col>
              <el-col class="item" :span="2">
                <span>{{it.count}}</span>
              </el-col>
              <el-col class="item" :span="2">
                <span>￥{{it.product_snapshoot.carriage}}</span>
              </el-col>
              <el-col class="item" :span="3">
                <span>
                  ￥{{(it.product_snapshoot.price*(it.product_snapshoot.discount||1)*
                  it.count+
                  it.product_snapshoot.carriage).toFixed(2)}}
                </span>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <el-card v-if="!list._paid&&!session.isAdmin()">
          <div class="pay-amount">
            <span class="title">支付金额</span>
            <span class="price">￥{{list.sum}}</span>
          </div>
          <el-row class="pay-by">
            <el-col class="btn-group" :span="4">
              <button class="pay-btn" @click="createPayUrl('alipay')" type="button">支付宝支付</button>
              <button class="pay-btn" @click="createPayUrl('wechat')" type="button">微信支付</button>
            </el-col>
            <div class="pay-popout">
              <el-dialog :visible.sync="alipayPopupVisible" width="30%" center>
                <span>
                  <p>测试支付金额为0.01元</p>
                  <a :href="order_$payment.url" target="_blank">点击前往支付宝支付</a>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="reloadPage">支付完成</el-button>
                </span>
              </el-dialog>
              <el-dialog :visible.sync="wechatPopupVisible" width="30%" center>
                <span>
                  <p>测试支付金额为0.01元</p>
                  <img :src="order_$payment.qrcode">
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="reloadPage">支付完成</el-button>
                </span>
              </el-dialog>
            </div>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session";
export default {
  data() {
    return {
      list: {},
      userInfo: {},
      order_$payment: {},
      showPay_by: "",
      wechatPopupVisible: false,
      alipayPopupVisible: false,
      session
    };
  },
  mounted() {
    this.list.orderId = this.$route.params.id;
    this.findOrder();
  },
  methods: {
    findOrder() {
      let l = this.list;
      api("order/read", {
        where: { and: { id: l.orderId } }
      }).then(r => {
        this.list = r.data[0];
        this.findUser(this.list.user_id);
      });
    },
    findUser() {
      api("user/read", {
        where: { and: { id: this.list.user_id } }
      }).then(r => {
        this.userInfo = r.data[0];
      });
    },
    createPayUrl(type) {
      api("order/payment/url", {
        id: this.list.id,
        pay_by: type,
        // fee: this.list.sum,
        //测试金额 0.1元
        fee: 0.01,
        return_url: location.origin + "/" + "/#/order"
      }).then(r => {
        this.order_$payment = r.data;
        this.order_$payment.pay_by = type;
        if (type === "alipay") {
          this.alipayPopupVisible = true;
        }
        if (type === "wechat") {
          this.wechatPopupVisible = true;
        }
      });
    },
    reloadPage() {
      location.reload();
    }
  }
};
</script>

<style scoped>
.wrap {
  margin-top: 1rem;
}

.container > * {
  margin-bottom: 1rem;
}

h1,
h3 {
  margin: 0;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.part {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.list {
  text-align: center;
}

.list .title {
  margin-bottom: 1rem;
}

.list .content .item {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  vertical-align: middle;
  padding-top: 0.8rem;
}
.list .content .item:first-of-type {
  padding-top: 0;
}

.pay-amount {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  text-align: right;
}

.pay-amount .title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 1.5rem;
}

.pay-amount .price {
  color: #e10;
  font-weight: bold;
  font-size: 1.5rem;
}

.pay-by .btn-group {
  float: right;
}

.pay-btn {
  width: 170px;
  margin: 1rem 0 0 0;
  border-color: #e10;
  color: #e10;
  font-size: 1rem;
  font-weight: bold;
}

.pay-btn:hover {
  background: #e10;
  border-color: #e10;
  color: #fff;
}

.box-card .my-order {
  margin-top: 0.6rem;
}

.box-card .title,
.box-card .content {
  display: inline-block;
  font-size: 1.2rem;
}

.box-card .title {
  width: 10%;
  font-weight: lighter;
}
.box-card .content {
  width: 80%;
  font-weight: bold;
}
.box-card .text {
  font-size: 1.1rem;
}

.box-card .item {
  margin-bottom: 1.2rem;
}

.box-card .item:last-of-type {
  margin: 0;
}

.box-card .clearfix:before,
.box-card .clearfix:after {
  display: table;
  content: "";
}
.box-card .clearfix:after {
  clear: both;
}
</style>


