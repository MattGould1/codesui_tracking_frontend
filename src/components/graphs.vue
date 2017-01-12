<template>
  <div class="graphs">
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="history">Weekly</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="favorite" md-active>Monthly</md-bottom-bar-item>
    </md-bottom-bar>
    <h1>My awesome graphs!</h1>
    <vue-chart
        chart-type="AreaChart"
        :columns="columns"
        :rows="rows"
        :options="options"
    ></vue-chart>
  </div>
</template>

<script>
import { testResource } from 'src/helpers/resources'

export default {
  name: 'graphs',
  created () {
    var $this = this

    return testResource
      .get()
      .then((response) => {
        $this.rows = response.body.rows
        $this.options.hAxis.minValue = response.body.dateFrom
        $this.options.hAxis.maxValue = response.body.dateTo
        $this.options.vAxis.maxValue = response.body.max
      }, (errorResponse) => {
        console.log(errorResponse)
      })
  },
  data () {
    return {
      columns: [{
        'type': 'string',
        'label': 'Year'
      }, {
        'type': 'number',
        'label': 'Sessions with activity'
      }, {
        'type': 'number',
        'label': 'Sessions without activity'
      }],
      rows: [
      ],
      options: {
        title: 'Cohort Sessions Over Time',
        hAxis: {
          title: 'Datetime',
          minValue: '',
          maxValue: ''
        },
        vAxis: {
          title: 'Sessions',
          minValue: 0,
          maxValue: 1
        },
        width: 900,
        height: 500,
        curveType: 'function'
      }
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .graphs {
    width: 100%;
  }
</style>
