<template>
  <div>
    <v-btn class="primary_a" @click="dialogFormVisible = true">
      <v-icon class="white--text">add</v-icon>
    </v-btn>

    <el-dialog
      :title="`Новый товар в выбраной категории`"
      :visible.sync="dialogFormVisible"
      width="100%"
      :fullscreen="true">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form :model="product">
            <el-form-item label="Название" :label-width="formLabelWidth">
              <el-input
                v-model="product.title"
                placeholder="( < 100 символов)"
                :maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item label="Описание" :label-width="formLabelWidth">
              <el-input
                v-model="product.description"
                type="textarea"
                placeholder="( < 500 символов)"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="500">
              </el-input>
            </el-form-item>
            <!--SKU-->
            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="Артикул" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.SKU"
                    placeholder="( < 20 символов )"
                    :maxlength="20">
                  </el-input>
                </el-form-item>
              </el-col>
              <!--Size-->
              <el-col :span="12">
                <el-form-item label="Размер" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.size"
                    placeholder="( < 30 символов, не обязательное )"
                    :maxlength="30">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--BRAND-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Бренд" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Бренд отсутствует"
                  v-model="product.brand"
                  placeholder="Бренд"
                  v-if="dictionaries.brands">
                  <el-option
                    v-for="val in dictionaries.brands"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--COLOR-->
              <el-form-item label="Цвет" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Цвет отсутствует"
                  v-model="product.color"
                  placeholder="Цвет"
                  v-if="dictionaries.colors">
                  <el-option
                    v-for="val in dictionaries.colors"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <!--Origin Country-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Страна" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Страна отсутствует"
                  v-model="product.originCountry"
                  placeholder="Страна"
                  v-if="dictionaries.countries">
                  <el-option
                    v-for="val in dictionaries.countries"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--Matrial-->
              <el-form-item label="Материал" :label-width="formLabelWidth">
                <el-select
                  filterable
                  clearable
                  no-match-text="Материал отсутствует"
                  v-model="product.material"
                  placeholder="( не обязательное )"
                  v-if="dictionaries.materials">
                  <el-option
                    v-for="val in dictionaries.materials"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <!--PRICE-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Цена" :label-width="formLabelWidth">
                <el-input-number v-model="product.price" :min="0" :max="1000000"></el-input-number>
              </el-form-item>
              <el-form-item label="Валюта" :label-width="formLabelWidth">
                <el-select v-model="product.currency" placeholder="Выберите валюту">
                  <el-option label="RUB" value="RUB"></el-option>
                  <el-option label="USD" value="USD" disabled></el-option>
                  <el-option label="EUR" value="EUR" disabled></el-option>
                  <el-option label="GBP" value="GBP" disabled></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Количество" :label-width="formLabelWidth">
                <el-input-number v-model="product.totalQty" :min="0" :max="1000000"></el-input-number>
              </el-form-item>
            </el-row>
          </el-form>
          <el-button
            @click="addNewProduct"
            class="success_a white--text"
            :disabled="!isValidForm">
            Создать
          </el-button>
          <el-button @click="dialogFormVisible = false">Отмена</el-button>
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
        group: '',
        category: '',
        title: '',
        description: '',
        SKU: '',
        originCountry: '',
        material: '',
        size: '',
        brand: '',
        currency: 'RUB',
        price: 100,
        totalQty: 1,
        color: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    addNewProduct () {
      let newProduct = {
        group: this.group,
        category: this.category ? this.category : '',
        title: this.product.title,
        description: this.product.description,
        SKU: this.product.SKU,
        originCountry: this.product.originCountry,
        material: this.product.material ? this.product.material : '',
        size: this.product.size ? this.product.size : '',
        brand: this.product.brand,
        price: parseFloat(this.product.price),
        currency: this.product.currency,
        qty: 1, // for user cart
        totalQty: this.product.totalQty,
        color: this.product.color,
        creationDate: new Date()
      }
      this.dialogFormVisible = false
      this.$store.dispatch('addNewProduct', newProduct)
        .then(() => { // clear form
          this.product.title = ''
          this.product.description = ''
          this.product.SKU = ''
          this.product.brand = ''
          this.product.price = 100
          this.product.totalQty = 1
          this.product.color = ''
        })
    }
  },
  computed: {
    isValidForm () {
      return this.product.title && this.product.description &&
          this.product.color && this.product.SKU && this.product.brand &&
          this.product.originCountry
    },
    dictionaries () {
      return this.$store.getters.dictionaries
    }
  }
}
</script>
