<template lang="pug">
  div
    md-layout
      md-layout(v-for="card in cards", md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
        md-card
          md-card-media
            img(v-bind:src="card.image")
          md-card-header
            .md-title {{ card.title }}
            .md-subtitle {{ card.subtitle }}
          md-card-content
            p {{ card.description }}
</template>

<script>
  import vuex from '../vuex/vuex.js'
  export default {
    data () {
      return {
        cards: [
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
      vuex.state.name = 'Home'
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    margin 4px
</style>