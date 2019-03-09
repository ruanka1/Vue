<template>
  <div id="app">
    <GlobalNav/>
    <router-view></router-view>
    <GlobalFooter/>
  </div>
</template>

<script>
import GlobalNav from "./components/global_nav.vue";
import GlobalFooter from "./components/global_footer.vue";
export default {
  components: { GlobalNav, GlobalFooter }
};
</script>

<style>
</style>
