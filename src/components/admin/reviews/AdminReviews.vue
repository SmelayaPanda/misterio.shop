<template>
  <div v-if="reviews">
    <el-row type="flex" justify="start" align="middle" class="mb-4">
      <h2 class="ml-3 mr-2">
        Статус
      </h2>
      <el-select
        filterable
        no-match-text="Статус отсутствует"
        v-model="status"
        placeholder="Бренд"
        @change="loadStatusReviews">
        <el-option
          v-for="val in statuses"
          :key="val"
          :label="val"
          :value="val">
        </el-option>
      </el-select>
    </el-row>
    <el-table
      ref="reviewTable"
      :data="reviews"
      :highlight-current-row="true"
      empty-text="No data"
      style="width: 100vw; text-align: left">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col :span="22" class="pl-1">
              <p><span>ИД:</span>
                <el-tag size="mini" type="success">{{ props.row.id }}</el-tag>
              </p>
              <h3><i class="el-icon-info"></i>
                Отзыв:
              </h3>
              <p>
                {{ props.row.text }}<br>
              </p>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!--CREATION DATE-->
      <el-table-column
        label="Дата"
        width="200">
        <template slot-scope="scope">
          <span><el-tag type="success">{{ scope.row.date | date }}</el-tag></span>
        </template>
      </el-table-column>
      <!--NAME-->
      <el-table-column
        label="Имя"
        width="200">
        <template slot-scope="scope">
          <span><el-tag type="success">{{ scope.row.name }}</el-tag></span>
        </template>
      </el-table-column>
      <!--CORRECTED-->
      <el-table-column
        label="Редактировано"
        width="140">
        <template slot-scope="scope">
          <span>
            <el-tag type="success" v-if="scope.row.corrected">+</el-tag>
            <v-chip outline label color="info_a"  v-else>-</v-chip>
          </span>
        </template>
      </el-table-column>
      <!--ACTIONS-->
      <el-table-column
        width="200"
        label="Действия">
        <template slot-scope="scope">
          <el-row type="flex" justify="start">
            <process-review
              :reviewId="scope.row.id"
              v-if="status === 'new'">
            </process-review>
            <change-review-status
              :reviewId="scope.row.id"
              toStatus="published">
            </change-review-status>
            <change-review-status
              :reviewId="scope.row.id"
              toStatus="archived"
              v-if="status !== 'archived'">
            </change-review-status>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ProcessReview from './ProcessReview'
import ChangeReviewStatus from './ChangeReviewStatus'

export default {
  name: 'AdminReviews',
  components: {
    ProcessReview,
    ChangeReviewStatus
  },
  data () {
    return {
      status: 'created',
      statuses: ['created', 'published', 'archived']
    }
  },
  methods: {
    loadStatusReviews () {
      return this.$store.dispatch('fetchReviews', {status: this.status})
    }
  },
  computed: {
    reviews () {
      return this.$store.getters.reviews
    }
  },
  created () {
    this.loadStatusReviews()
  }
}
</script>

<style scoped>

</style>
