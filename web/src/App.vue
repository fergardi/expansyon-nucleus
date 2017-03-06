<template lang="pug">
  .app

    md-whiteframe
      md-toolbar.md-dense(v-if="!fullscreen")
        md-button.md-icon-button.toggler(v-on:click.native="toggle('left')")
          md-icon.md-size-2x chevron_right
        .flex
        h2.md-title {{ name }}
        .flex
        md-button.md-icon-button.toggler(v-on:click.native="toggle('right')")
          md-icon.md-size-2x chevron_left

    md-sidenav.md-left.md-fixed(ref="left", v-if="!fullscreen")
      md-whiteframe
        md-toolbar.md-account-header#left
          md-list.md-transparent
            md-list-item.md-avatar-list.center
              router-link(exact, to="/home")
                .flex
                md-avatar.md-large
                  img(src="img/avatar.jpg")
                .flex
      md-list.md-dense.scrollable
        template(v-for="item in left")
          md-subheader {{ item.header }}
          md-list-item(v-for="subitem in item.items")
            router-link(exact, v-bind:to="subitem.url")
              md-avatar
                md-icon.md-primary {{ subitem.icon }}
              span {{ subitem.title }}
              md-chip.md-accent 17
          md-divider

    md-sidenav.md-right.md-fixed(ref="right", v-if="!fullscreen")
      md-whiteframe
        md-toolbar.md-account-header#right
          md-list.md-transparent
            md-list-item.md-avatar-list.center
              router-link(exact, to="/home")
                .flex
                md-avatar.md-large
                  img(src="img/avatar.jpg")
                .flex
      md-list.md-dense.scrollable
        template(v-for="item in right")
          md-subheader {{ item.header }}
          md-list-item(v-for="subitem in item.items")
            router-link(exact, v-bind:to="subitem.url")
              md-avatar
                md-icon.md-primary {{ subitem.icon }}
              span {{ subitem.title }}
              md-chip.md-warn 17
          md-divider

    .main.padding
      router-view#scroll.content.animation.fadeIn
</template>

<script>
  import vuex from './vuex/vuex.js'
  export default {
    data () {
      return {
        left: [
          {
            header: 'Economy',
            items: [
              {
                url: '/planetarium',
                icon: 'public',
                title: 'Planetarium'
              },
              {
                url: '/bazaar',
                icon: 'local_mall',
                title: 'Bazaar'
              },
              {
                url: '/sell',
                icon: 'attach_money',
                title: 'Sell'
              },
              {
                url: '/market',
                icon: 'store',
                title: 'Blackmarket'
              }
            ]
          },
          {
            header: 'Technonoly',
            items: [
              {
                url: '/research',
                icon: 'school',
                title: 'Research'
              },
              {
                url: '/hangar',
                icon: 'build',
                title: 'Hangar'
              },
              {
                url: '/Infrastructure',
                icon: 'settings',
                title: 'Infrastructure'
              },
              {
                url: '/defense',
                icon: 'security',
                title: 'Defense'
              }
            ]
          }
        ],
        right: [
          {
            header: 'Strategy',
            items: [
              {
                url: '/explore',
                icon: 'explore',
                title: 'Explore'
              },
              {
                url: '/cantina',
                icon: 'local_bar',
                title: 'Cantina'
              },
              {
                url: '/guild',
                icon: 'wc',
                title: 'Guild'
              },
              {
                url: '/temple',
                icon: 'account_balance',
                title: 'Temple'
              }
            ]
          },
          {
            header: 'Diplomacy',
            items: [
              {
                url: '/senate',
                icon: 'gavel',
                title: 'Senate'
              },
              {
                url: '/transmission',
                icon: 'wifi',
                title: 'Transmission'
              },
              {
                url: '/census',
                icon: 'group',
                title: 'Census'
              },
              {
                url: '/reputation',
                icon: 'star',
                title: 'Reputation'
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
  body
    //background: url("img/background.jpg") no-repeat center center fixed;
    background-size: cover;
    box-sizing: border-box;
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
  .md-chip
    margin-right 5px
    margin-bottom 5px
  .md-toolbar
    background-color #333356 !important
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
        background-image url('img/background-blue.gif')
      &#right
        background-image url('img/background-red.gif')
      .md-account-header
        a:not(.md-button)
          color inherit
        .md-avatar-list
          .md-list-item-container
            align-items center
          .md-avatar
            .md-icon
              border-radius 50%
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
  /* MEDIAS*/
  // from desktop on show sidebar
  @media only screen and (min-width 1080px)
    .app
      padding-left 304px
      padding-right 304px
      .toggler
        visibility hidden
      .md-sidenav-content
        top 0
        pointer-events auto
        transform translate3d(0, 0, 0) !important
        box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
</style>