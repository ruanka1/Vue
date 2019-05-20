<template>
  <div class="container">
    <Header>
      <h1 class="title" slot="title">我的</h1>
    </Header>
    <TapBar/>
  </div>
</template>

<script>
import Header from "../components/header";
import TapBar from "../components/tapbar";

export default {
  components: { Header, TapBar }
};
</script>

<style scoped>
</style>
