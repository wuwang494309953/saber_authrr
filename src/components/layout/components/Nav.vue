<template>
  <div style="height: 100%;">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      router
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%;">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-open"></i>
          <span>App配置</span>
        </template>
        <el-menu-item index="/gateway/index">App信息</el-menu-item>
        <el-menu-item index="/gateway/gateway">网关配置</el-menu-item>
        <el-menu-item index="/gateway/shiro">Shiro配置</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-key"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/auth/user">用户管理</el-menu-item>
        <el-menu-item index="/auth/role">角色管理</el-menu-item>
        <el-menu-item index="/auth/permission">权限管理</el-menu-item>
        <el-menu-item index="/auth/resource">资源管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean
  },
  name: 'Nav',
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) 
  width: 200px
  min-height: 400px
</style>