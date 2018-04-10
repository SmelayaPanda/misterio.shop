<template>
  <div id="shop_wrapper">
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <div style="flex: 0 0 280px;" align="left">
        <el-button type="text" @click="isCollapsed = !isCollapsed" class="mt-2 ml-3 pl-1">
          <v-icon v-if="isCollapsed" class="info--text">hdr_strong</v-icon>
          <v-icon v-else class="info--text">hdr_weak</v-icon>
        </el-button>
        <el-menu
          :default-active="selectedCategory"
          @select="changeCategory"
          background-color="#0d0d0d"
          text-color="#fff"
          active-text-color="#810101"
          :collapse="isCollapsed">
          <!--Nav Menu-->
          <el-menu-item index="" @click="filterProducts">
            <img src="/static/icon/shop/big/all_products.svg"
                 class="groupIcon"
                 alt="">
            <span slot="title">Все товары</span>
          </el-menu-item>

          <el-submenu
            v-for="option in PRODUCT_CLASSIFICATION"
            :key="option.value"
            :index="option.value">
            <template slot="title">
              <img v-if="option.icon"
                   :src="option.icon"
                   class="groupIcon"
                   alt="">
              <span slot="title">{{ option.label }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="option.label" @click="filterProducts">Все</el-menu-item>
              <el-menu-item
                v-for="child in option.children"
                :key="child.value"
                :index="child.label" @click="filterProducts">
                {{ child.label }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </div>
      <!--ALGOLIA SEARCH-->
      <el-col :xs="24" :sm="24" :md="17" :lg="16" :xl="14" type="flex" align="middle">
        <el-row type="flex" justify="start">
          <el-col :span="14">
            <v-text-field
              name="Algolia search"
              single-line
              dark
              v-model="algoliaSearchText"
              @change="algoliaSearch"
              @keyup.enter.exact="algoliaSearch"
              color="white"
              :prefix="searchGroup"
              prepend-icon="search">
            </v-text-field>
          </el-col>
          <el-col :span="6" align="start">
            <transition name="fade">
              <div style="margin-top: 25px; margin-left: -20px;">
                <i v-if="this.isLoading"
                   class="el-icon-loading white--text">
                </i>
                <el-tag
                  v-if="!this.isLoading && algoliaSearchText"
                  type="danger"
                  size="mini"
                  class="white--text">
                  <span v-if="products">
                    {{ Object.keys(products).length }}
                  </span>
                </el-tag>
              </div>
            </transition>
          </el-col>
        </el-row>
        <!--FILTER-->
        <el-collapse
          id="products_filter"
          v-model="activeName"
          accordion
          style="margin-left: 16px; margin-right: 16px"
          class="primary">
          <!--PRICE FILTER-->
          <el-collapse-item title="Фильтр" name="1" class="primary">
            <el-button type="text" class="pr-4 pb-0 white--text" @click="sortByPrice">
              <span class="pl-4 white--text">
                Цена
              </span>
              <el-tag size="mini">
                <i class="el-icon-caret-top white--text" v-if="!this.sortAsc"></i>
                <i class="el-icon-caret-bottom white--text" v-else></i>
              </el-tag>
            </el-button>
            <div class="pl-3 pr-3">
              <el-slider
                v-model="sliderValues"
                @change="filterProducts"
                range
                :step="100"
                :min="0"
                :max="this.$store.getters.productStatistics.maxPrice">
              </el-slider>
            </div>
            <!--BRAND-->
            <el-row type="flex" justify="center" style="flex-wrap: wrap" class="pt-2">
              <el-col :span="12" align="right" class="pr-1">
                <el-select
                  filterable
                  clearable
                  no-match-text="Брэнд отсутствует"
                  v-model="selectedBrand"
                  placeholder="Бренд"
                  @change="filterProducts"
                  v-if="brands">
                  <el-option
                    v-for="val in brands"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-col>
              <!--COLOR-->
              <el-col :span="12" align="left" class="pl-1">
                <el-select
                  filterable
                  clearable
                  no-match-text="Цвет отсутствует"
                  v-model="selectedColor"
                  placeholder="Цвет"
                  @change="filterProducts"
                  v-if="colors">
                  <el-option
                    v-for="val in colors"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="23" :sm="12" :md="8" :lg="8" :xl="8"
                  v-for="(p,key) in products" :key="key">
            <!--PRODUCT CART-->
            <product-card :id="p.productId"/>
          </el-col>
        </el-row>
        <div class="mb-4 mt-3">
          <el-button
            type="text"
            class="white--text"
            @click="loadMore"
            :disabled="this.isLoading"
            v-if="this.$store.getters.lastVisible">
            Загрузить больше
          </el-button>
        </div>
      </el-col>
    </el-row>
    <back-to-top visibleOffset="500" :right="130" :bottom="37" style="opacity: 0.9; z-index: 9">
      <v-btn fab class="secondary">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </back-to-top>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import ProductCard from './ProductCard'

export default {
  name: 'Shop',
  components: {
    ProductCard,
    BackToTop
  },
  data () {
    let filter = this.$store.getters.productFilters
    return {
      hoverOnCard: false,
      algoliaSearchText: this.$store.getters.algoliaSearchText,
      sortAsc: filter.sortAsc,
      sliderValues: [
        filter.minPrice,
        filter.maxPrice
          ? filter.maxPrice
          : this.$store.getters.productStatistics.maxPrice
      ],
      selectedBrand: filter.brand,
      selectedColor: filter.color,
      selectedGroup: filter.group,
      selectedCategory: filter.category,
      formLabelWidth: '120px',
      isCollapsed: true,
      activeName:
          !filter.brand &&
          !filter.color &&
          !filter.minPrice &&
          !filter.maxPrice ? '0' : '1'
    }
  },
  methods: {
    sortByPrice () {
      this.$store.dispatch('USER_EVENT', `Сортировка по цене ${this.sortAsc}`)
      this.sortAsc = !this.sortAsc
      this.filterProducts()
    },
    changeCategory (key) {
      this.$store.dispatch('USER_EVENT', `Категория: ${key}`)
      let groupList = ['Group A', 'Group B', '...']
      if (groupList.indexOf(key) !== -1) {
        this.selectedGroup = key
        this.selectedCategory = null
      } else {
        this.selectedCategory = key
        this.selectedGroup = null
      }
    },
    filterProducts () {
      this.$store.dispatch('setLastVisible', null)
      this.filter()
    },
    loadMore () {
      this.$store.dispatch('USER_EVENT', 'Загрузить больше')
      this.filter()
    },
    filter () {
      this.$store.dispatch('productFilters', {
        limit: this.algoliaSearchText ? null : 6, // all with algolia search
        sortAsc: this.sortAsc,
        minPrice: this.sliderValues[0],
        maxPrice: this.sliderValues[1],
        category: this.selectedCategory,
        group: this.selectedGroup,
        color: this.selectedColor,
        brand: this.selectedBrand
      })
      return this.$store.dispatch('fetchProducts')
    },
    algoliaSearch () {
      this.$store.dispatch('USER_EVENT', `Поиск по слову: "${this.algoliaSearchText}"`)
      this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
    }
  },
  computed: {
    products () {
      return this.$store.getters.products ? this.$store.getters.products : {}
    },
    maxPrice () {
      let max = 0
      for (let p in this.products) {
        if (Number(this.products[p].price) > max) {
          max = Number(this.products[p].price)
        }
      }
      return max
    },
    brands () {
      return this.$store.getters.dictionaries.brands
    },
    colors () {
      return this.$store.getters.dictionaries.colors
    },
    searchGroup () {
      let searchGroup
      if (this.selectedCategory) {
        searchGroup = this.selectedCategory
      } else if (this.selectedGroup) {
        searchGroup = this.selectedGroup
      } else {
        searchGroup = 'Все'
      }
      return searchGroup + ' : '
    },
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped type="scss">

  .search_input {
    margin-left: 12px;
    padding-right: 24px;
  }

  .el-menu--collapse {
    width: 82px !important;
  }

  #accordion {
    background: #000 !important;
  }

  .groupIcon {
    width: 45px;
    margin-right: 10px;
    z-index: 11;
  }
</style>
