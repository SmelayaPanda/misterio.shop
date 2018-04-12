<template>
  <div id="mobile_menu">
    <!--Mobile toolbar-->
    <v-toolbar class="primary mobile_toolbar"
               :style="this.$route.path === '/' ? 'position: absolute' : ''">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="white--text ml-3 pl-3 side_icon">
      </v-toolbar-side-icon>
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
export default {
  name: 'MobileMenu',
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
    height: 20px;
  }

  @media only screen and (max-width: $xs-screen) {
    #mobile_menu {
      display: block;
    }
  }
</style>
