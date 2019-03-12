import Home from "./pages/home.vue"

import Product from "./pages/product.vue"

import Signup from './pages/signup.vue'
import Login from './pages/login.vue'
import Findback from './pages/findback.vue'

import Admin from './pages/admin/admin_base.vue'
import Admin_User from './pages/admin/admin_user.vue'
import Admin_Product from './pages/admin/admin_product.vue'
import Admin_Order from './pages/admin/admin_order.vue'
import Admin_Brand from './pages/admin/admin_brand.vue'
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
        path: 'brand',
        component: Admin_Brand,
    }, {
        path: 'cat',
        component: Admin_Cat,
    }],
    redirect: '/admin/user'
}]