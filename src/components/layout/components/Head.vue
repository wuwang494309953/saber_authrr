<template>
  <div>
    <el-row style="height: 100%;">
      <el-col :span="12" style="height: 100%; ">
        <div style="display: flex; align-items: center; height: 100%;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="path in activePath" :key="path.path" :to="{ path: path.path }">{{path.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="12" style="height: 100%;">
        <div class="right-menu">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-image
                style="width: 40px; height: 40px; border-radius: 10px;"
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
              </el-image>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item>项目地址</el-dropdown-item>
              <el-dropdown-item :divided="true">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    activePath() {
      const route = this.$route
      var paths = []
      route.matched.forEach(e => {
        paths.push({
          title: e.meta.title,
          path: e.path
        })
      });
      return paths
    }
  }
}
</script>

<style lang="stylus" scoped>
.right-menu
  height: 100%
  display: flex
  align-items: center
  justify-content: flex-end
  margin-right: 30px
</style>