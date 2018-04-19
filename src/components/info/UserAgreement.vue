<template>
  <div>
    <p @click="dialogVisible = true"
       class="sub_header">
      Пользовательское соглашение
    </p>
    <el-dialog
      id="user_agreement_dialog"
      center
      close-on-press-escape
      fullscreen
      :visible.sync="dialogVisible">
      <img src="@/assets/img/home/black_pattern.svg" class="bg_pattern" alt="">
      <el-row id="user_agreement_body_wrap">
        <el-col :xs="24" :sm="22" :md="9" :lg="8" :xl="6" id="user_agreement_img_wrap">
          <img src="@/assets/img/info/user_agreement.png" id="user_agreement_img" alt="">
        </el-col>
        <el-col :xs="24" :sm="22" :md="13" :lg="13" :xl="9">
          <h2 id="user_agreement_title">ользовательское соглашение</h2>
          <user-agreement-text id="user_agreement_text"/>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import UserAgreementText from './UserAgreementText'

export default {
  name: 'UserAgreement',
  components: {UserAgreementText},
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
  .sub_header {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 12px;
    line-height: 22px;
  }

  .sub_header:hover {
    cursor: pointer;
  }

  #user_agreement_body_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10vh;
  }

  .bg_pattern {
    position: fixed;
    width: auto;
    height: 100%;
    top: 0;
    transform: scale(1.35);
    object-fit: cover;
    opacity: 0.2;
    z-index: 0;
  }

  #user_agreement_img_wrap {
    text-align: end;
  }

  #user_agreement_img {
    height: 420px;
    margin: auto 0;
  }

  #user_agreement_title {
    color: $color-primary;
    font-family: $secondary-font;
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 12px;
  }

  #user_agreement_text {
    color: $color-info;
    margin-top: 20px;
    padding: 10px;
    height: 360px;
    overflow: scroll;
  }

  #user_agreement_text::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: $color-secondary-dark;
  }

  #user_agreement_text::-webkit-scrollbar {
    width: 12px;
    background-color: $color-secondary-dark;
  }

  #user_agreement_text::-webkit-scrollbar-corner {
    background-color: $color-secondary-dark;
  }

  #user_agreement_text::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: $color-primary;
  }

  @media only screen and (max-width: $sm-screen) {
    .sub_header {
      line-height: 18px;
    }
    #user_agreement_img_wrap {
      text-align: left;
    }
    #user_agreement_body_wrap {
      margin-top: 2vh;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #user_agreement_img_wrap {
      text-align: center;
    }
    #user_agreement_body_wrap {
      margin-top: 0;
    }
    #user_agreement_img {
      height: 300px;
    }
    #user_agreement_title {
      text-align: center;
    }
  }
</style>
