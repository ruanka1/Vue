<template>
  <div class="container">
    <Header class="header">
      <h1 class="title" slot="title">影院</h1>
    </Header>
    <div class="content"></div>
    <TapBar/>
  </div>
</template>

<script>
import Header from "../components/header";
import TapBar from "../components/tapbar";
import { mapState } from "vuex";

import { CinemaRequest } from "../models/cinema";
const cinemaRequest = new CinemaRequest();
export default {
  components: { Header, TapBar },
  data() {
    return {
      cinemaList: []
    };
  },
  mounted() {
    this.readData();
  },
  computed: {
    ...mapState(["city"])
  },
  methods: {
    readData() {
      cinemaRequest
        .readCityCinema({
          where: { city: this.city }
        })
        .then(r => {
          this.cinemaList = r.data[0].list;
        });
    }
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 1;
}
</style>

