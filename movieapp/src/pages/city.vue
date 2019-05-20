<template>
  <div class="container">
    <Header>
      <h1 class="title" slot="title">城市</h1>
      <router-link to="/home" class="iconfont icon-cuowu cancel" slot="cancel"/>
    </Header>
    <CitySearch :allCity="allCityArr"/>
    <div v-if="hotCityArr.length">
      <CityList :letter="letter" :hotCity="hotCityArr" :allCity="allCityArr"/>
      <LetterList :allCity="allCityArr" @change="handleLetterClick"/>
    </div>
    <Loading v-else class="loading"/>
  </div>
</template>

<script>
import Header from "../components/header";
import Loading from "../components/loading";
import CitySearch from "../components/city/city_search";
import CityList from "../components/city/city_list";
import LetterList from "../components/city/letter_list";
import { CityRequest } from "../models/city";
const cityRequest = new CityRequest();
export default {
  components: { Header, CitySearch, Loading, CityList, LetterList },
  data() {
    return {
      hotCityArr: [],
      allCityArr: {},
      letter: ""
    };
  },
  mounted() {
    this.getCityData();
  },
  methods: {
    getCityData() {
      cityRequest.read().then(r => {
        this.hotCityArr = r.data[0].hot_city;
        this.allCityArr = r.data[0].all_city;
      });
    },
    //将字母列表组件传递的letter传递给城市列表组件
    handleLetterClick(letter) {
      this.letter = letter;
    }
  }
};
</script>

<style scoped>
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
