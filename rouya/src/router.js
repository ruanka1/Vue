import Home from "./pages/home.vue"

import Signup from './pages/signup.vue'
import Login from './pages/login.vue'


export default [{
    path: '/',
    component: Home
}, {
    path: '/signup',
    component: Signup
}, {
    path: '/login',
    component: Login
}]