<template>
  <div>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :xs="22" :sm="22" :md="18" :lg="18" :xl="15" align="left" class="ml-1 mr-1 mb-3 mt-2">
        <img src="@/assets/icons/routers/icon_favorite.svg" id="favorite_icon" alt="">
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
        <el-row v-if="Object.keys(favorites).length" type="flex" justify="center" style="flex-wrap: wrap">
          <el-col
            v-for="product in favorites"
            :key="product.productId"
            :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
            align="left">
            <favorite-product :id="product.productId"/>
          </el-col>
        </el-row>
        <el-row v-else type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :span="24">
            <p id="favorite_list" align="center">Список Ваших желаний пуст</p>
          </el-col>
          <router-link to="/shop">
            <p id="into_catalog">
              В каталог
              <v-icon class="secondary--text">arrow_forward</v-icon>
            </p>
          </router-link>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FavoriteProduct from './FavoriteProduct'

export default {
  name: 'Favorites',
  components: {FavoriteProduct},
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

  #into_catalog {
    color: $color-secondary;
    font-size: 16px;
    font-weight: 600;
  }

  #favorite_list {
    color: white;
    margin-bottom: 10px;
  }
</style>
