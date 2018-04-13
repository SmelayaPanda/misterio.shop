<template>
  <div>
    <img class="soc_icon"
         src="@/assets/icons/footer/vk.svg" alt="">
    <img class="soc_icon"
         src="@/assets/icons/footer/inst.svg"
         alt="">
    <img class="soc_icon"
         src="@/assets/icons/footer/facebook.svg"
         alt="">
  </div>
</template>
<script>
export default {
  name: 'contacts-social'
}
</script>
<style scoped lang="scss">

  .soc_icon {
    margin-right: 20px;
    width: 30px;
  }

  @media only screen and (max-width: $sm-screen) {
  }

  @media only screen and (max-width: $xs-screen) {
  }
</style>
