<template>
  <div class="header">
    <div class="container">
      <el-row>
        <el-col class="logo" :span="5">
          <router-link to="/">
            <img src="../img/logo.jpg">
          </router-link>
        </el-col>
        <el-col class="search-bar" :span="19">
          <form>
            <input type="search">
            <button type="submit">
              <i class="el-icon-search"></i>
            </button>
          </form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

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
  padding: .8rem 1rem;
}
.search-bar button {
  border-radius: 0 4px 4px 0;
  padding: .8rem 1.5rem;
}
</style>

