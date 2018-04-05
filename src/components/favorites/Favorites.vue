<template>
  <div>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :xs="22" :sm="22" :md="18" :lg="18" :xl="15" align="left" class="ml-1 mr-1 mb-3 mt-2">
        <img src="@/assets/icons/icon_favorite.svg" id="favorite_icon" alt="">
        <span id="favorite_title">
        ИЗБРАННОЕ
      </span>
        <v-divider class="secondary mt-3 mb-4"></v-divider>
      </el-col>
    </el-row>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <el-row
      v-else
      type="flex"
      justify="center"
      style="flex-wrap: wrap">
      <el-col :xs="23" :sm="23" :md="18" :lg="18" :xl="15" align="left">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col
            v-for="product in favorites"
            :key="product.productId"
            :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
            align="left"
            class="favorites_product">
            <el-row
              v-if="product"
              type="flex"
              justify="center"
              style="flex-wrap: wrap">
              <el-col :span="8" align="left">
                <img :src="product.img_0.thumbnail" class="product_thumb" alt="">
              </el-col>
              <el-col :span="14" class="product_descr">
                <span class="product_title">
                  {{ product.title }}
                </span> <br>
                <span class="product_price">
                  {{ product.price }} РУБ
                </span>
                <div @click="addToCart(product)">
                  <app-theme-btn width="120px" class="into_cart">
                    В корзину
                  </app-theme-btn>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Favorites',
  methods: {
    addToCart (product) {
      this.updateOwnProduct(product, 'cart', 'add')
      this.updateOwnProduct(product, 'favorites', 'remove')
    },
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
    }
  },
  computed: {
    favorites () {
      let favorites = this.$store.getters.user.favorites
      if (!Array.isArray(favorites)) { // initial favorites ids array replaced by full object
        return favorites
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #favorite_title {
    color: $color-secondary;
    font-size: 16px;
    margin-top: 20px;
  }

  #favorite_icon {
    height: 28px;
    margin-bottom: -8px;
    margin-right: 3px;
  }

  .favorites_product {
    padding: 20px;
  }

  .product_descr {
    padding-left: 15px;
  }

  .product_thumb {
    height: 140px;
    width: 100%;
    object-fit: cover;
    border-radius: 2px;
  }

  .product_title {
    font-size: 12px;
    color: white;
  }

  .product_price {
    font-size: 12px;
    font-weight: 500;
    color: white;
  }

  .into_cart {
    position: absolute;
    bottom: 5px;
  }

  .into_cart:hover {
    transition: all 0.3s;
    background: $color-secondary;
  }
</style>
