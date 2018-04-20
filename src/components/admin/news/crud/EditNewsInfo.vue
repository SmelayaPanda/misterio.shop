<template>
  <div>
    <el-button @click="editDialog = true">
      <i class="el-icon-edit"></i>
    </el-button>
    <el-dialog
      id="edit_news_info_dialog"
      width="100%"
      center
      close-on-press-escape
      :visible.sync="editDialog"
      :fullscreen="true">
      <p class="edit_news_title" align="center">
        Редактировать {{ type === 'sale' ? 'акцию' : 'статью' }}
      </p>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <!--Edit title-->
            <v-text-field
              name="title"
              label="Заголовок"
              id="title"
              v-model="editedTitle"
              required></v-text-field>
            <!--Edit description-->
            <p>Описание</p>
            <vue-html-editor v-model="editedDescription"></vue-html-editor>
          </v-flex>
        </v-layout>

        <!--Close & Save Buttons-->
        <v-layout row wrap>
          <v-flex xs12>
            <v-btn
              @click="editDialog = false"
              flat class="secondary--text">
              Отмена
            </v-btn>
            <v-btn
              @click="onSaveChanges"
              flat class="primary--text">
              Сохранить
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditNewsInfoDialog',
  props: ['id'],
  data () {
    let oneNews = this.$store.getters.news[this.id]
    return {
      type: oneNews.type,
      editDialog: false,
      editedTitle: oneNews.title,
      editedDescription: oneNews.description
    }
  },
  methods: {
    onSaveChanges () {
      this.editDialog = false
      this.$store.dispatch('updateNewsInfo', {
        newsId: this.id,
        updateData: {
          title: this.editedTitle,
          description: this.editedDescription,
          editDate: new Date()
        }
      })
    }
  },
  computed: {
    // isValidForm () {
    //   return this.editedTitle.trim() && this.editedDescription.trim()
    // }
  }
}
</script>

<style scoped>
  .edit_news_title {
    font-size: 20px;
  }
</style>
