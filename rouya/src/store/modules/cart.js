import store from "../../lib/localstorage";

const state = {
  cartList: store.get("cart") || []
};

const getters = {
  cartList: state => state.cartList,
  calculTotalPrice(state) {
    if (state.cartList.length) {
      let totalPrice = 0;
      state.cartList.forEach(product => {
        totalPrice +=
          product.count *
          product.product_snapshoot.price *
          (product.product_snapshoot.discount || 1);
      });
      return totalPrice.toFixed(2);
    }
  }
};

const actions = {
  addToCart({ commit }, product) {
    commit("add", {
      product
    });
  },
  updateProduct({ commit }, product) {
    commit("update", {
      product
    });
  },
  removeProduct({ commit }, id) {
    commit("remove", {
      id
    });
  },
  clearCart({ commit }) {
    commit("clear");
  }
};

const mutations = {
  add(state, { product }) {
    let flag = false;
    state.cartList.some(it => {
      if (it.product_id === product.product_id) {
        it.count += product.count;
        flag = true;
        return true;
      }
    });
    if (!flag) {
      state.cartList.push(product);
    }
    store.set("cart", state.cartList || []);
  },

  update(state, { product }) {
    state.cartList.some(it => {
      if (it.id == product.product_id) {
        it.count = product.count;
        return true;
      }
    });
    store.set("cart", state.cartList);
  },
  remove(state, id) {
    state.cartList.some((product, i) => {
      if (product.id == id) {
        state.cartList.splice(i, 1);
        return true;
      }
    });
    store.set("cart", state.cartList);
  },
  clear(state) {
    state.cartList = [];
    store.set("cart", state.cartList);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
