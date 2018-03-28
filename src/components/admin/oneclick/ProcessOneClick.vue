<template>
  <div>
    <el-button @click="openProcessDialog">
      <i class="el-icon-service"></i>
    </el-button>

    <el-dialog title="Process oneclick" :visible.sync="dialogFormVisible" width="100%"
               :fullscreen="true"
               center
    >
      <el-row type="flex" justify="center" v-if="oneClick">
        <el-col :xs="24" :sm="20" :md="10" :lg="8" :xl="6">
          <el-card>
            <h3>{{ oneClick.nickname }}</h3>
            <p>
              <i class="el-icon-phone"> </i> {{ oneClick.phone }}<br>
              <i class="el-icon-message"></i> {{ oneClick.email }}
            </p>
            <v-divider></v-divider>
            <h3>Product info: </h3>
            <p>
              Title: {{ oneClick.product.title }}<br>
              SKU: {{ oneClick.product.SKU }}<br>
              Price: {{ oneClick.product.price }} RUB
            </p>
            <p class="right">{{ oneClick.creationDate | date }}</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="flex-wrap: wrap" class="mt-3">
        <el-col :span="20">
          <el-form>
            <!--CITY-->
            <el-form-item label="City" :label-width="formLabelWidth">
              <el-input v-model="city"
                        placeholder="(max 100 symbols)"
                        :maxlength="100"
              ></el-input>
            </el-form-item>
            <!--STREET-->
            <el-form-item label="Street" :label-width="formLabelWidth">
              <el-input v-model="street"
                        placeholder="(max 100 symbols)"
                        :maxlength="100"
              ></el-input>
            </el-form-item>
            <!--BUILD-->
            <el-form-item label="Build" :label-width="formLabelWidth">
              <el-input v-model="build"
                        placeholder="(max 100 symbols)"
                        :maxlength="100"
              ></el-input>
            </el-form-item>
            <!--HOUSE-->
            <el-form-item label="House" :label-width="formLabelWidth">
              <el-input v-model="house"
                        placeholder="(max 100 symbols)"
                        :maxlength="100"
              ></el-input>
            </el-form-item>
            <!--COMMENTS-->
            <el-form-item label="Comments" :label-width="formLabelWidth">
              <el-input v-model="comments"
                        type="textarea"
                        placeholder="(max 400 symbols)"
                        :autosize="{ minRows: 3, maxRows: 7}"
                        :maxlength="400"
              ></el-input>
            </el-form-item>
            <el-form-item label="Quantity" :label-width="formLabelWidth" v-if="product">
              <el-input-number v-model="qty" :min="1" :max="product.totalQty"></el-input-number>
              (max: {{ product.totalQty }})
              <span v-if="product.totalQty < 1" class="error--text ml-2">
                <b>It seems that the goods is ended</b>
              </span>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="processOneClick" :disabled="!isValidForm">Process</el-button>
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'ProcessOneClick',
  props: ['oneClickId'],
  data () {
    return {
      product: {},
      qty: 1,
      city: '',
      street: '',
      build: '',
      house: '',
      comments: '',
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    processOneClick () {
      let obj = {}
      obj.status = 'sentPending'
      obj.processDate = new Date()
      obj.qty = this.qty
      obj.shipping = {
        city: this.city,
        street: this.street,
        build: this.build,
        house: this.house
      }
      obj.comments = this.comments
      this.dialogFormVisible = false
      this.$store.dispatch('updateOneClick', {
        updateData: obj,
        oneClickId: this.oneClickId,
        productId: this.product.productId,
        totalQty: this.product.totalQty - this.qty
      })
    },
    openProcessDialog () {
      this.dialogFormVisible = true
      // For calc actual totalQty
      firebase.firestore().collection('products').doc(this.oneClick.product.id).get()
        .then((snapshot) => {
          this.product = snapshot.data()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    oneClick () {
      return this.$store.getters.oneClickById(this.oneClickId)
    },
    isValidForm () {
      return this.city && this.street && this.build && this.house
    }
  }
}
</script>
