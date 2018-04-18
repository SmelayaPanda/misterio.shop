<template>
  <div>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <transition name="title-fade-left">
        <cart-products v-if="isLoadedCart"/>
      </transition>
      <transition name="title-fade-right">
        <orders-history v-if="isLoadedCart"/>
      </transition>
    </div>
  </div>
</template>

<script>
import OrdersHistory from './OrdersHistory'
import CartProducts from './CartProducts'

export default {
  name: 'ShoppingCart',
  data () {
    return {
      isLoadedCart: false
    }
  },
  components: {
    CartProducts,
    OrdersHistory
  },
  mounted () {
    setInterval(() => {
      this.isLoadedCart = true
    }, 500)
  }
}
</script>

<style scoped lang="scss">
</style>
