<template>
  <div>
    <v-btn class="primary" @click="dialogFormVisible = true">
      <v-icon class="white--text">add</v-icon>
    </v-btn>

    <el-dialog :title="`New product in: ${group} / ${category}`" :visible.sync="dialogFormVisible" width="100%"
               :fullscreen="true">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form :model="product">
            <el-form-item label="Title" :label-width="formLabelWidth">
              <el-input v-model="product.title"
                        placeholder="(max 100 symbols)"
                        :maxlength="100"
              ></el-input>
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input v-model="product.description"
                        type="textarea"
                        placeholder="(max 400 symbols)"
                        :autosize="{ minRows: 3, maxRows: 7}"
                        :maxlength="400"
              ></el-input>
            </el-form-item>
            <el-form-item label="SKU" :label-width="formLabelWidth">
              <el-input v-model="product.SKU"
                        placeholder="(max 20 symbols)"
                        :maxlength="20"
              ></el-input>
            </el-form-item>
            <!--BRAND-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Brand" :label-width="formLabelWidth">
                <el-select filterable
                           no-match-text="Brand is missing"
                           v-model="product.brand"
                           placeholder="Brand"
                           v-if="brands">
                  <el-option
                    v-for="val in brands"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--COLOR-->
              <el-form-item label="Color" :label-width="formLabelWidth">
                <el-select filterable
                           no-match-text="Color is missing"
                           v-model="product.color"
                           placeholder="Color"
                           v-if="colors">
                  <el-option
                    v-for="val in colors"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <!--PRICE-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Price" :label-width="formLabelWidth">
                <el-input-number v-model="product.price" :min="0" :max="1000000"></el-input-number>
              </el-form-item>
              <el-form-item label="Currency" :label-width="formLabelWidth">
                <el-select v-model="product.currency" placeholder="Select a currency">
                  <el-option label="RUB" value="RUB"></el-option>
                  <el-option label="USD" value="USD" disabled></el-option>
                  <el-option label="EUR" value="EUR" disabled></el-option>
                  <el-option label="GBP" value="GBP" disabled></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Total Qty" :label-width="formLabelWidth">
                <el-input-number v-model="product.totalQty" :min="0" :max="1000000"></el-input-number>
              </el-form-item>
            </el-row>
          </el-form>
          <el-button type="primary" @click="addNewProduct" :disabled="!isValidForm">Create</el-button>
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AddProduct',
  props: ['group', 'category'],
  data () {
    return {
      dialogFormVisible: false,
      product: {
        group: 'Group A',
        category: 'Category A1',
        title: '',
        description: '',
        SKU: '',
        brand: '',
        currency: 'RUB',
        price: 100,
        totalQty: 1,
        color: 'green',
        date: new Date()
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    addNewProduct () {
      let newProduct = {
        group: this.group,
        category: this.category,
        title: this.product.title,
        description: this.product.description,
        SKU: this.product.SKU,
        brand: this.product.brand,
        price: parseFloat(this.product.price).toFixed(2),
        currency: this.product.currency,
        qty: 1, // for user cart
        totalQty: this.product.totalQty,
        color: this.product.color,
        creationDate: new Date()
      }
      this.dialogFormVisible = false
      this.$store.dispatch('addNewProduct', newProduct)
    }
  },
  computed: {
    isValidForm () {
      return this.product.title !== '' && this.product.description !== '' &&
          this.product.color !== '' && this.product.SKU !== '' && this.product.brand !== ''
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
