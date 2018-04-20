<template>
  <div
    v-if="product"
    @click="viewProduct"
    @mouseover="hoveredCard = true"
    @mouseleave="hoveredCard = false"
    class="card_wrapper">
    <v-card
      class="main_card primary"
      :height="this.$vuetify.breakpoint.name === 'md' ? '370px' : '420px'">
      <v-card-media :src="product.img_0.card"
                    :height="this.$vuetify.breakpoint.name === 'md' ? '368px' : '418px'"
                    style="border-radius: 2px"></v-card-media>
      <div id="product_title">
        <el-row type="flex" justify="space-evenly">
          <el-col :span="6" align="right">
            <transition name="fade">
              <el-tooltip v-if="user.favorites[id]"
                          class="item" effect="dark"
                          content="Убрать из избранных"
                          placement="top-start">
                <v-icon
                  @click.stop="updateOwnProduct(product, 'favorites', 'remove')"
                  class="own_product_icon secondary--text">favorite
                </v-icon>
              </el-tooltip>
              <el-tooltip v-else-if="hoveredCard"
                          class="item" effect="dark"
                          content="В избранное"
                          placement="top-start">
                <v-icon
                  @click.stop="updateOwnProduct(product, 'favorites', 'add')"
                  class="own_product_icon white--text">favorite_border
                </v-icon>
              </el-tooltip>
            </transition>
          </el-col>
          <el-col :span="12">
            <p class="grey--text pl-2">
              {{ product.price }} &#8381;
            </p>
          </el-col>
          <el-col :span="6" align="left">
            <transition name="fade">
              <el-tooltip v-if="product.totalQty < 1 && hoveredCard"
                          class="item" effect="dark"
                          content="Нет в наличии"
                          placement="top-start">
                <v-icon class="own_product_icon white--text">info_outline</v-icon>
              </el-tooltip>
              <el-tooltip v-else-if="user.cart[id]"
                          class="item" effect="dark"
                          content="Убрать из корзины"
                          placement="top-start">
                <v-icon
                  @click.stop="updateOwnProduct(product, 'cart', 'remove')"
                  class="own_product_icon secondary--text">el-icon-goods
                </v-icon>
              </el-tooltip>
              <el-tooltip v-else-if="hoveredCard"
                          class="item" effect="dark"
                          content="В корзину"
                          placement="top-start">
                <v-icon
                  @click.stop="updateOwnProduct(product, 'cart', 'add')"
                  class="own_product_icon white--text">el-icon-goods
                </v-icon>
              </el-tooltip>
            </transition>
          </el-col>
        </el-row>
        <el-row id="product_title_wrapper">
          <p id="shop_product_title">
            {{ product.title | snippet(56) }}
          </p>
        </el-row>
      </div>
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
    border: 1px solid $color-info-ultra-dark !important;
    transition: all .5s;
  }

  .main_card:hover {
    box-shadow: 0 3px 8px 0 rgba(250, 250, 250, 0.15), 3px 3px 8px 0 rgba(250, 250, 250, 0.15);
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

  .card_wrapper {
    transition: all .5s;
  }

  .card_wrapper:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  .own_product_icon {
    color: white;
    padding-left: 5px;
    padding-right: 5px;
  }

  .own_product_icon:hover {
    transform: scale(1.3);
  }

  #product_title_wrapper {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #shop_product_title {
    color: white;
    font-size: 11px;
    padding: 12px;
    margin: 0;
  }

  .card__media {
    filter: grayscale(.5);
    transition: all .5s;
  }

  #product_title {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
