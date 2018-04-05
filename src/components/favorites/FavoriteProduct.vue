<template>
  <div @mouseover="showRemoveBtn = true"
       @mouseleave="showRemoveBtn = false"
       class="favorites_product">
    <el-row
      v-if="product"
      type="flex"
      justify="center"
      style="flex-wrap: wrap">
      <el-col :span="10" align="left">
        <img :src="product.img_0.thumbnail" class="product_thumb" alt="">
      </el-col>
      <v-icon
        v-show="showRemoveBtn"
        @click="updateOwnProduct(product, 'favorites', 'remove')"
        class="remove_btn">close
      </v-icon>
      <el-col :span="13" class="product_descr">
        <span class="product_title">
          {{ product.title }}
        </span> <br>
        <span class="product_price">
          {{ product.price }} РУБ
        </span>
        <div @click="addToCart">
          <app-theme-btn width="120px" class="into_cart">
            В корзину
          </app-theme-btn>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'favorite-product',
  props: ['id'],
  data () {
    return {
      showRemoveBtn: false
    }
  },
  methods: {
    addToCart () {
      this.updateOwnProduct(this.product, 'cart', 'add')
      this.updateOwnProduct(this.product, 'favorites', 'remove')
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
    product () {
      return this.$store.getters.productById(this.id)
    }
  }
}
</script>
<style scoped lang="scss">

  .favorites_product {
    padding: 20px 10px;
  }

  .favorites_product:hover {
    border: 1px solid $color-secondary;
  }

  .product_descr {
    padding-left: 15px;
    padding-right: 15px;
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

  .remove_btn {
    position: absolute;
    top: 0;
    right: 0;
    color: $color-secondary;
  }

  .remove_btn:hover {
    cursor: pointer;
  }
</style>
