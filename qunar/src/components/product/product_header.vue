<template>
  <div>
    <div class="top-bar">
      <router-link class="circle-top-bar" tag="div" to="/" v-show="circleTopBarVisible">
        <span class="iconfont">&#xe624;</span>
      </router-link>
      <div class="fixed-top-bar" :style="fixedOpacity" v-show="!circleTopBarVisible">
        <router-link tag="span" to="/" class="iconfont">&#xe624;</router-link>
        {{product.title}}
      </div>
    </div>
    <div class="main-img">
      <img
        @click="gallaryVisible=true"
        class="img"
        src="http://img1.qunarzz.com/sight/p0/1505/ca/ca758ff1d2c0d808.water.jpg_600x330_f188e1a0.jpg"
      >
      <div class="info">
        <div class="title">{{product.title}}</div>
        <div class="icon">
          <span class="iconfont">&#xe6dd;</span>
          <span class="text">3</span>
        </div>
      </div>
    </div>
    <image-fade>
      <GlobalGallary
        @hideGallary="gallaryVisible=false"
        v-if="gallaryVisible"
        :list="gallaryImgList"
      />
    </image-fade>
    <div class="main-info">
      <div class="preview">
        <div class="left">
          <div class="score">
            <span class="num">4.7</span>
            <span>分</span>
            <span class="text">很棒</span>
          </div>
          <div class="muted">242条评论</div>
        </div>
        <div class="right">
          <div class="title">景点简介</div>
          <div class="muted">开放时间、贴士</div>
        </div>
      </div>
      <div class="address">{{product.position}}</div>
    </div>
  </div>
</template>

<script>
import GlobalGallary from "../../components/global_gallary";
import ImageFade from "../../components/global_fade";
export default {
  components: { GlobalGallary, ImageFade },
  props: { product: Object },
  data() {
    return {
      circleTopBarVisible: true,
      fixedOpacity: {
        opacity: 0
      },
      gallaryVisible: false,
      gallaryImgList: [
        "http://img1.qunarzz.com/sight/p0/1609/fb/fb5243649ae6589ca3.img.jpg_r_800x800_a2ee7f6c.jpg",
        "http://img1.qunarzz.com/sight/p0/1609/13/13b2f6d3439de7aba3.img.jpg_r_800x800_f1e4a561.jpg"
      ]
    };
  },
  mounted() {
    window.addEventListener("scroll", this.changeTopBar);
  },
  destroyed() {
    window.removeEventListener("scroll", this.changeTopBar);
  },
  methods: {
    changeTopBar() {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 10) {
        let opacity = top / 100;
        this.fixedOpacity.opacity = opacity > 1 ? 1 : opacity;
        this.circleTopBarVisible = false;
      } else {
        this.circleTopBarVisible = true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.top-bar {
  .circle-top-bar {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    display: block;
    z-index: 99;
    width: 0.72rem;
    height: 0.72rem;
    background-color: #000;
    opacity: 0.5;
    border-radius: 0.36rem;

    .iconfont {
      position: absolute;
      left: 0.2rem;
      top: 0.2rem;
      font-size: 0.3rem;
      color: #fff;
    }
  }

  .fixed-top-bar {
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    left: 0;
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
}

.main-img {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 53%;

  .img {
    width: 100%;
  }

  .info {
    position: absolute;
    width: 100%;
    bottom: 0.1rem;
    left: 0;
    height: 0.6rem;
    line-height: 0.6rem;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));

    .title {
      position: absolute;
      bottom: 0.2rem;
      left: 0;
      padding-left: 0.2rem;
      height: 0.6rem;
      font-size: 0.35rem;
      color: #fff;
    }

    .icon {
      position: absolute;
      bottom: 0.8rem;
      left: 0.2rem;
      width: 1.2rem;
      height: 0.4rem;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 0.2rem;
      color: #fff;
      line-height: 0.4rem;
      text-align: center;

      .text {
        margin-left: 0.15rem;
        font-size: 0.3rem;
      }
    }
  }
}

.main-info {
  position: relative;
  top: -0.1rem;
  padding: 0.2rem 0.2rem 0 0.2rem;
  border-radius: 0.1rem 0.1rem 0 0;
  background-color: #fff;

  .preview {
    display: flex;
    width: 100%;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    .muted {
      color: #9e9e9e;
      font-size: 0.24rem;
    }

    .left {
      flex: 1;

      .score {
        color: #ff8300;
        padding-bottom: 0.15rem;

        .num {
          font-size: 0.44rem;
        }

        .text {
          margin-left: 0.2rem;
        }
      }
    }

    .right {
      flex: 1;

      .title {
        line-height: 0.45rem;
        padding-bottom: 0.15rem;
      }
    }
  }

  .address {
    padding: 0.2rem;
  }
}
</style>

