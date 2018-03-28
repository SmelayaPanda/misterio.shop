<template>
  <el-card class="mb-4" v-if="companyInfo">
    <h2>About our company</h2>
    <p>More than studio</p>
    <el-row>
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" class="pl-2 pr-2">
        <h3>Who we are?</h3>
        <p v-once>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eveniet, impedit provident quised ut.
          Adipisci aspernatur cupiditate distinctio, esse facere fuga harum, illum laboriosam molestiae quam reiciendis,
          totam!
        </p>
      </el-col>
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" class="pl-2 pr-2">
        <h3>Address:</h3>
        <p>
          {{ companyInfo.address.country }}, {{ companyInfo.address.city }},
          {{ companyInfo.address.street }}, {{ companyInfo.address.build }},
          {{ companyInfo.address.house }}, {{ companyInfo.address.postCode }}
        </p>
        <h3>Contacts:</h3>
        <p>
          {{ companyInfo.contacts.email }} <br>
          {{ companyInfo.contacts.phone }}
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Contacts',
  computed: {
    companyInfo () {
      return this.$store.getters.companyInfo
    }
  }
}
</script>

<style scoped>

</style>
