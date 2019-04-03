<template>
  <div class="wrap">
    <div class="title">周末去哪儿</div>
    <div class="container">
      <div class="banner-list" v-for="it in list" :key="it.id">
        <div class="item">
          <a href="#">
            <div class="img-box">
              <img class="img" :src="it.img_url">
            </div>
            <div class="info">
              <div class="item-title">{{it.title}}</div>
              <div class="item-desc">{{it.desc}}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { list: Array }
};
</script>

<style lang="stylus" scoped>
.wrap {
  background-color: #eee;

  .title {
    padding: 0.2rem 0;
    margin-left: 0.3rem;
    font-size: 0.28rem;
  }

  .container {
    background-color: #fff;

    .img-box {
      height: 0;
      padding-bottom: 36.5%;
      overflow: hidden;

      .img {
        max-width: 100%;
      }
    }

    .info {
      padding: 0.15rem 0.8rem 0.15rem 0.2rem;

      .item-title {
        color: inherit;
        line-height: 0.45rem;
        font-size: 0.3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 0.05rem;
        color: #212121;
      }

      .item-desc {
        color: #616161;
        font-size: 0.25rem;
        line-height: 0.4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>


