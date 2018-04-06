<template>
  <div>
    <el-button @click="dialogVisible = true" class="ml-1">
      <i class="el-icon-picture-outline"></i>
    </el-button>
    <el-dialog
      id="edit_news_info_dialog"
      width="100%"
      center
      close-on-press-escape
      :visible.sync="dialogVisible"
      :fullscreen="true">
      <el-row type="flex" justify="center">
        <el-col align="center">
          <p class="edit_news_img_title" align="center">
            Редактировать изображение для: <br>
            "{{ oneNews.title }}"
          </p>
          <el-button @click="onPickFile">
            <p>Загрузить</p>
            <i class="el-icon-picture-outline" style="transform: scale(1.7)"></i>
          </el-button>
          <input
            type="file"
            style="display: none;"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"> <br>
          <img :src="imageUrl" :height="200" class="mt-2">
          <el-row type="flex" justify="center">
            <v-btn @click="dialogVisible = false" flat class="secondary--text">
              Отмена
            </v-btn>
            <v-btn @click="uploadImage" flat class="primary--text">
              Сохранить
            </v-btn>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'EditNewsImage',
  props: ['id'],
  data () {
    return {
      dialogVisible: false,
      imageUrl: '',
      image: null
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files // files[0] because it may be multiselect of files, take first
      if (files[0].name.indexOf('.') <= 0) { // file have an extension
        return alert('File name without extension!')
      }
      if (files[0].size > 1500000) {
        return alert('File size must be less than 1.5 MB!')
      }
      const fileReader = new FileReader() // native js future for client file work
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    uploadImage () {
      this.dialogVisible = false
      this.$store.dispatch('updateNewsImage', {
        newsId: this.id,
        image: this.image
      })
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
  .edit_news_img_title {
    font-size: 20px;
  }
</style>
