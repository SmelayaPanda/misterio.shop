<template>
  <div>
    <v-btn class="primary_a" @click="dialogFormVisible = true">
      <v-icon class="white--text">add</v-icon>
    </v-btn>

    <el-dialog
      :title="`Новый товар в: ${group} / ${category}`"
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
                placeholder="( < 400 символов)"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400"
              ></el-input>
            </el-form-item>
            <el-form-item label="Артикул" :label-width="formLabelWidth">
              <el-input
                v-model="product.SKU"
                placeholder="( < 20 символов )"
                :maxlength="20">
              </el-input>
            </el-form-item>
            <!--BRAND-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Бренд" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Бренд отсутствует"
                  v-model="product.brand"
                  placeholder="Бренд"
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
              <el-form-item label="Цвет" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Цвет отсутствует"
                  v-model="product.color"
                  placeholder="Цвет"
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
        group: 'Group A',
        category: 'Category A1',
        title: '',
        description: '',
        SKU: '',
        brand: '',
        currency: 'RUB',
        price: 100,
        totalQty: 1,
        color: '',
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
        price: parseFloat(this.product.price),
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
      return this.product.title && this.product.description &&
          this.product.color && this.product.SKU && this.product.brand
    },
    brands () {
      return this.$store.getters.dictionaries.brands
    },
    colors () {
      return this.$store.getters.dictionaries.colors
    }
  }
}
</script>
