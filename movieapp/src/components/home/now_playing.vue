<template>
  <div class="container">
    <ul class="list">
      <router-link
        :to="`/movie/${it.movie_id}`"
        class="item border-bottom"
        v-for="it in arr"
        :key="it.id"
        tag="li"
      >
        <SingleMovie class="single-movie-cmp" :detail="it">
          <div class="btn" slot="btn" @click.stop="tip">购票</div>
        </SingleMovie>
      </router-link>
    </ul>
  </div>
</template>

<script>
import SingleMovie from "../single_movie";
export default {
  props: { arr: Array },
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
.single-movie-cmp >>> .single-movie .img {
  width: 1.28rem;
  height: 1.8rem;
}
.container {
  overflow: auto;
}

.container .list {
  margin: 0 0.24rem 1rem 0.24rem;
  overflow: hidden;
}

.container .list .item {
  display: flex;
  align-items: center;
}

.container .list .item:last-child:before {
  border-bottom: 0;
}

.single-movie-cmp {
  width: 100%;
}

.btn {
  background-color: #f03d37;
}
</style>

