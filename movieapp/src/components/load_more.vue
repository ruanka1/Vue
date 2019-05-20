<template>
  <div class="scrollLoad">
    <span v-if="noMore" class="no-more">暂无更多</span>
    <button v-else @click="loadMore()" class="loadBtn">{{btnText}}</button>
  </div>
</template>
<script>
export default {
  props: ["page", "totalPage"],
  data() {
    return {
      btnText: "加载更多",
      currentPage: 1,
      docuHeight: 0,
      noMore: false
    };
  },
  mounted() {
    this.bindScroll();
    this.currentPage = this.page || 1;
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    bindScroll() {
      window.addEventListener("scroll", this.handleScroll);
    },
    handleScroll() {
      if (this.currentPage >= this.totalPage) {
        this.noMore = true;
        return;
      }
      if (this.calculateLenght() < 50) {
        if (this.getDocuHeight() == this.docuHeight) {
          this.btnText = "加载中";
          return;
        }
        this.loadMore();
      }
    },
    getDocuHeight() {
      return document.documentElement.scrollHeight;
    },
    updateDocuHeight() {
      this.docuHeight = this.getDocuHeight();
    },
    calculateLenght() {
      let html = document.documentElement;
      let length = html.scrollHeight - window.innerHeight - html.scrollTop;
      return length;
    },
    loadMore() {
      this.updateDocuHeight();
      this.$emit("load", ++this.currentPage);
    }
  }
};
</script>

<style scoped>
.scrollLoad {
  text-align: center;
  padding: 0.2rem 0;
}
.scrollLoad .loadBtn {
  margin: 0;
  border: 0;
  text-align: center;
}
.scrollLoad .loadBtn {
  background-color: #fff;
}
.scrollLoad .loadBtn:hover {
  background-color: #000;
  color: #fff;
}
.no-more {
  color: #999;
}
</style>

