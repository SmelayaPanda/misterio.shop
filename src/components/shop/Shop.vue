<template>
  <div id="shop_wrapper">
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <div align="left">
        <el-button type="text" @click="isCollapsed = !isCollapsed" id="collapse_btn">
          <v-icon v-if="isCollapsed" class="info--text">hdr_strong</v-icon>
          <v-icon v-else class="info--text">hdr_weak</v-icon>
        </el-button>
        <el-menu
          id="shop_nav_menu"
          :default-active="selectedCategory"
          @select="changeCategory"
          background-color="transparent"
          unique-opened
          text-color="#fff"
          active-text-color="#810101"
          :collapse="isCollapsed">
          <!--Nav Menu-->
          <el-menu-item index="" @click="filterProducts">
            <img src="/static/icon/shop/big/all_products.svg" class="groupIcon" alt="">
            <span slot="title">Все товары</span>
          </el-menu-item>

          <el-submenu
            v-for="option in PRODUCT_CLASSIFICATION"
            :key="option.value"
            :index="option.value">
            <template slot="title">
              <img v-if="option.icon" :src="option.icon" class="groupIcon" alt="">
              <span slot="title">{{ option.label }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="option.value" @click="filterProducts">
                Все
              </el-menu-item>
              <el-menu-item
                v-for="child in option.children"
                :key="child.value"
                :index="child.value"
                @click="filterProducts">
                {{ child.label }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <!--ALGOLIA SEARCH-->
      <el-col :xs="24" :sm="24" :md="17" :lg="16" :xl="14" type="flex" align="middle">
        <el-row type="flex" id="algolia_search_input">
          <el-col :xs="23" :sm="23" :md="17" :lg="16" :xl="14">
            <v-text-field
              name="Algolia search"
              v-model="algoliaSearchText"
              @change="algoliaSearch"
              @keyup.enter.exact="algoliaSearch"
              :prefix="searchGroup"
              prepend-icon="search"
              dark
              single-line
              color="white">
            </v-text-field>
          </el-col>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" align="start">
            <div id="search_count">
              <i v-if="this.isLoading" class="el-icon-loading white--text"></i>
              <div v-if="!this.isLoading && this.$store.getters.algoliaSearchText">
                <el-tag type="danger" size="mini" class="white--text">
                  <span v-if="products">
                    {{ Object.keys(products).length }}
                  </span>
                </el-tag>
                <img id="search_by_algolia_icon" src="@/assets/icons/text/search_by_algolia.svg" alt="">
              </div>
            </div>
          </el-col>
        </el-row>
        <!--FILTER-->
        <el-collapse
          id="products_filter"
          v-model="activeName"
          accordion>
          <!--PRICE FILTER-->
          <el-collapse-item title="Фильтр" name="1">
            <el-button @click="changeSortByPrice" type="text" class="pr-4 pb-0 white--text">
              <div class="tooltip pl-4 white--text">
                Цена
                <span class="tooltip_text">Нажми для сортировки</span>
              </div>
              <el-tag size="mini">
                <i v-if="this.sortByPrice === 'asc'" class="el-icon-sort-up white--text"></i>
                <i v-else class="el-icon-sort-down white--text"></i>
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
            <el-row type="flex" justify="center" style="flex-wrap: wrap" class="pt-2">
              <!--COUNTRY-->
              <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="selected_filter">
                <el-select
                  filterable
                  clearable
                  no-match-text="Страна отсутствует"
                  v-model="selectedCountry"
                  placeholder="Страна"
                  @change="filterProducts"
                  v-if="dictionaries.countries">
                  <el-option
                    v-for="val in dictionaries.countries"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-col>
              <!--BRAND-->
              <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="selected_filter">
                <el-select
                  filterable
                  clearable
                  no-match-text="Брэнд отсутствует"
                  v-model="selectedBrand"
                  placeholder="Бренд"
                  @change="filterProducts"
                  v-if="dictionaries.brands">
                  <el-option
                    v-for="val in dictionaries.brands"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-col>
              <!--COLOR-->
              <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="selected_filter">
                <el-select
                  filterable
                  clearable
                  no-match-text="Цвет отсутствует"
                  v-model="selectedColor"
                  placeholder="Цвет"
                  @change="filterProducts"
                  v-if="dictionaries.colors">
                  <el-option
                    v-for="val in dictionaries.colors"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-col>
              <!--Material-->
              <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="selected_filter">
                <el-select
                  filterable
                  clearable
                  no-match-text="Материал отсутствует"
                  v-model="selectedMaterial"
                  placeholder="Материал"
                  @change="filterProducts"
                  v-if="dictionaries.materials">
                  <el-option
                    v-for="val in dictionaries.materials"
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
                  v-for="(p,key) in products" :key="key"
                  itemscope itemtype="http://schema.org/ItemList">
            <!--PRODUCT CART-->
            <product-card :id="p.productId" itemprop="itemListElement" itemtype="http://schema.org/Product"/>
          </el-col>
        </el-row>
        <div class="mb-4 mt-3">
          <el-button
            v-if="this.$store.getters.lastVisible"
            type="text"
            class="white--text"
            @click="loadMore"
            :disabled="this.isLoading">
            Загрузить больше
          </el-button>
        </div>
      </el-col>
    </el-row>
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
      isMountedShop: false,
      hoverOnCard: false,
      algoliaSearchText: this.$store.getters.algoliaSearchText,
      sortByPrice: filter.sortByPrice,
      sliderValues: [
        filter.minPrice,
        filter.maxPrice
          ? filter.maxPrice
          : this.$store.getters.productStatistics.maxPrice
      ],
      selectedCountry: filter.country,
      selectedBrand: filter.brand,
      selectedColor: filter.color,
      selectedMaterial: filter.material,
      selectedGroup: filter.group,
      selectedCategory: filter.category,
      formLabelWidth: '120px',
      isCollapsed: false,
      activeName:
          !filter.brand &&
          !filter.color &&
          !filter.minPrice &&
          !filter.maxPrice ? '0' : '1'
    }
  },
  methods: {
    changeSortByPrice () {
      if (this.sortByPrice === 'asc') {
        this.sortByPrice = 'desc'
        this.$store.dispatch('USER_EVENT', `Сортировка по цене: убывание`)
      } else {
        this.sortByPrice = 'asc'
        this.$store.dispatch('USER_EVENT', `Сортировка по цене: возрастание`)
      }
      this.filterProducts()
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
      this.logFilterEvents()
      this.$store.dispatch('productFilters', {
        limit: 15,
        sortByPrice: this.sortByPrice,
        minPrice: this.sliderValues[0],
        maxPrice: this.sliderValues[1],
        category: this.selectedCategory,
        group: this.selectedGroup,
        country: this.selectedCountry,
        brand: this.selectedBrand,
        color: this.selectedColor,
        material: this.selectedMaterial
      })
        .then(() => {
          if (this.algoliaSearchText) {
            return this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
          } else {
            return this.$store.dispatch('fetchProducts')
          }
        })
    },
    changeCategory (key) {
      let groupList = ['sexToy', 'bdsm', 'baa', 'condom', 'eroticLingerie', 'cosmetic']
      if (groupList.indexOf(key) !== -1) {
        this.selectedGroup = key
        this.selectedCategory = null
      } else {
        this.selectedCategory = key
        this.selectedGroup = null
      }
      this.$store.dispatch('USER_EVENT', `Категория: ${this.searchGroup.split(':')[0]}`)
    },
    algoliaSearch () {
      if (!this.algoliaSearchText) {
        this.$store.dispatch('setAlgoliaSearchText', null)
        return this.filterProducts()
      }
      if (this.algoliaSearchText !== this.$store.getters.algoliaSearchText) { // because input have 2 events
        this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
        this.$store.dispatch('USER_EVENT', `Поиск по слову: "${this.algoliaSearchText}"`)
      }
    },
    logFilterEvents () {
      let lastFilter = this.$store.getters.productFilters
      if (lastFilter.brand !== this.selectedBrand) {
        this.$store.dispatch('USER_EVENT', `Фильтр - бренд: ${this.selectedBrand}`)
      }
      if (lastFilter.country !== this.selectedCountry) {
        this.$store.dispatch('USER_EVENT', `Фильтр - страна: ${this.selectedCountry}`)
      }
      if (lastFilter.color !== this.selectedColor) {
        this.$store.dispatch('USER_EVENT', `Фильтр - цвет: ${this.selectedColor}`)
      }
      if (lastFilter.material !== this.selectedMaterial) {
        this.$store.dispatch('USER_EVENT', `Фильтр - материал: ${this.selectedMaterial}`)
      }
      if (lastFilter.minPrice !== this.sliderValues[0] ||
          (lastFilter.maxPrice !== this.sliderValues[1] &&
            this.sliderValues[1] !== this.$store.getters.productStatistics.maxPrice)) {
        this.$store.dispatch('USER_EVENT', `Фильтр - цена: [${this.sliderValues[0]}, ${this.sliderValues[1]}]`)
      }
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
    dictionaries () {
      return this.$store.getters.dictionaries
    },
    searchGroup () { // TODO: may be improve it?)
      let searchGroup = ''
      if (this.selectedCategory) {
        for (let group of this.PRODUCT_CLASSIFICATION) {
          let categories = group.children
          for (let category in categories) {
            if (categories.hasOwnProperty(category) &&
                categories[category].value === this.selectedCategory) {
              searchGroup = categories[category].label
            }
          }
        }
      } else if (this.selectedGroup) {
        for (let group of this.PRODUCT_CLASSIFICATION) {
          if (group.value === this.selectedGroup) {
            searchGroup = group.label
          }
        }
      } else {
        searchGroup = 'Все'
      }
      return searchGroup + ' : '
    },
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    setTimeout(() => {
      this.isMountedShop = true
    }, 500)
  },
  created () {
    this.$store.dispatch('fetchProductStatistics') // product MaxPrice for shop
    this.$store.dispatch('fetchDictionaries') // product dropdowns
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped lang="scss">
  #shop_nav_menu {
    width: 280px;
  }

  .search_input {
    margin-left: 12px;
    padding-right: 24px;
  }

  .selected_filter {
    padding: 10px;
  }

  #search_by_algolia_icon {
    position: absolute;
    margin-left: 5px;
  }

  .el-menu--collapse {
    width: 82px !important;
  }

  #collapse_btn {
    margin-top: 84px;
    margin-left: 28px;
  }

  #accordion {
    background: #000 !important;
  }

  .groupIcon {
    width: 45px;
    margin-right: 10px;
    z-index: 11;
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .tooltip .tooltip_text {
    font-size: 10px;
    opacity: 0;
    color: white;
    text-align: center;
    padding: 4px 0;

    /* Position the tooltip */
    position: absolute;
    top: 0;
    left: 100px;
    z-index: 1;
    transition: all 1s;
  }

  .tooltip:hover .tooltip_text {
    opacity: 1;
  }

  #algolia_search_input {
    justify-content: start;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  #search_count {
    margin-top: 25px;
    margin-left: -20px;
  }

  @media only screen and (max-width: $sm-screen) {
    #shop_nav_menu {
      margin-top: 0;
      width: 99vw;
    }
    #collapse_btn {
      margin-top: 0;
    }
    #search_count {
      margin-top: -5px;
      margin-left: 50%;
      transform: translateX(-90px);
      margin-bottom: 15px;
    }
  }
</style>
