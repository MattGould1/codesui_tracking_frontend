<template>
  <div class="reports">
    <md-toolbar class="md-dense">
    </md-toolbar>

    <div class="field-group">
      <md-input-container>
        <label for="utm_name">UTM Name</label>
        <md-select name="utm_name" id="utm_name" multiple v-model="utm_names">
          <md-option v-for="(value, index) in filters.utm_name" >{{ value }}</md-option>
        </md-select>
      </md-input-container>
<!--         utm_name: [],
        utm_term: [],
        utm_source: [],
        utm_content: [],
        utm_medium: [] -->
      <md-input-container>
        <label for="utm_name">UTM Term</label>
        <md-select name="utm_term" id="utm_term" multiple v-model="utm_terms">
          <md-option v-for="(value, index) in filters.utm_term" >{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_name">UTM Source</label>
        <md-select name="utm_source" id="utm_source" multiple v-model="utm_sources">
          <md-option v-for="(value, index) in filters.utm_source" >{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_name">UTM Content</label>
        <md-select name="utm_content" id="utm_content" multiple v-model="utm_contents">
          <md-option v-for="(value, index) in filters.utm_content" >{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_name">UTM Medium</label>
        <md-select name="utm_medium" id="utm_medium" multiple v-model="utm_mediums">
          <md-option v-for="(value, index) in filters.utm_medium" >{{ value }}</md-option>
        </md-select>
      </md-input-container>
    </div>

    <md-table-card md-with-hover>
      <md-card-header>
        <div class="md-title">My awesome report!</div>
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
  name: 'reports',
  created () {
    var $this = this
    var totals = 0
    return reportResource
      .get()
      .then((response) => {
        _.forEach(response.body.filter_options, function (piece) {
          _.forEach(piece, function (utmTags, utmTag) { // use the piece key to assign the array to the utm tag
            $this.filters[utmTag] = piece[utmTag]
          })
        })

        _.forEach(response.body.time, function (piece) {
          var row = {}
          totals = totals + piece.sessions.total_unique
          // until I have more time, this is the best way of handling this (i wanna do it on the backend and return a complete array that can just be == rows)
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
      rows: [],
      utm_names: [],
      utm_terms: [],
      utm_sources: [],
      utm_contents: [],
      utm_mediums: [],
      filters: {
        utm_name: [],
        utm_term: [],
        utm_source: [],
        utm_content: [],
        utm_medium: []
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
