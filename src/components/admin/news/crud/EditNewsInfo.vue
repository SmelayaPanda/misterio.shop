<template>
  <div>
    <el-button @click="editDialog = true">
      <i class="el-icon-edit"></i>
    </el-button>
    <el-dialog
      id="edit_news_info_dialog"
      :key="id"
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
              required>
            </v-text-field>
            <!--Edit description-->
            <el-tooltip
              effect="dark"
              placement="top-start">
              <span slot="content">
                По умолчанию, описание будет отображаться белым шрифтом.<br>
                Белый цвет является приоритетным для общей стилистики сайта.
              </span>
              <p>Описание
                <v-icon>lightbulb_outline</v-icon>
              </p>
            </el-tooltip>
            <div :id="id">
              <vue-html-editor v-model="editedDescription"></vue-html-editor>
            </div>
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
              :disabled="!isValidForm"
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
      editDialog: false,
      type: oneNews.type,
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
    isValidForm () {
      return this.editedTitle.trim() && this.editedDescription.trim()
    }
  }
}
</script>

<style scoped lang="scss">
  .edit_news_title {
    font-size: 20px;
  }
</style>
