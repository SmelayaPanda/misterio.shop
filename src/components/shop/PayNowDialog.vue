<template>
  <div>
    <el-button @click="dialogVisible = true"
               class="ml-2"
    >
      Pay now
    </el-button>

    <el-dialog title="Pay now with PayPal"
               :visible.sync="dialogVisible"
               width="30%"
               center
    >
      <p>Currently, our system supports payment with PayPal only</p>
      <p class="success--text">Pay {{ amount }} RUB</p>
      <PayPal
        env="sandbox"
        locale="en_US"
        currency="RUB"
        :items="totalItems"
        :amount="amount"
        :client="credentials"
        :buttonStyle="btnStyle"
        notify-url="https://us-central1-e-store-dev.cloudfunctions.net/processPayPal"
      >
      </PayPal>
    </el-dialog>
  </div>
</template>

<script>
import PayPal from 'vue-paypal-checkout'

export default {
  name: 'PayNowDialog',
  props: ['orderId', 'orderItems', 'amount'],
  components: {
    PayPal
  },
  data () {
    return {
      dialogVisible: true,
      credentials: {
        sandbox: 'AaTdJiFck5jx4xpaVOjFHkfNO8XZjflSRzYZ3yGbXEHZ43J7upAFabAkRhv1NJPPfDR49F9mqf8rbud4',
        production: 'someId'
      },
      btnStyle: {
        label: 'checkout',
        size: 'responsive', // small | medium | large | responsive
        shape: 'rect', // pill | rect
        color: 'silver' // gold | blue | silver | black
      }
    }
  },
  methods: {},
  computed: {
    totalItems () {
      let orderItems = this.orderItems
      let items = []
      let isAddedOrderId = false
      for (let product of orderItems) {
        let item = {}
        item.name = product.title
        item.price = product.price
        item.quantity = product.qty
        item.currency = product.currency
        // Add once: because IPN transaction_subject are concatenates
        item.description = isAddedOrderId ? '' : this.orderId
        items.push(item)
        isAddedOrderId = true
      }
      return items
    }
  }
}
</script>

<style scoped>

</style>
