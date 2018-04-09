<template>
  <div>
    <el-button @click="dialogVisible = true"
               type="info" class="ml-1">
      <i class="el-icon-delete"></i>
    </el-button>

    <el-dialog
      title="Удалить новость!"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <p>Вы действительно хотите удалить данную новость?</p>
      <p><b>{{ oneNews.title }}</b></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="danger" @click="deleteNews">Подтвердить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteNews',
  props: ['id', 'title'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    deleteNews () {
      this.dialogVisible = false
      this.$store.dispatch('deleteNews', this.id)
    }
  },
  computed: {
    oneNews () {
      return this.$store.getters.newsById(this.id)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
