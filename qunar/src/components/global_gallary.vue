<template>
  <div class="wrap" @click="$emit('hideGallary')">
    <div class="container">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(it,index) in list" :key="index">
          <img class="img" :src="it">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationType: "fraction",
        observeParents: true,
        observer: true
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.wrap >>> .swiper-container {
  overflow: inherit;
}

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  z-index: 99;

  .container {
    height: 0;
    width: 100%;
    padding-bottom: 60%;

    .img {
      width: 100%;
      vertical-align: middle;
    }

    .swiper-pagination {
      bottom: -1rem;
      color: #fff;
    }
  }
}
</style>
