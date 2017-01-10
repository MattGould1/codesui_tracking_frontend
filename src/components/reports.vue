<template>
  <div class="reports">
    <h1>My awesome reports!</h1>
    <md-table-card md-with-hover>
      <md-card-header>
        <div class="md-title">Weekly Report Overview</div>
      </md-card-header>
      <md-card-content>
        <md-table @select="onSelect" @sort="onSort" v-once>
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="week">Week</md-table-head>
              <md-table-head md-numeric>Spend</md-table-head>
              <md-table-head md-numeric>Engagement</md-table-head>
              <md-table-head md-numeric>Conversions</md-table-head>
              <!-- ADD THIS LATER <md-table-head md-numeric>Leads</md-table-head>
              <md-table-head md-numeric>Assisted Leads</md-table-head> -->
              <md-table-head md-numeric>Gross Purchases</md-table-head>
              <md-table-head md-numeric>Complete Purchases</md-table-head>
              <md-table-head md-numeric>Billed Purchases</md-table-head>
              <md-table-head md-numeric>Convt'd Sessions</md-table-head>
              <md-table-head md-numeric>Convt'd Purchases</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in nutrition" :key="rowIndex" :md-item="row" md-auto-select md-selection>
              <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :md-numeric="columnIndex !== 'dessert' && columnIndex !== 'comment'" v-if="columnIndex !== 'type'">
                {{ column }}
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>

        <md-table-pagination
          md-size="5"
          md-total="10"
          md-page="1"
          md-label="Rows"
          md-separator="of"
          :md-page-options="[5, 10, 25, 50]"
          @pagination="onPagination"></md-table-pagination>
        </md-table-card>

      </md-card-content>
    </md-table-card>
  </div>
</template>

<script>
export default {
  name: 'reports',
  created () {
  },
  methods: {
    onPagination (paginate) {
      console.log(paginate)
    },
    onSelect (row) {
      console.log(row)
    },
    onSort (sort) {
      console.log(sort)
    }
  },
  data () {
    return {
      nutrition: [
        {
          dessert: 'Fro',
          type: 'ice_cream',
          calories: '159',
          fat: '6.0',
          comment: 'Icy'
        },
        {
          dessert: 'Ice c',
          type: 'ice_cream',
          calories: '237',
          fat: '9.0',
          comment: 'Super Tasty'
        },
        {
          dessert: 'Ecl',
          type: 'pastry',
          calories: '262',
          fat: '16.0',
          comment: ''
        },
        {
          dessert: 'Cupca',
          type: 'pastry',
          calories: '305',
          fat: '3.7',
          comment: ''
        },
        {
          dessert: 'Ginge',
          type: 'other',
          calories: '356',
          fat: '16.0',
          comment: ''
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
