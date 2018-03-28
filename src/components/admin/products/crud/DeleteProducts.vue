<template>
  <div>
    <el-button type="info"
               @click="dialogVisible = true">
      <i class="el-icon-delete"></i>
    </el-button>

    <el-dialog
      title="Remove product!"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <p>You want to remove this product:</p>
      <p><b>{{ this.title }}</b></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="deleteProduct">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteProduct',
  props: ['id', 'title'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.id)
      this.dialogVisible = false
    }
  }
}
</script>
