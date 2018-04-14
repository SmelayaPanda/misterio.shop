<template>
  <div v-if="photos">
    <el-button @click="dialogVisible = true">
      <i class="el-icon-picture-outline"></i>
    </el-button>
    <!--Image-->
    <el-dialog title="Избранные фото"
               :visible.sync="dialogVisible"
               width="100%" :fullscreen="true"
               center>
      <el-row type="flex" justify="center" class="mb-3" style="flex-wrap: wrap">
        <!--Image-->
        <!-- fileUploaded custom event from UploadProductImage.vue-->
        <upload-company-photos img-name="img_0" @fileUploaded="loadFileData" img-btn-name="Фото 1" :cur-img="photos.img_0"/>
        <upload-company-photos img-name="img_1" @fileUploaded="loadFileData" img-btn-name="Фото 2" :cur-img="photos.img_1"/>
        <upload-company-photos img-name="img_2" @fileUploaded="loadFileData" img-btn-name="Фото 3" :cur-img="photos.img_2"/>
        <upload-company-photos img-name="img_3" @fileUploaded="loadFileData" img-btn-name="Фото 4" :cur-img="photos.img_3"/>
        <upload-company-photos img-name="img_4" @fileUploaded="loadFileData" img-btn-name="Фото 5" :cur-img="photos.img_4"/>
        <upload-company-photos img-name="img_5" @fileUploaded="loadFileData" img-btn-name="Фото 6" :cur-img="photos.img_5"/>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button
          @click="editPhotos"
          class="success_a white--text">
          Сохранить
        </el-button>
        <el-button @click="dialogVisible = false">Отмена</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import UploadCompanyPhotos from './UploadCompanyPhotos'

export default {
  name: 'EditCompanyPhotos',
  components: {UploadCompanyPhotos},
  data () {
    return {
      dialogVisible: false,
      images: {}
    }
  },
  methods: {
    loadFileData (val) {
      // val.imgName="img_0 ... 5"
      this.images[val.imgName] = val.image
    },
    editPhotos () {
      this.dialogVisible = false
      this.$store.dispatch('editCompanyPhotos', {images: this.images})
        .then(() => { // clear
          this.images = {}
        })
    }
  },
  computed: {
    photos () {
      return this.$store.getters.companyInfo.photos
    }
  }
}
</script>

<style scoped>

</style>
