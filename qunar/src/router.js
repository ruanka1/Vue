import Home from "./pages/home.vue"
import SelectCity from "./pages/select_city.vue"
import Product from "./pages/product.vue"

export default [{
    path: '/',
    component: Home,
}, {
    path: '/city',
    component: SelectCity,
}, {
    path: '/product/:id',
    component: Product,
}]