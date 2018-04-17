<template>
  <div>
    <img class="soc_icon"
         onclick="window.open('https://vk.com/otkrovennie.igri', '_blank')"
         src="@/assets/icons/footer/vk.svg" alt="">
    <img class="soc_icon"
         onclick="window.open('https://www.instagram.com/otkrovennie.igri/', '_blank')"
         src="@/assets/icons/footer/inst.svg"
         alt="">
    <img class="soc_icon"
         onclick="window.open('https://www.facebook.com/Otkrovennie_igri-2021140284801029/', '_blank')"
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

  .soc_icon:hover {
    cursor: pointer;
  }
</style>
