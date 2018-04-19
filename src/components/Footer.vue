<template>
  <footer>
    <el-row class="app_footer" type="flex">
      <el-col :offset="2" :xs="22" :sm="18" :md="22" :lg="22" :xl="21">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <contacts-important v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'"/>
            <contacts-services v-else/>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <contacts-services v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'"/>
            <contacts-important v-else/>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <contacts-phone id="contacts_phone"/>
          </el-col>
          <el-col :xs="16" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <p id="watch_news" align="left">СЛЕДИ ЗА НОВОСТЯМИ</p>
            <contacts-social class="ml-3 mb-4"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
import ContactsServices from './contacts/ContactsServices'
import ContactsImportant from './contacts/ContactsImportant'
import ContactsPhone from './contacts/ContactsPhone'
import ContactsSocial from './contacts/ContactsSocial'

export default {
  name: 'Footer',
  components: {ContactsSocial, ContactsPhone, ContactsImportant, ContactsServices}
}
</script>

<style scoped lang="scss">
  .app_footer {
    background: #111111;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0;
    margin-top: 100px;
  }

  .footer_block {
    padding: 25px 10px 5px 20px;
  }

  #watch_news {
    font-family: $primary-font;
    font-weight: 600;
    font-size: 13px;
    color: $color-info;
  }

  @media only screen and (max-width: $xs-screen) {
    .footer_block {
      padding: 20px 0 0;
    }
    .footer_container {
      margin: 0;
    }
  }
</style>
