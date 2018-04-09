<template>
  <div align="left">
    <p>* Статические, расширяемые, общие для системы данные</p>
    <dictionary-subject title="Бренд" name="brands" key="brands"></dictionary-subject>
    <dictionary-subject title="Цвет" name="colors" key="colors"></dictionary-subject>
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
