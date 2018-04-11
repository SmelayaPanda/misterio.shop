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
        <el-row type="flex" justify="space-evenly">
          <el-col :span="8" align="right">
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
          <el-col :span="8">
            <p class="grey--text pl-2">
              {{ product.price }} &#8381;
            </p>
          </el-col>
          <el-col :span="8" align="left">
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
          </el-col>
        </el-row>
      </div>
      <el-row id="product_title_wrapper" type="flex" justify="center">
        <p class="shop_product_title">
          {{ product.title | snippet(50) }}
        </p>
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
      return this.$store.getters.products[this.id]
    }
  }
}
</script>

<style scoped lang="scss">
  .main_card {
    margin: 10px;
    padding: 0 0 10px;
    border: 1px solid white !important;
    transition: all .5s;
  }

  .card_wrapper {
    transition: all .5s;
  }

  .card_wrapper:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  .own_product_icon {
    color: white;
    padding-left: 5px;
    padding-right: 5px;
  }

  .own_product_icon:hover {
    transform: scale(1.4);
  }

  #product_title_wrapper {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .shop_product_title {
    color: white;
    font-size: 12px;
    padding: 12px;
    margin: 0;
  }

  .card__media {
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
    transition: all .5s;
  }

  .main_card:hover {
    box-shadow: 0 3px 8px 0 rgba(250, 250, 250, 0.2), 3px 3px 8px 0 rgba(250, 250, 250, 0.2);
    .card__media {
      -webkit-filter: none;
      filter: none;
    }
    div.card__media__background {
      transform: scale(1.1) !important;
      width: 110%;
      height: 110%;
    }
  }
</style>
