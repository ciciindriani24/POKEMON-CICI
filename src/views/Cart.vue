<template>
  <section class="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
<div class="mx-auto px-4 sm:px-6 lg:px-8">
  <div class="flex items-center justify-center">
    <h1 class="text-2xl font-semibold text-gray-900">Tambah Evolusi</h1>
  </div>

  <div class="mx-auto mt-8 max-w-2xl md:mt-12">
    <div class="bg-white shadow">
      <div class="px-4 py-6 sm:px-8 sm:py-10">
        <div class="flow-root">
          <ul class="-my-8">
            <li v-for="cart in getCart" :key="cart.cart_id" class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
              <div class="shrink-0">
                <img class="h-24 w-24 max-w-full rounded-lg object-cover" src="../assets/jersey.jpg" alt="" />
              </div>

              <div class="relative flex flex-1 flex-col justify-between">
                <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                  <div class="pr-8 sm:pr-5">
                    <p class="text-base font-semibold text-gray-900">{{ cart.name }}</p>
                    <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">300 g</p>
                  </div>

                  <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">Rp.{{ cart.regular_price * cart.qty }}</p>

                    <div class="sm:order-1">
                      <div class="mx-auto flex h-8 items-stretch text-gray-600">
                        <button @click="changeQty({ cartId: cart.cart_id, typeQty: 'minus'})" class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                        <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{{  cart.qty }}</div>
                        <button @click="changeQty({ cartId: cart.cart_id, typeQty: 'plus'})" class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                  <button type="button" @click="removeItem(cart.cart_id)" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                    </svg>
                  </button>
                </div>
              </div>
          </li>
          </ul>
          </div>


        <div class="mt-6 border-t border-b py-2">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-400">Subtotal</p>
            <p class="text-lg font-semibold text-gray-900">Rp.{{ totalHarga }}</p>
          </div>
          <!-- <div class="flex items-center justify-between">
            <p class="text-sm text-gray-400">Shipping</p>
            <p class="text-lg font-semibold text-gray-900">$8.00</p>
          </div> -->
        </div>
        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Total</p>
          <p class="text-2xl font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">Rp.</span> {{ totalHarga  }}</p>
        </div>
        <center>
<a href="/produk" class="m-2 inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 font-medium text-blue-600 shadow hover:bg-blue-50"> Batal </a>
<a href="/checkout" class="m-2 inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"> Tambah </a>
        </center>
        
 
      </div>
    </div>
  </div>
</div>
</section>

</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['getCart']),
    totalHarga() {
      this.total = this.getCart.reduce((acc, product) => {
        return acc + parseFloat(product.regular_price * product.qty);
      }, 0);
      return this.total.toFixed(2);
    },
  },
  methods: {
    ...mapActions('cart', ['fetchCart']),
    ...mapActions('product', ['fetchProduk']),
    ...mapActions('product', ['addToCart']),

    // change

    changeQty(cartId, typeQty) {
      this.$store.dispatch('cart/changeQuantityCart', cartId, typeQty);
    },

    // remove product from cart
    removeItem(cartId) {
      this.$store.dispatch('cart/removeFromCart', cartId);
    }
  },
  beforeMount() {
    this.fetchProduk();
    this.fetchCart();
  }, 
  mounted() {
    this.fetchCart();
  },
}
</script>