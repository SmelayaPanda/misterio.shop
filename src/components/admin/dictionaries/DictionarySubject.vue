<template>
  <div class="ml-5">
    <h2>{{ this.title }}</h2>
    <v-btn class="primary"
           @click="addDialogVisible = true">
      <v-icon class="white--text">add</v-icon>
    </v-btn>
    <!--ADD-->
    <el-dialog
      :title="`Add new ${this.title}`"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-input v-model="item"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="addDictionaryItem">Add</el-button>
      </span>
    </el-dialog>
    <!--EDIT-->
    <el-dialog
      :title="`Delete ${this.name} ${item} ?`"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="deleteDictionaryItem">Delete</el-button>
      </span>
    </el-dialog>

    <el-select filterable
               v-model="item"
               :placeholder="this.title"
               v-if="dictionary">
      <el-option
        v-for="val in dictionary"
        :key="val"
        :label="val"
        :value="val">
      </el-option>
    </el-select>

    <v-btn class="info" @click="deleteDialogVisible = true" :disabled="!this.item">
      <v-icon class="white--text">delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DictionarySubject',
  props: ['title', 'name'],
  data () {
    return {
      item: '',
      addDialogVisible: false,
      deleteDialogVisible: false
    }
  },
  methods: {
    addDictionaryItem () {
      this.addDialogVisible = false
      let items = this.dictionary
      if (items.indexOf(this.item) === -1) {
        items.push(this.item)
      }
      this.$store.dispatch('uploadDictionary', {name: this.name, data: items})
    },
    deleteDictionaryItem () {
      this.deleteDialogVisible = false
      let items = this.dictionary
      items.splice(items.indexOf(this.item), 1)
      this.item = ''
      this.$store.dispatch('uploadDictionary', {name: this.name, data: items})
    }
  },
  computed: {
    dictionary () {
      return this.$store.getters[this.name]
    }
  }
}
</script>

<style scoped>
  .el-select {
    width: 350px !important;
  }
</style>
