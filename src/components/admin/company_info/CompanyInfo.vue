<template>
<div v-if="companyInfo">
  <el-row type="flex" justify="left" style="flex-wrap: wrap">
    <!--MAIN INFO-->
    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
      <el-card style="height: 100%">
        <div slot="header" class="clearfix">
          <h3>
            <v-icon>account_balance</v-icon>
            Company:
          </h3>
        </div>
        <div>
          <p>
            <edit-company-info-field document="main"
                                     field="name"
                                     title="Name"
                                     :value="companyInfo.main.name"
            >
              Name:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.main.name }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="main"
                                     field="INN"
                                     title="INN"
                                     :value="companyInfo.main.INN"
            >
              INN:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.main.INN }}</el-tag>
          </p>
        </div>
      </el-card>
    </el-col>
    <!--ADDRESS-->
    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
      <el-card style="height: 100%">
        <div slot="header" class="clearfix">
          <h3>
            <v-icon>location_on</v-icon>
            Address
          </h3>
        </div>
        <div>
          <p>
            <edit-company-info-field document="address"
                                     field="country"
                                     title="Country"
                                     :value="companyInfo.address.country"
            >
              Country:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.address.country }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="address"
                                     field="city"
                                     title="City"
                                     :value="companyInfo.address.city"
            >
              City:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.address.city }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="address"
                                     field="street"
                                     title="Street"
                                     :value="companyInfo.address.street"
            >
              Street:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.address.street }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="address"
                                     field="build"
                                     title="Build"
                                     :value="companyInfo.address.build"
            >
              Build:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.address.build }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="address"
                                     field="house"
                                     title="House/Apartment"
                                     :value="companyInfo.address.house"
            >
              House:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.address.house }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="address"
                                     field="postCode"
                                     title="Post Code"
                                     :value="companyInfo.address.postCode"
            >
              Post Code:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.address.postCode }}</el-tag>
          </p>
        </div>
      </el-card>
    </el-col>
    <!--CONTACTS-->
    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
      <el-card style="height: 100%">
        <div slot="header" class="clearfix">
          <h3>
            <v-icon>contact_phone</v-icon>
            Contacts
          </h3>
        </div>
        <div>
          <p>
            <edit-company-info-field document="contacts"
                                     field="phone"
                                     title="Phone"
                                     :value="companyInfo.contacts.phone"
            >
              Phone:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.contacts.phone }}</el-tag>
          </p>
          <p>
            <edit-company-info-field document="contacts"
                                     field="email"
                                     title="Email"
                                     :value="companyInfo.contacts.email"
            >
              Email:
            </edit-company-info-field>
            <el-tag type="info">{{ companyInfo.contacts.email }}</el-tag>
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import EditCompanyInfoField from './EditCompanyInfoField'
export default {
  name: 'CompanyContacts',
  components: {
    EditCompanyInfoField
  },
  methods: {
    fetchCompanyInfo () {
      this.$store.dispatch('fetchCompanyInfo')
    }
  },
  computed: {
    companyInfo () {
      return this.$store.getters.companyInfo
    }
  },
  created () {
    this.fetchCompanyInfo()
  }
}
</script>

<style scoped>

</style>
