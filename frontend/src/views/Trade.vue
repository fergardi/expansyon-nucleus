<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.size", v-if="selected.size")
          md-progress(v-bind:md-progress="selected.metal", v-if="selected.metal")
          md-progress(v-bind:md-progress="selected.crystal", v-if="selected.crystal")
          md-progress(v-bind:md-progress="selected.oil", v-if="selected.oil")
          md-progress(v-bind:md-progress="selected.energy", v-if="selected.energy")
          md-progress(v-bind:md-progress="selected.influence", v-if="selected.influence")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.attack", v-if="selected.attack")
          md-progress(v-bind:md-progress="selected.defense", v-if="selected.defense")
          md-progress(v-bind:md-progress="selected.speed", v-if="selected.speed")
        md-card-content.center
          md-chip(v-if="selected.moon") Moon
          md-chip(v-if="selected.station") Station
        md-card-content.center
          span(v-if="selected.description") {{ selected.description | lorem }}

    md-layout(md-flex-xlarge="75", md-flex-large="66", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Price
        md-card-content
          form.center(novalidate, v-on:submit.stop.prevent="sell")
            md-input-container
              label Metal
              md-input(type="number", v-model="metal", required)
              md-icon apps
            md-input-container
              label Crystal
              md-input(type="number", v-model="crystal", required)
              md-icon texture
            md-input-container
              label Oil
              md-input(type="number", v-model="oil", required)
              md-icon opacity
            md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

    md-layout(v-for="sale in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="sale.class", md-with-hover, v-on:click.native="select(sale)")
        md-card-header
          .md-title {{ sale.name }}
        md-card-media
          img(v-bind:src="sale.image")
        md-card-content.no-padding.center(v-if="sale.size")
          md-progress(v-bind:md-progress="sale.size", v-if="sale.size")
          md-progress(v-bind:md-progress="sale.metal", v-if="sale.metal")
          md-progress(v-bind:md-progress="sale.crystal", v-if="sale.crystal")
          md-progress(v-bind:md-progress="sale.oil", v-if="sale.oil")
          md-progress(v-bind:md-progress="sale.energy", v-if="sale.energy")
          md-progress(v-bind:md-progress="sale.influence", v-if="sale.influence")
        md-card-content.no-padding.center(v-if="sale.attack")
          md-progress(v-bind:md-progress="sale.attack", v-if="sale.attack")
          md-progress(v-bind:md-progress="sale.defense", v-if="sale.defense")
          md-progress(v-bind:md-progress="sale.speed", v-if="sale.speed")
        md-card-content.center
          md-chip(v-if="sale.moon") Moon
          md-chip(v-if="sale.station") Station
        md-card-content.center(v-if="sale.description")
          span(v-if="sale.description") {{ sale.description | lorem }}
          
</template>

<script>
  import vuex from '../vuex/vuex'
  import artifactFactory from '../factories/artifact'
  import planetFactory from '../factories/planet'
  import shipFactory from '../factories/ship'

  export default {
    data () {
      return {
        items: [],
        selected: {
          class: 'grey',
          name: 'SELL ITEM',
          image: 'https://image.flaticon.com/icons/svg/202/202483.svg',
          description: 'Choose an item to sell'
        },
        metal: 0,
        crystal: 0,
        oil: 0
      }
    },
    created () {
      for (var i = 0; i < 3; i++) {
        this.items.push(artifactFactory.build())
        this.items.push(planetFactory.build())
        this.items.push(shipFactory.build())
      }
    },
    mounted () {
      vuex.state.title = 'Trade'
    },
    methods: {
      select (item) {
        this.selected = item
        if (document.getElementById('scroll')) document.getElementById('scroll').scrollIntoView(true)
      },
      sell () {
        console.log('Selling ' + this.selected)
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.items.filter((item) => {
          return item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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