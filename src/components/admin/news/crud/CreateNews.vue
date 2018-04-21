<template>
  <span>
    <v-btn @click="dialogVisible = true" class="primary_a">
      <v-icon class="white--text">add</v-icon>
    </v-btn>

    <el-dialog
      :visible.sync="dialogVisible"
      width="100%"
      center>
      <p class="create_news_title" align="center">
        Создать {{ type === 'sale' ? 'акцию' : 'статью' }}
      </p>
      <el-form>
        <el-form-item label="Заголовок">
          <el-input
            v-model="title"
            placeholder="( < 100 символов)"
            :maxlength="100">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          Отмена
        </el-button>
        <el-button @click="createNews" type="success">
          Создать
        </el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'CreateNews',
  props: ['type'],
  data () {
    return {
      title: '',
      dialogVisible: false
    }
  },
  computed: {
    formIsValid () {
      return this.title
    }
  },
  methods: {
    createNews () {
      this.dialogVisible = false
      this.$store.dispatch('addNews', {
        title: this.title,
        type: this.type,
        creationDate: new Date()
      }).then(() => { this.title = '' })
    }
  }
}
</script>

<style scoped>
  .create_news_title {
    font-size: 20px;
  }
</style>
