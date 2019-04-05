import Vue from "vue"
import Vuex from "vuex"
import cityModule from "./modules/city"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        cityModule
    }
})