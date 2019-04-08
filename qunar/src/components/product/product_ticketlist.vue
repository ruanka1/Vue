<template>
  <div>
    <div class="detail" v-for="(it,index) in list" :key="index">
      <div class="title">
        <span class="icon"></span>
        {{it.title}}
      </div>
      <div class="children" v-if="it.children">
        <TicketList :list="it.children"></TicketList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketList",
  props: { list: Array }
};
</script>

<style lang="stylus" scoped>
.detail {
  background-color: #fff;

  .title {
    position: relative;
    height: 0.88rem;
    padding: 0 0.7rem;
    font-size: 0.32rem;
    line-height: 0.88rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    .icon {
      position: absolute;
      top: 0.25rem;
      left: 0.2rem;
      width: 0.36rem;
      height: 0.36rem;
      background: url('http://s.qunarzz.com/piao/image/touch/sight/detail.png') 0 -0.45rem no-repeat;
      background-size: 0.4rem 3rem;
    }
  }

  .title:last-child {
    border-top: 0;
  }

  .children {
    padding-left: 0.5rem;
  }
}

.detail:first-child .title {
  border-top: 0;
}
</style>


