<template>
  <el-card class="card-body">
    <div class="query-area">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form :inline="true">
            <el-form-item label="App名称:">
              <el-select
                v-model="queryParams.appId"
                filterable
                remote
                :remote-method="_remoteSelect"
                @focus="_remoteSelectFocus"
                @change="_getRoles">
                <el-option
                  key="0"
                  label="未选择"
                  value="">
                </el-option>
                <el-option
                  v-for="item in appOptions"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色名:">
                <el-input v-model="queryParams.roleName" placeholder="角色名" @keyup.enter.native="_getRoles" @blur="_getRoles"></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="queryParams.status" @change="_getRoles" size="medium">
                <el-radio-button label="1">有效</el-radio-button>
                <el-radio-button label="0">无效</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="类型:">
              <el-radio-group v-model="queryParams.type" @change="_getRoles" size="medium">
                <el-radio-button label="1">普通用户</el-radio-button>
                <el-radio-button label="2">管理员</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right;">
            <el-button type="primary" round style="margin-left:30px;" @click="_handleAdd">新增角色</el-button>
        </el-col>
      </el-row>
    </div>

    <Table
      ref="table"
      :tableLoading="tableLoading"
      :tableData="tableData"
      :total="total"
      :options="appOptions"
      @submit="_submit"
      @edit="_edit"
      @del="_del"
      @refresh="_refresh"
      @editAuth="_editAuth"
      @remoteSelect="_remoteSelect">
    </Table>

    <Transfer
      :tabs="tabs"
      :data="allPermission"
      :transProps="{
        key: 'permissionId',
        label: 'permissionName'
      }"
      @submit="_submitPermissionMapping"
      ref="transfer"></Transfer>
  </el-card>
</template>

<script>
import {getAppInfos} from '@/api/appInfo.js'
import { getRoles, saveRole, delRole } from '@/api/role.js'
import { getPermissionsWithAppIdAndUserId } from '@/api/permission.js'
import { saveRolePermission } from '@/api/rolePermission.js'
import Table from './Table'
import Transfer from '@/components/auth/Transfer'
export default {
  data () {
    return {
      tableLoading: false,
      tableData: [],
      total: 0,
      appOptions: [],
      queryParams: {
        pageNum: 0,
        pageSize: 10,
        sortKey: '',
        sortValue: ''
      },
      tabs: [
        {
          label: "权限点管理"
        },
        {
          label: "资源管理"
        }
      ],
      allPermission: []
    }
  },
  methods: {
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
    _handleAdd () {
      this.$refs.table._handleAdd()
    },
    _submit (param) {
      saveRole(param).then(res => {
        if (res.code == 0) {
          this._getRoles()
          this.$message.success(res.msg)
        } else {
          this.$message.error('保存出现了一个问题。')
        }
      })
    },
    _getRoles () {
      this.tableLoading = true
      getRoles(this.queryParams).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    _edit () {
      this._remoteSelect()
    },
    _del (row) {
      delRole(row.roleId).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this._getRoles()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _refresh (pageParam) {
      this.queryParams.sortKey = pageParam.sortKey
      this.queryParams.sortValue = pageParam.sortValue
      this.queryParams.pageNum = pageParam.pageNum
      this.queryParams.pageSize = pageParam.pageSize
      this._getShiros()
    },
    _editAuth (row) {
      this._getAllPermissions(row.appId)
      this._getOwnPermissions(row.appId, row.roleId)
      this.$refs.transfer._handleAdd(row.roleId)
    },
    _getAllPermissions (appId) {
      getPermissionsWithAppIdAndUserId(appId).then(res => {
        if (res.code === 0) {
          this.allPermission = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _getOwnPermissions (appId, roleId) {
      getPermissionsWithAppIdAndUserId(appId, roleId).then(res => {
        if (res.code === 0) {
          const data = []
          res.data.forEach(item => {
            data.push(item.permissionId)
          })
          this.$refs.transfer._handleEdit(data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _submitPermissionMapping (form) {
      saveRolePermission({
        roleId: form.id,
        permissionIds: form.mappingId
      }).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  created () {
    this._getRoles()
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