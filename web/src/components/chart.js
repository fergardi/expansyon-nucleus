import { Doughnut, Radar, Bar } from 'vue-chartjs'

const pie = Doughnut.extend({
  props: ['data'],
  data () {
    return {
      options: {
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})

const radar = Radar.extend({
  props: ['data'],
  data () {
    return {
      options: {
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})

const bar = Bar.extend({
  props: ['data'],
  data () {
    return {
      options: {
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})

module.exports = {
  pie: pie,
  radar: radar,
  bar: bar
}
