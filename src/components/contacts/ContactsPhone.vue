<template>
  <div>
    <p class="contacts">
      <img src="@/assets/icons/footer/phone.svg" height="22px" class="contact_icon" alt="">
      +7 (800) 100 66 66
    </p>
    <p class="contacts">
      <img src="@/assets/icons/footer/mail.svg" height="17px" class="contact_icon" alt="">
      otkrovennieigri@mail.ru
    </p>
    <p class="contacts">
      <img id="consulting" src="@/assets/icons/footer/chat.svg" height="27px" class="contact_icon" alt="">
      Нужна консультация? <br>
      <span class="we_answer">Мы ответим на любой Ваш вопрос</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'contacts-phone'
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

  @media only screen and (max-width: $sm-screen) {
  }

  @media only screen and (max-width: $xs-screen) {
  }
</style>
