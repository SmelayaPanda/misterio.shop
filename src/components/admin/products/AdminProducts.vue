<template>
  <div v-if="products" id="admin_products">
    <el-row type="flex" justify="start" align="middle" class="mb-1">
      <el-cascader
        :options="PRODUCT_CLASSIFICATION"
        filterable
        placeholder="Выберите категорию"
        v-model="productOption"
        @change="loadCategoryProducts">
      </el-cascader>
      <el-col class="left" style="width: 100px;">
        <add-product
          :group="productOption[0]"
          :category="productOption[1]">
        </add-product>
      </el-col>
    </el-row>
    <el-table
      ref="categoryTable"
      :data="products"
      highlight-current-row
      empty-text="No data"
      style="width: 100vw; text-align: left">
      <!-- TODO: pagination table!-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <p><span>Database id:</span>
            <el-tag v-if="props.row.productId" size="mini" type="success">
              {{ props.row.productId }}
            </el-tag>
          </p>
          <p>Описание: {{ props.row.description }}</p>
          <p>Цвет: {{ props.row.color }}</p>
          <p>Бренд: {{ props.row.brand }}</p>
          <p v-if="props.row.size">
            Размер: {{ props.row.size }}
          </p>
          <p v-if="props.row.material">
            Материал: {{ props.row.material }}
          </p>
          <p v-if="props.row.originCountry">
            Страна: {{ props.row.originCountry }}
          </p>
          <p>Дата создания: {{ props.row.creationDate | date }}</p>
          <p v-if="props.row.editDate">
            Последнее редактирование: {{ props.row.editDate | date }}
          </p>
        </template>
      </el-table-column>
      <!--THUMBNAIL-->
      <el-table-column
        label="Фото"
        width="68">
        <template slot-scope="scope">
          <img :src="scope.row.img_0.thumbnail" height="40px" width="auto">
        </template>
      </el-table-column>
      <!--SKU-->
      <el-table-column
        label="Артикул"
        width="120">
        <template slot-scope="scope">
          <span><el-tag type="success">{{ scope.row.SKU }}</el-tag></span>
        </template>
      </el-table-column>
      <!--Title-->
      <el-table-column
        label="Название"
        width="290">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Title: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <v-chip outline label color="info_a">
                {{ scope.row.title | snippet(25) }}
              </v-chip>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--PRICE-->
      <el-table-column
        label="Цена"
        width="110">
        <template slot-scope="scope">
          <span>
            {{ scope.row.price }} {{ scope.row.currency }}
          </span>
        </template>
      </el-table-column>
      <!--QUANTITY-->
      <el-table-column
        label="Кол-во"
        width="90">
        <template slot-scope="scope">
          <span>
            {{ scope.row.totalQty }}
          </span>
        </template>
      </el-table-column>
      <!--EDIT/DELETE-->
      <el-table-column
        width="180"
        label="Операции">
        <template slot-scope="scope">
          <el-row type="flex" justify="center">
            <edit-product-image :id="scope.row.productId"></edit-product-image>
            <edit-product :id="scope.row.productId"></edit-product>
            <delete-product :id="scope.row.productId" :title="scope.row.title"></delete-product>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="totalProductCount" type="flex" justify="start" class="mt-2">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[6, 10, 20, 50, 100]"
        :total="totalProductCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import AddProduct from './crud/AddProduct'
import EditProduct from './crud/EditProduct'
import EditProductImage from './crud/EditProductImage'
import DeleteProduct from './crud/DeleteProducts'

export default {
  components: {
    EditProductImage,
    EditProduct,
    AddProduct,
    DeleteProduct
  },
  name: 'AdminProducts',
  data () {
    return {
      productOption: ['sexToy', 'vibrator'],
      curPage: 1,
      pageSize: 6
    }
  },
  methods: {
    loadCategoryProducts () {
      this.$store.dispatch('setLastVisible', null)
      this.$store.dispatch('productFilters', {
        limit: null, // all
        sortByPrice: 'desc',
        category: this.productOption[1],
        group: this.productOption[1] ? null : this.productOption[0]
      })
      this.$store.dispatch('fetchProducts')
    },
    changeCurPage (curPage) {
      this.curPage = curPage
    },
    changePageSize (size) {
      this.pageSize = size
    }
  },
  computed: {
    products () {
      if (this.$store.getters.products) {
        return Object.values(this.$store.getters.products)
          .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
      } else {
        return []
      }
    },
    totalProductCount () {
      return this.$store.getters.products ? Object.keys(this.$store.getters.products).length : 0
    }
  },
  created () {
    this.loadCategoryProducts()
  }
}
</script>

<style scoped>
  .el-cascader {
    width: 400px !important;
  }
</style>
