<template>
  <div>
    <p>
      <img src="@/assets/icons/footer/phone.svg" height="22px" class="contact_icon" alt="">
      <a class="contacts"
         :href="'tel://' + companyInfo.contacts.phone.replace(/[ -]/g,'')">
        {{ companyInfo.contacts.phone }}
      </a>
    </p>
    <p>
      <v-icon class="info--text mr-2">phonelink_ring</v-icon>
      <a class="contacts"
         :href="'tel://' + companyInfo.contacts.mobilePhone.replace(/[ -]/g,'')">
        {{ companyInfo.contacts.mobilePhone }}
      </a>
    </p>
    <p>
      <img src="@/assets/icons/footer/mail.svg" height="17px" class="contact_icon" alt="">
      <a class="contacts"
         :href="'mailto:' + companyInfo.contacts.email + '?Subject=Misterio Shop&body=Misterio Shop'"
         target="_blank">
        {{ companyInfo.contacts.email }}
      </a>
    </p>
    <p @click="$bus.$emit('openLiveChat')" id="need_consulting" class="contacts">
      <img id="consulting" src="@/assets/icons/footer/chat.svg" height="27px" class="contact_icon" alt="">
      Нужна консультация? <br>
      <span class="we_answer">Мы ответим на любой Ваш вопрос</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'contacts-phone',
  computed: {
    companyInfo () {
      return this.$store.getters.companyInfo
    }
  }
}
</script>
<style scoped lang="scss">

  .contacts {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 13px;
  }

  .contact_icon {
    margin-bottom: -5px;
    margin-right: 10px;
    width: 22px;
  }

  .we_answer {
    font-family: $primary-font;
    font-weight: 600;
    font-size: 10px;
  }

  #consulting {
    margin-bottom: -10px;
  }

  #need_consulting:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: $xs-screen) {
    .contacts {
      line-height: 18px;
    }
  }
</style>
