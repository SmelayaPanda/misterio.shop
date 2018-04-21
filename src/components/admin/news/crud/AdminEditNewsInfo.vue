<template>
  <v-container v-if="this.$store.getters.news[this.id]">
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="mb-3">Редактировать новость</h3>
        <!--Edit title-->
        <p class="mr-2 mb-2">
          Заголовок
        </p>
          <el-input
            v-model="editedTitle"
            id="title"
            placeholder="( < 100 символов)"
            :maxlength="100">
          </el-input>
        <!--Edit description-->
        <el-tooltip
          effect="dark"
          placement="top-start">
              <span slot="content">
                По умолчанию, описание будет отображаться белым шрифтом,<br>
                для общей стилистики сайта он является приоритетным.<br>
                Для смены цвета используйте символ  <u>A</u> на панели. <br>
                Длина видимого описания акций на 3м слайде домашней старницы - 300 символов, <br>
                поэтому рекомендуется проверять то, как выглядят новые акции.
              </span>
          <p class="mt-3">
            Описание
            <v-icon class="mb-1">lightbulb_outline</v-icon>
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
          @click="$router.push('/admin/news')"
          flat class="error--text">
          Отмена
        </v-btn>
        <v-btn
          @click="onSaveChanges"
          :disabled="!isValidForm"
          flat class="success_a--text">
          Сохранить
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AdminOneNews',
  props: ['id'],
  data () {
    let oneNews = this.$store.getters.news[this.id] ? this.$store.getters.news[this.id] : {}
    return {
      editDialog: false,
      type: oneNews.type,
      editedTitle: oneNews.title,
      editedDescription: oneNews.description ? oneNews.description : ''
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
      this.$router.push('/admin/news')
    }
  },
  computed: {
    isValidForm () {
      return this.editedTitle.trim() && this.editedDescription.trim()
    }
  }
}
</script>

<style scoped>

</style>
