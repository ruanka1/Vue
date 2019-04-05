import Vue from 'vue'
import App from './App.vue'

import {
  store
} from "./store/index"

import api from "./lib/api"
window.api = api

import "./css/reset.css"
import "./css/border.css"
import "./css/iconfont.css"

import fastClick from "fastclick"
fastClick.attach(document.body)

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.css'

import Router from "vue-router"
Vue.use(Router)
import routeConfig from "./router.js"
const router = new Router({
  mode: "hash",
  routes: routeConfig,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')