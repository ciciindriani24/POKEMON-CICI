import { createStore } from "vuex";
import auth from "./modules/auth";
import product from "./modules/product";
import cart from "./modules/cart";
import order from "./modules/order";


const store = createStore({
    state: {
        isLoading: false,
    },
    modules: {
        auth,
        product,
        cart,
        order
        
    },
});

export default store;