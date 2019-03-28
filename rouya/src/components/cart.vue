<template>
  <div class="container">
    <div class="cart">
      <el-row slot="header" class="cart-header clearfix">
        <el-col :span="21">
          <span v-if="cartList.length!=0">我的购物车</span>
          <span v-else>撒子都莫得</span>
        </el-col>
        <el-col :span="3">
          <el-button @click="$emit('hideCart')" style="padding: 1px 0" type="text">关闭</el-button>
        </el-col>
      </el-row>
      <el-row class="cart-body" v-for="(it,k) in cartList" :key="(it,k)" body-style="{padding:0}">
        <el-col class="img" :span="6">
          <img
            v-if="it.product_snapshoot.main_img"
            :src="'https://' + it.product_snapshoot.main_img[0]._base_url + '/' + it.product_snapshoot.main_img[0]._key"
            style="width:70px;height:60px"
          >
          <img v-else src=" https://dummyimage.com/70x60">
        </el-col>
        <el-col class="text" :span="17">
          <div class="title">
            <router-link
              :to="`/product/${it.product_id}`"
              target="_blank"
            >{{it.product_snapshoot.title}}</router-link>
          </div>
          <el-row class="body">
            <el-input-number
              size="mini"
              v-model="it.count"
              :min="1"
              :max="it.product_snapshoot.stock"
              @change="updateProduct(it)"
            ></el-input-number>
            <span
              class="price"
            >￥{{(it.count*it.product_snapshoot.price*(it.product_snapshoot.discount||1)).toFixed(2)}}</span>
            <a class="delete-btn" href="#" @click="remove(it.product_id,k)">删除</a>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="cart-footer" v-if="cartList.length!=0">
        <el-col class="total price" :span="9">合计 : ￥{{calculTotalPrice}}</el-col>
        <el-col class="btn-group" :span="15">
          <button type="button" @click="clearCart()">清空</button>
          <button type="button" @click="confirmOrder()">结算</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import session from "../lib/session.js";
import { createOrder } from "../lib/create_order.js";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapGetters(["cartList", "calculTotalPrice"])
  },
  methods: {
    ...mapActions(["updateProduct", "removeProduct", "clearCart"]),

    remove(id, index) {
      this.cartList.splice(index, 1);
      this.removeProduct(id);
    },
    confirmOrder() {
      if (!session.loggedIn()) {
        this.$router.push("/login");
        return;
      }
      if (session.isAdmin()) {
        alert("管理员别闹");
        return;
      }
      createOrder(this.cartList, session.user("id")).then(r => {
        this.$router.push(`/order/${r.data.id}`);
        this.clearCart();
        this.$emit("hideCart");
      });
    }
  }
};
</script>

<style scoped>
button {
  padding: 5px 10px;
}
.container {
  position: relative;
}
.cart {
  position: absolute;
  top: 8px;
  right: 0px;
  z-index: 10;
  width: 300px;
  background-color: #f6f8fa;
  border: 1px solid #ebeef5;
  border-top: 0;
  border-radius: 0 0 4px 4px;
}
.price {
  color: #e10;
  font-weight: bold;
}
.cart-header,
.cart-body {
  padding: 10px;
}

.cart-header {
  border-bottom: 1px solid #ebeef5;
}
.cart-body {
  position: relative;
  border-bottom: 1px dotted #ebeef5;
}
.cart-body .img {
  margin-right: 10px;
}
.cart-body .title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  vertical-align: middle;
  margin-bottom: 8px;
}
.cart-body .price {
  margin-left: 0.3rem;
}
.el-input-number {
  width: 100px;
}
.cart-footer {
  text-align: center;
  padding: 10px;
}
.cart-footer .total {
  padding-top: 0.4rem;
  text-align: left;
}
.cart-footer .btn-group {
  text-align: right;
}
.cart-footer .btn-group button {
  margin-left: 20px;
}
.cart-body .text .body {
  position: relative;
}
.delete-btn {
  position: absolute;
  right: 0;
  top: 4px;
}
</style>



