<template>
  <div>
    <!--Loading circular-->
    <v-container v-if="this.isLoading">
      <app-loader></app-loader>
    </v-container>
    <el-row v-else el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="12" type="flex" align="middle">
        <el-card v-if="userCart">
          <p class="mb-3" style="font-size: 18px;">
            <span v-if="userCart.length === 0">Your cart is empty</span>
            <span v-else>My shopping cart</span>
          </p>
          <i class="el-icon-goods mb-3" style="transform: scale(2)"></i>
          <p>
            <router-link to="/shop">
              <el-button type="text" v-if="userCart.length === 0" class="mt-3">Go to shop</el-button>
            </router-link>
          </p>
          <!--PRODUCTS-->
          <el-row v-for="product in userCart"
                  :key="product.productId"
                  v-if="product"
                  type="flex"
                  justify="center"
                  class="mb-3"
                  style="flex-wrap: wrap">
            <el-col :sm="3" :md="3" :lg="3" :xl="3" align="left" class="mr-1">
              <img v-if="product.img_0.thumbnail"
                   :src="product.img_0.thumbnail"
                   ref="img_0" class="thumb_img"/>
            </el-col>
            <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" align="left">
              <router-link :to="'/product/' + product.productId">
                <h3>{{ product.title }}</h3>
              </router-link>
              <p class="mb-0 info--text">SKU: {{ product.SKU }}</p>
              <p class="mb-0">Brand: {{ product.brand }}</p>
              <p class="mb-0">Color: {{ product.color }}</p>
            </el-col>
            <el-col :xs="24" :sm="9" :md="9" :lg="9" :xl="9" align="right">
              <p>{{ parseFloat(product.qty * product.price).toFixed(2) }} {{ product.currency }}</p>
              <el-input-number size="small"
                               v-model="product.qty"
                               :min="1"
                               :max="product.totalQty">
              </el-input-number>
              <el-button type="secondary" size="small" @click="removeFromCart(product.productId)">
                <i class="el-icon-delete"></i>
              </el-button>
              <checkout btn-name="Buy"
                        :checkout-obj="[{
                          productId: product.productId,
                          qty: product.qty
                        }]"
              >
              </checkout>
            </el-col>
          </el-row>
          <div v-if="userCart.length > 1">
            <v-divider></v-divider>
            <p class="pt-3">Total price: {{ parseFloat(totalPrice).toFixed(2) }} RUB </p>
            <div class="paypal_total_btn">
              <checkout btn-name="Buy all"
                        :checkout-obj="totalItems"
              >
              </checkout>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--ORDERS HISTORY-->
    <orders-history></orders-history>
  </div>
</template>

<script>
import Checkout from '@/components/shop/Checkout'
import OrdersHistory from '@/components/shop/OrdersHistory'

export default {
  name: 'ShoppingCart',
  components: {
    Checkout,
    OrdersHistory
  },
  data () {
    return {
      cartProduct: ''
    }
  },
  computed: {
    userCart () {
      let cart = this.$store.getters.cart
      let products = []
      let product
      if (cart.length > 0) {
        for (const productId of cart) {
          product = this.$store.getters.productById(productId)
          products.push(product)
        }
      }
      return products
    },
    totalPrice () {
      let total = 0
      let cart = this.userCart
      for (let product of cart) {
        if (product) {
          total += product.qty * product.price
        }
      }
      return total
    },
    totalItems () {
      let items = []
      let cart = this.userCart
      for (let el of cart) {
        if (el) {
          let item = {}
          item.productId = el.productId
          item.qty = el.qty
          items.push(item)
        }
      }
      return items
    }
  },
  methods: {
    removeFromCart (productId) {
      this.$store.dispatch('updateCart', {operation: 'remove', productId: productId})
    }
  }
}
</script>

<style scoped>
  .thumb_img {
    height: 90px;
    width: 78px;
    object-fit: cover;
    margin-right: 1px;
    margin-left: 1px;
  }
</style>
