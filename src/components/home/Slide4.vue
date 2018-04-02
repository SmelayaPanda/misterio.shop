<template>
  <div id="slide_4">
    <p id="title_slide_4">КОНТАКТЫ</p>
    <common-contacts></common-contacts>
  </div>
</template>

<script>
import CommonContacts from '../contacts/CommonContacts'

export default {
  name: 'Slide4',
  components: {CommonContacts}
}
</script>

<style scoped lang="scss">
  #slide_4 {
    margin-top: 100px;
  }

  #title_slide_4 {
    padding-top: 30px;
    margin-bottom: 80px;
    font-family: $secondary-font;
    font-size: 32px;
    margin-top: -25px;
    background: linear-gradient(to right, white 43%, $color-secondary 51%);
    color: transparent;
    -webkit-background-clip: text;
  }

  #title_slide_4:after {
    content: "";
    display: block;
    width: 150px;
    height: 3px;
    margin: -5px auto;
    border-bottom: 1px solid $color-secondary;
  }
</style>
