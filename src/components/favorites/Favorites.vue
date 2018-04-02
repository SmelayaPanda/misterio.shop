<template>
  <div>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="15" align="left" class="ml-1 mr-1 mb-3 mt-2">
        <img src="@/assets/icons/icon_favorite.svg" id="favorite_icon" alt="">
        <span id="favorite_title">
        ИЗБРАННОЕ
      </span>
        <v-divider class="secondary mt-3 mb-4"></v-divider>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :xs="23" :sm="23" :md="18" :lg="16" :xl="15" align="left">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col
            v-for="i in (0, 9)" :key="i"
            :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
            align="left"
            class="favorites_product">
            <el-row type="flex" justify="center" style="flex-wrap: wrap">
              <el-col :span="10" align="left">
                <div class="product_thumb"></div>
              </el-col>
              <el-col :span="14" class="product_descr">
                <p class="product_title">Продукт название {{ i }}</p>
                <p class="product_price">{{ i * 10 }} РУБ</p>
                <app-theme-btn width="120px" class="into_cart">
                  В корзину
                </app-theme-btn>
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
  name: 'Favorites'
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
    padding:  20px;
  }
  .product_descr {
    padding-left: 15px;
  }

  .product_thumb {
    background: white;
    height: 130px;
    width: 100%;
    border-radius: 2px;
  }

  .product_title {
    color: white;
  }

  .product_price {
    color: white;
  }

  .into_cart {
  }

  .into_cart:hover {
    transition: all 0.3s;
    background: $color-secondary;
  }
</style>
