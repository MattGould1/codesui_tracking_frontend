<template>
  <div class="graphs">
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
          minValue: '2016-01-08T05:25:35.000Z',
          maxValue: '2018-01-08T05:25:35.000Z'
        },
        vAxis: {
          title: 'Sessions',
          minValue: 0,
          maxValue: 10
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
</style>
