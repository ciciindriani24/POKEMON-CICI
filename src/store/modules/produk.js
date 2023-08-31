import axios from "axios";

const product = {
  namespaced: true,
  state: {
    productData: [],
  },
  getters: {
    getProduct: (state) => state.productData,
    //
    getProductBySlug: (state) => (productSlug) => {
        console.log("ProductSlug:", productSlug);
        console.log("ProductData:", state.productData);
        const product = state.productData.find((p) => p.slug == productSlug);
        console.log("Product:", product);
        return product;
  },
},
  actions: {
    async fetchProduct({ commit }) {
      try {
        const data = await axios.get("https://ecommerce.olipiskandar.com/api/v1/product/search");
        commit("SET_PRODUCT", data.data['products']['data']);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    //
    async fetchSingleProduct({ commit }, productSlug){
        try{
            const response = await axios.get(
                `https://ecommerce.olipiskandar.com/api/v1/product/details/${productSlug}`
            );
            commit("SET_SINGLE_PRODUCT", response.data['products']);
        }catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async addToCart({ commit }, productId) {
      try {
        const response = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts/add",
          {
              "variation_id": productId,
              "qty":  1,
              "temp_user_id": null,
          }, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
          });
          alert("Berhasil menambah data");
          commit("ADD_TO_CART", response.data)
          console.log(response.data)
      } catch (error) {
        console.error(error);

      }
    },
  },
  mutations: {
    SET_PRODUCT(state, product) {
      state.productData = product;
    },
    SET_SINGLE_PRODUCT(state, product) { 
        state.singleProduct = product;
      },
    ADD_TO_CART(state, cart) {
        state.cart = cart
    },
  },
};

export default product;