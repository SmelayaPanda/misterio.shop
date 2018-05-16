<template>
  <div>
    <h1>Системные функции</h1>
    <el-button @click="getData" class="success_a white--text">
      <v-icon class="white--text">dns</v-icon>
      Снять копию базы данных
    </el-button>
    <el-button @click="generateSitemap" class="success_a white--text">
      <v-icon class="white--text">map</v-icon>
      Сгенерировать Sitemap.xml
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
    },
    generateSitemap () {
      this.$store.dispatch('LOADING', true)
      let zip = new JSZip()
      let xml = ''
      firebase.firestore().collection('products').get()
        .then(snap => {
          xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
          let URL = 'https://misterio.shop/'
          let mainPages = ['', 'shop', 'about', 'news', 'contacts']
          let lastmod = new Date().toISOString()
          mainPages.forEach(el => {
            xml += `<url><loc>${URL}${el}</loc><lastmod>${lastmod}</lastmod></url>`
          })
          snap.docs.forEach(doc => {
            xml += `<url><loc>${URL}product/${doc.id}/</loc></url>`
          })
          xml += '</urlset>'
          zip.file('sitemap.xml', xml)
          zip.generateAsync({type: 'blob'})
            .then((content) => {
              let date = new Date().toISOString().substring(0, 10)
              FileSaver.saveAs(content, 'sitemap_' + date + '.zip')
              this.$store.dispatch('LOADING', false)
            })
            .catch(err => {
              console.log(err)
              this.$store.dispatch('LOADING', false)
            })
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
