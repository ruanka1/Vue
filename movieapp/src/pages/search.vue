<template>
  <div class="container">
    <Header class="header">
      <h1 class="title" slot="title">搜索</h1>
      <router-link to="/home" class="iconfont icon-fanhui back" slot="back"/>
    </Header>
    <div class="search-bar">
      <div class="wrap">
        <i class="iconfont icon-xiazai17 search"></i>
        <form @submit.prevent="handleSearch">
          <input v-model="keyword" class="input" placeholder="输入电影名称" :disabled="pending" autofocus>
        </form>
        <i class="iconfont icon-qingkong clear" @click="clearKeyword"></i>
      </div>
    </div>
    <div class="content">
      <div v-if="showResultCount" class="result-count">共找到{{resultCount}}条结果</div>
      <div v-if="!keyword" class="search-type">
        <div v-show="histroyList.length" class="history">
          <div class="title">
            <i class="iconfont icon-history"></i>
            <span>历史搜索</span>
            <span class="clear-history" @click="clearHistory">清空</span>
          </div>
          <div class="list">
            <span class="tag" v-for="it in histroyList" :key="it.index" @click="clickTag(it)">{{it}}</span>
          </div>
        </div>
      </div>
      <div v-else class="search-result">
        <ul class="list">
          <router-link
            :to="`/movie/${it.movie_id}`"
            class="item"
            v-for="it in searchResult"
            :key="it.id"
            tag="li"
          >
            <SingleMovie class="single-movie-cmp" :detail="it"/>
          </router-link>
        </ul>
      </div>
    </div>
    <Loading v-show="showLoading" class="loading"/>
  </div>
</template>

<script>
import Header from "../components/header";
import store from "../lib/localstorage";
import Loading from "../components/loading";
import SingleMovie from "../components/single_movie";

import { HomeRequest } from "../models/home";
const homeRequest = new HomeRequest();
export default {
  components: { Header, Loading, SingleMovie },
  data() {
    return {
      keyword: "",
      page: 1,
      showResult: false,
      showLoading: false,
      showResultCount: false,
      histroyList: [],
      searchResult: [],
      resultCount: 0,
      pending: false
    };
  },
  mounted() {
    this.histroyList = this.getHistory();
  },
  methods: {
    handleSearch() {
      if (!this.keyword) return;
      this.search(this.keyword);
    },

    clickTag(keyword) {
      this.keyword = keyword;
      this.search(keyword);
    },

    search(q) {
      if (this.pending) return;
      this.pending = true;
      this.showLoading = true;
      this.showResult = true;
      let query = `where("title" contains "${q}")`;
      homeRequest.search({ query, page: this.page }).then(r => {
        this.pending = false;
        this.searchResult = r.data;
        this.resultCount = r.total ? r.total : 0;
        this.showResultCount = true;
        this.showLoading = false;
      });
      this.storageSearch(q);
    },

    storageSearch(keyword) {
      let words = this.getHistory();
      if (!words.includes(keyword)) {
        if (words.length >= 10) {
          words.pop();
        }
        words.unshift(keyword);
        store.set("q", words);
      } else {
        words.splice(words.indexOf(keyword), 1);
        words.unshift(keyword);
        store.set("q", words);
      }
    },
    getHistory() {
      return store.get("q") || [];
    },

    clearHistory() {
      store.set("q", []);
      this.histroyList = [];
      store.set("q", []);
    },

    clearKeyword() {
      if (this.pending) return;
      this.keyword = "";
      this.histroyList = this.getHistory();
      this.searchResult = [];
      this.showResultCount = false;
    }
  },
  watch: {
    keyword() {
      if (!this.keyword) this.showResultCount = false;
    }
  }
};
</script>

<style scoped>
.container .header {
  position: fixed;
  z-index: 1;
}

.container .search-bar {
  position: fixed;
  top: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.1rem;
  border-bottom: 1px solid #f5f5f5;
  z-index: 1;
  background-color: #fff;
}

.result-count {
  position: fixed;
  top: 2.12rem;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0.2rem 0;
  background-color: #f5f5f5;
  margin: 0 auto;
  z-index: 1;
}
.container .content {
  position: absolute;
  top: 2.12rem;
  left: 0;
  right: 0;
  bottom: 0;
}

.search-bar .wrap {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0 0.2rem;
}
.search-bar .wrap form {
  width: 80%;
}
.search-bar .wrap .input {
  height: 0.7rem;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 0 0.7rem;
}

.search-bar .wrap .iconfont {
  position: absolute;
  font-size: 0.36rem;
}
.search-bar .wrap .search {
  left: 0.4rem;
}
.search-bar .wrap .clear {
  right: 0.4rem;
}

.search-type .history {
  padding: 0 0.2rem;
}

.search-type .title {
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0.1rem 0;
  font-size: 0.3rem;
}

.search-type .title .clear-history {
  position: absolute;
  right: 0.2rem;
}

.search-type .iconfont {
  margin-right: 0.15rem;
}

.search-type .list .tag {
  display: inline-block;
  padding: 0.1rem 0.2rem;
  background-color: #f5f5f5;
  font-size: 0.26rem;
  color: #666;
  border-radius: 3px;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}
.search-result {
  position: absolute;
  top: 0.68rem;
  left: 0;
  right: 0;
  bottom: 0;
}

.search-result .list {
  margin: 0 0.24rem;
  overflow: hidden;
}
.search-result .list .item {
  border-bottom: 1px solid #f5f5f5;
}

.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
