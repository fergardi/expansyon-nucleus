<template lang="pug">
  .app

    md-whiteframe
      md-toolbar.md-dense(v-if="!fullscreen")
        md-button.md-icon-button.toggler(v-on:click.native="toggle('left')")
          md-icon chevron_right
        h2.md-title {{ name }}
        md-input-container.flex
          md-input(type="search", placeholder="Search...", v-model="search")
        md-button.md-icon-button.toggler(v-on:click.native="toggle('right')")
          md-icon chevron_left

    md-sidenav.md-left.md-fixed(ref="left", v-if="!fullscreen")
      md-whiteframe
        md-toolbar.md-account-header#left
      md-list.md-dense.scrollable
        template(v-for="section in left")
          md-subheader {{ section.header }}
          md-list-item(v-for="item in section.items")
            router-link(exact, v-bind:to="item.url")
              md-avatar
                md-icon.md-primary {{ item.icon }}
              span {{ item.title }}
              md-chip(v-if="item.quantity") {{ item.quantity }}

    md-sidenav.md-right.md-fixed(ref="right", v-if="!fullscreen")
      md-whiteframe
        md-toolbar.md-account-header#right
      md-list.md-dense.scrollable
        template(v-for="section in right")
          md-subheader {{ section.header }}
          md-list-item(v-for="item in section.items")
            md-avatar
              md-icon.md-primary {{ item.icon }}
            span {{ item.title }}
            md-chip {{ item.quantity }}

    .main.padding
      router-view#scroll.content.animation.fadeIn
</template>

<script>
  import vuex from './vuex/vuex'
  export default {
    data () {
      return {
        search: '',
        left: [
          {
            header: 'Economy',
            items: [
              {
                url: '/planetarium',
                icon: 'language',
                title: 'Planetarium',
                quantity: 2
              },
              {
                url: '/market',
                icon: 'shopping_basket',
                title: 'Market',
                quantity: 8
              },
              {
                url: '/sell',
                icon: 'attach_money',
                title: 'Sell',
                quantity: 54
              },
              {
                url: '/store',
                icon: 'store',
                title: 'Store',
                quantity: 8
              }
            ]
          },
          {
            header: 'Technonoly',
            items: [
              {
                url: '/research',
                icon: 'school',
                title: 'Research',
                quantity: 2
              },
              {
                url: '/hangar',
                icon: 'flight',
                title: 'Hangar',
                quantity: 87362
              },
              {
                url: '/Infrastructure',
                icon: 'build',
                title: 'Infrastructure',
                quantity: 1792
              },
              {
                url: '/defense',
                icon: 'track_changes',
                title: 'Defense',
                quantity: 172
              }
            ]
          },
          {
            header: 'Strategy',
            items: [
              {
                url: '/explore',
                icon: 'search',
                title: 'Explore',
                quantity: 8
              },
              {
                url: '/cantina',
                icon: 'local_bar',
                title: 'Cantina',
                quantity: 3
              },
              {
                url: '/relicarium',
                icon: 'all_inclusive',
                title: 'Relicarium',
                quantity: 3
              },
              {
                url: '/temple',
                icon: 'account_balance',
                title: 'Temple',
                quantity: 6
              }
            ]
          },
          {
            header: 'Diplomacy',
            items: [
              {
                url: '/senate',
                icon: 'gavel',
                title: 'Senate',
                quantity: 3
              },
              {
                url: '/census',
                icon: 'group',
                title: 'Census',
                quantity: 172
              },
              {
                url: '/guild',
                icon: 'security',
                title: 'Guild',
                quantity: 2
              },
              {
                url: '/transmission',
                icon: 'wifi',
                title: 'Transmission',
                quantity: 2
              }
            ]
          },
          {
            header: 'Empire',
            items: [
              {
                url: '/account',
                icon: 'account_circle',
                title: 'Reputation',
                quantity: null
              },
              {
                url: '/help',
                icon: 'help',
                title: 'Council',
                quantity: null
              },
              {
                url: '/logout',
                icon: 'cancel',
                title: 'Disconnect',
                quantity: null
              }
            ]
          }
        ],
        right: [
          {
            header: 'Resources',
            items: [
              {
                icon: 'hourglass_full',
                title: 'Turns',
                quantity: 300
              },
              {
                icon: 'home',
                title: 'Size',
                quantity: 300
              },
              {
                icon: 'apps',
                title: 'Metal',
                quantity: 300
              },
              {
                icon: 'texture',
                title: 'Crystal',
                quantity: 300
              },
              {
                icon: 'opacity',
                title: 'Oil',
                quantity: 300
              },
              {
                icon: 'flash_on',
                title: 'Energy',
                quantity: 300
              },
              {
                icon: 'star',
                title: 'Influence',
                quantity: 300
              }
            ]
          },
          {
            header: 'Fleet',
            items: [
              {
                icon: 'send',
                title: 'Fighter',
                quantity: 1234
              },
              {
                icon: 'toys',
                title: 'Cruiser',
                quantity: 234
              },
              {
                icon: 'bubble_chart',
                title: 'Bomber',
                quantity: 23
              },
              {
                icon: 'camera',
                title: 'Orbiter',
                quantity: 456
              },
              {
                icon: 'storage',
                title: 'Carrier',
                quantity: 12
              },
              {
                icon: 'cached',
                title: 'Recycler',
                quantity: 2
              }
            ]
          }
        ]
      }
    },
    methods: {
      toggle (ref) {
        if (this.$refs[ref].toggle) this.$refs[ref].toggle()
      },
      close (ref) {
        if (this.$refs[ref].close) this.$refs[ref].close()
      }
    },
    watch: {
      search (string) {
        console.log(string)
        vuex.state.search = string
      }
    },
    computed: {
      fullscreen () {
        return vuex.state.fullscreen
      },
      name () {
        return vuex.state.name
      }
    }
  }
</script>

<style lang="stylus">
  /* COMMON */
  body
    //background: url("img/background.jpg") no-repeat center center fixed;
    background-size cover
    box-sizing border-box
    user-select none !important
  html
  body
  .app
    height 100%
    overflow hidden
  .app
    display flex
    flex-flow column
  .main
    overflow auto
    height 100%
  .content
    margin 0 !important
    height: 100%
    scroll-behavior smooth !important
  .md-chip
    margin-right 5px
    margin-bottom 5px
  .md-toolbar
    // background-color #333356 !important
  .md-sidenav
    .md-sidenav-content
      height 100%
      overflow hidden
      display flex
      flex-direction column
      .md-list
        height 100%
        overflow auto
    .md-toolbar
      background-size: cover;
      box-sizing: border-box;
      &#left
        // background-image url('img/left.jpg')
      &#right
        // background-image url('img/right.jpg')
      .md-account-header
        a:not(.md-button)
          color inherit
        .md-avatar-list
          .md-list-item-container
            align-items center
          .md-avatar
            .md-icon
              border-radius 50%
    .md-list-item:not(.md-avatar-list)
      .router-link-active
        background-color rgba(153, 153, 153, 0.2)
  .flex
    display flex
    flex 1
  .no-padding
    padding 0 !important
  .padding
    padding 4px
  .center
    align-items center
    text-align center
    justify-content center
  .hidden
    visibility hidden
  .removed
    display none
  .md-table
    .md-table-cell
      .md-button
        .md-icon
          width: 24px;
          min-width: 24px;
          height: 24px;
          min-height: 24px;
          font-size: 24px;
          margin: auto;
  
  /* PLANETS */
  .md-layout
    // align-items flex-start
    // align-content flex-start
  .md-card.card
    width 100%
    margin 4px
    // background-color #333356 !important
    .background
      background-color lighten(#263238, 5) !important
    .md-card-header
      .md-title
        font-size 18px
        text-align center
        font-weight bold
    .md-card-content
      // background-color darken(#333356, 5) !important
      color white
      .md-progress
        height 10px
        margin 5px 0
    .md-card-media
      img
        height 140px
        padding 10px
    &.green
      .md-card-header
        color #4CAF50
      .md-progress-track
        background-color #4CAF50 !important
    &.purple
      .md-card-header
        color #9C27B0
      .md-progress-track
        background-color #9C27B0 !important
    &.indigo
      .md-card-header
        color #3F51B5
      .md-progress-track
        background-color #3F51B5 !important
    &.grey
      .md-card-header
        color #EEEEEE
      .md-progress-track
        background-color #EEEEEE !important
    &.yellow
      .md-card-header
        color #FFEB3B
      .md-progress-track
        background-color #FFEB3B !important
    &.cyan
      .md-card-header
        color #00BCD4
      .md-progress-track
        background-color #00BCD4 !important
    &.red
      .md-card-header
        color #D50000
      .md-progress-track
        background-color #D50000 !important
    &.orange
      .md-card-header
        color #FF9800
      .md-progress-track
        background-color #FF9800 !important

  /* ANIMATION TRANSITION */
  /*base code*/
  .animation
    -webkit-animation-duration 1s
    animation-duration 1s
    -webkit-animation-fill-mode both
    animation-fill-mode both
  .animation.infinite
    -webkit-animation-iteration-count infinite
    animation-iteration-count infinite
  .animation.slower
    -webkit-animation-duration 2s
    animation-duration 2s
  .animation.faster
    -webkit-animation-duration 0.5s
    animation-duration 0.5s
  /*the animation definition*/
  @keyframes fadeIn
    0%
      opacity 0
    100%
      opacity 1
  .fadeIn
    -webkit-animation-name fadeIn
    animation-name fadeIn
    
  /* SIDEBAR APPEARING */
  // from desktop on show sidebar
  @media only screen and (min-width 1280px)
    .app
      padding-left 304px
      padding-right 304px
      .toggler
        display none
      .md-sidenav-content
        top 0
        pointer-events auto
        transform translate3d(0, 0, 0) !important
</style>