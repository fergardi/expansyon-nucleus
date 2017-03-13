<template lang="pug">
  md-layout
    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-small="100", md-flex-xsmall="100")

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
  import vuex from '../vuex/vuex.js'

  export default {
    data () {
      return {
        sections: [
          {
            title: 'Title',
            content: 'content1',
            image: ''
          },
          {
            title: 'Title',
            content: 'content2',
            image: ''
          }
        ]
      }
    },
    mounted () {
      vuex.state.name = 'Help'
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
