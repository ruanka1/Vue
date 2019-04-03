<template>
  <div class="container">
    <swiper :options="swiperOption">
      <swiper-slide v-for="page in pages" :key="page.id">
        <div class="cat" v-for="it in page" :key="it.id">
          <div class="cat-img">
            <img class="img" :src="it.img_url">
          </div>
          <div class="cat-title">{{it.title}}</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: { list: Array },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination"
      }
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.list.forEach((it, index) => {
        //通过cat数量计算页数
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(it);
      });
      return pages;
    }
  }
};
</script>

<style lang="stylus" scoped>
.container>>>.swiper-container {
  padding-bottom: 50%;
  height: 0;
}

.container >>> .swiper-pagination-bullet-active {
  background: #00afc7 !important;
}

.container {
  padding-top: 0.1rem;

  .cat {
    position: relative;
    float: left;
    width: 25%;
    overflow: hidden;
    padding-bottom: 25%;
    height: 0;

    .cat-img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0.57rem;
      left: 0;
      box-sizing: border-box;
      padding: 0.1rem;

      .img {
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }

    .cat-title {
      position: absolute;
      right: 0;
      bottom: 0.2rem;
      left: 0;
      height: 0.57rem;
      line-height: 0.57rem;
      color: #333;
      max-width: 100%;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .swiper-pagination-bullets {
    bottom: 0;
  }
}
</style>


