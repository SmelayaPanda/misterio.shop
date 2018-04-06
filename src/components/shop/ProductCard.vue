<template>
  <div
    v-if="product"
    @click="viewProduct"
    @mouseover="hoveredCard = true"
    @mouseleave="hoveredCard = false"
    class="card_wrapper">
    <v-card class="main_card primary" height="410px">
      <v-card-media :src="product.img_0.card" height="300px"></v-card-media>
      <div style="height: 30px; padding: 10px;">
        <el-row type="flex">
          <el-col :span="12" align="left">
            <p class="grey--text pl-2">
              {{ product.price }} &#8381;
            </p>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="18">
          <p class="shop_product_title">
            {{ product.title | snippet(60) }}
          </p>
        </el-col>
        <el-col :span="6" align="right">
          <transition name="fade">
            <v-icon
              v-if="user.cart[id]"
              @click.stop="updateOwnProduct(product, 'cart', 'remove')"
              class="own_product_icon secondary--text">el-icon-goods
            </v-icon>
            <v-icon
              v-else-if="hoveredCard"
              @click.stop="updateOwnProduct(product, 'cart', 'add')"
              class="own_product_icon white--text">el-icon-goods
            </v-icon>
          </transition>
          <transition name="fade">
            <v-icon
              v-if="user.favorites[id]"
              @click.stop="updateOwnProduct(product, 'favorites', 'remove')"
              class="own_product_icon secondary--text">favorite
            </v-icon>
            <v-icon
              v-else-if="hoveredCard"
              @click.stop="updateOwnProduct(product, 'favorites', 'add')"
              class="own_product_icon white--text">favorite_border
            </v-icon>
          </transition>
        </el-col>
      </el-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'product-card',
  props: ['id'],
  data () {
    return {
      hoveredCard: false
    }
  },
  methods: {
    updateOwnProduct (product, subject, operation) {
      this.$store.dispatch('USER_EVENT',
        `${subject === 'cart' ? 'Корзина' : 'Избранное'}:
         ${operation === 'add' ? ' добавлен' : ' удален'}
        "${product.title}"`
      )
      this.$store.dispatch('updateOwnProducts', {
        subject: subject,
        operation: operation,
        product: product
      })
    },
    viewProduct () {
      this.$store.dispatch('USER_EVENT', `Просмотр: ${this.product.title}`)
      this.$router.push('/product/' + this.id)
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    product () {
      return this.$store.getters.productById(this.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .main_card {
    margin: 10px;
    padding: 0 0 10px;
    border: 1px solid white !important;
  }

  .card_wrapper {
  }

  .card_wrapper:hover {
    cursor: pointer;
  }

  .own_product_icon {
    color: white;
    padding-right: 10px;
  }

  .own_product_icon:hover {
    transform: scale(1.4);
  }

  .shop_product_title {
    color: white;
    font-size: 14px;
    padding: 12px;
    text-align: left;
  }
</style>
