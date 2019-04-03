<template>
  <div id="app">
    <router-view></router-view>
    <GlobalFooter/>
  </div>
</template>

<script>
import GlobalFooter from "./components/global_footer";

export default {
  components: { GlobalFooter }
};
</script>

<style>
</style>
