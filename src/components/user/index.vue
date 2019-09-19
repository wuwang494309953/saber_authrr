<template>
  <el-card class="card-body">
    <div class="query-area">
      <el-row :gutter="20">
        <el-col :span="21">
          <el-form :inline="true">
            <el-form-item label="App名称:">
              <el-select
                v-model="queryParams.appId"
                filterable
                remote
                :remote-method="_remoteSelect"
                @focus="_remoteSelectFocus"
                @change="_getUsers">
                <el-option
                  v-for="item in appOptions"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名:">
                <el-input v-model="queryParams.username" placeholder="账号" @keyup.enter.native="_getUsers" @blur="_getUsers"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-input v-model="queryParams.mail" placeholder="邮箱" @keyup.enter.native="_getUsers" @blur="_getUsers"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input v-model="queryParams.telephone" placeholder="手机号" @keyup.enter.native="_getUsers" @blur="_getUsers"></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="queryParams.status" @change="_getUsers" size="medium">
                <el-radio-button label="1">有效</el-radio-button>
                <el-radio-button label="0">无效</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3" style="text-align: right;">
            <el-button type="primary" round style="margin-left:30px;" @click="_handleAdd">新增用户</el-button>
        </el-col>
      </el-row>
    </div>

    <Table
      :tableLoading="tableLoading"
      :tableData="tableData"
      :total="total"
      :options="appOptions"
      @refresh="_refresh"
      @submit="_submit"
      @del="_del"
      @edit="_edit"
      @remoteSelect="_remoteSelect"
      @editRole="_handleRole"
      ref="table">
    </Table>

    <Transfer
      :tabs="tabs"
      :data="transferRoles"
      @submit="_submitRoleMapping"
      ref="transfer"></Transfer>
  </el-card>
</template>

<script>
import Table from './Table'
import Transfer from '@/components/auth/Transfer'
import {getAppInfos} from '@/api/appInfo.js'
import { getUsers, saveUser, delUser } from '@/api/user.js'
import { getRolesWithAppIdAndUserId } from '@/api/role.js'
export default {
  data () {
    return {
      appOptions: [],
      tableLoading: false,
      tableData: [],
      total: 0,
      queryParams: {
        pageNum: 0,
        pageSize: 10,
      },
      tabs: [
        {
          label: "角色管理"
        }
      ],
      authRoles: []
    }
  },
  computed: {
    transferRoles () {
      const data = []
      this.authRoles.forEach(item => {
        data.push({
          key: item.roleId,
          label: item.roleName,
          disabled: false
        })
      })
      return data
    }
  },
  methods: {
    _handleAdd () {
      this.$refs.table._handleAdd()
    },
    _submit (param) {
      saveUser(param).then(res => {
        if (res.code == 0) {
          this._getUsers()
          this.$message.success(res.msg)
        } else {
          this.$message.error('保存出现了一个问题。')
        }
      })
    },
    _getUsers () {
      this.tableLoading = true
      getUsers(this.queryParams).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    _del (row) {
      delUser(row.userId).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this._getUsers()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _edit (row) {
      this._remoteSelect()
    },
    _refresh (pageParam) {
      this.queryParams.sortKey = pageParam.sortKey
      this.queryParams.sortValue = pageParam.sortValue
      this.queryParams.pageNum = pageParam.pageNum
      this.queryParams.pageSize = pageParam.pageSize
      this._getUsers()
    },
    _handleRole (row) {
      this._getAuthRoles(row.appId)
      this._getOwnRoles(row.appId, row.userId)
      this.$refs.transfer._handleAdd()
      
    },
    _getAuthRoles (appId) {
      getRolesWithAppIdAndUserId(appId).then(res => {
        if (res.code === 0) {
          this.authRoles = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _getOwnRoles (appId, userId) {
      getRolesWithAppIdAndUserId(appId, userId).then(res => {
        if (res.code === 0) {
          const data = []
          res.data.forEach(item => {
            data.push(item.roleId)
          })
          this.$refs.transfer._handleEdit(data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _submitRoleMapping (val) {
      console.log(val)
    },
    _remoteSelectFocus () {
      this._remoteSelect()
    },
    _remoteSelect (query) {
      let param = {
        appName: query
      }
      getAppInfos(param).then(res => {
        this.appOptions = res.data.data
      })
    },
  },
  created () {
    this._getUsers()
  },
  components: {
    Table,
    Transfer
  }
}
</script>

<style lang="stylus" scoped>
.card-body
  margin: 5px;
</style>