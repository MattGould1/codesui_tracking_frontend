<template>
  <div class="reports">
    <div class="field-group">
      <md-input-container>
        <label for="source">Source</label>

        <md-select name="source" id="source" @selected="change('utm_names')" multiple v-model="source">
          <md-option v-for="(value, index) in filters.source" :value="value">{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_names">UTM Name</label>

        <md-select name="utm_names" id="utm_names" @selected="change('utm_names')" multiple v-model="utm_names">
          <md-option v-for="(value, index) in filters.utm_name" :value="value">{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_term">UTM Term</label>
        <md-select name="utm_term" id="utm_term" @change="change('utm_terms')" multiple v-model="utm_terms">
          <md-option v-for="(value, index) in filters.utm_term" :value="value">{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_source">UTM Source</label>
        <md-select name="utm_source" id="utm_source" @change="change('utm_sources')" multiple v-model="utm_sources">
          <md-option v-for="(value, index) in filters.utm_source" :value="value">{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_content">UTM Content</label>
        <md-select name="utm_content" id="utm_content" @change="change('utm_contents')" multiple v-model="utm_contents">
          <md-option v-for="(value, index) in filters.utm_content" :value="value">{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label for="utm_medium">UTM Medium</label>
        <md-select name="utm_medium" id="utm_medium" @change="change('utm_mediums')" multiple v-model="utm_mediums">
          <md-option v-for="(value, index) in filters.utm_medium" :value="value">{{ value }}</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <span class="datetime">Week From:</span>
        <date-picker :date="startTime" @change="change('week_from')" :option="option"></date-picker>
      </md-input-container>

      <md-input-container>
        <span class="datetime">Week To:</span>
        <date-picker :date="stopTime" @change="change('week_to')" :option="option"></date-picker>
      </md-input-container>
    </div>

    <md-table-card md-with-hover>
      <md-card-header>
        <div class="md-title">My awesome report!</div>
      </md-card-header>

      <md-card-content>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="week">Week</md-table-head>
              <!-- <md-table-head md-numeric>Spend</md-table-head> -->
              <md-table-head md-numeric>Engagement</md-table-head>
              <md-table-head md-numeric>Conversions</md-table-head>
              <md-table-head md-numeric>Contacts</md-table-head>
              <md-table-head md-numeric>Subscription</md-table-head>
              <md-table-head md-numeric>Gross Purchases</md-table-head>
<!--               <md-table-head md-numeric>Complete Purchases</md-table-head>
              <md-table-head md-numeric>Billed Purchases</md-table-head> -->
              <md-table-head md-numeric>Convt'd Sessions %</md-table-head>
              <md-table-head md-numeric>Convt'd Purchases %</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in rows" :key="rowIndex" :md-item="row">
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
import { reportResource, filterReportResource } from 'src/helpers/resources'
import _ from 'lodash'
import DatePicker from 'vue-datepicker'

export default {
  name: 'reports',
  components: {
    'date-picker': DatePicker
  },
  created () {
    return reportResource
      .get()
      .then((response) => {
        this.updateReport(response.body, true)
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
    },
    change (filter) {
      this.updateFilters(filter)
    },
    updateReport (data, updateFilters) {
      var $this = this
      $this.rows = [] // clear the current data
      var totals = 0

      if (updateFilters === true) {
        _.forEach(data.filter_options, function (piece) {
          _.forEach(piece, function (utmTags, utmTag) { // use the piece key to assign the array to the utm tag
            console.log(utmTag)
            $this.filters[utmTag] = piece[utmTag]
          })
        })
      }

      _.forEach(data.time, function (piece) {
        console.log(piece)
        var row = {}
        totals = totals + piece.sessions.total_unique
        // until I have more time, this is the best way of handling this (i wanna do it on the backend and return a complete array that can just be == rows)
        row.week = piece.week
        row.engagement = piece.sessions.total_unique
        row.conversions = piece.activity.sum_leads_contact + piece.activity.sum_leads_subscribe + piece.activity.sum_leads_purchase
        row.contact = piece.activity.sum_leads_contact
        row.subscribe = piece.activity.sum_leads_subscribe
        row.gross_purchases = piece.activity.sum_leads_purchase
        row.converted_sessions = piece.activity.sum_leads_contact + piece.activity.sum_leads_subscribe ? +(((piece.activity.sum_leads_contact + piece.activity.sum_leads_subscribe) / piece.sessions.total_unique * 100)).toFixed(2) + '%' : 0
        row.converted_purchases = piece.activity.sum_leads_purchase ? +((piece.activity.sum_leads_purchase / piece.sessions.total_unique * 100)).toFixed(2) + '%' : 0

        $this.rows.push(row)
      })

      console.log(totals)
    },
    updateFilters () {
      var filters = {
        utm_name: this.utm_names,
        utm_term: this.utm_terms,
        utm_source: this.utm_sources,
        utm_content: this.utm_contents,
        utm_medium: this.utm_mediums,
        source: this.source,
        iso_week: {
          week_from: this.startTime.time,
          week_to: this.stopTime.time
        }
      }

      return filterReportResource
        .save(filters)
        .then((response) => {
          this.updateReport(response.body, false)
        }, (errorResponse) => {
          console.log(errorResponse)
        })
    }
  },
  data () {
    return {
      rows: [],
      utm_names: [],
      source: [],
      utm_terms: [],
      utm_sources: [],
      utm_contents: [],
      utm_mediums: [],
      filters: {
        utm_name: [],
        source: [],
        utm_term: [],
        utm_source: [],
        utm_content: [],
        utm_medium: []
      },
      // datepicker options
      startTime: {
        time: ''
      },
      stopTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.field-group {
  display: flex;
}
.md-input-container {
  margin-right: 10px;
}
.datetime {
  top: 0;
  position: absolute;
  font-size: 12px;
  color: rgba(0,0,0,.54);
}
</style>
