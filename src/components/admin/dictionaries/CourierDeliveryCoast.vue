<template>
  <el-row type="flex" justify="center">
    <el-col :span="22" class="mt-3">
      <v-divider class="mb-3 mt-4"></v-divider>
      <h3>Курьер по Новосибирску
      <v-tooltip right>
          <v-icon slot="activator">lightbulb_outline</v-icon>
        <span class="text-xs-center">
          Нажимать Enter необязательно.<br>
          Просто измените значение (везде в рублях).<br>
          Если доставка не производится укажите 0.
        </span>
      </v-tooltip>
      </h3>
      <v-data-table
        v-if="courier"
        :headers="headers"
        :items="courier"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.code }}</td>
          <td v-if="NSK_DISTRICTS[props.item.code]" class="text-xs-left">{{ NSK_DISTRICTS[props.item.code] }}</td>
          <td class="text-xs-left">
            <el-input-number
              @blur="saveDeliveryCoast(props.item.code, props.item.price)"
              :controls="false" size="mini"
              :min="0" :max="100000"
              v-model="props.item.price">
            </el-input-number>
          </td>
        </template>
      </v-data-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'CourierDeliveryCoast',
  methods: {
    saveDeliveryCoast (districtCode, price) {
      let courier = this.courier
      let idx = courier.findIndex(el => el.code === districtCode)
      if (price) {
        courier[idx].price = price
      }
      this.$store.dispatch('uploadDictionary', {name: 'courier', data: courier})
    }
  },
  computed: {
    courier () {
      return this.$store.getters.dictionaries.courier
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: true,
          value: 'code'
        },
        {
          text: 'Район',
          align: 'left',
          sortable: false,
          value: 'district'
        },
        {
          text: 'Стоимость',
          align: 'left',
          sortable: false,
          value: 'courier'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
