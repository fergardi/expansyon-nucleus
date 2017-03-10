<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media.background
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
            md-button.md-raised.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

    md-layout(v-for="item in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="item.class", md-with-hover, v-on:click.native="select(item)")
        md-card-header
          .md-title {{ item.name }}
        md-card-media.background
          img(v-bind:src="item.image")
        md-card-content.no-padding.center(v-if="item.size")
          md-progress(v-bind:md-progress="item.size", v-if="item.size")
          md-progress(v-bind:md-progress="item.metal", v-if="item.metal")
          md-progress(v-bind:md-progress="item.crystal", v-if="item.crystal")
          md-progress(v-bind:md-progress="item.oil", v-if="item.oil")
          md-progress(v-bind:md-progress="item.energy", v-if="item.energy")
          md-progress(v-bind:md-progress="item.influence", v-if="item.influence")
        md-card-content.no-padding.center(v-if="item.attack")
          md-progress(v-bind:md-progress="item.attack", v-if="item.attack")
          md-progress(v-bind:md-progress="item.defense", v-if="item.defense")
          md-progress(v-bind:md-progress="item.speed", v-if="item.speed")
        md-card-content.center(v-if="item.description")
          span(v-if="item.description") {{ item.description | lorem }}
          
</template>

<script>
  import vuex from '../vuex/vuex.js'
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
      vuex.state.name = 'Trade'
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