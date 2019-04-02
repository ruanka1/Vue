<template>
  <div class="search">
    <regular-nav :pendingLoad="pendingLoad"></regular-nav>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="catBar border-top border-bottom">
      <div class="container">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="$refs.filter && $refs.filter.countryList.length>0 && country"
        >{{country}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="category">{{category}}</el-breadcrumb-item>
        <span class="product-count">搜索到的商品共{{q.total}}个</span>
      </div>
    </el-breadcrumb>
    <search-filter :q="q" @resetPage="resetPage" @read="readProduct" ref="filter"></search-filter>

    <div
      class="main container"
      v-loading="pendingLoad"
      element-loading-background="rgba(255, 255, 255,.3)"
    >
      <el-row class="product-wrapper" :gutter="15" v-if="list.length>0">
        <el-col class="col-50" v-for="(it, index) in list" :key="index">
          <product-card :product="it"></product-card>
        </el-col>
      </el-row>
      <div class="no-product" v-if="!pendingLoad && list.length === 0">
        <div class="prompt border">
          没找到"
          <span class="main-text">{{$route.query.keyword}}</span>
          "相关产品，为你推荐以下商品
        </div>
        <el-row class="product-wrapper" :gutter="15">
          <el-col class="col-50" v-for="(it, index) in recommendList" :key="index">
            <product-card :product="it"></product-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-pagination
      v-if="q.total>20"
      class="pagination"
      background
      layout="prev, pager, next"
      @current-change="reload()"
      :page-size="q.limit"
      :current-page.sync="q.page"
      :total="q.total"
    ></el-pagination>
  </div>
</template>

<script>
import regularNav from "@/components/regularNav";
import productCard from "@/components/productCard";
import searchFilter from "./components/filter";
import { mapState } from "vuex";

export default {
  components: {
    regularNav,
    searchFilter,
    productCard
  },
  data() {
    return {
      list: [],
      recommendList: [],
      pendingLoad: false,
      q: {
        limit: 20,
        page: 1,
        total: null
      }
    };
  },
  computed: {
    ...mapState(["rootCat"]),

    // 计算当前选中的国家
    country() {
      let re = "";

      this.$refs.filter.countryList.forEach(el => {
        if (el.id == this.q["@country_id"]) re = el.name;
      });
      return re;
    },

    // 计算当前选中的分类
    category() {
      let re = "";
      this.rootCat.forEach(el => {
        if (el.id == this.q["@root_cat_id"]) re = el.name;
      });
      return re;
    }
  },
  watch: {
    // 监视当前路由，路由发生变化时，就获取一次数据
    $route() {
      this.q = { ...this.$route.query };
      this.readProduct();
    }
  },
  mounted() {
    // 页面渲染前将url中的query赋值给q，根据query渲染页面
    this.q = { ...this.q, ...this.$route.query };
    this.readProduct();
  },
  methods: {
    readProduct() {
      this.pendingLoad = true;

      let q = this.q;
      // pagination 只接受数字，需将其转换数字
      q.limit = parseInt(q.limit);
      q.page = parseInt(q.page);
      q.total = parseInt(q.total);

      // 筛选产品列表的属性
      let keywordQuery = `"name" contains "${q.keyword ? q.keyword : ""}"`;
      let minPriceQuery = q.minPrice ? `and "price" >= ${q.minPrice}` : "";
      let maxPriceQuery = q.maxPrice ? `and "price" <= ${q.maxPrice}` : "";
      let freeShoppingQuery = q.freight ? `and "freight" = 0` : "";
      let discountQuery = q.discount ? `and "oldPrice" > 0` : "";
      let availableQuery = q.available ? `and "inventory" > 0` : "";
      let propFilterQuery = "";

      this.forEachPropFilter(r => {
        propFilterQuery += r;
      });

      // where:{and:{xx:xx}} 请求传参
      let query = `where(${keywordQuery}
        ${minPriceQuery}
        ${maxPriceQuery} 
        ${freeShoppingQuery}
        ${discountQuery}
        ${availableQuery}
        ${propFilterQuery}
        )`;

      let params = {
        query,
        sort_by: [q.sortBy ? q.sortBy : "id", q.sort ? "up" : "down"],
        limit: q.limit,
        page: q.page
      };

      // 如果没有数据，就去请求推荐产品
      api("product/read", params).then(r => {
        if (!r.success) return;
        if (r.data) {
          this.list = r.data;
          this.q.total = r.total;
          this.pendingLoad = false;
        } else
          api("product/read", { limit: 20 }).then(r => {
            this.list = [];
            this.recommendList = r.data;
            this.q.total = 20;
            this.pendingLoad = false;
            // 每次获取完数据回顶部
            scrollTo(0, 0);
          });
      });
    },

    // 筛选带有query中带有@的传参
    // @开头的传参是按照xx_id来获取数据
    forEachPropFilter(fn) {
      for (let key in this.q) {
        if (key.startsWith("@")) {
          // 如果是空值就返回
          if (!this.q[key]) continue;
          // @去掉、写好传参，调用回调函数
          let k = key.slice(1);
          let cell = `and "${k}" = ${this.q[key]}`;
          fn && fn(cell);
        }
      }
    },

    reload() {
      this.$router.push({
        path: "/search",
        query: { ...this.q }
      });
    },

    // 当需要筛选时，将页数回到第一页
    resetPage() {
      this.q.page = 1;
      this.reload();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/css/var.styl';

.catBar {
  line-height: 40px;
  background: #fff;
  margin-bottom: 16px;

  .product-count {
    margin-left: 18px;
    color: #aaa;
  }
}

.main {
  min-height: 300px;
}

.col-50 {
  width: 20%;
}

.product-wrapper {
  margin-bottom: 20px;
}

.no-product {
  .prompt {
    background: #fff8db;
    line-height: 32px;
    padding-left: 32px;
    margin-bottom: 12px;

    .main-text {
      color: #e10;
    }
  }
}

.pagination {
  text-align: center;
  margin-bottom: 40px;
}
</style>