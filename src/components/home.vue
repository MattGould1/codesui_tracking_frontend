<template>
  <div class="home">
    <md-table-card md-with-hover>
      <md-card-header>
        <div class="md-title">At a glance weekly report</div>
      </md-card-header>

      <md-card-content>
        <md-table @select="onSelect" @sort="onSort">
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="week">Week</md-table-head>
              <!-- <md-table-head md-numeric>Spend</md-table-head> -->
              <md-table-head md-numeric>Engagement</md-table-head>
              <md-table-head md-numeric>Conversions</md-table-head>
              <!-- ADD THIS LATER <md-table-head md-numeric>Leads</md-table-head>
              <md-table-head md-numeric>Assisted Leads</md-table-head> -->
              <md-table-head md-numeric>Gross Purchases</md-table-head>
<!--               <md-table-head md-numeric>Complete Purchases</md-table-head>
              <md-table-head md-numeric>Billed Purchases</md-table-head> -->
              <md-table-head md-numeric>Convt'd Sessions</md-table-head>
              <md-table-head md-numeric>Convt'd Purchases</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in rows" :key="rowIndex" :md-item="row" md-auto-select md-selection>
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
import { reportResource } from 'src/helpers/resources'
import _ from 'lodash'

export default {
  name: 'home',
  created () {
    var $this = this
    var totals = 0
    return reportResource
      .get()
      .then((response) => {
        _.forEach(response.body.time, function (piece) {
          var row = {}
          totals = totals + piece.sessions.total_unique

          row.week = piece.week
          row.engagement = piece.sessions.total_unique
          row.conversions = piece.activity.sum_leads_contact + piece.activity.sum_leads_subscribe + piece.activity.sum_leads_purchase
          row.gross_purchases = piece.activity.sum_leads_purchase
          row.converted_sessions = piece.activity.sum_leads_contact + piece.activity.sum_leads_subscribe ? +(((piece.activity.sum_leads_contact + piece.activity.sum_leads_subscribe) / piece.sessions.total_unique * 100)).toFixed(2) + '%' : 0
          row.converted_purchases = piece.activity.sum_leads_purchase ? +((piece.activity.sum_leads_purchase / piece.sessions.total_unique * 100)).toFixed(2) + '%' : 0

          $this.rows.push(row)
        })
        console.log(totals)
      }, (errorResponse) => {
        console.log(errorResponse)
      })
  },
  data () {
    return {
      rows: []
    }
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
