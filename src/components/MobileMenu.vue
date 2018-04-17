<template>
  <div id="mobile_menu">
    <!--Mobile toolbar-->
    <v-toolbar class="primary mobile_toolbar"
               :style="this.$route.path === '/' ? 'position: absolute' : ''">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="white--text ml-3 pl-3 side_icon">
      </v-toolbar-side-icon>
      <img id="app_main_logo_mobile" src="@/assets/icons/logo/logo_site.svg" alt="">
      <img id="app_main_logo_mobile_text" src="@/assets/icons/logo/text_white.svg" alt="">
      <router-link to="/cart" exact>
        <i id="mobile_cart" class="el-icon-goods"></i>
      </router-link>
      <cart-product-count id="cart_product_count_mobile" color="white"></cart-product-count>
    </v-toolbar>

    <!--Navigation drawer-->
    <v-navigation-drawer style="z-index: 100" temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <img class="mobile_menu_icon" :src="'/static/icon/mobile/' + item.icon + '.svg'" alt="">
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import CartProductCount from './CartProductCount'

export default {
  name: 'MobileMenu',
  components: {CartProductCount},
  data () {
    return {
      sideNav: false,
      menuItems: [
        {title: 'Главная', link: '/', icon: 'home'},
        {title: 'Каталог', link: '/shop', icon: 'shop'},
        {title: 'О нас', link: '/about', icon: 'about'},
        {title: 'Акции', link: '/news', icon: 'news'},
        {title: 'Контакты', link: '/contacts', icon: 'contacts'},
        {title: 'Избранное', link: '/favorites', icon: 'favorites'},
        {title: 'Корзина', link: '/cart', icon: 'cart'},
        {title: 'Аккаунт', link: '/account', icon: 'account'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .mobile_toolbar {
    z-index: 11;
    background-image: linear-gradient(90deg, $color-secondary 23%, $color-secondary-dark 100%);
  }

  .side_icon {
    filter: brightness(0) invert(1);
  }

  #mobile_menu {
    display: none;
  }

  .mobile_menu_icon {
    height: 25px;
  }

  #app_main_logo_mobile {
    height: 50px;
    margin-left: 50%;
    margin-top: 5px;
    transform: translateX(-110px);
  }

  #app_main_logo_mobile_text {
    height: 30px;
    transform: translateX(-110px);
  }

  #mobile_cart {
    color: white;
    position: fixed;
    top: 22px;
    right: 45px;
    transform: scale(2);
  }

  #mobile_cart:hover {
    cursor: pointer;
  }

  #cart_product_count_mobile {
    position: fixed;
    top: 20px;
    right: 0;
  }

  @media only screen and (max-width: $sm-screen) {
    #mobile_menu {
      display: block;
    }
  }
</style>
