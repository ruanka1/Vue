<template>
  <div class="header">
    <div class="container">
      <el-row>
        <el-col class="logo" :span="5">
          <router-link to="/">
            <img src="../img/logo.png">
          </router-link>
        </el-col>
        <el-col class="search-bar" :span="19">
          <form class="search" @submit.prevent="toSearch()">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入关键词 如:伊力"
              prefix-icon="el-icon-search"
            ></el-input>
            <button type="submit" hidden></button>
          </form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        keyword: ""
      }
    };
  },
  methods: {
    toSearch() {
      if (!this.searchForm.keyword) this.searchForm.keyword = "伊力";
      this.$router.push({
        path: "/search",
        query: this.searchForm
      });
    }
  }
};
</script>


<style scoped>
.header {
  padding: 1rem;
}
.logo img {
  width: 100px;
  height: 100px;
}
.search-bar {
  padding: 1.9rem 0;
}

.search-bar input {
  display: inline-block;
  width: 70%;
  border-radius: 4px 0 0 4px;
  border-right: 0;
  padding: 0.8rem 1rem;
}
.search-bar button {
  border-radius: 0 4px 4px 0;
  padding: 0.8rem 1.5rem;
}
</style>

