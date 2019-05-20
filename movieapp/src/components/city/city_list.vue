<template>
  <div class="container" ref="wrapper">
    <div>
      <div class="section current">
        <div class="title">当前城市</div>
        <div class="text">{{city}}</div>
      </div>
      <div class="section hot">
        <div class="title">热门城市</div>
        <ul class="list">
          <li
            class="item"
            v-for="it in hotCity"
            :key="it.id"
            @click="clickCity(it.name)"
          >{{it.name}}</li>
        </ul>
      </div>
      <div class="section single-letter" v-for="(it,key) in allCity" :key="key" :ref="key">
        <div class="title">{{key}}</div>
        <ul class="list">
          <li
            class="item"
            v-for="item in it"
            :key="item.id"
            @click="clickCity(item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CityList",
  props: { hotCity: Array, allCity: Object, letter: String },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper);
  },
  computed: {
    ...mapState(["city"])
  },
  methods: {
    ...mapMutations(["changeCity"]),
    clickCity(city) {
      this.changeCity(city);
      this.$router.push("/");
    }
  },
  watch: {
    letter() {
      if (this.letter) {
        //通过el上绑定的ref获取到对应的元素节点
        const el = this.$refs[this.letter][0];
        this.scroll.scrollToElement(el);
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 2.12rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.container .section {
  background: #fff;
}

.section .title {
  font-size: 0.28rem;
  padding: 0.2rem 0.3rem;
  background-color: #f5f5f5;
}

.current .text {
  padding: 0.24rem 0.3rem;
}

.hot .list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  position: relative;
}

.hot .list .item {
  width: 33.33%;
  height: 0.9rem;
  line-height: 0.9rem;
  box-sizing: border-box;
  margin-bottom: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-right: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.hot .list .item:nth-child(3n) {
  border-right: 0;
}

.section.single-letter .list .item {
  padding: 0.2rem 0.3rem;
  border-bottom: 1px solid #f5f5f5;
}
.section.single-letter .list .item:last-child {
  border-bottom: 0;
}
</style>
