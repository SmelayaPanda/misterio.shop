<template>
  <div id="cart_count"
       v-if="!Array.isArray(cart) && Object.keys(cart).length"
       :key="Object.keys(cart).length"
       :class="this.$route.path === '/cart' || color === 'white' ? 'white--text' :
                        ( color === 'red' ? 'secondary--text' : 'primary--text' )">
    +{{ Object.keys(cart).length }}
  </div>
</template>
<script>
export default {
  name: 'cart-product-count',
  props: {
    color: {}
  },
  computed: {
    cart () {
      return this.$store.getters.user.cart
    }
  }
}
</script>
<style scoped lang="scss">

  img:hover {
    filter: drop-shadow(2px 2px 10px #888);
  }

  #cart_count {
    font-size: 16px;
    font-family: $secondary-font;
    font-weight: normal;
    margin-left: -10px;
  }
</style>
