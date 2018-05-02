<template>
  <div>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <el-row el-row type="flex" justify="center" v-if="product" id="product_card_wrap">
        <el-col :span="1">
          <router-link to="/shop">
            <el-button type="text" style="margin-left: -10px;" class="hidden-sm-and-down">
              <p class="back_to_shop secondary--text">
                Обратно в каталог
                <v-icon class="secondary--text pr-2">keyboard_arrow_right</v-icon>
                <v-icon class="secondary--text pr-2" style="margin-top: -10px;">keyboard_arrow_right</v-icon>
              </p>
            </el-button>
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="20" :md="21" :lg="18" :xl="16" type="flex" align="middle">
          <el-card id="product_card">
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :xs="24" :sm="4" :md="3" :lg="3" :xl="3" id="product_thumbnails_desctop">
                <img v-if="product.img_0.thumbnail" :src="product.img_0.thumbnail" @click="loadOriginal(0)"
                     ref="d_img_0" class="thumb_img active"/>
                <img v-if="product.img_1.thumbnail" :src="product.img_1.thumbnail" @click="loadOriginal(1)"
                     ref="d_img_1" class="thumb_img"/>
                <img v-if="product.img_2.thumbnail" :src="product.img_2.thumbnail" @click="loadOriginal(2)"
                     ref="d_img_2" class="thumb_img"/>
                <img v-if="product.img_3.thumbnail" :src="product.img_3.thumbnail" @click="loadOriginal(3)"
                     ref="d_img_3" class="thumb_img"/>
                <img v-if="product.img_4.thumbnail" :src="product.img_4.thumbnail" @click="loadOriginal(4)"
                     ref="d_img_4" class="thumb_img"/>
              </el-col>
              <el-col :xs="24" :sm="20" :md="9" :lg="9" :xl="10">
                <zoom-on-hover :img-normal="viewImage ? viewImage : product.img_0.original"
                               :img-zoom="viewImage ? viewImage : product.img_0.original"
                               class="main_img">
                </zoom-on-hover>
                <el-row id="product_thumbnails_mobile">
                  <img v-if="product.img_0.thumbnail" :src="product.img_0.thumbnail" @click="loadOriginal(0)"
                       ref="m_img_0" class="thumb_img active"/>
                  <img v-if="product.img_1.thumbnail" :src="product.img_1.thumbnail" @click="loadOriginal(1)"
                       ref="m_img_1" class="thumb_img"/>
                  <img v-if="product.img_2.thumbnail" :src="product.img_2.thumbnail" @click="loadOriginal(2)"
                       ref="m_img_2" class="thumb_img"/>
                  <img v-if="product.img_3.thumbnail" :src="product.img_3.thumbnail" @click="loadOriginal(3)"
                       ref="m_img_3" class="thumb_img"/>
                  <img v-if="product.img_4.thumbnail" :src="product.img_4.thumbnail" @click="loadOriginal(4)"
                       ref="m_img_4" class="thumb_img"/>
                </el-row>
                <el-row class="mt-3">
                  <p id="misterio_shop">
                    <i class="el-icon-minus"></i>
                    Misterio Shop
                    <i class="el-icon-minus"></i>
                  </p>
                </el-row>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                      v-model="product">
                <p id="product_title">
                  {{ product.title }}
                  <span>
                    <v-icon
                      v-if="this.$store.getters.user.favorites[product.productId]"
                      @click.stop="updateOwnProduct(product, 'favorites', 'remove')"
                      class="own_product_icon secondary--text">favorite</v-icon>
                    <v-icon
                      v-else
                      @click.stop="updateOwnProduct(product, 'favorites', 'add')"
                      class="own_product_icon primary--text">favorite_border</v-icon>
                  </span>
                </p>
                <v-divider class="mb-2 mt-2"></v-divider>
                <div class="product_info">
                  <p class="info--text">Арт. : {{ product.SKU }}</p>
                  <el-row type="flex">
                    <el-col :span="12" align="left">
                      <p>
                        <img class="property_icon" src="@/assets/icons/product/brand.svg" width="21px" alt="">
                        {{ product.brand }}
                      </p>
                      <p>
                        <img class="property_icon" src="@/assets/icons/product/color.svg" width="20px" alt="">
                        {{ product.color }} </p>
                      <p>
                        <img class="property_icon" src="@/assets/icons/product/qty.svg" width="20px" alt="">
                        <span v-if="product.totalQty < 1" class="error--text">
                          Нет в наличии
                        </span>
                        <span v-else>
                          {{ product.totalQty }}
                        </span>
                      </p>
                    </el-col>
                    <el-col :span="12" align="left" class="pl-3">
                      <p v-if="product.originCountry">
                        <img class="property_icon" src="@/assets/icons/product/country.svg" width="20px" alt="">
                        {{ product.originCountry }}</p>
                      <p v-if="product.material">
                        <img class="property_icon" src="@/assets/icons/product/material.svg" width="20px" alt="">
                        {{ product.material }}</p>
                      <p v-if="product.size">
                        <img class="property_icon" src="@/assets/icons/product/size.svg" width="16px" alt="">
                        {{ product.size }}</p>
                    </el-col>
                  </el-row>
                  <div id="product_descr_wrapper">
                    <p>{{ product.description }} </p>
                  </div>
                </div>
                <v-divider class="mb-3 mt-4"></v-divider>
                <p>Цена: {{ product.price | price }}<span v-html="RUB"></span></p>
                <el-button v-if="!alreadyAddedProduct"
                           id="into_cart_btn"
                           :disabled="product.totalQty < 1"
                           @click="updateOwnProduct(product, 'cart', 'add')">
                  <span>
                    В корзину
                  </span>
                  <i class="el-icon-goods ml-2" style="transform: scale(1.5)"></i>
                </el-button>
                <!--ONE CLICK-->
                <one-click :disabled="product.totalQty < 1"
                           :alreadyAddedProduct="alreadyAddedProduct"
                           :product="product">
                </one-click>
                <!--ALREADY IN CART-->
                <div v-if="alreadyAddedProduct">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    placement="top-end"
                    content="Продолжить покупки">
                    <router-link to="/shop">
                      <el-button class="already_added_btn">
                        <i class="el-icon-d-arrow-left"></i>
                        В каталог
                      </el-button>
                    </router-link>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    placement="top-end"
                    content="Оформить покупку">
                    <router-link to="/cart">
                      <el-button class="already_added_btn already_added_btn_xs_fix">
                        Оформить
                        <i class="el-icon-d-arrow-right"></i>
                      </el-button>
                    </router-link>
                  </el-tooltip>
                  <br>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Удалить из корзины">
                    <el-button
                      @click="updateOwnProduct(product, 'cart', 'remove')"
                      size="mini">
                      <v-icon class="secondary--text">remove_shopping_cart</v-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ZoomOnHover from '@/components/shared/ZoomOnHover.vue'
import OneClick from './OneClick'

export default {
  props: ['id'],
  name: 'ManId',
  components: {ZoomOnHover, OneClick},
  data () {
    return {
      dialogVisible: false,
      oneClickDialogVisible: false,
      activeImg: 0,
      viewImage: ''
    }
  },
  computed: {
    product () {
      return this.$store.getters.products[this.id]
    },
    alreadyAddedProduct () {
      return this.$store.getters.user.cart[this.id]
    }
  },
  methods: {
    loadOriginal (idx) {
      if (this.$refs['d_img_' + this.activeImg]) {
        this.$refs['d_img_' + this.activeImg].classList.remove('active')
      }
      if (this.$refs['d_img_' + idx]) {
        this.$refs['d_img_' + idx].classList.add('active')
      }
      if (this.$refs['m_img_' + this.activeImg]) {
        this.$refs['m_img_' + this.activeImg].classList.remove('active')
      }
      if (this.$refs['m_img_' + idx]) {
        this.$refs['m_img_' + idx].classList.add('active')
      }
      this.activeImg = idx
      this.viewImage = this.product['img_' + idx].original
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
  }
}
</script>

<style scoped lang="scss">
  #product_card_wrap {
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .main_img {
    width: 100%;
    height: 527px;
    object-fit: cover;
  }

  .thumb_img {
    height: 100px;
    width: 75px;
    object-fit: cover;
    margin-right: 1px;
    margin-left: 1px;
  }

  .thumb_img:hover {
    cursor: pointer;
  }

  .active {
    transition: all 0.5s;
    transform: scale(1.08);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .back_to_shop {
    writing-mode: vertical-rl;
    font-size: 16px;
  }

  #product_title {
    font-size: 20px;
    padding: 10px 10px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #product_descr_wrapper {
    width: 100%;
    height: 170px;
    overflow: scroll;
    margin-bottom: 10px;
  }

  .product_info {
    text-align: left;
    margin-left: 40px;
  }

  #product_card {
    margin-bottom: 70px;
  }

  .own_product_icon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .own_product_icon:hover {
    transform: scale(1.3);
    cursor: pointer;
  }

  .property_icon {
    margin-bottom: -5px;
    margin-right: 2px;
  }

  #into_cart_btn {
    color: white;
    background: $color-secondary;
    height: 44px;
    width: 160px;
    border: 1px solid $color-secondary;
    margin-bottom: 5px;
  }

  .already_added_btn {
    width: 142px;
    margin-bottom: 5px;
  }

  #product_thumbnails_desctop {
    margin-top: 3px;
  }

  #product_thumbnails_mobile {
    display: none;
  }

  #misterio_shop {
    font-size: 24px;
    margin-bottom: 7px;
    margin-top: 7px;
  }

  @media only screen and (max-width: $xs-screen) {
    .product_info {
      margin-left: 10px;
    }
    .already_added_btn_xs_fix {
      margin-left: 3px;
    }
    #product_thumbnails_desctop {
      display: none;
    }
    #product_thumbnails_mobile {
      display: block;
      margin-top: 12px;
    }
  }
</style>
