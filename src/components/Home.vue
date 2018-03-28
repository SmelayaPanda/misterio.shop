<template>
  <div class="hello">
    <h1 style="font-size: 72px">re:<span class="primary--text">High</span></h1>

    <h1 style="font-size: 72px">Store</h1>
    <img src="@/assets/placeholders/people.jpg" alt="" width="500px" style="opacity: 0.9">
    <div>
      <el-button @click="getFBData">SayHi</el-button>
    </div>
    <p style="font-size: 48px">{{ msg }}</p>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      checked: true
    }
  },
  methods: {
    getFBData: function () {
      firebase.database().ref('greeting').once('value')
        .then(data => {
          this.msg = data.val()
        })
        .catch(err => {
          this.msg = err
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
