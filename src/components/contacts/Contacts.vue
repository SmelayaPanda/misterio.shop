<template>
  <div id="main">
    <app-theme-page-title>
      <p slot="middleTitle">КОНТАКТЫ</p>
      <p slot="bottomTitle">Мы всегда на связи, чтобы подобрать для Вас самое подходящее</p>
    </app-theme-page-title>
    <common-contacts/>
  </div>
</template>

<script>
import CommonContacts from './CommonContacts'

export default {
  name: 'Contacts',
  components: {CommonContacts}
}
</script>

<style scoped lang="scss">
  #main {
    margin-bottom: 80px;
  }

  @media only screen and (max-width: 767px) {
  }
</style>
