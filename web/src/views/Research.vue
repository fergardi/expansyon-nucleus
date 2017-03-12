<template lang="pug">
  md-layout
    
    md-layout(v-for="branch in tree", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="branch.class")
        md-card-header
          .md-title {{ branch.name }}
        md-card-content.center.background
          md-layout.center
            md-layout.center(v-for="(skill, index) in branch.skills", v-bind:md-flex-xlarge="layout(index)", v-bind:md-flex-large="layout(index)", v-bind:md-flex-small="layout(index)", v-bind:md-flex-xsmall="layout(index)")
              md-button.md-fab.md-raised.md-primary.skill(v-on:click.native="up(skill)")
                img(v-bind:src="skill.image")
                md-icon {{ skill.level }}
        md-card-content.center
          span {{ branch.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-fab.md-mini.md-warn(v-on:click.native="reset(branch)")
            md-icon refresh
          md-button.md-raised.md-fab.md-mini.md-accent(v-on:click.native="save(branch)")
            md-icon done
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/tree'

  export default {
    data () {
      return {
        tree: []
      }
    },
    mounted () {
      vuex.state.name = 'Research'
    },
    created () {
      for (let i = 0; i < 3; i++) {
        this.tree.push(factory.build())
      }
    },
    methods: {
      layout (index) {
        return index > 0 ? 33 : 100
      },
      up (skill) {
        if (skill.level < 10) skill.level++
      },
      reset (branch) {
      },
      save (branch) {
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.trees.filter((branch) => {
          return branch.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-button.skill
    padding 5px
    display flex
    .md-icon
      font-family Roboto,Noto Sans,Noto,sans-serif
      background-color rgba(0,0,0,0.8)
      border-radius 50%
      font-size 18px
      min-width: 18px
      width: 18px
      height: 18px
      min-height: 18px
</style>