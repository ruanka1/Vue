<template>
  <div class="filter-container">
    <div class="container">
      <div class="filter-table">
        <el-row class="filter-table-item">
          <el-col :span="3" class="key-word">国家/地区</el-col>
          <el-col :span="21" class="type-group">
            <span class="country-item type" v-for="(it, index) in countryList" :key="index">
              <span
                class="type-text"
                :class="{active:q['@country_id']== it.id}"
                @click="catCheck('country_id',it)"
              >{{it.name}}</span>
            </span>
          </el-col>
        </el-row>
        <el-row class="filter-table-item">
          <el-col :span="3" class="key-word">分类</el-col>
          <el-col :span="21" class="type-group">
            <el-row>
              <el-col
                :span="4"
                v-show="countryList.length"
                class="type"
                v-for="(it, index) in rootCat"
                :key="index"
              >
                <span
                  class="type-text"
                  :class="{active:q['@root_cat_id']== it.id}"
                  @click="catCheck('root_cat_id',it)"
                >{{it.name}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="filter-btn border">
        <div class="order">
          <span class="btn">综合</span>
          <span
            class="btn"
            :class="{active:q.sortBy == it.value}"
            v-for="(it, index) in filterBtnList"
            :key="index"
            @click="sort(it.value)"
          >
            {{it.name}}
            <i
              class="el-icon-arrow-up"
              v-show="q.sortBy == it.value"
              :class="{rotate: q.sort == '0'}"
            ></i>
          </span>
        </div>
        <div
          class="price-between"
          @mouseenter="showPriceBtn = true"
          @mouseleave="showPriceBtn = false"
        >
          <div class="between">
            <input type="text" placeholder="￥" v-model="q.minPrice">
            —
            <input type="text" placeholder="￥" v-model="q.maxPrice">
          </div>
          <div class="price-btn" v-show="showPriceBtn">
            <button class="two" @click="$emit('reload')">确定</button>
          </div>
        </div>
        <el-checkbox-group v-model="checkList" class="checkbox-container">
          <el-checkbox label="包邮" @change="check('freight')"></el-checkbox>
          <el-checkbox label="折扣" @change="check('discount')"></el-checkbox>
          <el-checkbox label="仅看有货" @change="check('available')"></el-checkbox>
          <el-checkbox label="工厂店"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: { q: { type: Object } },
  data() {
    return {
      showPriceBtn: false,
      checkList: [],
      countryList: [],
      filterBtnList: [
        { name: "新品", value: "id" },
        { name: "价格", value: "price" }
        // { name: "销量", value: "sales" }
      ]
    };
  },
  computed: {
    ...mapState(["rootCat"])
  },
  mounted() {
    this.readCountry();
  },
  methods: {
    sort(type) {
      // sort == 1 箭头向上 升序   sort == 0 箭头向下 降序
      if (this.q.sort && this.q.sortBy == type) this.$set(this.q, "sort", 0);
      else this.$set(this.q, "sort", 1);
      this.$set(this.q, "sortBy", type);

      this.$emit("read");
    },

    readCountry() {
      api("country/read").then(r => {
        this.countryList = r.data;
      });
    },

    // 分类被点击，获取产品
    catCheck(type, it) {
      if (it.id == this.q[`@${type}`]) this.$set(this.q, "@" + type, "");
      else this.$set(this.q, "@" + type, it.id);

      this.$parent[type] = it.name;
      this.$emit("resetPage");
    },

    // 多选框选择 包邮/折扣/...
    check(type) {
      if (this.q[type] === 1) this.$set(this.q, type, 0);
      else this.$set(this.q, type, 1);

      this.$emit("resetPage");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/css/var.styl';

.filter-table {
  margin-bottom: 0.16rem;

  .filter-table-item {
    border: solid 1px #e4e4e4;
    border-bottom: none;
    background: #f4f4f4;

    &:last-child {
      border-bottom: solid 1px #e4e4e4;
    }

    .key-word {
      padding: 0.12rem;
    }

    .type-group {
      padding: 0.12rem 0.2rem;
      padding-bottom: 0;
      background: #fff;
      min-height: 37px;

      .type {
        margin-bottom: 0.12rem;

        .type-text {
          cursor: pointer;

          &.active {
            color: $mainColor;
            background: $tintMainColor;
            padding: 4px 8px;
            margin-left: -8px;
          }

          &:hover {
            color: $mainColor;
          }
        }
      }

      .country-item {
        margin-right: 52px;

        &:last-child {
          margin: 0;
        }

        &.active {
          color: $mainColor;
          background: $tintMainColor;
          padding: 4px 8px;
          margin-left: -8px;
        }

        &:hover {
          color: $mainColor;
        }
      }
    }
  }
}

.filter-btn {
  background: #fff;
  line-height: 0.4rem;
  margin-bottom: 0.16rem;

  >* {
    display: inline-block;
  }

  .order {
    margin-right: 0.32rem;

    .btn {
      box-sizing: border-box;
      display: inline-block;
      padding: 0 0.16rem;
      border: solid 1px #ffffff;
      border-right: solid 1px #e4e4e4;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        border-color: $mainColor;
        color: $mainColor;
      }

      &:hover {
        color: $mainColor;
      }
    }
  }

  .el-icon-arrow-up {
    transition: all 0.3s;
    transform: rotate(0deg);

    &.rotate {
      transform: rotate(180deg);
    }
  }

  .price-between {
    color: #999;
    margin-right: 0.32rem;
    position: relative;

    input {
      width: 0.4rem;
    }

    .price-btn {
      position: absolute;
      z-index: 100;
      top: 32px;
      right: 0;
    }
  }

  .checkbox-container {
    height: 0.4rem;

    .el-checkbox {
      margin-right: 0.16rem;
    }
  }
}
</style>
 