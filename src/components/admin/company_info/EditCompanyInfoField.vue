<template>
<span>
    <el-button @click="dialogVisible=true" type="text">{{ this.title }}</el-button>
    <el-dialog
      :title="'Edit'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
    <b>{{ this.title }}</b><br>
    <el-input v-model="editedValue"
              placeholder="Add info..."
              :maxlength="400"
    ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="danger" @click="changeField">Confirm</el-button>
    </span>
    </el-dialog>
</span>
</template>

<script>
export default {
  props: ['field', 'title', 'value', 'document'],
  name: 'EditCompanyInfo',
  data () {
    return {
      dialogVisible: false,
      editedValue: this.value
    }
  },
  methods: {
    changeField () {
      this.dialogVisible = false
      this.$store.dispatch('updateCompanyInfo', {
        document: this.document,
        field: this.field,
        value: this.editedValue
      })
    }
  }
}
</script>

<style scoped>

</style>
