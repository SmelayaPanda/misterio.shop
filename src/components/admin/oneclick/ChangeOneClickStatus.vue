<template>
  <el-row v-if="oneclick" type="flex" justify="start">
    <el-button @click="dialogVisible = true"
               v-if="oneclick.status === this.SENT_PEND || oneclick.status === this.SENT">
      <v-icon small v-if="oneclick.status === this.SENT_PEND">flight_takeoff</v-icon>
      <v-icon small v-if="oneclick.status === this.SENT">flight_land</v-icon>
    </el-button>
    <el-button @click="refuseDialogVisible = true"
               v-if="oneclick.status !== this.REFUSED">
      <i class="el-icon-close"></i>
    </el-button>
    <!--Main statuses dialog-->
    <el-dialog
      :title="oneclick.status === this.SENT_PEND ? 'Товар отправлен?' : 'Товар доставлен?'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <b>Коментарий:</b><br>
      <el-input v-model="oneclick.comments"
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
      <el-input v-model="oneclick.comments"
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
        obj.comments = this.oneclick.comments
        obj.refuseDate = new Date()
      } else if (this.oneclick.status === this.SENT_PEND) { // SENT_PEND -> SENT
        obj.status = this.SENT
        obj.comments = this.oneclick.comments
        obj.sentDate = new Date()
      } else if (this.oneclick.status === this.SENT) { // SENT -> DELIVERED
        obj.status = this.DELIVERED
        obj.comments = this.oneclick.comments
        obj.deliveryDate = new Date()
      }
      this.$store.dispatch('updateOneClick', {
        updateData: obj,
        id: this.oneClickId
      })
    }
  },
  computed: {
    oneclick () {
      return this.$store.getters.oneclick[this.oneClickId]
    }
  }
}
</script>

<style scoped>

</style>
