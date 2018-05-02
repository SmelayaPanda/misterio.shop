<template>
  <transition name="app-fade-left">
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <transition name="app-fade-left">
        <cart-products v-if="isLoadedCart"/>
      </transition>
      <transition name="app-fade-right">
        <orders-history v-if="isLoadedCart"/>
      </transition>
    </div>
  </transition>
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
    setTimeout(() => {
      this.isLoadedCart = true
    }, 500)
  },
  created () {
    this.$store.dispatch('fetchDictionaries')
  }
}
</script>

<style scoped lang="scss">
</style>
