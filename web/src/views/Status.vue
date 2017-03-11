<template lang="pug">
  md-layout
    
    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Planets
        md-card-content.center.doughnut
          pie(v-bind:data="planets.data")
          md-chip.grey.total {{ planets.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Ships
        md-card-content.center.doughnut
          pie(v-bind:data="ships.data")
          md-chip.grey.total {{ ships.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Buildings
        md-card-content.center.doughnut
          pie(v-bind:data="buildings.data")
          md-chip.grey.total {{ buildings.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Resources
        md-card-content.center.bar
          bar(v-bind:data="resources.data")

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Referendum
        md-card-content.center.radar
          radar(v-bind:data="referendum.data")

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title {{ faction.name }}
        md-card-media.background
          img(v-bind:src="faction.image")
        md-card-content.center
          md-chip 23
</template>

<script>
  import { pie, radar, bar } from '../components/chart'
  import factory from '../factories/faction'
  import vuex from '../vuex/vuex'

  export default {
    components: { pie, radar, bar },
    data () {
      return {
        planets: {
          total: 7,
          data: {
            labels: [
              'Fortune',
              'Hermes',
              'Athena',
              'Hades',
              'Zeus',
              'Ares',
              'Gaia'
            ],
            datasets: [
              {
                data: [1, 2, 3, 4, 5, 6, 7],
                backgroundColor: [
                  '#4CAF50',
                  '#9C27B0',
                  '#3F51B5',
                  '#FFEB3B',
                  '#00BCD4',
                  '#D50000',
                  '#FF9800'
                ]
              }
            ]
          }
        },
        ships: {
          total: 19,
          data: {
            labels: [
              'Fighter',
              'Cruiser',
              'Bomber',
              'Orbiter',
              'Carrier',
              'Recycler'
            ],
            datasets: [
              {
                data: [1, 2, 3, 4, 5, 6],
                backgroundColor: [
                  '#4CAF50',
                  '#9C27B0',
                  '#3F51B5',
                  '#FFEB3B',
                  '#00BCD4',
                  '#D50000'
                ]
              }
            ]
          }
        },
        buildings: {
          total: 727,
          data: {
            labels: [
              'Furnace',
              'Factory',
              'Refinery',
              'Plant',
              'Warehouse',
              'Turret',
              'Railgun',
              'Cannon'
            ],
            datasets: [
              {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                backgroundColor: [
                  '#4CAF50',
                  '#9C27B0',
                  '#3F51B5',
                  '#FFEB3B',
                  '#00BCD4',
                  '#D50000',
                  '#FF9800',
                  '#E91E63',
                  '#EEEEEE'
                ]
              }
            ]
          }
        },
        resources: {
          data: {
            labels: ['Metal', 'Crystal', 'Oil', 'Energy'],
            datasets: [
              {
                label: 'Resources',
                backgroundColor: '#f87979',
                data: [123, 321, 213, 22]
              }
            ]
          }
        },
        referendum: {
          data: {
            labels: ['Metal', 'Crystal', 'Oil', 'Attack', 'Defense', 'Speed'],
            datasets: [
              {
                label: 'Increase',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                data: [65, 59, 90, 81, 56, 55]
              },
              {
                label: 'Decrease',
                backgroundColor: 'rgba(213, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                data: [28, 48, 40, 19, 96, 27]
              }
            ]
          }
        },
        faction: {}
      }
    },
    created () {
      this.faction = factory.build()
    },
    mounted () {
      vuex.state.name = 'Home'
      // vuex.state.search = false
    }
  }
</script>

<style lang="stylus" scoped>
  .doughnut
    display flex
    justify-content center
    align-items center
  .total
    position absolute
    font-weight bold
</style>