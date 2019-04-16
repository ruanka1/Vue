import Vue from 'vue'
import App from './App.vue'
import "./css/base.css"

import {
  store
} from "./store/index.js"

import session from "./lib/session"
import api from "./lib/api"
window.api = api

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

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


//全局路由守卫
router.beforeEach((to, from, next) => {
  //管理员页
  let toAdmin = to.matched[0].path == '/admin';
  //个人设置页
  let toMy = to.matched[0].path == '/my';
  //订单页
  let toOrder = to.matched[0].path == '/order/:id';
  if (toAdmin) {
    if (session.isAdmin())
      next();
    next(false)
  } else if (toMy) {
    if (session.loggedIn() && !session.isAdmin())
      next();
    next(false)
  } else if (toOrder) {
    if (session.loggedIn())
      next();
    next(false)
  } else {
    next()
  }
})