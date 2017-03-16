<template lang="pug">
  .app

    md-whiteframe
      md-toolbar#toolbar.md-dense(v-if="!fullscreen")
        md-button.md-icon-button.toggler(v-on:click.native="open('left')")
          md-icon chevron_right
        h2.md-title {{ name }}
        md-input-container.flex
          md-input(type="search", placeholder="Search...", v-model="search")
          md-icon search    
        md-button.md-icon-button.toggler(v-on:click.native="open('right')")
          md-icon chevron_left

    md-sidenav.md-left.md-fixed(ref="left", v-if="!fullscreen")
      md-whiteframe
        md-toolbar#left.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/190/190279.svg")
          h2.md-title Universe
      md-list.md-dense.scrollcable
        template(v-for="section in left")
          md-subheader {{ section.header }}
          md-list-item(v-for="item in section.items")
            router-link(exact, v-bind:to="item.url", v-on:click.native="clear()")
              md-avatar
                md-icon.md-primary {{ item.icon }}
              span {{ item.title }}
              md-chip(v-if="item.quantity") {{ item.quantity }}
        md-list-item(v-on:click.native="logout()")
            md-avatar
              md-icon.md-primary lock
            span Disconnect

    md-sidenav.md-right.md-fixed(ref="right", v-if="!fullscreen")
      md-whiteframe
        md-toolbar#right.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/124/124555.svg")
          h2.md-title Resources
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
  import auth from './services/auth'
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
                url: '/trade',
                icon: 'attach_money',
                title: 'Trade',
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
                url: '/status',
                icon: 'equalizer',
                title: 'Status',
                quantity: null
              },
              {
                url: '/profile',
                icon: 'person',
                title: 'Profile',
                quantity: null
              },
              {
                url: '/help',
                icon: 'chrome_reader_mode',
                title: 'Help',
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
      open (ref) {
        if (ref && this.$refs[ref]) this.$refs[ref].open()
      },
      toggle (ref) {
        if (ref && this.$refs[ref]) this.$refs[ref].toggle()
      },
      close (ref) {
        if (ref && this.$refs[ref]) this.$refs[ref].close()
      },
      clear () {
        this.$refs['left'].close()
        this.$refs['right'].close()
      },
      logout () {
        auth.logout()
        this.clear()
        this.$router.push('/login')
      }
    },
    watch: {
      search (string) {
        vuex.state.search = string
      }
    },
    computed: {
      fullscreen () {
        return vuex.state.fullscreen
      },
      name () {
        return vuex.state.title
      }
    }
  }
</script>

<style lang="stylus">
  /* COMMON */
  body
    // background url("img/background.jpg") no-repeat center center fixed
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
    height 100%
    scroll-behavior smooth !important
  .md-chip + .md-chip
    margin-left 5px
    margin-bottom 5px
  .md-toolbar
    .md-button
      margin 0 !important
  .md-sidenav
    .md-toolbar
      .md-avatar
        width 100%
        margin-bottom 10px
      .md-title
        display inline-block
    .md-sidenav-content
      height 100%
      overflow hidden
      display flex
      flex-direction column
      .md-list
        height 100%
        overflow auto
            
    .md-list-item:not(.md-avatar-list)
      .router-link-active
        background-color rgba(153, 153, 153, 0.2)
  .flex
    display flex
    flex 1
  .no-padding
    padding 0 !important
    margin 0 !important
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
  .right
    align-items center
    float right
    text-align right
    justify-content right
  .left
    align-items center
    float left
    text-align left
    justify-content left
  .md-table
    .md-table-cell
      .md-button
        .md-icon
          width 24px
          min-width 24px
          height 24px
          min-height 24px
          font-size 24px
          margin auto
    .md-numeric
      .md-table-cell-container
          justify-content flex-end !important

  /* chrome autofill */
  .md-input-container .md-icon:after
    background inherit !important
  
  /* OPACITY */
  #toolbar
  .md-sidenav-content
  .md-card
  .md-table-card
    opacity 0.90
  .md-table-card.md-card
    background-color rgba(255,255,255,0.90) !important
  .md-progress
  .md-card-media
    background-color rgba(255,255,255,0.10) !important

  /* CARDS */
  .md-layout
    // align-items flex-start
    // align-content flex-start
  .md-card.card
    width 100%
    margin 4px
    .md-card-header
      .md-title
        font-size 18px
        text-align center
        font-weight bold
    .md-card-content
      color white
      .md-progress
        height 10px
        margin 5px 0
    .md-card-media
      img
        height 140px
        padding 10px
        
  /* COLORS */
  green = #4CAF50
  purple = #9C27B0
  indigo = #3F51B5
  yellow = #FFEB3B
  cyan = #00BCD4
  red = #D50000
  orange = #FF9800
  pink = #E91E63
  grey = #EEEEEE
  .green
    .md-card-header
      color green !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color green !important
      color white !important
  .purple
    .md-card-header
      color purple !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color purple !important
      color white !important
  .indigo
    .md-card-header
      color indigo !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color indigo !important
      color white !important
  .yellow
    .md-card-header
      color yellow !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color yellow !important
      color black !important
  .cyan
    .md-card-header
      color cyan !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color cyan !important
      color white !important
  .red
    .md-card-header
      color red !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color red !important
      color white !important
  .orange
    .md-card-header
      color orange !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color orange !important
      color black !important
  .pink
    .md-card-header
      color pink !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color pink !important
      color white !important
  .grey
    .md-card-header
      color grey !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color grey !important
      color black !important

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
    
  /* MEDIA QUERIES */
  // sidebars appearing on desktop
  @media only screen and (min-width 1080px)
    .app
      padding-left 304px
      padding-right 304px
      .toggler
        display none
      .md-sidenav-content
        top 0
        pointer-events auto
        transform translate3d(0, 0, 0) !important
        
  @media only screen and (max-width 768px)
    #toolbar
      .md-title
        font-size 16px
    .md-dialog
      .md-dialog-title
        padding 16px 16px 0
      .md-dialog-content
        padding 0 16px 16px
    .hide
      display none !important
    table
      th
      td
      .md-chip
        font-size 0.8em !important
</style>