<template>
  <div class="graphs">
    <h1>My awesome graphs!</h1>
    <vue-chart
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
  data () {
    return {
      columns: [{
        'type': 'string',
        'label': 'Year'
      }, {
        'type': 'number',
        'label': 'Sales'
      }, {
        'type': 'number',
        'label': 'Expenses'
      }],
      rows: [
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
      ],
      options: {
        title: 'Company Performance',
        hAxis: {
          title: 'Year',
          minValue: '2004',
          maxValue: '2007'
        },
        vAxis: {
          title: '',
          minValue: 300,
          maxValue: 1200
        },
        width: 900,
        height: 500,
        curveType: 'function'
      }
    }
  },
  methods: {
    test () {
      return testResource
        .get()
        .then((response) => {
          console.log(response)
        }, (errorResponse) => {
          console.log(errorResponse)
        })
    }
  },
  created   () {
    this.test()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
