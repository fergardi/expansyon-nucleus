<template lang="pug">
  .app

    md-snackbar(ref="alert", md-duration="5000", md-position="bottom center")
      span {{ notification.text | i18n }}
      md-button.md-dense(v-bind:class="notification.class", v-on:click.native="dismiss()") {{ 'button.close' | i18n }}

    md-whiteframe
      md-toolbar#toolbar.md-dense.flex(v-if="!fullscreen")
        md-button.md-icon-button.toggler(v-on:click.native="left()")
          md-icon chevron_right
        h2.md-title.flex.center {{ title | i18n }}
        md-input-container.search.flex(v-bind:class="{ 'md-input-invalid': search !== '' }")
          md-icon search
          label {{ 'filter.search' | i18n }}
          md-input(type="text", v-model="search")
          span.md-error {{ 'filter.filtered' | i18n }}
          md-button.md-icon-button.md-dense(v-on:click.native="clear()")
            md-icon clear
        md-button.md-icon-button.toggler(v-on:click.native="right()")
          md-icon chevron_left

    md-sidenav.md-left.md-fixed(ref="left", v-if="!fullscreen")
      md-whiteframe
        md-toolbar#left.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/124/124582.svg")
          h2.md-title {{ 'title.left' | i18n }}
      md-list.md-dense.scrollcable

        md-subheader {{ 'subtitle.economy' | i18n }}
        md-list-item
          router-link(exact, to="/empire", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary equalizer
            span {{ 'title.empire' | i18n }}
        md-list-item
          router-link(exact, to="/planetarium", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary language
            span {{ 'title.planetarium' | i18n }}
            md-chip {{ player.planetarium | format }}
        md-list-item
          router-link(exact, to="/market", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary shopping_basket
            span {{ 'title.market' | i18n }}
            md-chip {{ player.market | format }}
        md-list-item
          router-link(exact, to="/store", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary store
            span {{ 'title.store' | i18n }}
            md-chip {{ player.store | format }}

        md-subheader {{ 'subtitle.strategy' | i18n }}
        md-list-item
          router-link(exact, to="/exploration", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary search
            span {{ 'title.exploration' | i18n }}
            md-chip {{ player.Exploration.length | format }}
        md-list-item
          router-link(exact, to="/cantina", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary local_bar
            span {{ 'title.cantina' | i18n }}
            md-chip {{ player.cantina | format }}
        md-list-item
          router-link(exact, to="/relicarium", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary all_inclusive
            span {{ 'title.relicarium' | i18n }}
            md-chip {{ player.relicarium | format }}
        md-list-item
          router-link(exact, to="/temple", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary account_balance
            span {{ 'title.temple' | i18n }}
            md-chip {{ player.temple | format }}

        md-subheader {{ 'subtitle.technology' | i18n }}
        md-list-item
          router-link(exact, to="/research", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary dialpad
            span {{ 'title.research' | i18n }}
            md-chip {{ player.level | format }}
        md-list-item
          router-link(exact, to="/hangar", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary build
            span {{ 'title.hangar' | i18n }}
            md-chip {{ player.hangar | format }}
        md-list-item
          router-link(exact, to="/infrastructure", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary settings
            span {{ 'title.infrastructure' | i18n }}
            md-chip {{ player.infrastructure | format }}
        md-list-item
          router-link(exact, to="/defense", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary track_changes
            span {{ 'title.defense' | i18n }}
            md-chip {{ player.defense | format }}

        md-subheader {{ 'subtitle.diplomacy' | i18n }}
        md-list-item
          router-link(exact, to="/senate", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary gavel
            span {{ 'title.senate' | i18n }}
            md-chip {{ player.senate | format }}
        md-list-item
          router-link(exact, to="/census", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary group
            span {{ 'title.census' | i18n }}
            md-chip {{ player.census | format }}
        md-list-item
          router-link(exact, to="/guild", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary security
            span {{ 'title.guild' | i18n }}
            md-chip {{ player.guilds | format }}
        md-list-item
          router-link(exact, to="/transmission", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary wifi
            span {{ 'title.transmission' | i18n }}
            md-chip {{ player.transmission | format }}

    md-sidenav.md-right.md-fixed(ref="right", v-if="!fullscreen")
      md-whiteframe
        md-toolbar#right.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/124/124555.svg")
          h2.md-title {{ 'title.right' | i18n }}
      md-list.md-dense.scrollable

        md-subheader {{ 'subtitle.resources' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary apps
          span {{ 'resource.metal' | i18n }}
          md-chip.indigo {{ player.metal | format }}
        md-list-item
          md-avatar
            md-icon.md-primary texture
          span {{ 'resource.crystal' | i18n }}
          md-chip.purple {{ player.crystal | format }}
        md-list-item
          md-avatar
            md-icon.md-primary opacity
          span {{ 'resource.oil' | i18n }}
          md-chip.red {{ player.oil | format }}
        md-list-item
          md-avatar
            md-icon.md-primary home
          span {{ 'resource.size' | i18n }}
          md-chip.green {{ player.size | format }}
        md-list-item
          md-avatar
            md-icon.md-primary flash_on
          span {{ 'resource.energy' | i18n }}
          md-chip.cyan {{ player.energy | format }}
        md-list-item
          md-avatar
            md-icon.md-primary star
          span {{ 'resource.influence' | i18n }}
          md-chip.yellow {{ player.influence | format }}
        md-list-item
          md-avatar
            md-icon.md-primary hourglass_full
          span {{ 'resource.turns' | i18n }}
          md-chip.orange {{ player.turns | format }}
        md-list-item
          md-avatar
            md-icon.md-primary whatshot
          span {{ 'resource.aether' | i18n }}
          md-chip.pink {{ player.aether | format }}

        md-subheader {{ 'subtitle.progress' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary school
          span {{ 'resource.experience' | i18n }}
          md-chip {{ player.experience | format }}
        md-list-item
          md-avatar
            md-icon.md-primary share
          span {{ 'resource.level' | i18n }}
          md-chip {{ player.level | format }}

        md-subheader {{ 'subtitle.hangar' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary send
          span {{ 'ship.fighter.name' | i18n }}
          md-chip {{ player.fighter | format }}
        md-list-item
          md-avatar
            md-icon.md-primary toys
          span {{ 'ship.cruiser.name' | i18n }}
          md-chip {{ player.cruiser | format }}
        md-list-item
          md-avatar
            md-icon.md-primary bubble_chart
          span {{ 'ship.bomber.name' | i18n }}
          md-chip {{ player.bomber | format }}
        md-list-item
          md-avatar
            md-icon.md-primary camera
          span {{ 'ship.orbiter.name' | i18n }}
          md-chip {{ player.orbiter | format }}
        md-list-item
          md-avatar
            md-icon.md-primary widgets
          span {{ 'ship.carrier.name' | i18n }}
          md-chip {{ player.carrier | format }}
        md-list-item
          md-avatar
            md-icon.md-primary cached
          span {{ 'ship.recycler.name' | i18n }}
          md-chip {{ player.recycler | format }}

        md-subheader {{ 'subtitle.infrastructure' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary apps
          span {{ 'building.furnace.name' | i18n }}
          md-chip {{ player.furnace | format }}
        md-list-item
          md-avatar
            md-icon.md-primary texture
          span {{ 'building.factory.name' | i18n }}
          md-chip {{ player.factory | format }}
        md-list-item
          md-avatar
            md-icon.md-primary opacity
          span {{ 'building.refinery.name' | i18n }}
          md-chip {{ player.refinery | format }}
        md-list-item
          md-avatar
            md-icon.md-primary flash_on
          span {{ 'building.plant.name' | i18n }}
          md-chip {{ player.plant | format }}
        md-list-item
          md-avatar
            md-icon.md-primary verified_user
          span {{ 'building.barrier.name' | i18n }}
          md-chip {{ player.barrier | format }}
        md-list-item
          md-avatar
            md-icon.md-primary dashboard
          span {{ 'building.warehouse.name' | i18n }}
          md-chip {{ player.warehouse | format }}

        md-subheader {{ 'subtitle.defense' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary gps_off
          span {{ 'tower.turret.name' | i18n }}
          md-chip {{ player.turret | format }}
        md-list-item
          md-avatar
            md-icon.md-primary gps_not_fixed
          span {{ 'tower.railgun.name' | i18n }}
          md-chip {{ player.railgun | format }}
        md-list-item
          md-avatar
            md-icon.md-primary gps_fixed
          span {{ 'tower.cannon.name' | i18n }}
          md-chip {{ player.cannon | format }}

        md-subheader {{ 'subtitle.language' | i18n }}
        md-list-item(v-on:click.native="localize('es')")
          md-avatar
            md-icon.md-primary translate
          span {{ 'language.spanish' | i18n }}
        md-list-item(v-on:click.native="localize('en')")
          md-avatar
            md-icon.md-primary translate
          span {{ 'language.english' | i18n }}

        md-subheader {{ 'subtitle.account' | i18n }}
        md-list-item
          router-link(exact, to="/profile", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary account_circle
            span {{ 'title.profile' | i18n }}
        md-list-item
          router-link(exact, to="/help", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary chrome_reader_mode
            span {{ 'title.help' | i18n }}
        md-list-item(v-on:click.native="logout()")
          md-avatar
            md-icon.md-primary lock
          span {{ 'account.logout' | i18n }}

    .main.padding#main
      router-view.content.animation.fadeIn.scrollable
</template>

<script>
  import Vue from 'vue'
  import auth from './services/auth'
  import api from './services/api'
  import notification from './services/notification'
  import store from './vuex/store'

  export default {
    data () {
      return {
        search: store.state.search,
        notification: {
          text: '',
          class: ''
        }
      }
    },
    created () {
      store.watch((state) => state.notification, () => {
        this.notification = store.state.notification
        if (store.state.account.logged) this.alert()
      })
    },
    methods: {
      localize (lang) {
        Vue.config.lang = lang
        this.collapse()
      },
      left () {
        this.$refs['left'].open()
      },
      right () {
        this.$refs['right'].open()
      },
      alert () {
        this.$refs['alert'].open()
      },
      dismiss () {
        this.$refs['alert'].close()
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
    sockets: {
      player (id) {
        if (store.state.account.logged && !this.fullscreen) {
          if (id === store.state.account.id || id === null) {
            api.getPlayer(store.state.account.id)
            .then((player) => {
              store.commit('player', player)
            })
          }
        }
      },
      exploration () {
        notification.success('notification.exploration.new')
      },
      cantina () {
        notification.success('notification.cantina.new')
      },
      senate () {
        notification.success('notification.senate.new')
      },
      market () {
        notification.success('notification.market.new')
      },
      store () {
        notification.success('notification.store.new')
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
      title () {
        return store.state.title
      },
      player () {
        return store.state.player
      },
      notification () {
        return store.state.notification
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
    font-family 'Raleway', sans-serif !important
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
    box-shadow 0px 2px 2px rgba(0, 0, 0, 0.2) !important
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
    .md-tab-header
      text-transform none
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

  /* search */
  .search
    flex-grow 2
  
  /* OPACITY */
  opacity = 0.90
  #toolbar
  .md-card
  .md-table-card
    opacity opacity
  .md-table-card.md-card
  .md-menu-content > .md-list
    background-color rgba(255,255,255,opacity) !important
  .md-progress
  .md-card-media
  .background
    background-color rgba(255,255,255,1 - opacity) !important
  .md-dialog
  .md-list
    background-color inherit !important

  .md-dialog
    max-width 90%
    max-height 90%
    .md-card
      .md-card-header
        .md-title
          margin 0 !important
          display flex
          justify-content flex-start
          align-items center
          span + .md-chip
            margin-left 5px

  /* CARDS */
  border = 4px
  .rounded-top
    border-top-left-radius border
    border-top-right-radius border
    border-bottom-left-radius 0
    border-bottom-right-radius 0
  .rounded-top
    .md-tabs-navigation
      border-top-left-radius border
      border-top-right-radius border
      border-bottom-left-radius 0
      border-bottom-right-radius 0
  .rounded-bottom
    border-top-left-radius 0 !important
    border-top-right-radius 0 !important
    border-bottom-left-radius border
    border-bottom-right-radius border
  .md-layout
    // align-items flex-start
    // align-content flex-start
  .md-card
  .md-table-card
    border-radius border
  .md-card.card
    width 100%
    margin 4px
    .md-card-header
      .md-title
        margin 0 !important
        display flex
        justify-content center
        align-items center
        span + .md-chip
          margin-left 5px
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

  // snackbar
  .md-snackbar
    .md-button
      margin 0 -16px 0 0 !important
        
  /* COLORS */
  grey = #F5F5F5
  green = #64DD17
  purple = #AA00FF
  indigo = #304FFE
  yellow = #FFEA00
  cyan = #00E5FF
  red = #D50000
  orange = #FF9800
  pink = #E91E63
  .grey
    .md-card-header
      color grey !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color grey !important
      color black !important
  .green
    .md-card-header
      color green !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color green !important
      color black !important
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
      color black !important
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
    -webkit-animation-duration 1.5s
    animation-duration 1.5s
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
        opacity 0.90
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
        margin 0
        font-size 0.8em !important
</style>