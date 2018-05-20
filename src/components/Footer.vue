<template>
  <footer>
    <el-row class="app_footer" type="flex">
      <el-col :offset="2" :xs="22" :sm="20" :md="22" :lg="22" :xl="21">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <contacts-important
              v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'"/>
            <contacts-services v-else/>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <contacts-services v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'"/>
            <contacts-important v-else/>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" align="left">
            <contacts-phone id="contacts_phone"/>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="footer_block" id="soc_wrap">
            <p id="watch_news">СЛЕДИ ЗА НОВОСТЯМИ</p>
            <contacts-social id="contacts_social"/>
          </el-col>
        </el-row>
      </el-col>
      <el-row id="rehigh_logo_wrap" onclick="window.open('https://rehigh.pro/', '_blank')">
        <el-col :span="24">
          <img src="@/assets/icons/rehigh/reHIGH.svg" id="rehigh_logo" alt="re:High Studio">
          <p id="created_by">created by</p>
        </el-col>
      </el-row>
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
    margin-bottom: 20px;
  }

  #watch_news {
    font-family: $primary-font;
    font-weight: 600;
    font-size: 13px;
    color: $color-info;
    text-align: left;
  }

  #rehigh_logo_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  #rehigh_logo_wrap:hover {
    cursor: pointer;
  }

  #rehigh_logo {
    height: 15px;
  }

  #created_by {
    color: $color-info;
    font-size: 11px;
    margin-top: -2px;
  }

  #soc_wrap {
    text-align: left;
  }

  #contacts_social {
    margin-left: 20px;
  }

  @media only screen and (max-width: $xs-screen) {
    .app_footer {
      padding-top: 20px;
    }
    .footer_block {
      padding: 0;
    }
    .footer_container {
      margin: 0;
    }
    #watch_news {
      text-align: center;
      margin-top: -5px;
    }
    #soc_wrap {
      text-align: center;
      margin-left: -7.2vw;
    }
    #contacts_social {
    }
  }
</style>
