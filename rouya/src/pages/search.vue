<template>
  <div>
    <div class="header-search">
      <el-row class="container">
        <GlobalHeader/>
      </el-row>
    </div>
    <div class="main">
      <div class="filter-rank">
        <div class="container">
          <SearchFilter
            @change="setPropFilter('cat_id',$event)"
            @clear="removePropFilter('cat_id')"
            :initial="filterRestore.cat_id"
            propName="分类"
            type="cat"
            :data="catList"
          />
          <div class="rank">
            <el-button-group class="left">
              <el-button
                :type="searchObj.sortBy=='id'?'primary':''"
                @click="sortBy('id')"
                size="medium"
              >综合</el-button>
              <el-button
                :type="searchObj.sortBy=='sales'?'primary':''"
                @click="sortBy('sales')"
                size="medium"
              >销量</el-button>
              <el-button
                :type="searchObj.sortBy=='price'?'primary':''"
                @click="sortBy('price')"
                size="medium"
              >
                价格
                <span v-if="searchObj.sortBy=='price'">
                  <i class="el-icon-caret-top" v-if="searchObj.sortUp"></i>
                  <i class="el-icon-caret-bottom" v-else></i>
                </span>
              </el-button>
            </el-button-group>
            <div class="middle">
              <input
                class="min-price"
                @keyup="reload()"
                v-model="searchObj.minPrice"
                size="medium"
                placeholder="最低价格"
              >
              <input
                class="max-price"
                @keyup="reload()"
                v-model="searchObj.maxPrice"
                size="medium"
                placeholder="最高价格"
              >
            </div>
            <div class="right">
              <label></label>
              <input
                @click="toggleBool('noCarriage')"
                :checked="searchObj.noCarriage"
                type="checkbox"
              >包邮
              <input
                @click="toggleBool('discount')"
                :checked="searchObj.discount"
                type="checkbox"
              >
              优惠
            </div>
          </div>
        </div>
      </div>
      <div class="search-result">
        <div class="container">
          <div v-if="total!=0">
            <el-row class="card-group" :gutter="20">
              <el-col class="single-card" v-for="it in list" :span="6" :key="it.id">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <router-link :to="`/product/${it.id}`">
                    <img
                      :src="it.main_img?'https://' + it.main_img[0]._base_url + '/' + it.main_img[0]._key:''
                  "
                      style="width:260px;height:150px"
                    >
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
            <div class="pagination">
              <el-pagination
                :total="total"
                :page-size="limit"
                :current-page="searchObj.page"
                layout="prev, pager, next"
                @current-change="flip"
              ></el-pagination>
            </div>
          </div>
          <div v-else class="no-result">撒子都莫得</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import GlobalHeader from "../components/global_header.vue";
import SearchFilter from "../components/search_filter";
export default {
  components: { GlobalHeader, SearchFilter },
  data() {
    return {
      searchObj: {
        keyword: "",
        page: 1
      },
      list: [],
      catList: [],
      filterRestore: {},
      total: 0,
      limit: 8
    };
  },
  mounted() {
    this.searchObj = {
      ...this.searchObj,
      ...this.$route.query,
      page: parseInt(this.$route.query.page)
    };
    this.read();
    this.search();

    this.restorePropFilter("cat", this.searchObj["@cat_id"], "cat_id");
  },
  methods: {
    restorePropFilter(model, id, filterName) {
      if (!id) return;
      api(`${model}/find`, { id }).then(r => {
        this.filterRestore[filterName] = r.data;
      });
    },
    setPropFilter(prop, it) {
      this.searchObj["@" + prop] = it.id;
      this.reload();
    },
    removePropFilter(prop) {
      delete this.searchObj["@" + prop];
      this.reload();
    },
    read() {
      api("cat/read").then(r => {
        this.catList = r.data;
      });
    },
    search() {
      let keyword = this.searchObj.keyword
        ? `"title" contains "${this.searchObj.keyword}"`
        : "";
      let minPrice = this.searchObj.minPrice
        ? `and "price" >= ${this.searchObj.minPrice}`
        : "";
      let maxPrice = this.searchObj.maxPrice
        ? `and "price" <= ${this.searchObj.maxPrice}`
        : "";
      let noCarriage = this.searchObj.noCarriage ? `and "carriage" = 0` : "";
      let discount = this.searchObj.discount ? `and "discount" < 1` : "";
      let propFilter = "";

      this.forEachPropFilter((value, key) => {
        let prop = key.slice(1);
        propFilter += ` and "${prop}"="${value}" `;
      });

      let query = `where(${keyword}${minPrice}${maxPrice}${noCarriage}${discount}${propFilter})`;
      let param = {
        query,
        sort_by: [
          this.searchObj.sortBy || "id",
          this.searchObj.sortUp ? "up" : "down"
        ],
        limit: this.limit,
        page: this.searchObj.page
      };
      // if (!keyword && !minPrice && !maxPrice && !noCarriage && !discount)
      //   param = {
      //     sort_by: [
      //       this.searchObj.sortBy || "id",
      //       this.searchObj.sortUp ? "up" : "down"
      //     ],
      //     limit: this.limit,
      //     page: this.searchObj.page
      //   };
      api("product/read", param).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    },
    sortBy(type) {
      if (this.searchObj.sortBy == type) {
        if (!this.searchObj.sortUp) this.searchObj.sortUp = "1";
        else delete this.searchObj.sortUp;
      }
      this.searchObj.sortBy = type;
      this.reload();
    },
    toggleBool(type) {
      if (this.searchObj[type]) delete this.searchObj[type];
      else this.searchObj[type] = "1";

      this.reload();
    },
    reload() {
      this.$router.push({
        path: "/search",
        query: { ...this.searchObj }
      });
    },
    forEachPropFilter(fn) {
      for (let key in this.searchObj) {
        if (!key.startsWith("@")) continue;
        fn(this.searchObj[key], key);
      }
    },
    flip(page) {
      this.searchObj.page = page;
      this.reload();
    }
  },
  watch: {
    $route: {
      deep: true,
      // eslint-disable-next-line
      handler(n, o) {
        this.searchObj = {
          ...this.searchObj,
          ...n.query,
          page: parseInt(n.query.page)
        };
        this.search();
      }
    }
  }
};
</script>

<style scoped>
.header-search {
  padding: 1rem 0;
  background-color: #fff;
}
.header-nav {
  padding: 1rem 0;
  height: 60px;
}
.header-nav .link-item {
  padding-right: 1rem;
  font-size: 1.2rem;
}
.search-bar {
  padding-top: 0.7rem;
  padding-bottom: 0.5rem;
}
.search-bar .search {
  float: right;
  width: 50rem;
}

.filter-rank {
  margin-bottom: 1rem;
}

.rank > * {
  display: inline-block;
  margin-right: 2rem;
}
.rank .middle {
  width: 12rem;
}
.rank .min-price,
.rank .max-price {
  width: 48%;
}
.rank .min-price {
  border-right: 0;
  border-radius: 4px 0 0 4px;
}
.rank .max-price {
  border-radius: 0 4px 4px 0;
}
.rank .right > * {
  margin-right: 0.5rem;
}
.single-card {
  padding-bottom: 1rem;
}
.el-pagination {
  text-align: center;
}
.product-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: center;
}
.product-price {
  padding-top: 1rem;
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
.no-result {
  text-align: center;
  padding: 2rem 0;
  color: #bbb;
  font-weight: bold;
  font-size: 1rem;
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
</style>


