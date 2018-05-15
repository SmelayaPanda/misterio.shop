<template>
  <el-row type="flex" justify="start">
    <el-button @click="dialogVisible = true"
               v-if="order.status === ORDER_STATUSES.pending.value ||
                     order.status === ORDER_STATUSES.sent.value">
      <v-icon small v-if="order.status === ORDER_STATUSES.pending.value">flight_takeoff</v-icon>
      <v-icon small v-if="order.status === ORDER_STATUSES.sent.value">flight_land</v-icon>
    </el-button>
    <el-button v-if="order.status !== ORDER_STATUSES.refused.value"
               @click="refuseDialogVisible = true"
               style="margin-left: 0;">
      <v-icon small>close</v-icon>
    </el-button>
    <!--Main statuses dialog-->
    <el-dialog
      :title="order.status === ORDER_STATUSES.pending.value ? 'Товар отправлен?' : 'Товар доставлен?'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <b>Коментарий:</b><br>
      <el-input v-model="order.comments.admin"
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
      title="Покупка отклонена?"
      :visible.sync="refuseDialogVisible"
      width="500px"
      center>
      <b>Добавьте причину возврата товара:</b><br>
      <el-input v-model="order.comments.admin"
                type="textarea"
                placeholder="( < 400 символов )"
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
  name: 'ChangeOrderStatus',
  props: ['orderId'],
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
      let obj
      if (refused) {
        obj = {
          status: this.ORDER_STATUSES.refused.value,
          'comments.admin': this.order.comments.admin,
          'history.refused': new Date()
        }
      } else if (this.order.status === this.ORDER_STATUSES.pending.value) { // SENT_PEND -> SENT
        obj = {
          status: this.ORDER_STATUSES.sent.value,
          'comments.admin': this.order.comments.admin,
          'history.sent': new Date()
        }
      } else if (this.order.status === this.ORDER_STATUSES.sent.value) { // SENT -> DELIVERED
        obj = {
          status: this.ORDER_STATUSES.delivered.value,
          'comments.admin': this.order.comments.admin,
          'history.delivered': new Date()
        }
      }
      this.$store.dispatch('updateOrder', {id: this.orderId, updateData: obj})
    }
  },
  computed: {
    order () {
      return this.$store.getters.orders[this.orderId]
    }
  }
}
</script>

<style scoped>

</style>
