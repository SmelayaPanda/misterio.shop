<template>
  <el-row type="flex" justify="start">
    <el-button @click="dialogVisible = true"
               v-if="oneClick.status === this.SENT_PEND || oneClick.status === this.SENT">
      <v-icon small v-if="oneClick.status === this.SENT_PEND">flight_takeoff</v-icon>
      <v-icon small v-if="oneClick.status === this.SENT">flight_land</v-icon>
    </el-button>
    <el-button @click="refuseDialogVisible = true"
               v-if="oneClick.status !== this.REFUSED">
      <i class="el-icon-close"></i>
    </el-button>
    <!--Main statuses dialog-->
    <el-dialog
      :title="oneClick.status === this.SENT_PEND ? 'Продукт отправлен?' : 'Продукт доставлен?'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <b>Коментарий:</b><br>
      <el-input v-model="oneClick.comments"
                type="textarea"
                placeholder="( < 400 символов )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="danger" @click="changeStatus(false)">Подтвердить</el-button>
      </span>
    </el-dialog>
    <!--Refuse Dialog-->
    <el-dialog
      title="Отклонить заявку?"
      :visible.sync="refuseDialogVisible"
      width="500px"
      center>
      <b>Добавьте причину:</b><br>
      <el-input v-model="oneClick.comments"
                type="textarea"
                placeholder="( < 400 символов )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseDialogVisible = false">Отмена</el-button>
        <el-button type="danger" @click="changeStatus(true)">Подтвердить</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'ChangeOneClickStatus',
  props: ['oneClickId'],
  data () {
    return {
      dialogVisible: false,
      refuseDialogVisible: false
    }
  },
  methods: {
    changeStatus (refused) {
      this.dialogVisible = false
      this.refuseDialogVisible = false
      let obj = {}
      if (refused) {
        obj.status = this.REFUSED
        obj.comments = this.oneClick.comments
        obj.refuseDate = new Date()
      } else if (this.oneClick.status === this.SENT_PEND) { // SENT_PEND -> SENT
        obj.status = this.SENT
        obj.comments = this.oneClick.comments
        obj.sentDate = new Date()
      } else if (this.oneClick.status === this.SENT) { // SENT -> DELIVERED
        obj.status = this.DELIVERED
        obj.comments = this.oneClick.comments
        obj.deliveryDate = new Date()
      }
      this.$store.dispatch('updateOneClick', {
        updateData: obj,
        oneClickId: this.oneClickId
      })
    }
  },
  computed: {
    oneClick () {
      return this.$store.getters.oneClickById(this.oneClickId)
    }
  }
}
</script>

<style scoped>

</style>
