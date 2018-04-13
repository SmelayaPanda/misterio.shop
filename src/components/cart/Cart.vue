<template>
  <div id="cart">
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <cart-products/>
      <orders-history/>
    </div>
  </div>
</template>

<script>
import OrdersHistory from './OrdersHistory'
import CartProducts from './CartProducts'

export default {
  name: 'ShoppingCart',
  components: {
    CartProducts,
    OrdersHistory
  }
}
</script>

<style scoped lang="scss">
</style>
