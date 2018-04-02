<template>
  <div id="social_icons">
    <div id="vk_icon">
      <img v-if="color === 'red'" src="@/assets/icons/social/vk.svg" alt="" height="20px">
      <img v-if="color === 'black'" src="@/assets/icons/social/vk_black.svg" alt="" height="20px">
    </div>
    <div id="inst_icon">
      <img v-if="color === 'red'" src="@/assets/icons/social/inst.svg" alt="" height="24px">
      <img v-if="color === 'black'" src="@/assets/icons/social/inst_black.svg" alt="" height="24px">
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
    top: 45%;
    left: 23px;
  }

  #vk_icon {
    position: relative;
    margin-top: 3px;
  }

  #inst_icon {
    position: relative;
    margin-top: 50px;
  }
</style>
