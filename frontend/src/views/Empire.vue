<template lang="pug">
  md-layout
    
    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="33", md-flex-xsmall="33")
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'subtitle.planets' | i18n }}
        md-card-content.center.doughnut
          pie(v-bind:data="planets.data")
          span.total {{ planets.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="33", md-flex-xsmall="33")
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'subtitle.buildings' | i18n }}
        md-card-content.center.doughnut
          pie(v-bind:data="buildings.data")
          span.total {{ buildings.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="33", md-flex-xsmall="33")
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'subtitle.ships' | i18n }}
        md-card-content.center.doughnut
          pie(v-bind:data="ships.data")
          span.total {{ ships.total }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'subtitle.resources' | i18n }}
        md-card-content.no-padding.center
          md-progress.green(v-bind:md-progress="resources.metal")
          md-progress.green(v-bind:md-progress="resources.crystal")
          md-progress.green(v-bind:md-progress="resources.oil")
          md-progress.green(v-bind:md-progress="resources.size")
          md-progress.green(v-bind:md-progress="resources.energy")
          md-progress.green(v-bind:md-progress="resources.influence")

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="referendum.class")
        md-card-header
          .md-title {{ referendum.name }}
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="abs(referendum.metal)", v-bind:class="referendum.metal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.crystal)", v-bind:class="referendum.crystal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.oil)", v-bind:class="referendum.oil >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.size)", v-bind:class="referendum.size >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.energy)", v-bind:class="referendum.energy >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.influence)", v-bind:class="referendum.influence >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.attack)", v-bind:class="referendum.attack >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.defense)", v-bind:class="referendum.defense >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="abs(referendum.speed)", v-bind:class="referendum.speed >= 50 ? 'green' : 'red'")

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="faction.class", v-if="faction")
        md-card-header
          .md-title {{ faction.name | i18n }}
        md-card-content.no-padding
          md-progress(v-bind:md-progress="faction.metal")
          md-progress(v-bind:md-progress="faction.crystal")
          md-progress(v-bind:md-progress="faction.oil")
          md-progress(v-bind:md-progress="faction.size")
          md-progress(v-bind:md-progress="faction.energy")
          md-progress(v-bind:md-progress="faction.experience")
          md-progress(v-bind:md-progress="faction.attack")
          md-progress(v-bind:md-progress="faction.defense")
          md-progress(v-bind:md-progress="faction.speed")
          md-progress(v-bind:md-progress="faction.aim")
          md-progress(v-bind:md-progress="faction.evasion")
          md-progress(v-bind:md-progress="faction.cargo")
      md-card.md-primary.card(v-else)
        md-card-header
          .md-title Faction
        md-card-content.center
          p No faction yet
        md-card-actions
          router-link(exact, to="/temple")
            md-button.md-dense.md-accent {{ 'button.join' | i18n }}
</template>

<script>
  import { pie } from '../components/chart'
  import store from '../vuex/store'

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
                borderWidth: 0,
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
                borderWidth: 0,
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
                borderWidth: 0,
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
        }
      }
    },
    mounted () {
      store.commit('title', 'title.empire')
    },
    methods: {
      abs (percent) {
        return Math.abs(percent)
      }
    },
    computed: {
      faction () {
        return store.state.player.Faction || { name: '', class: '' }
      },
      referendum () {
        return store.state.player.Referendum || { name: '', class: '' }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .doughnut
    padding 4px
    display flex
    justify-content center
    align-items center
  .total
    position absolute
    font-weight bold
</style>
