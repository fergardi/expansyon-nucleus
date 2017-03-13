<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.attack")
          md-progress(v-bind:md-progress="selected.defense")
          md-progress(v-bind:md-progress="selected.speed")
        md-card-content.center
          span {{ selected.description | lorem }}

    md-layout(md-flex-xlarge="75", md-flex-large="66", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Build
        md-card-content
          form.center(novalidate, v-on:submit.stop.prevent="build()")
            md-input-container
              label Quantity
              md-input(type="number", v-model="quantity", required)
              md-icon equalizer
            md-input-container
              label Metal
              md-input(type="number", v-model="metal", readonly, disabled)
              md-icon apps
            md-input-container
              label Crystal
              md-input(type="number", v-model="crystal", readonly, disabled)
              md-icon texture
            md-input-container
              label Oil
              md-input(type="number", v-model="oil", readonly, disabled)
              md-icon opacity

            md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

    md-layout(v-for="ship in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="ship.class", md-with-hover, v-on:click.native="select(ship)")
        md-card-header
          .md-title {{ ship.name }}
        md-card-media
          img(v-bind:src="ship.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="ship.attack")
          md-progress(v-bind:md-progress="ship.defense")
          md-progress(v-bind:md-progress="ship.speed")
        md-card-content.center
          span {{ ship.description | lorem }}
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/ship'

  export default {
    data () {
      return {
        ships: [],
        selected: {
          class: 'grey',
          name: 'SELECT SHIP',
          image: 'https://image.flaticon.com/icons/svg/202/202483.svg',
          description: 'Choose an item to sell'
        },
        metal: 0,
        crystal: 0,
        oil: 0
      }
    },
    created () {
      for (var i = 0; i < 6; i++) {
        this.ships.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Hangar'
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
        return this.ships.filter((ship) => {
          return ship.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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