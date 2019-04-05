//避免在禁用Dlocalstorage时报错
let defaultCity = "北京";
try {
    if (localStorage.currentCity) {
        defaultCity = localStorage.currentCity
    }
} catch (e) {
    new Error('error')
}

const state = {
    currentCity: defaultCity
}

const mutations = {
    changeCity(state, city) {
        state.currentCity = city;
        try {
            localStorage.currentCity = city
        } catch (e) {
            new Error('error')
        }
    }
}


export default {
    state,
    mutations
};