<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media.background
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

            md-button.md-raised.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

    md-layout(v-for="tower in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="tower.class", md-with-hover, v-on:click.native="select(tower)")
        md-card-header
          .md-title {{ tower.name }}
        md-card-media.background
          img(v-bind:src="tower.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="tower.attack")
          md-progress(v-bind:md-progress="tower.defense")
          md-progress(v-bind:md-progress="tower.speed")
        md-card-content.center
          span {{ tower.description | lorem }}
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/tower'

  export default {
    data () {
      return {
        towers: [],
        selected: {
          class: 'grey',
          name: 'SELECT TOWER',
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
        this.towers.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Infrastructure'
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
        return this.towers.filter((tower) => {
          return tower.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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