<template>
  <div id="cart">
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <el-row
        v-if="userCart"
        type="flex"
        justify="center">
        <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="12" type="flex" align="middle">
          <p id="cart_title" align="left">
            <img src="@/assets/icons/cart_bag.svg" id="cart_bag" alt="">
            КОРЗИНА
          </p>
          <div v-if="!Object.keys(userCart).length">
            <p class="white--text">
              Ваша корзина пуста
            </p>
            <router-link to="/shop">
              <p id="into_catalog">
                В каталог
                <v-icon class="secondary--text">arrow_forward</v-icon>
              </p>
            </router-link>
          </div>
          <!--PRODUCTS-->
          <!--TODO: mobile version of cart-->
          <div v-if="Object.keys(userCart).length">
            <el-row
              id="cart_table_header"
              type="flex"
              justify="center"
              style="flex-wrap: wrap; align-items: center;">
              <el-col :span="3" align="left">
                <span>ТОВАР</span>
              </el-col>
              <el-col :span="8" align="left">
                <span>ОПИСАНИЕ</span>
              </el-col>
              <el-col :span="4" align="center">
                <span>КОЛИЧЕСТВО</span>
              </el-col>
              <el-col :span="3" align="center" class="pr-2">
                <span>СУММА</span>
              </el-col>
              <el-col :span="2" align="center">
                <span>УДАЛИТЬ</span>
              </el-col>
              <el-col :span="3" align="center">
                <span></span>
              </el-col>
            </el-row>
            <v-divider class="secondary mb-3"></v-divider>
            <div
              v-for="product in userCart"
              :key="product.productId"
              v-if="product">
              <el-row
                type="flex"
                justify="center"
                style="flex-wrap: wrap; align-items: center">
                <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3" align="left">
                  <img
                    v-if="product.img_0.thumbnail"
                    :src="product.img_0.thumbnail"
                    ref="img_0"
                    class="thumb_img"/>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" align="left" class="pr-2">
                  <!--TODO: link not working if product not loaded!!!-->
                  <router-link :to="'/product/' + product.productId">
                    <p class="white--text">
                      {{ product.title }},
                      {{ product.color }}
                    </p>
                    <span class="cart_sub_text">
                  Артикул: {{ product.SKU }}
                </span>
                  </router-link>
                </el-col>
                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" align="center">
                  <div>
                    <i @click="product.qty--" class="el-icon-arrow-left count_control"></i>
                    <span class="product_count">
                    {{ product.qty }}
                  </span>
                    <i @click="product.qty++" class="el-icon-arrow-right count_control"></i>
                  </div>
                  <!--Keep for easy min/max control-->
                  <div style="display: none">
                    <el-input-number
                      size="small"
                      v-model="product.qty"
                      :min="1"
                      :max="product.totalQty">
                    </el-input-number>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3" align="center">
                  <p class="price mb-0">
                    {{ parseFloat(product.qty * product.price).toFixed(2) }} &#8381;
                  </p>
                </el-col>
                <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2" align="center">
                  <i
                    @click="removeFromCart(product)"
                    class="el-icon-close remove_product secondary--text">
                  </i>
                </el-col>
                <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3" align="right">
                  <checkout
                    type="single"
                    :checkout-obj="[{productId: product.productId, qty: product.qty}]">
                  </checkout>
                </el-col>
              </el-row>
              <v-divider class="secondary mt-3 mb-3"></v-divider>
            </div>
            <div v-if="Object.keys(userCart).length">
              <el-row type="flex">
                <el-col :span="9" align="left">
                  <router-link to="/shop" exact>
                    <app-theme-btn
                      class="mr-5"
                      width="220px"
                      fontSize="12px">
                      ПРОДОЛЖИТЬ ПОКУПКИ
                    </app-theme-btn>
                  </router-link>
                </el-col>
                <el-col :span="9" align="left">
                  <div class="paypal_total_btn">
                    <checkout
                      type="all"
                      :checkout-obj="totalOrder.items">
                    </checkout>
                  </div>
                </el-col>
                <el-col align="right">
                  <p class="total_price">
                    ИТОГО: {{ parseFloat(totalOrder.price).toFixed(2) }} &#8381;
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--ORDERS HISTORY-->
    <orders-history class="mt-5"></orders-history>
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
    return {}
  },
  methods: {
    removeFromCart (product) {
      this.$store.dispatch('updateOwnProducts', {
        subject: 'cart',
        operation: 'remove',
        product: product
      })
    }
  },
  computed: {
    userCart () {
      let cart = this.$store.getters.user.cart
      if (!Array.isArray(cart)) { // initial cart ids array replaced by full object
        return cart
      }
    },
    totalOrder () {
      let items = []
      let price = 0
      let cart = this.userCart
      if (cart) {
        for (let pId in cart) {
          if (cart.hasOwnProperty(pId) && cart[pId]) {
            let item = {}
            item.productId = cart[pId].productId
            item.qty = cart[pId].qty
            price += cart[pId].qty * cart[pId].price
            items.push(item)
          }
        }
      }
      return {items: items, price: price}
    }
  }
}
</script>

<style scoped lang="scss">
  #cart {
    margin-bottom: 40px;
  }

  .thumb_img {
    height: 90px;
    width: 78px;
    object-fit: cover;
  }

  .cart_sub_text {
    color: $color-info;
    font-size: 12px;
  }

  .total_price {
    color: white;
    font-size: 16px;
    font-weight: 600;
  }

  .price {
    color: white;
    font-weight: 500;
  }

  .remove_product {
    transform: scale(1.8);
  }

  .remove_product:hover {
    cursor: pointer;
  }

  #cart_title {
    color: $color-secondary;
    font-size: 18px;
  }

  #cart_bag {
    height: 28px;
    margin-bottom: -5px;
    margin-right: 2px;
  }

  #into_catalog {
    color: $color-secondary;
    font-size: 16px;
    font-weight: 600;
  }

  .count_control {
    color: $color-info;
    transform: scale(2);
  }

  .count_control:hover {
    cursor: pointer;
    color: white;
  }

  .product_count {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    font-weight: 500;
    width: 30px;
    height: 30px;
    border: 1px solid $color-secondary;
  }

  #cart_table_header {
    font-size: 12px;
    color: $color-info;
    margin-top: 30px;
    margin-bottom: 7px;
  }
</style>
