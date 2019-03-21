<template>
  <div class="wrap">
    <div>
      <span class="main-title">订单管理</span>
      <span>共有{{total}}个订单</span>
    </div>
    <div class="list">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="订单编号" width="80"></el-table-column>
        <el-table-column label="商品名称" id="product-title" width="300">
          <template slot-scope="scope">
            <router-link
              :to="`/product/${scope.row.detail[0].product_id}`"
            >{{scope.row.detail[0].product_snapshoot.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="订单总价" width="100"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
        <el-table-column label="支付状态" width="80">
          <template slot-scope="scope">
            <div :class="scope.row._paid ? 'paid': 'unpaid'">{{scope.row._paid ? '已支付': '待支付'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <router-link :to="`/order/${scope.row.id}`">查看详情</router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import api from "../../lib/api.js";
export default {
  data() {
    return {
      list: [],
      readParam: {
        limit: 10,
        page: 1
      },
      total: 0
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    read() {
      api("order/read", this.readParam).then(r => {
        this.list = r.data;
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
.editForm {
  margin: 1rem 0;
}
form {
  padding: 1rem 0;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.item {
  display: block;
  margin-bottom: 1rem;
}
.item .title {
  display: inline-block;
  width: 5rem;
  text-align: right;
  margin-right: 1rem;
}
.item input {
  width: 15rem;
}
.btn {
  margin-left: 6rem;
  margin-right: 1rem;
}
.el-table .paid {
  color: green;
}
.el-table .unpaid {
  color: #e10;
}
</style>