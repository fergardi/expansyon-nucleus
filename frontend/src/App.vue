<template lang="pug">
  .app

    md-whiteframe
      md-toolbar#toolbar.md-dense(v-if="!fullscreen")
        md-button.md-icon-button.toggler(v-on:click.native="open('left')")
          md-icon chevron_right
        h2.md-title {{ name }}
        md-input-container.flex(v-bind:class="{ 'md-input-invalid': search !== '' }")
          md-input(type="search", placeholder="Search...", v-model="search")
          span.md-error Results are being filtered
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
        md-subheader Economy
        md-list-item
          router-link(exact, to="/empire", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary equalizer
            span Empire
            md-chip 0
        md-list-item
          router-link(exact, to="/planetarium", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary language
            span Planetarium
            md-chip 0
        md-list-item
          router-link(exact, to="/market", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary shopping_basket
            span Market
            md-chip 0
        md-list-item
          router-link(exact, to="/store", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary store
            span Store
            md-chip 0
        md-subheader Strategy
        md-list-item
          router-link(exact, to="/explore", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary search
            span Explore
            md-chip 0
        md-list-item
          router-link(exact, to="/cantina", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary local_bar
            span Cantina
            md-chip 0
        md-list-item
          router-link(exact, to="/relicarium", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary all_inclusive
            span Relicarium
            md-chip 0
        md-list-item
          router-link(exact, to="/temple", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary account_balance
            span Temple
            md-chip 0
        md-subheader Technology
        md-list-item
          router-link(exact, to="/research", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary school
            span Research
            md-chip 0
        md-list-item
          router-link(exact, to="/hangar", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary build
            span Hangar
            md-chip 0
        md-list-item
          router-link(exact, to="/Infrastructure", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary settings
            span Infrastructure
            md-chip 0
        md-list-item
          router-link(exact, to="/defense", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary track_changes
            span Defense
            md-chip 0
        md-subheader Diplomacy
        md-list-item
          router-link(exact, to="/senate", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary gavel
            span Senate
            md-chip 0
        md-list-item
          router-link(exact, to="/census", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary group
            span Census
            md-chip 0
        md-list-item
          router-link(exact, to="/guild", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary security
            span Guild
            md-chip 0
        md-list-item
          router-link(exact, to="/transmission", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary wifi
            span Transmission
            md-chip 0
        md-subheader Other
        md-list-item
          router-link(exact, to="/achievement", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary star
            span Achievement
            md-chip 0
        md-list-item
          router-link(exact, to="/profile", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary person
            span Profile
            md-chip 0
        md-list-item
          router-link(exact, to="/help", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary chrome_reader_mode
            span Help
            md-chip 0
        md-list-item(v-on:click.native="logout()")
          md-avatar
            md-icon.md-primary lock
          span Disconnect

    md-sidenav.md-right.md-fixed(ref="right", v-if="!fullscreen")
      md-whiteframe
        md-toolbar#right.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/124/124555.svg")
          h2.md-title Home
      md-list.md-dense.scrollable
        md-subheader Resources
        md-list-item
          md-avatar
            md-icon.md-primary hourglass_full
          span Turns
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary apps
          span Metal
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary texture
          span Crystal
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary opacity
          span Oil
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary home
          span Size
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary flash_on
          span Energy
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary star
          span Influence
          md-chip 0
        md-subheader Fleet
        md-list-item
          md-avatar
            md-icon.md-primary send
          span Fighter
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary toys
          span Cruiser
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary bubble_chart
          span Bomber
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary camera
          span Orbiter
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary storage
          span Carrier
          md-chip 0
        md-list-item
          md-avatar
            md-icon.md-primary cached
          span Recycler
          md-chip 0

    .main.padding#main
      router-view.content.animation.fadeIn.scrollable
</template>

<script>
  import auth from './services/auth'
  import store from './vuex/store'

  export default {
    data () {
      return {
        search: store.state.search
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
      collapse () {
        this.$refs['left'].close()
        this.$refs['right'].close()
      },
      clear () {
        this.search = ''
      },
      logout () {
        auth.logout()
        this.clear()
        this.collapse()
        this.$router.push('/login')
      }
    },
    watch: {
      search (string) {
        store.commit('search', string)
      }
    },
    computed: {
      fullscreen () {
        return store.state.fullscreen
      },
      name () {
        return store.state.title
      },
      player () {
        return store.state.player
      }
    }
  }
</script>

<style lang="stylus">
  /* COMMON */
  body
    background url("img/background.jpg") no-repeat center center fixed
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
  .md-chip
    margin 2px
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
    padding 4px !important
  .center
    align-items center !important
    text-align center !important
    justify-content center !important
  .hidden
    visibility hidden !important
  .removed
    display none !important
  .right
    align-items center !important
    float right !important
    text-align right !important
    justify-content right !important
  .left
    align-items center !important
    float left !important
    text-align left !important
    justify-content left !important
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

  .md-tabs
    .md-tabs-content
      overflow hidden
      .md-tabs-wrapper
        overflow hidden
  .scrollable
    overflow-y auto
    height 100%

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
  .md-menu-content > .md-list
    background-color rgba(255,255,255,0.90) !important
  .md-progress
  .md-card-media
  .background
    background-color rgba(255,255,255,0.10) !important
  .md-dialog
  .md-list
    background-color inherit !important

  /* CARDS */
  .md-layout
    // align-items flex-start
    // align-content flex-start
  .md-card.card
    width 100%
    margin 4px
    .md-card-header
      .md-title
        margin 0 !important
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
    .md-card-actions
      padding 16px
        
  /* COLORS */
  green = #4CAF50
  purple = #9C27B0
  indigo = #3F51B5
  yellow = #FFEB3B
  cyan = #00BCD4
  red = #D50000
  orange = #FF9800
  pink = #E91E63
  grey = #E0E0E0
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
    .hide
      display none !important
    table
      th
      td
      .md-chip
        font-size 0.8em !important
</style>