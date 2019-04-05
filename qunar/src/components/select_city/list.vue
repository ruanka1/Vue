<template>
  <div class="list" ref="wrap">
    <div>
      <div class="section current">
        <div class="title">当前城市</div>
        <div class="text">{{cityModule.currentCity}}</div>
      </div>
      <div class="section hot">
        <div class="title">热门城市</div>
        <ul>
          <li @click="selectCity(it.name)" v-for="it in hotList" :key="it.id">
            <a href="#">{{it.name}}</a>
          </li>
        </ul>
      </div>
      <div class="section all-letter">
        <div class="title">字母排序</div>
        <ul>
          <li @click="clickLetter" v-for="(it,key) in letterCityList" :key="key">
            <a href="#">{{key}}</a>
          </li>
        </ul>
      </div>
      <div class="section single-letter" v-for="(it,key) in letterCityList" :key="key" :ref="key">
        <div class="title">{{key}}</div>
        <ul>
          <li @click="selectCity(city.name)" v-for="city in it" :key="city.id">
            <a href="#">{{city.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  props: { hotList: Array, letterList: Array, letterCityList: Object },
  data() {
    return {
      letter: String
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrap);
  },
  computed: {
    ...mapState(["cityModule"])
  },
  methods: {
    ...mapMutations(["changeCity"]),
    selectCity(city) {
      this.changeCity(city);
      // this.$store.commit("changeCity", city);
      this.$router.push("/");
    },
    clickLetter(e) {
      this.letter = e.target.innerText;
    }
  },
  watch: {
    letter() {
      if (this.letter) {
        const el = this.$refs[this.letter][0];
        this.scroll.scrollToElement(el);
      }
    }
  }
};
</script>



<style lang="stylus" scoped>
.list {
  position: absolute;
  top: 0.85rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #eee;

  .section {
    background-color: #fff;

    .title {
      font-size: 0.24rem;
      padding: 0.24rem 0.3rem;
      background-color: #eee;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      li {
        box-sizing: border-box;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.28rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .section.current .text {
    padding: 0.24rem 0.3rem;
  }

  .section.hot ul {
    li {
      width: 33.33%;
      border-right: 0.02rem solid #ddd;
      border-bottom: 0.02rem solid #ddd;
    }

    li:nth-child(3n+3) {
      border-right: 0;
    }

    li:nth-child(3n+1):nth-last-child(-n+3), li:nth-child(3n+1):nth-last-child(-n+3)~li {
      border-bottom: 0;
    }
  }

  .section.all-letter ul {
    padding: 0.3rem 0;

    li {
      width: 16.66%;
    }
  }

  .section.single-letter ul {
    li {
      width: 25%;
      border-right: 0.02rem solid #ddd;
      border-bottom: 0.02rem solid #ddd;
    }

    li:nth-child(4n+4) {
      border-right: 0;
    }

    li:nth-child(4n+1):nth-last-child(-n+4), li:nth-child(4n+1):nth-last-child(-n+4)~li {
      border-bottom: 0;
    }
  }

  .section >* a {
    color: #000;
  }
}
</style>
