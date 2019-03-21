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
  mode: "history",
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

//管理员路由验证
router.beforeEach((to, from, next) => {
  let toAdmin = to.matched[0].path == '/admin';
  if (toAdmin) {
    //判断访问者身份是否为管理员
    if (session.isAdmin())
      //如果为true则允许访问 如果为false则禁止访问
      next();
    next(false)
  } else {
    next()
  }
})

//个人页路由验证
router.beforeEach((to, from, next) => {
  let toMy = to.matched[0].path == '/my';
  if (toMy) {
    if (session.loggedIn() && !session.isAdmin())
      next();
    next(false)
  } else {
    next()
  }
})