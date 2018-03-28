<!--
Now Order History placed not in user account -
In user cart for simple visualization and minimum clicks
-->
<template>
  <el-row el-row type="flex" justify="center" class="mt-3" v-if="userOrders.length !== 0">
    <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="12" type="flex" align="middle">
      <el-card v-if="userOrders">
        <p class="mb-3" style="font-size: 18px;">
          My orders history
        </p>
        <i class="el-icon-document mb-4" style="transform: scale(2)"></i>
        <v-divider class="mb-3"></v-divider>
        <el-row v-for="order in userOrders" :key="order.id"
                type="flex"
                justify="center"
                class="mb-3"
                style="flex-wrap: wrap">
          <el-col :span="24" align="left">
            <el-row type="flex" style="flex-wrap: wrap;" class="mb-3">
              <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2" class="pr-1 mt-2 pt-2">
                <el-switch type="text" class="ml-4 mb-2"
                           v-model="order.showDetails">
                  Show details
                </el-switch>
              </el-col>
              <el-col :xs="18" :sm="21" :md="21" :lg="22" :xl="22" class="mb-2">
                <el-tag type="info" class="ml-2 mt-2">ID: {{ order.id }}</el-tag>
                <el-tag type="info" class="ml-2 mt-2">{{ order.checkoutDate | date }}</el-tag>
                <el-tag class="ml-2 mt-2">{{ order.totalPrice }} {{ order.currency }}</el-tag>
                <el-tag v-if="order.paymentDate" class="ml-2 mt-2" type="success">
                  PAID
                </el-tag>
                <el-tag v-if="order.paymentMethod === 'On receipt'" class="ml-2 mt-2" type="warning">
                  Payment on receipt
                </el-tag>
                <el-button type="text" class="ml-2 mt-2 info--text">
                  <!--Status:-->
                  <el-tag type="danger" v-if="order.status === 'payPending'">
                    Status: Is not paid
                  </el-tag>
                  <el-tag type="info" v-if="order.status === 'sentPending'">
                    Status: Sent pending
                  </el-tag>
                  <el-tooltip class="item"
                              effect="dark"
                              placement="right-start"
                              v-if="order.status === 'payPending' || order.status === 'sentPending'"
                              :content="order.status === 'payPending' ?
                              'If you have already paid for the goods then maybe you should wait for confirmation with PayPal':
                              `Your purchase will be shipped soon.`"
                  >
                    <v-icon class="mb-1">lightbulb_outline</v-icon>
                  </el-tooltip>
                </el-button>
                <!--PAY NOW-->
                <pay-now-dialog :orderId="order.id"
                                :orderItems="order.products"
                                :amount="order.totalPrice"
                                v-if="order.status === 'payPending'"
                >
                </pay-now-dialog>
              </el-col>
            </el-row>
            <div v-show="order.showDetails === true">
              <el-row type="flex" justify="center" style="flex-wrap: wrap;">
                <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                  <span v-if="order.shipping">
                    <h3><v-icon>person_pin_circle</v-icon>
                      Personal info:
                    </h3>
                    <p>
                      Firstname: {{ order.buyer.firstname }}<br>
                      Lastname: {{ order.buyer.lastname }}<br>
                      Email: {{ order.buyer.email }}<br>
                      Phone: {{ order.buyer.phone }}<br>
                    </p>
                    <h4><v-icon small class="mb-1">monetization_on</v-icon>
                      Payment method:
                      <span style="font-weight: normal;">{{ order.paymentMethod }}</span>
                    </h4>
                  </span>
                </el-col>
                <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                  <span v-if="order.shipping">
                    <h3><i class="el-icon-location"></i>
                      Shipping info:
                    </h3>
                    <p>
                      Country: {{ order.shipping.country }}<br>
                      City: {{ order.shipping.city }}<br>
                      Street: {{ order.shipping.street }}<br>
                      Build: {{ order.shipping.build }}<br>
                      House: {{ order.shipping.house }}<br>
                      Post Code: {{ order.shipping.postCode }}<br>
                    </p>
                    <h4><v-icon small class="mb-2">airplanemode_active</v-icon>
                      Shipping method:
                      <span style="font-weight: normal;">{{ order.deliveryMethod }}</span><br>
                    </h4>
                  </span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center" style="flex-wrap: wrap">
                <!--Standard looping is not working-->
                <el-col :span="20">
                  <h3><i class="el-icon-goods"></i>
                    Products info:
                  </h3>
                  <div v-for="i in 10" :key="i">
                    <div v-if="order.products[i-1]">
                      <span>SKU:</span>
                      <el-tag size="mini" type="success">
                        {{ order.products[i-1].SKU }}
                      </el-tag>
                      <p>
                        Title: {{ order.products[i-1].title }}<br>
                        Price: {{ order.products[i-1].price }} {{ order.products[i-1].currency }}<br>
                        Quantity: {{ order.products[i-1].qty }}
                      </p>
                    </div>
                  </div>
                  <span v-if="order.comments">
                        <h3><i class="el-icon-warning"></i>
                          Comments:
                        </h3>
                        {{ order.comments }}<br>
                  </span>
                </el-col>
              </el-row>
            </div>
            <v-divider></v-divider>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PayNowDialog from '@/components/shop/PayNowDialog'

export default {
  name: 'OrdersHistory',
  components: {PayNowDialog},
  computed: {
    userOrders () {
      return this.$store.getters.orders
    }
  }
}
</script>

<style scoped>

</style>
