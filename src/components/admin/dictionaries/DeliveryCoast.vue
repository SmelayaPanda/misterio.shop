<template>
  <el-row type="flex" justify="center">
    <el-col :span="22" class="mt-3">
      <v-divider class="mb-3 mt-4"></v-divider>
      <h3>Доставка по России
      <v-tooltip right>
          <v-icon slot="activator">lightbulb_outline</v-icon>
        <span class="text-xs-center">
          Нажимать Enter необязательно.<br>
          Просто измените значение (везде в рублях).<br>
          Если доставка данным способом не производится укажите 0.<br>
          Для сортировки таблицы по цене нажмите на выбраную колонку в хэдере.
        </span>
      </v-tooltip>
      </h3>
      <v-data-table
        v-if="delivery"
        :headers="headers"
        :items="delivery"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.code }}</td>
          <td v-if="RUS_REGIONS[props.item.code]" class="text-xs-left">{{ RUS_REGIONS[props.item.code] }}</td>
          <td v-else class="text-xs-left">none</td>
          <td class="text-xs-left">
            <el-input-number
              @blur="saveDeliveryCoast(props.item.code, 'pickpoint', props.item.pickpoint)"
              :controls="false" size="mini"
              :min="0" :max="100000"
              v-model="props.item.pickpoint">
            </el-input-number>
          </td>
          <td class="text-xs-left">
            <el-input-number
              @blur="saveDeliveryCoast(props.item.code, 'cdek', props.item.cdek)"
              :controls="false" size="mini"
              :min="0" :max="100000"
              v-model="props.item.cdek">
            </el-input-number>
          </td>
          <td class="text-xs-left">
            <el-input-number
              @blur="saveDeliveryCoast(props.item.code, 'postrf', props.item.postrf)"
              :controls="false" size="mini"
              :min="0" :max="100000"
              v-model="props.item.postrf">
            </el-input-number>
          </td>
        </template>
      </v-data-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'DeliveryCoast',
  methods: {
    saveDeliveryCoast (regionCode, company, price) {
      let delivery = this.delivery
      let idx = delivery.findIndex(el => el.code === regionCode)
      if (!delivery[idx]['cdek']) delivery[idx]['cdek'] = 0
      if (!delivery[idx]['postrf']) delivery[idx]['postrf'] = 0
      if (!delivery[idx]['pickpoint']) delivery[idx]['pickpoint'] = 0
      if (price) {
        delivery[idx][company] = price
      }
      this.$store.dispatch('uploadDictionary', {name: 'delivery', data: delivery})
    }
  },
  computed: {
    delivery () {
      return this.$store.getters.dictionaries.delivery
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: true,
          value: 'code'
        },
        {
          text: 'Регион',
          align: 'left',
          sortable: false,
          value: 'region'
        },
        {
          text: 'PickPoint',
          align: 'left',
          sortable: true,
          value: 'pickpoint'
        },
        {
          text: 'СДЭК',
          align: 'left',
          sortable: true,
          value: 'cdek'
        },
        {
          text: 'Почта РФ',
          align: 'left',
          sortable: true,
          value: 'postrf'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
