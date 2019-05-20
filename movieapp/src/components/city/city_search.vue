<template>
  <div class="container">
    <div class="head">
      <div class="search-bar">
        <i class="iconfont icon-xiazai17 search"></i>
        <input v-model="cityKeyword" class="input" placeholder="请输入城市名称或拼音" autofocus>
        <i class="iconfont icon-qingkong clear" @click="clearInput"></i>
      </div>
    </div>
    <div class="result" ref="result" v-show="cityKeyword">
      <ul class="list">
        <li
          class="item"
          v-for="it in searchResult"
          @click="clickCity(it.name)"
          :key="it.id"
        >{{it.name}}</li>
        <li class="item no-result" v-show="!searchResult.length">暂无数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapMutations } from "vuex";
export default {
  props: {
    allCity: Object
  },
  data() {
    return {
      cityKeyword: "",
      timer: null,
      searchResult: []
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.result);
  },
  methods: {
    ...mapMutations(["changeCity"]),
    clickCity(city) {
      this.changeCity(city);
      this.$router.push("/");
    },
    clearInput() {
      this.cityKeyword = "";
    }
  },
  watch: {
    cityKeyword() {
      if (this.timer) clearTimeout(this.timer);
      if (!this.cityKeyword) {
        this.searchResult = [];
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
        for (let i in this.allCity) {
          this.allCity[i].forEach(it => {
            if (
              it.spell.indexOf(this.cityKeyword) > -1 ||
              it.name.indexOf(this.cityKeyword) > -1
            ) {
              result.push(it);
            }
          });
        }
        this.searchResult = result;
      }, 100);
    }
  }
};
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.1rem;
  border-bottom: 1px solid #f5f5f5;
  z-index: 99;
}

.search-bar {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0 0.2rem;
}
.search-bar .input {
  height: 0.7rem;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 0 0.7rem;
}

.search-bar .iconfont {
  position: absolute;
  font-size: 0.36rem;
}
.search-bar .search {
  left: 0.4rem;
}
.search-bar .clear {
  right: 0.4rem;
}

.result {
  position: absolute;
  top: 1.92rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  background-color: #fff;
}

.result .list .item {
  padding: 0.2rem 0.3rem;
  border-bottom: 1px solid #f5f5f5;
}
.no-result {
  text-align: center;
}
</style>
