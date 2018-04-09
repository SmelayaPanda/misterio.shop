<template>
  <div>
    <el-button type="info"
               @click="dialogVisible = true">
      <i class="el-icon-delete"></i>
    </el-button>

    <el-dialog
      title="Удалить продукт!"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <p>Вы действительно хотите удалить данный продукт?</p>
      <p><b>{{ this.title }}</b></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="danger" @click="deleteProduct">Удалить</el-button>
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
