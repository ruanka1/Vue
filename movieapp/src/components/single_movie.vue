<template>
  <div class="single-movie">
    <div class="img">
      <img :src="detail.img ">
    </div>
    <div class="text">
      <div class="title text-item">{{ detail.title }}</div>
      <div v-if="detail.star" class="text-item">
        评分
        <span class="star">{{ detail.star }}</span>
      </div>
      <div v-if="detail.people" class="text-item">
        <span class="people">{{ detail.people }}</span>人想看
      </div>
      <div class="actor text-item">主演: {{ detail.actor }}</div>
      <div
        v-if="detail.country"
        class="country text-item"
      >{{detail.country}} / {{detail.duration}}分钟</div>
      <div v-if="detail.date" class="date text-item">{{handelDate(detail.date)}}日上映</div>
      <div class="version text-item">
        <span v-for="item in  detail.version" :key="item.key">
          <i :class="'iconfont icon-' + item"></i>
        </span>
      </div>
    </div>
    <slot name="btn"></slot>
  </div>
</template>

<script>
export default {
  props: { detail: Object },
  methods: {
    handelDate(str) {
      return str.substring(0, 10);
    }
  }
};
</script>

<style>
.single-movie {
  display: flex;
  align-items: center;
  padding: 0.24rem 0;
}
.single-movie .img {
  width: 1.28rem;
  height: 1.8rem;
}
.img img {
  width: 100%;
}
.single-movie .text {
  margin-left: 0.2rem;
  flex: 1;
  position: relative;
}

.single-movie .text .text-item {
  font-size: 0.26rem;
  color: #666;
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.single-movie .text .title {
  font-size: 0.34rem;
  line-height: 0.6rem;
  width: 3.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
}
.single-movie .text .star,
.single-movie .text .people {
  font-weight: bold;
  color: #faaf00;
  font-size: 0.3rem;
  line-height: 0.42rem;
}
.single-movie .text .actor,
.single-movie .text .country,
.single-movie .text .date {
  line-height: 0.46rem;
}

.single-movie .text .version .iconfont {
  font-size: 0.46rem;
  padding-right: 0.1rem;
}

.btn {
  color: #fff;
  border-radius: 4px;
  font-size: 0.24rem;
  cursor: pointer;
  width: 0.94rem;
  height: 0.54rem;
  line-height: 0.6rem;
  text-align: center;
}
</style>
