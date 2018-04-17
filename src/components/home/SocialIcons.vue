<template>
  <div id="social_icons">
    <div class="soc_icon">
      <img v-if="color === 'red'"
           onclick="window.open('https://vk.com/otkrovennie.igri', '_blank')"
           src="@/assets/icons/social/vk.svg" alt="" height="20px">
      <img v-else
           onclick="window.open('https://vk.com/otkrovennie.igri', '_blank')"
           src="@/assets/icons/social/vk_black.svg" alt="" height="20px">
    </div>
    <div class="soc_icon">
      <img v-if="color === 'red'"
           onclick="window.open('https://www.instagram.com/otkrovennie.igri/', '_blank')"
           src="@/assets/icons/social/inst.svg" alt="" height="24px">
      <img v-else
           onclick="window.open('https://www.instagram.com/otkrovennie.igri/', '_blank')"
           src="@/assets/icons/social/inst_black.svg" alt="" height="24px">
    </div>
    <div class="soc_icon">
      <img v-if="color === 'black'"
           onclick="window.open('https://www.facebook.com/Otkrovennie_igri-2021140284801029/', '_blank')"
           src="@/assets/icons/social/facebook-black.svg" alt="" height="24px">
      <img v-else
           onclick="window.open('https://www.facebook.com/Otkrovennie_igri-2021140284801029/', '_blank')"
           src="@/assets/icons/social/facebook-red.svg" alt="" height="24px">
    </div>
  </div>
</template>

<script>
export default {
  props: ['color'],
  name: 'SocialIcons'
}
</script>

<style scoped>
  #social_icons {
    position: absolute;
    top: 32vh;
    left: 23px;
  }

  .soc_icon {
    position: relative;
    margin-top: 50px;
    transition: all .5s;
  }

  .soc_icon:hover {
    cursor: pointer;
    transform: translateX(5px);
  }

</style>
