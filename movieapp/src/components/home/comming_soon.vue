<template>
  <div class="container">
    <ul class="list">
      <router-link
        :to="`/movie/${it.movie_id}`"
        class="item"
        v-for="it in list"
        :key="it.id"
        tag="li"
      >
        <SingleMovie class="single-movie-cmp" :detail="it"/>
        <div class="btn" @click.stop="tip">预售</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import SingleMovie from "../single_movie";
export default {
  props: { list: Array },
  components: { SingleMovie },
  data() {
    return {
      tip() {
        alert("功能暂未实现");
      }
    };
  }
};
</script>

<style scoped>
.container {
  flex: 1;
  overflow: auto;
}
.container .list {
  margin: 0 0.24rem 1rem 0.24rem;
  overflow: hidden;
}
.container .list .item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
.single-movie-cmp {
  flex: 1;
}
.btn {
  width: 1rem;
  height: 0.54rem;
  line-height: 0.6rem;
  text-align: center;
  background-color: #3c9fe6;
  color: #fff;
  border-radius: 4px;
  font-size: 0.24rem;
  cursor: pointer;
}
</style>

