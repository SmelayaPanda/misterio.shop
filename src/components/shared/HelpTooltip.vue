<template>
  <v-tooltip bottom>
    <v-btn light flat fab color="white" slot="activator">
      <v-icon>lightbulb_outline</v-icon>
    </v-btn>
    <p class="text-xs-center"><br>
      Если у вас возникли технические проблемы,<br>
      напишите пожалуйста в отдел разработки на почту:<br>
      SmelayaPandaGM@gmail.com</p>
  </v-tooltip>
</template>

<script>
export default {
  name: 'help-tooltip',
  data: function () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

</style>
