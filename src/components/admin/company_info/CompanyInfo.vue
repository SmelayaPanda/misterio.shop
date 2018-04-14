<template>
  <div v-if="companyInfo">
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--MAIN INFO-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>account_balance</v-icon>
              Компания:
            </h3>
          </div>
          <div>
            <p>
              <edit-company-info-field
                document="main"
                field="name"
                title="Название"
                :value="companyInfo.main.name">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.main.name }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="main"
                field="INN"
                title="ИНН"
                :value="companyInfo.main.INN">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.main.INN }}</el-tag>
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
              Адрес
            </h3>
          </div>
          <div>
            <p>
              <edit-company-info-field
                document="address"
                field="country"
                title="Страна"
                :value="companyInfo.address.country">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.address.country }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address"
                field="city"
                title="Город"
                :value="companyInfo.address.city">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.address.city }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address"
                field="street"
                title="Улица"
                :value="companyInfo.address.street">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.address.street }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address"
                field="build"
                title="Дом"
                :value="companyInfo.address.build">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.address.build }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address"
                field="house"
                title="Помещение"
                :value="companyInfo.address.house">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.address.house }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address"
                field="postCode"
                title="Почтовый код"
                :value="companyInfo.address.postCode">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.address.postCode }}</el-tag>
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
              Контакты
            </h3>
          </div>
          <div>
            <p>
              <edit-company-info-field
                document="contacts"
                field="phone"
                title="Телефон"
                :value="companyInfo.contacts.phone">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.contacts.phone }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="contacts"
                field="mobilePhone"
                title="Мобильный"
                :value="companyInfo.contacts.mobilePhone">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.contacts.mobilePhone }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="contacts"
                field="email"
                title="Email"
                :value="companyInfo.contacts.email">
              </edit-company-info-field>
              <el-tag>{{ companyInfo.contacts.email }}</el-tag>
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
  computed: {
    companyInfo () {
      return this.$store.getters.companyInfo
    }
  }
}
</script>

<style scoped>

</style>
