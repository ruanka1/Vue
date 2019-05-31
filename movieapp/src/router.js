import Home from "./pages/home.vue"
import Movie from "./pages/movie.vue"
import Search from "./pages/search.vue"
import City from "./pages/city.vue"
import Cinema from "./pages/cinema.vue"
import My from "./pages/my.vue"
import Setting from "./pages/setting.vue"
import NotFound from "./pages/404.vue"

export default [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: Home,
}, {
    path: '/search',
    component: Search,
}, {
    path: '/movie/:id',
    component: Movie,
}, {
    path: '/city',
    component: City,
}, {
    path: '/cinema',
    component: Cinema,
}, {
    path: '/my',
    component: My,
}, {
    path: '/setting',
    component: Setting,
}, {
    path: '*',
    component: NotFound
}]