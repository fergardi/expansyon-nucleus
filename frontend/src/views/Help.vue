<template lang="pug">
  md-layout
    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        template(v-for="section in filtered")
          md-card-header
            .md-title {{ section.title }}
          md-card-content
            p {{ section.content | lorem }}
          md-card-media
            md-image(v-bind:md-src="section.image")
</template>

<script>
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        sections: [
          {
            title: 'Empire',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Planetarium',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Market',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Store',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Explore',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Cantina',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Relicarium',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Temple',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Research',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Hangar',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Infrastructure',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Defense',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Senate',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Census',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Guild',
            content: 'dsa',
            image: ''
          },
          {
            title: 'Transmission',
            content: 'dsa',
            image: ''
          }
        ]
      }
    },
    mounted () {
      vuex.state.title = 'Help'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.sections.filter((section) => {
          return section.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || section.content.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    .md-card-header
      .md-title
        text-align left !important
</style>
