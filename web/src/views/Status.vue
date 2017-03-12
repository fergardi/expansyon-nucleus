<template lang="pug">
  md-layout
    
    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Planets
        md-card-content.center.doughnut
          pie(v-bind:data="planets.data")
          span.total {{ planets.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Buildings
        md-card-content.center.doughnut
          pie(v-bind:data="buildings.data")
          span.total {{ buildings.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Ships
        md-card-content.center.doughnut
          pie(v-bind:data="ships.data")
          span.total {{ ships.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card.grey
        md-card-header
          .md-title Resources
        md-card-content.center
          md-progress.green(v-bind:md-progress="resources.metal")
          md-progress.green(v-bind:md-progress="resources.crystal")
          md-progress.green(v-bind:md-progress="resources.oil")
          md-progress.green(v-bind:md-progress="resources.size")
          md-progress.green(v-bind:md-progress="resources.energy")
          md-progress.green(v-bind:md-progress="resources.influence")

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card.grey
        md-card-header
          .md-title {{ referendum.name }}
        md-card-content.center
          md-progress(v-bind:md-progress="referendum.metal", v-bind:class="referendum.metal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.crystal", v-bind:class="referendum.crystal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.oil", v-bind:class="referendum.oil >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.size", v-bind:class="referendum.size >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.energy", v-bind:class="referendum.energy >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.influence", v-bind:class="referendum.influence >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.attack", v-bind:class="referendum.attack >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.defense", v-bind:class="referendum.defense >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.speed", v-bind:class="referendum.speed >= 50 ? 'green' : 'red'")

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card.grey
        md-card-header
          .md-title {{ faction.name }}
        md-card-content.center
          md-progress.green(v-bind:md-progress="faction.metal", v-if="faction.metal > 0")
          md-progress.green(v-bind:md-progress="faction.crystal", v-if="faction.crystal > 0")
        //
          md-progress.green(v-bind:md-progress="faction.oil", v-if="faction.oil > 0")
          md-progress.green(v-bind:md-progress="faction.size", v-if="faction.size > 0")
          md-progress.green(v-bind:md-progress="faction.energy", v-if="faction.energy > 0")
          md-progress.green(v-bind:md-progress="faction.influence", v-if="faction.influence > 0")
          md-progress.green(v-bind:md-progress="faction.attack", v-if="faction.attack > 0")
          md-progress.green(v-bind:md-progress="faction.defense", v-if="faction.defense > 0")
          md-progress.green(v-bind:md-progress="faction.speed", v-if="faction.speed > 0")
</template>

<script>
  import { pie } from '../components/chart'
  import factionFactory from '../factories/faction'
  import referendumFactory from '../factories/referendum'
  import vuex from '../vuex/vuex'

  export default {
    components: { pie },
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
              'Barrier',
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
          turns: 100,
          metal: 23,
          crystal: 23,
          oil: 23,
          size: 23,
          energy: 23,
          influence: 23
        },
        referendum: {},
        faction: {}
      }
    },
    created () {
      this.referendum = referendumFactory.build()
      this.faction = factionFactory.build()
    },
    mounted () {
      vuex.state.name = 'Status'
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