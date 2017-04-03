<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title {{ 'dialog.confirm.title' | i18n }}
        md-card-content
          span {{ 'dialog.confirm.description' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="save()") {{ 'button.accept' | i18n }}

    md-layout(v-for="branch in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="branch.class")
        md-card-header
          .md-title {{ branch.name | i18n }}
        md-card-content.center.background.padding
          md-layout.center
            md-layout.flex.center(v-for="(skill, index) in branch.Skills", v-bind:md-flex-xlarge="layout(index)", v-bind:md-flex-large="layout(index)", v-bind:md-flex-small="layout(index)", v-bind:md-flex-xsmall="layout(index)")
              md-button.md-fab.md-raised.md-primary.skill(v-on:click.native="up(skill)")
                img(v-bind:src="skill.image")
                md-icon {{ skill.PlayerSkill.level }}
              span {{ skill.name | i18n }}
        md-card-content.center
          span {{ branch.description | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import store from '../vuex/store'

  export default {
    data () {
      return {
        tree: [],
        selected: {}
      }
    },
    mounted () {
      store.commit('title', 'title.research')
    },
    created () {
      this.refresh()
    },
    methods: {
      refresh () {
        // deep clone object to avoid vuex mutation error
        this.tree = JSON.parse(JSON.stringify(store.state.player.Tree))
      },
      layout (index) {
        return index > 0 ? 33 : 100
      },
      up (skill) {
        if (skill.PlayerSkill.level < skill.max) skill.PlayerSkill.level++
      },
      reset (branch) {
        branch.skills.forEach((skill) => {
          skill.level = skill.min
        })
      },
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (branch) {
        this.selected = branch
        this.confirm()
      },
      save (branch) {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.tree.filter((branch) => {
          return this.$t(branch.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .flex
    flex-direction column
    .md-button.skill
      padding 5px
      display flex
      align-items center
      justify-content center
      .md-icon
        font-family Roboto,Noto Sans,Noto,sans-serif
        background-color rgba(0,0,0,0.8)
        border-radius 50%
        font-size 14px
        min-width 20px
        width 20px
        height 20px
        min-height 20px
        display flex
        align-items center
        justify-content center
    span
      font-size 0.8em
</style>