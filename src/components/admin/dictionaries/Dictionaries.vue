<template>
  <div align="left">
    <p>* Статические, расширяемые, общие для системы данные</p>
    <dictionary-subject title="Бренд" name="brands" key="brands"></dictionary-subject>
    <dictionary-subject title="Цвет" name="colors" key="colors"></dictionary-subject>
    <dictionary-subject title="Страна" name="countries" key="countries"></dictionary-subject>
    <dictionary-subject title="Материал" name="materials" key="materials"></dictionary-subject>
    <delivery-coast></delivery-coast>
  </div>
</template>

<script>
import DictionarySubject from './DictionarySubject'
import DeliveryCoast from './DeliveryCoast'

export default {
  name: 'AdminDictionaries',
  components: {
    DeliveryCoast,
    DictionarySubject
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('fetchDictionaries')
  }
}
</script>

<style scoped>
</style>
