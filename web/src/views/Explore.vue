<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.size")
          md-progress(v-bind:md-progress="selected.metal")
          md-progress(v-bind:md-progress="selected.crystal")
          md-progress(v-bind:md-progress="selected.oil")
          md-progress(v-bind:md-progress="selected.energy")
          md-progress(v-bind:md-progress="selected.influence")
        md-card-content.center
          md-chip(v-if="selected.moon") Moon
          md-chip(v-if="selected.station") Station
        md-card-content.center
          span {{ selected.description | lorem }}

    md-layout(md-flex-xlarge="75", md-flex-large="66", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Attack
        md-card-content
          form.center(novalidate, v-on:submit.stop.prevent="build()")
            md-input-container
              label Fighter
              md-input(type="number", v-model="fighter", required)
              md-icon send
            md-input-container
              label Cruiser
              md-input(type="number", v-model="cruiser", required)
              md-icon toys
            md-input-container
              label Bomber
              md-input(type="number", v-model="bomber", required)
              md-icon bubble_chart
            md-input-container
              label Orbiter
              md-input(type="number", v-model="orbiter", required)
              md-icon camera
            md-input-container
              label Carrier
              md-input(type="number", v-model="carrier", required)
              md-icon storage
            md-input-container
              label Recycler
              md-input(type="number", v-model="recycler", required)
              md-icon cached

            md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

    md-layout(v-for="planet in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="planet.class", md-with-hover, v-on:click.native="select(planet)")
        md-card-header
          .md-title {{ planet.name }}
        md-card-media
          img(v-bind:src="planet.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="planet.size")
          md-progress(v-bind:md-progress="planet.metal")
          md-progress(v-bind:md-progress="planet.crystal")
          md-progress(v-bind:md-progress="planet.oil")
          md-progress(v-bind:md-progress="planet.energy")
          md-progress(v-bind:md-progress="planet.influence")
        md-card-content.center
          md-chip(v-if="planet.moon") Moon
          md-chip(v-if="planet.station") Station
        md-card-content.center
          span {{ planet.description | lorem }}
</template>

<script>
  import vuex from '../vuex/vuex'
  import factory from '../factories/planet'

  export default {
    data () {
      return {
        planets: [],
        selected: {
          class: 'grey',
          name: 'SELECT PLANET',
          image: 'https://image.flaticon.com/icons/svg/202/202483.svg',
          description: 'Choose an item to sell'
        },
        fighter: 0,
        cruiser: 0,
        bomber: 0,
        orbiter: 0,
        carrier: 0,
        recycler: 0
      }
    },
    created () {
      for (var i = 0; i < 20; i++) {
        this.planets.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Explore'
    },
    methods: {
      select (item) {
        this.selected = item
        if (document.getElementById('scroll')) document.getElementById('scroll').scrollIntoView(true)
      },
      build () {
        console.log('Selling ' + this.selected)
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.planets.filter((planet) => {
          return planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      valid () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>