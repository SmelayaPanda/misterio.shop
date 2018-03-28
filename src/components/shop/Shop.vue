<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <el-col :xs="24" :sm="6" :md="5" :lg="4" :xl="4" align="left">
        <el-button type="text" @click="isCollapsed = !isCollapsed" class="mt-2 ml-3 pl-1">
          <v-icon v-if="isCollapsed">hdr_strong</v-icon>
          <v-icon v-if="!isCollapsed">hdr_weak</v-icon>
        </el-button>
        <el-menu :default-active="selectedCategory"
                 @select="changeCategory"
                 :collapse="isCollapsed">
          <!--Nav Menu-->
          <el-menu-item index="" @click="filterProducts">
            <v-icon class="pr-2">select_all</v-icon>
            <span slot="title">All categories</span>
          </el-menu-item>
          <el-submenu index="Category A">
            <template slot="title">
              <v-icon class="pr-2">looks_one</v-icon>
              <span slot="title">Group A</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="Group A" @click="filterProducts">All in Group A</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">Group One</span>
              <el-menu-item index="Category A1" @click="filterProducts">Category A1</el-menu-item>
              <el-menu-item index="Category A2" @click="filterProducts">Category A2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="Category A3" @click="filterProducts">Category A3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="Category B" @click="filterProducts">
            <v-icon class="pr-2">looks_two</v-icon>
            <span slot="title">Category B</span>
          </el-menu-item>
          <el-menu-item index="Category C" @click="filterProducts">
            <v-icon class="pr-2">looks_3</v-icon>
            <span slot="title">Category C</span>
          </el-menu-item>
          <el-menu-item index="Category D" @click="filterProducts">
            <v-icon class="pr-2">looks_4</v-icon>
            <span slot="title">Category D</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!--ALGOLIA SEARCH-->
      <el-col :xs="24" :sm="18" :md="18" :lg="16" :xl="14" type="flex" align="middle">
        <el-input
          placeholder="Search product..."
          class="search_input"
          @change="algoliaSearch"
          v-model="algoliaSearchText">
          <template slot="prepend" class="pr-3">
            <i v-if="this.isLoading" class="el-icon-loading" style="margin-right: -4px;"></i>
            <el-tooltip placement="bottom" effect="light">
              <div slot="content">
                Type something and press enter! <br>
                Like: cool, beautiful, Sennheiser, black, Group A ...<br>
              </div>
              <el-button>
                <i v-if="!this.isLoading" class="el-icon-search"></i>
              </el-button>
            </el-tooltip>
            <span v-if="this.selectedCategory" class="ml-1">{{ this.selectedCategory }}</span>
            <span v-if="this.selectedGroup" class="ml-1">{{ this.selectedGroup }}</span>
          </template>
          <el-button slot="append" class="pt-3">
            <img src="@/assets/icons/search_by_algolia.svg">
          </el-button>
        </el-input>
        <!--FILTER-->
        <el-collapse v-model="activeName" accordion style="margin-left: 16px; margin-right: 16px">
          <!--PRICE FILTER-->
          <el-collapse-item title="Filter" name="1">
            <el-button type="text" class="pr-4 pb-0" @click="sortByPrice">
              <span class="pl-3">Price</span>
              <el-tag size="mini">
                <i class="el-icon-caret-top" v-if="!this.sortAsc"></i>
                <i class="el-icon-caret-bottom" v-else></i>
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
                <el-select filterable
                           clearable
                           no-match-text="Brand is missing"
                           v-model="selectedBrand"
                           placeholder="Brand"
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
                <el-select filterable
                           clearable
                           no-match-text="Color is missing"
                           v-model="selectedColor"
                           placeholder="Color"
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
                  v-for="(p,key) in products" :key="key"
          >
            <div @click="viewProduct(p.productId, p.title)" class="card_wrapper">
              <v-card class="main_card" height="410px">
                <v-card-media :src="p.img_0.card" height="300px"></v-card-media>
                <v-card-title>
                  <span class="grey--text">{{ p.price }} {{ p.currency }}</span>
                </v-card-title>
                <p class="pl-2 pr-2">{{ p.title | snippet(60) }}</p>
              </v-card>
            </div>
          </el-col>
        </el-row>
        <div class="mb-4 mt-3">
          <el-button type="text" @click="loadMore" v-if="this.$store.getters.lastVisible">Load more</el-button>
        </div>
      </el-col>
    </el-row>
    <back-to-top visibleOffset="500" :right="110" :bottom="30">
      <v-btn fab class="success">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </back-to-top>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'

export default {
  name: 'Men',
  components: {
    BackToTop
  },
  data () {
    return {
      algoliaSearchText: this.$store.getters.algoliaSearchText,
      sortAsc: this.$store.getters.productFilters.sortAsc,
      sliderValues: [
        this.$store.getters.productFilters.minPrice,
        this.$store.getters.productFilters.maxPrice
          ? this.$store.getters.productFilters.maxPrice
          : this.$store.getters.productStatistics.maxPrice
      ],
      selectedBrand: this.$store.getters.productFilters.brand,
      selectedColor: this.$store.getters.productFilters.color,
      selectedGroup: this.$store.getters.productFilters.group,
      selectedCategory: this.$store.getters.productFilters.category,
      formLabelWidth: '120px',
      isCollapsed: true,
      activeName:
          this.$store.getters.productFilters.brand === '' &&
          this.$store.getters.productFilters.color === '' &&
          this.$store.getters.productFilters.minPrice === 0 &&
          this.$store.getters.productFilters.maxPrice === 0 ? '0' : '1'
    }
  },
  methods: {
    sortByPrice () {
      this.$store.dispatch('USER_EVENT', 'Sort by price')
      this.sortAsc = !this.sortAsc
      this.filterProducts()
    },
    viewProduct (id, title) {
      this.$store.dispatch('USER_EVENT', `Watch product: ${title}`)
      this.$router.push('/product/' + id)
    },
    changeCategory (key) {
      this.$store.dispatch('USER_EVENT', `Change category to ${key}`)
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
      this.$store.dispatch('USER_EVENT', 'Load more')
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
      this.$store.dispatch('USER_EVENT', `Algolia search word: "${this.algoliaSearchText}"`)
      this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
    }
  },
  computed: {
    products () {
      return this.$store.getters.products
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
      return this.$store.getters.brands
    },
    colors () {
      return this.$store.getters.colors
    }
  }
}
</script>

<style scoped>
  .main_card {
    margin: 10px;
    padding: 0 0 10px;
  }

  .card_wrapper:hover {
    cursor: pointer;
  }

  .search_input {
    margin-left: 12px;
    padding-right: 24px;
  }
</style>
