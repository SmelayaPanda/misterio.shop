<template>
  <el-alert
    title="Error"
    type="error"
    :description="text"
    show-icon>
  </el-alert>
</template>

<script>
export default {
  name: 'alert',
  props: ['text'],
  methods: {
    onClose:
        function () {
          this.$emit('dismissed') // my custom event with name dismiss (see signUp app-alert element)
        }
  }
}
</script>

<style scoped>

</style>
