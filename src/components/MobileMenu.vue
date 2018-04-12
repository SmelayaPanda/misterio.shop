<template>
  <div id="mobile_menu">
    <!--Mobile toolbar-->
    <v-toolbar class="primary mobile_toolbar">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="white--text ml-3 pl-3 side_icon">
      </v-toolbar-side-icon>
    </v-toolbar>

    <!--Navigation drawer-->
    <v-navigation-drawer style="z-index: 100" temporary absolute v-model="sideNav">
      <v-list>
        <!--:key="item.title for dynamic assigning-->
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
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
        {title: 'Главная', link: '/', icon: 'computer'},
        {title: 'Каталог', link: '/shop', icon: 'storage'},
        {title: 'О нас', link: '/about', icon: 'account_balance'},
        {title: 'Акции', link: '/news', icon: 'new_releases'},
        {title: 'Контакты', link: '/contacts', icon: 'contacts'},
        {title: 'Избранное', link: '/favorites', icon: 'favorite'},
        {title: 'Корзина', link: '/cart', icon: 'shopping_cart'},
        {title: 'Аккаунт', link: '/account', icon: 'perm_identity'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .mobile_toolbar {
    background-image: linear-gradient(90deg, $color-secondary 23%, $color-secondary-dark 100%);
  }

  .side_icon {
    filter: brightness(0) invert(1);
  }

  #mobile_menu {
    display: none;
  }

  @media only screen and (max-width: $xs-screen) {
    #mobile_menu {
      display: block;
    }
  }
</style>
