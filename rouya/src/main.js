import Vue from 'vue'
import App from './App.vue'
import "./css/base.css"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import Router from "vue-router"
Vue.use(Router)
import routeConfig from "./router.js"
const router = new Router({
  routes: routeConfig
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')