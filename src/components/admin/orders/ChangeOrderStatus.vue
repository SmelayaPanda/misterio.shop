<template>
  <el-row type="flex" justify="start">
    <el-button @click="dialogVisible = true"
               v-if="order.status === this.SENT_PEND || order.status === this.SENT"
    >
      <v-icon small v-if="order.status === this.SENT_PEND">flight_takeoff</v-icon>
      <v-icon small v-if="order.status === this.SENT">flight_land</v-icon>
    </el-button>
    <el-button @click="refuseDialogVisible = true"
               v-if="order.status !== this.REFUSED"
    >
      <v-icon small>close</v-icon>
    </el-button>
    <!--Main statuses dialog-->
    <el-dialog
      :title="order.status === this.SENT_PEND ? 'Product is sent?' : 'Product is delivered?'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <b>Comments:</b><br>
      <el-input v-model="order.comments"
                type="textarea"
                placeholder="(max 400 symbols)"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="changeStatus(false)">Confirm</el-button>
      </span>
    </el-dialog>
    <!--Refuse Dialog-->
    <el-dialog
      title="Refuse order?"
      :visible.sync="refuseDialogVisible"
      width="500px"
      center>
      <b>Add refuse reason into comment please:</b><br>
      <el-input v-model="order.comments"
                type="textarea"
                placeholder="(max 400 symbols)"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="changeStatus(true)">Confirm</el-button>
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
      let obj = {}
      if (refused) {
        obj.status = this.REFUSED
        obj.comments = this.order.comments
        obj.refuseDate = new Date()
      } else if (this.order.status === this.SENT_PEND) { // SENT_PEND -> SENT
        obj.status = this.SENT
        obj.comments = this.order.comments
        obj.sentDate = new Date()
      } else if (this.order.status === this.SENT) { // SENT -> DELIVERED
        obj.status = this.DELIVERED
        obj.comments = this.order.comments
        obj.deliveryDate = new Date()
      }
      this.$store.dispatch('updateOrder', {
        updateData: obj,
        orderId: this.orderId
      })
    }
  },
  computed: {
    order () {
      return this.$store.getters.orderById(this.orderId)
    }
  }
}
</script>

<style scoped>

</style>
