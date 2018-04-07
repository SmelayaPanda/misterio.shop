<template>
  <div>
    <h1>Developer board</h1>
    <el-button @click="getData" class="success_a white--text">
      <v-icon class="white--text">dns</v-icon>
      Dump database data
    </el-button>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default {
  name: 'Developer',
  data () {
    return {
      collections: [
        'companyInfo',
        'dictionaries',
        'news',
        'oneclick',
        'orders',
        'products',
        'reviews',
        'statistics',
        'users'
      ]
    }
  },
  methods: {
    getData () {
      let zip = new JSZip()
      this.$store.dispatch('LOADING', true)

      let getCollectionData = function (name) {
        return firebase.firestore().collection(name).get()
          .then(snap => {
            let data = {}
            snap.docs.forEach(el => {
              data[el.id] = el.data()
            })
            zip.file(name + '.json', JSON.stringify(data))
          })
      }
      let actions = []
      this.collections.forEach(name => actions.push(getCollectionData(name)))

      Promise.all(actions)
        .then(() => {
          zip.generateAsync({type: 'blob'})
            .then((content) => {
              let date = new Date().toISOString().substring(0, 10)
              FileSaver.saveAs(content, 'dump_' + date + '.zip')
              this.$store.dispatch('LOADING', false)
            })
            .catch(err => {
              console.log(err)
              this.$store.dispatch('LOADING', false)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  #dump_data {
    margin-top: 15px;
    color: $color-primary_a;
  }
</style>
