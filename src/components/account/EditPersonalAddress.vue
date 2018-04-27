<template>
  <span>
    <el-button @click="dialogVisible = true"
               type="text"
               class="button">
      <span>Адрес</span>
      <img src="@/assets/icons/common/red_pencil.svg" id="red_pencil" height="12px" alt="">
    </el-button>
  <el-dialog title="Редактировать"
             width="380px"
             :visible.sync="dialogVisible">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="Старана">
            <el-input v-model="address.country"></el-input>
          </el-form-item>
          <el-form-item label="Город">
            <el-input v-model="address.city"></el-input>
          </el-form-item>
          <el-form-item label="Улица">
            <el-input v-model="address.street"></el-input>
          </el-form-item>
          <el-form-item label="Дом">
            <el-input v-model="address.build"></el-input>
          </el-form-item>
          <el-form-item label="Квартира">
            <el-input v-model="address.house"></el-input>
          </el-form-item>
          <el-form-item label="Почтовый индекс">
            <el-input v-model="address.postCode"></el-input>
          </el-form-item>
        </el-form>
          <el-button type="danger"
                     @click="editPersonalInfo">
            Сохранить
          </el-button>
          <el-button @click="dialogVisible = false">Отмена</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</span>
</template>

<script>
export default {
  name: 'EditUserAddress',
  data () {
    let address = this.$store.getters.user.address
    return {
      dialogVisible: false,
      address: {
        country: address ? address.country : '',
        city: address ? address.city : '',
        street: address ? address.street : '',
        build: address ? address.build : '',
        house: address ? address.house : '',
        postCode: address ? address.postCode : ''
      }
    }
  },
  methods: {
    editPersonalInfo () {
      this.dialogVisible = false
      this.$store.dispatch('editPersonalInfo', {address: this.address})
    }
  },
  computed: {
    isValidForm () {
      return this.address.country && this.address.city && this.address.street &&
        this.address.build && this.address.house && this.address.postCode
    }
  }
}
</script>

<style scoped>
  #red_pencil {
    margin-bottom: -2px;
  }
</style>
