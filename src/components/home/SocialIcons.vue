<template>
  <div id="social_icons">
    <div id="vk_icon">
      <img src="@/assets/icons/vk.svg" alt="" height="20px">
    </div>
    <div id="inst_icon">
      <img src="@/assets/icons/inst.svg" alt="" height="24px">
    </div>
  </div>
</template>

<script>
export default {
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
