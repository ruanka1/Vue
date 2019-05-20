import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let defaultCity = '北京'
try {
    if (localStorage.city)
        defaultCity = localStorage.city
}
// eslint-disable-next-line
catch (e) {}

export default new Vuex.Store({
    state: {
        city: defaultCity
    },
    mutations: {
        changeCity(state, city) {
            state.city = city
            try {
                localStorage.city = city
            }
            // eslint-disable-next-line
            catch (e) {}
        }
    }
})