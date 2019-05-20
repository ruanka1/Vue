<template>
  <div class="container">
    <slot name="title"></slot>
    <slot name="back"></slot>
    <slot name="cancel"></slot>
  </div>
</template>

<script>
export default { name: "GlobalHeader" };
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 1rem;
  color: #fff;
  background-color: #f03d37;
}

.container .title {
  text-align: center;
  line-height: 1rem;
  font-size: 0.36rem;
}

.container .back,
.container .cancel {
  position: absolute;
  top: 0;
  line-height: 1rem;
  font-size: 0.4rem;
  font-weight: bold;
  color: #fff;
}

.container .back {
  left: 0.2rem;
}

.container .cancel {
  right: 0.2rem;
}
</style>
