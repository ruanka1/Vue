<template>
  <div class="container">
    <ul class="list">
      <li
        class="item"
        @click="clickLetter"
        @touchstart="startTouch"
        @touchmove.prevent="moveTouch"
        @touchend="stopTouch"
        v-for="it in letterArr"
        :key="it"
        :ref="it"
      >{{it}}</li>
    </ul>
    <div v-show="touching&&currentLetter" class="popup">{{currentLetter}}</div>
  </div>
</template>

<script>
export default {
  props: {
    allCity: Object
  },
  data() {
    return {
      touching: false,
      startTop: 0,
      currentLetter: "",
      timer: null
    };
  },
  updated() {
    this.startTop = this.$refs["A"][0].offsetTop;
  },
  computed: {
    //提取父组件传递的数据中的key 也就是每个字母 存为数组
    letterArr() {
      const letterArr = [];
      for (let i in this.allCity) {
        letterArr.push(i);
      }
      return letterArr;
    }
  },
  methods: {
    clickLetter(e) {
      this.$emit("change", e.target.innerText);
      this.currentLetter = e.target.innerText;
    },
    startTouch() {
      this.touching = true;
    },
    moveTouch(e) {
      if (this.touching) {
        // 设置计时器进行节流 提高性能
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          //先取到字母A距离header的距离 这个值是固定的
          // const startTop = this.$refs["A"][0].offsetTop      此步移到updated生命周期中执行 提高页面性能
          //再取到手指距离header的距离 这个距离等于手指距离屏幕顶部的距离减去header的高度
          const touchTop = e.touches[0].clientY - 40;
          //touchTop减去startTo可以得到手指距离字母A的距离
          //用这个距离除以每个字母的高度可知手指所在字母的index
          const index = Math.floor((touchTop - this.startTop) / 22);
          if (index >= 0 && index < this.letterArr.length) {
            this.$emit("change", this.letterArr[index]);
            this.currentLetter = this.letterArr[index];
          }
        }, 16);
      }
    },
    stopTouch() {
      this.touching = false;
    }
  }
};
</script>

<style scoped>
.list {
  position: absolute;
  top: 0.8rem;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 0.5rem;
}
.item {
  text-align: center;
  line-height: 0.45rem;
  color: #f03d37;
}

.popup {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: #f03d37;
  border-radius: 50%;
  color: #fff;
  font-size: 0.6rem;
}
</style>
