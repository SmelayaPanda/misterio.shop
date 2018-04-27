<template>
  <div align="left">
    <p>* Статические, расширяемые, общие для системы данные</p>
    <dictionary-subject title="Бренд" name="brands" key="brands"></dictionary-subject>
    <dictionary-subject title="Цвет" name="colors" key="colors"></dictionary-subject>
    <dictionary-subject title="Страна" name="countries" key="countries"></dictionary-subject>
    <dictionary-subject title="Материал" name="materials" key="materials"></dictionary-subject>
    <el-row type="flex" justify="center">
      <el-col :span="22" class="mt-3">
        <v-divider class="mb-3 mt-4"></v-divider>
        <h3>Стоимость доставки</h3>
        <delivery-coast></delivery-coast>
      </el-col>
    </el-row>
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
