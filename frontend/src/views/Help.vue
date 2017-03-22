<template lang="pug">
  md-layout
    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        template(v-for="section in filtered")
          md-card-header
            .md-title {{ section.title }}
          md-card-content
            span {{ section.content | lorem }}
          md-card-media
            img(v-for="image in section.images", v-bind:src="image.url")

        template(v-if="!filtered.length")
          md-card-header
            .md-title No help to show.
</template>

<script>
  import store from '../vuex/store'

  export default {
    data () {
      return {
        sections: [
          {
            title: 'Empire',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Planetarium',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Market',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Store',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Explore',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Cantina',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Relicarium',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Temple',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Research',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Hangar',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Infrastructure',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Defense',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Senate',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Census',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Guild',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          },
          {
            title: 'Transmission',
            content: 'dsa',
            images: [
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' },
              { url: 'https://image.flaticon.com/icons/svg/124/124558.svg' }
            ]
          }
        ]
      }
    },
    mounted () {
      store.commit('title', 'Help')
    },
    computed: {
      search () {
        return store.state.search
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
</style>
