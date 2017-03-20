<template lang="pug">
  md-layout

    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          md-chip.pink {{ selected.aether | format }} Aether
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Close

    md-layout(v-for="achievement in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="achievement.class", md-with-hover, v-on:click.native="select(achievement)")
        md-card-header
          .md-title {{ achievement.name }}
        md-card-media
          img(v-bind:src="achievement.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="achievement.progress")
        md-card-content
          span {{ achievement.description }}
        md-card-content
          md-chip.pink {{ achievement.aether | format }} Aether
</template>

<script>
  // import api from '../services/api'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        achievements: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      /*
      api.getAchievements()
      .then((achievements) => {
        this.achievements = achievements
      })
      */
      this.achievements = [{
        name: 'Example',
        description: 'Description',
        image: 'https://image.flaticon.com/icons/svg/148/148768.svg',
        class: 'red',
        progress: 33,
        aether: 20
      }]
    },
    mounted () {
      store.commit('title', 'Achievement')
    },
    methods: {
      open () {
        this.$refs['info'].open()
      },
      close () {
        this.$refs['info'].close()
      },
      select (achievement) {
        this.selected = achievement
        this.open()
      },
      info () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.achievements.filter((achievement) => {
          return achievement.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      can () {
        return true // TODO
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>