<template>
  <div class="load"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.load {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
  border: 0.1em solid currentcolor;
  border-bottom-color: transparent;
  border-radius: 50%;
  -webkit-animation: 1s load linear infinite;
  animation: 1s load linear infinite;
  position: relative;
  color: #f03d37;
  font-size: 0.5rem;
}

@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
