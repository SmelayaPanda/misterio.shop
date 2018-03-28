<template>
  <div>
    <v-container v-if="this.isLoading">
      <app-loader></app-loader>
    </v-container>
    <div v-else>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="18" :md="16" :lg="14" :xl="12" type="flex" align="middle">
          <contacts></contacts>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14" type="flex" align="middle">
          <h3>Reviews</h3>
          <reviews></reviews>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Reviews from './Reviews'
import Contacts from './Contacts'

export default {
  name: 'info',
  components: {
    Reviews,
    Contacts
  },
  methods: {
    fetchAboutData () {
      this.$store.dispatch('fetchReviews', {status: 'published'})
      this.$store.dispatch('fetchCompanyInfo')
    }
  },
  created () {
    this.fetchAboutData()
  }
}
</script>

<style scoped>

</style>
