<template>
  <div id="app">
    <globalNav/>
    <router-view></router-view>
    <globalFooter/>
  </div>
</template>

<script>
import globalNav from "./components/global_nav.vue";
import globalFooter from "./components/global_footer.vue";
export default {
  components: { globalNav, globalFooter }
};
</script>

<style>
</style>
