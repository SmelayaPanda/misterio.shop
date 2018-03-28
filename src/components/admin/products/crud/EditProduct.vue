<template>
  <div>
    <el-button @click="dialogFormVisible = true">
      <i class="el-icon-edit"></i>
    </el-button>

    <el-dialog title="Edit product info" :visible.sync="dialogFormVisible" width="100%" :fullscreen="true" center>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form :model="product">
            <el-form-item label="Title" :label-width="formLabelWidth">
              <el-input v-model="product.title"
                        placeholder="Product title (max 100 symbols)"
                        :maxlength="100"
              ></el-input>
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input v-model="product.description"
                        type="textarea"
                        placeholder="Product description (max 400 symbols)"
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
              <el-form-item label="Quantity" :label-width="formLabelWidth">
                <el-input-number v-model="product.totalQty" :min="0" :max="1000000"></el-input-number>
              </el-form-item>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="edit" :disabled="!isValidForm">Edit</el-button>
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  props: ['id'],
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    edit () {
      let editObj = {
        productId: this.id,
        title: this.product.title,
        description: this.product.description,
        SKU: this.product.SKU,
        brand: this.product.brand,
        price: parseFloat(this.product.price),
        currency: this.product.currency,
        qty: 1, // for user cart
        totalQty: this.product.totalQty,
        color: this.product.color,
        editDate: new Date()
      }
      this.dialogFormVisible = false
      this.$store.dispatch('editProduct', editObj)
    },
    onPickFile:
        function () {
          this.$refs.fileInput.click()
        },
    onFilePicked:
        function (event) {
          const files = event.target.files // files[0] because it may be multiselect of files, take first
          const filename = files[0].name
          if (filename.indexOf('.') <= 0) { // file have an extension
            return alert('Please, pick a valid file')
          }
          const fileReader = new FileReader() // native js future for client file work
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.image = files[0]
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
    },
    product () {
      return this.$store.getters.productById(this.id)
    }
  }
}
</script>

<style scoped>

</style>
