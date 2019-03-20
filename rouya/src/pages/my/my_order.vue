<template>
  <div class="wrap">
    <div class="main-title">我的订单</div>
    <div class="list">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="订单编号" fixed="left" width="80"></el-table-column>
        <el-table-column label="商品图片" width="90">
          <template slot-scope="scope">
            <img
              :src="scope.row.detail[0].product_snapshoot.main_img ? 
              'https://' + scope.row.detail[0].product_snapshoot.main_img[0]._base_url + '/' + 
               scope.row.detail[0].product_snapshoot.main_img[0]._key :
               '' "
            >
          </template>
        </el-table-column>
        <el-table-column label="商品名称" id="product-title" width="300">
          <template slot-scope="scope">
            <router-link
              :to="`/product/${scope.row.detail[0].product_id}`"
            >{{scope.row.detail[0].product_snapshoot.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="订单总价" width="130"></el-table-column>
        <el-table-column label="支付状态" width="120">
          <template slot-scope="scope">
            <div :class="scope.row._paid ? 'paid': 'unpaid'">{{scope.row._paid ? '已支付': '待支付'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="70">
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
import session from "../../lib/session.js";
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
      api("order/read", {
        where: { and: { user_id: session.user("id") } },
        ...this.readParam
      }).then(r => {
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
.wrap {
  padding: 1rem 1rem 0 1rem;
}
.el-table a {
  color: #666;
}
.el-table .paid {
  color: green;
}
.el-table .unpaid {
  color: #e10;
}
.list .product-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  vertical-align: middle;
}
</style>
