<template>
  <el-row v-if="oneclick" type="flex" justify="start">
    <el-button @click="dialogVisible = true"
               v-if="oneclick.status === ORDER_STATUSES.pending.value ||
                     oneclick.status === ORDER_STATUSES.sent.value">
      <v-icon small v-if="oneclick.status === ORDER_STATUSES.pending.value">flight_takeoff</v-icon>
      <v-icon small v-if="oneclick.status === ORDER_STATUSES.sent.value">flight_land</v-icon>
    </el-button>
    <el-button @click="refuseDialogVisible = true"
               v-if="oneclick.status !== ORDER_STATUSES.refused.value"
               style="margin-left: 0;">
      <i class="el-icon-close"></i>
    </el-button>
    <!--Main statuses dialog-->
    <el-dialog
      :title="oneclick.status === ORDER_STATUSES.pending.value ? 'Товар отправлен?' : 'Товар доставлен?'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <b>Коментарий:</b><br>
      <el-input v-model="oneclick.comments.admin"
                type="textarea"
                placeholder="( < 400 символов )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400">
      </el-input>
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
      <el-input v-model="oneclick.comments.admin"
                type="textarea"
                placeholder="( < 400 символов. Виден только Вам )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400">
      </el-input>
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
        obj = {
          status: this.ORDER_STATUSES.refused.value,
          'comments.admin': this.oneclick.comments.admin,
          'history.refused': new Date()
        }
      } else if (this.oneclick.status === this.ORDER_STATUSES.pending.value) { // PENDING -> SENT
        obj = {
          status: this.ORDER_STATUSES.sent.value,
          'comments.admin': this.oneclick.comments.admin,
          'history.sent': new Date()
        }
      } else if (this.oneclick.status === this.ORDER_STATUSES.sent.value) { // SENT -> DELIVERED
        obj = {
          status: this.ORDER_STATUSES.delivered.value,
          'comments.admin': this.oneclick.comments.admin,
          'history.delivered': new Date()
        }
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
