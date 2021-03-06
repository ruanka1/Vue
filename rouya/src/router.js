import Home from "./pages/home.vue"

import Product from "./pages/product.vue"
import Order from "./pages/order.vue"
import Search from "./pages/search.vue"

import Signup from './pages/signup.vue'
import Login from './pages/login.vue'
import Findback from './pages/findback.vue'

import My from './pages/my/my_base.vue'
import My_Favorite from './pages/my/my_favorite.vue'
import My_Order from './pages/my/my_order.vue'
import My_Setting from './pages/my/my_setting.vue'

import Admin from './pages/admin/admin_base.vue'
import Admin_User from './pages/admin/admin_user.vue'
import Admin_Product from './pages/admin/admin_product.vue'
import Admin_Order from './pages/admin/admin_order.vue'
import Admin_Cat from './pages/admin/admin_cat.vue'

export default [{
    path: '/',
    component: Home
}, {
    path: '/signup',
    component: Signup
}, {
    path: '/login',
    component: Login
}, {
    path: '/findback',
    component: Findback
}, {
    path: '/product/:id',
    component: Product
}, {
    path: '/order/:id',
    component: Order
}, {
    path: '/search',
    component: Search
}, {
    path: '/my',
    component: My,
    children: [{
        path: 'order',
        component: My_Order
    }, {
        path: 'favorite',
        component: My_Favorite
    }, {
        path: 'setting',
        component: My_Setting,
    }],
    redirect: '/my/order'
}, {
    path: '/admin',
    component: Admin,
    children: [{
        path: 'user',
        component: Admin_User
    }, {
        path: 'product',
        component: Admin_Product,
    }, {
        path: 'order',
        component: Admin_Order,
    }, {
        path: 'cat',
        component: Admin_Cat,
    }],
    redirect: '/admin/user'
}]