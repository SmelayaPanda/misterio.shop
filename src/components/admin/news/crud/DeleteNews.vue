<template>
  <div>
    <el-button @click="dialogVisible = true"
               type="info" class="ml-1">
      <i class="el-icon-delete"></i>
    </el-button>

    <el-dialog
      title="Remove news!"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <p>You want to remove this news:</p>
      <p><b>{{ oneNews.title }}</b></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="deleteNews">Confirm</el-button>
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
