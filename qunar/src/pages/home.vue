<template>
  <div>
    <HomeHeader/>
    <HomeSwiper :list="swiperImgList"/>
    <HomeCat :list="catList"/>
    <ul class="cat-bottom">
      <li class="item">
        <span class="iconfont">&#xe60f;</span>
        当前定位
      </li>
      <li class="item">
        <span class="iconfont">&#xe6e7;</span>
        必游榜单
      </li>
    </ul>
    <HomeRecom :list="recomList"/>
    <HomeBanner :list="bannerList"/>
    <GlobalFooter/>
  </div>
</template>

<script>
import api from "../lib/api.js";
import HomeHeader from "../components/home/home_header";
import HomeSwiper from "../components/home/home_swiper";
import HomeCat from "../components/home/home_cat";
import HomeRecom from "../components/home/home_recom";
import HomeBanner from "../components/home/home_banner";
import GlobalFooter from "../components/global_footer";
import { mapState } from "vuex";

export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeCat,
    HomeRecom,
    HomeBanner,
    GlobalFooter
  },
  data() {
    return {
      swiperImgList: [
        { id: 1, url: require("../img/home/home_slide_1.jpg") },
        { id: 2, url: require("../img/home/home_slide_2.jpg") },
        { id: 3, url: require("../img/home/home_slide_3.jpg") }
      ],
      catList: [],
      recomList: [],
      bannerList: [
        {
          title: "西安必打卡",
          desc: "寻长安梦，开启穿越的圆梦之旅",
          img_url:
            "http://img1.qunarzz.com/sight/source/1507/fe/679926851c309a.jpg_r_640x214_114816de.jpg"
        },
        {
          title: "探寻文化古都",
          desc:
            "一场时空穿越的旅行，探寻历史悠久的文化古都！寻觅历史留下的点点足迹，细细品味古人的伟大",
          img_url:
            "http://img1.qunarzz.com/sight/source/1811/63/808c022b285a2c.jpg_r_640x214_ad984479.jpg"
        },
        {
          title: "西安演出在线",
          desc:
            "这里有绚丽奇幻的神秘梦幻舞剧，歌舞揭开盛唐面纱，体验穿越时空的奇妙，感受大唐之盛世",
          img_url:
            "http://img1.qunarzz.com/sight/source/1507/de/e6ba44d61894c0.jpg_r_640x214_847324d0.jpg"
        }
      ]
    };
  },
  mounted() {
    this.readCat();
    this.readRecom();
  },
  computed: {
    ...mapState(["cityModule"])
  },

  methods: {
    readCat() {
      api("cat/read", {}).then(r => {
        this.catList = r.data.sort((a, b) => {
          return a.id - b.id;
        });
      });
    },
    readRecom() {
      api("recom/read", {
        limit: this.limit,
        page: this.page
      }).then(r => {
        this.totalPage = Math.ceil(r.total / this.limit);
        this.recomList = [...this.recomList, ...(r.data || [])];
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.cat-bottom {
  display: flex;
  margin-top: 0.1rem;
  line-height: 0.9rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .item {
    width: 50%;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  .item:last-of-type {
    border: 0;
  }
}
</style>



