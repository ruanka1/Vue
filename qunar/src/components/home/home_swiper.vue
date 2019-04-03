<template>
  <div class="container">
    <swiper v-if="list.length" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="it in list" :key="it.id">
        <img class="slider-img" :src="it.url">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style lang="stylus" scoped>
.container >>> .swiper-pagination-bullet-active {
  background: #fff !important;
}

.container {
  background-color: #eee;
  width: 100%;
  // height: 26.7% vw;
  overflow: hidden;
  padding-bottom: 26.7%;
  height: 0;

  .slider-img {
    width: 100%;
  }
}
</style>


