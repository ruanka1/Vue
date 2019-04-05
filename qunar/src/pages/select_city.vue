<template>
  <div>
    <div v-if="hotList.length">
      <div class="header">
        城市选择
        <router-link to="/">
          <span class="iconfont">&#xe624;</span>
        </router-link>
      </div>
      <CityList :hotList="hotList" :letterCityList="letterCityList"/>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>
<script>
import api from "../lib/api.js";
import CityList from "../components/select_city/list.vue";
export default {
  components: { CityList },
  data() {
    return {
      hotList: [],
      letterCityList: {}
    };
  },
  mounted() {
    this.readCity();
  },
  methods: {
    readCity() {
      api("city/read").then(r => {
        this.hotList = r.data[0].hot_city;
        this.letterCityList = r.data[0].all_city;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.header {
  position: relative;
  height: 0.86rem;
  line-height: 0.86rem;
  font-size: 0.3rem;
  background-color: #00afc7;
  text-align: center;
  color: #fff;

  .iconfont {
    position: absolute;
    left: 0;
    width: 0.64rem;
    color: #fff;
    font-weight: bold;
  }
}

.loading {
  margin-top: 70%;
  color: #00afc7;
  font-weight: bold;
  text-align: center;
}
</style>

