<template>
  <span>
    <el-button @click="dialogVisible = true"
               type="text"
               class="button mt-2">
      <i class="el-icon-edit"></i>
    </el-button>
  <el-dialog title="Edit personal info"
             width="360px"
             :visible.sync="dialogVisible">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="Country">
            <el-input v-model="address.country"></el-input>
          </el-form-item>
          <el-form-item label="City">
            <el-input v-model="address.city"></el-input>
          </el-form-item>
          <el-form-item label="Street">
            <el-input v-model="address.street"></el-input>
          </el-form-item>
          <el-form-item label="Build">
            <el-input v-model="address.build"></el-input>
          </el-form-item>
          <el-form-item label="House">
            <el-input v-model="address.house"></el-input>
          </el-form-item>
          <el-form-item label="Post Code">
            <el-input v-model="address.postCode"></el-input>
          </el-form-item>
        </el-form>
          <el-button type="primary"
                     @click="editPersonalInfo">
            Save
          </el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
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

</style>
