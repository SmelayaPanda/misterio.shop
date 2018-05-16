<template>
  <el-row v-if="order && order.status !== ORDER_STATUSES.created.value" type="flex" justify="start">
    <el-button @click="dialogVisible = true">
      <v-icon small>monetization_on</v-icon>
    </el-button>
    <el-dialog
      title="Покупатель оплатил товар?"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <span class="primary--text">
        После пожтверждения статус покупки сменится на <b>"Оплачено"</b>
      - это означает, что вы получили средства не через <b>Yandex.Kassa</b> а иным способом.
        Обязательно добавляйте комментарии для контроля процесса покупок.
      </span> <br>
      <b>Коментарий:</b><br>
      <el-input v-model="order.comments.admin"
                type="textarea"
                placeholder="( < 400 символов )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="danger" @click="changePaymentStatus">Подтвердить</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'ChangeOrderPaymentStatus',
  props: ['orderId'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    changePaymentStatus () {
      this.dialogVisible = false
      this.refuseDialogVisible = false
      let obj = {}
      obj = {
        'comments.admin': this.order.comments.admin,
        'payment.status': this.PAYMENT_STATUSES.succeeded.value
      }
      this.$store.dispatch('updateOrder', {
        updateData: obj,
        id: this.orderId,
        type: 'payment_success'
      })
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
