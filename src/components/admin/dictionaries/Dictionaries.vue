<template>
  <div align="left">
    <p>* Common system constants</p>
    <dictionary-subject title="Brand" name="brands"></dictionary-subject>
    <dictionary-subject title="Color" name="colors"></dictionary-subject>
  </div>
</template>

<script>
import DictionarySubject from './DictionarySubject'
export default {
  name: 'AdminDictionaries',
  components: {
    DictionarySubject
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
