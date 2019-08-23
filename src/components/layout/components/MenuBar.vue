<template>
  <div class="bar-area">
    <div class="tag-area">
      <el-tag
        v-for="item in visitedViews"
        :key="item.path"
        :class="_isActive(item)?'active':''"
        :effect="_isActive(item)?'dark ':'plain'"
        type="success"
        size="medium"
        closable 
        class="tag"
      >
        <router-link :to="item.path">
          <span>{{item.title}}</span>
        </router-link>
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routers: [
        {
          path: '/t1',
          title: '首页'
        }
      ]
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this._addTags()
    }
  },
  methods: {
    _isActive(route) {
      return route.path === this.$route.path
    },
    _addTags() {
      console.log(this.$route)
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bar-area
    margin: 3px 0px
    background-color: white
    .tag-area
      margin: 0px 15px
      .tag
        margin: 3px 4px
      .active
        :before 
          content: ''
          background: #fff
          display: inline-block
          width: 8px
          height: 8px
          border-radius: 50%
          position: relative
          margin-right: 2px
        
  a
    text-decoration: none
    color: black
</style>
