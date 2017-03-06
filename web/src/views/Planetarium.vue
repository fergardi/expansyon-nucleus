<template lang="pug">
  div
    md-layout
      md-layout(v-for="planet in planets", md-flex-xlarge="25", md-flex-large="25", md-flex-small="33", md-flex-xsmall="33")
        md-card
          md-card-media
            img(v-bind:src="planet.image")
            md-ink-ripple
          md-card-header
            .md-title {{ planet.title }}
            .md-subtitle {{ planet.subtitle }}
          md-card-content
            p {{ planet.description }}
</template>

<script>
  import vuex from '../vuex/vuex.js'
  export default {
    data () {
      return {
        planets: [
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          },
          {
            image: 'https://lh3.googleusercontent.com/-gJ6LIKAM_xI/V1EfKDbkmUI/AAAAAAABs1s/V5nIvz9fD4AflSpDIxisKJH1rwHK-HZzA/w2880-h1800/MATERIAL-DESIGN-GREAT-PICS-%2B%25283%2529.jpg',
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description lorem ipsum'
          }
        ]
      }
    },
    mounted () {
      vuex.state.name = 'Planetarium'
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    margin 4px
</style>