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
                @change="_getPermissions">
                <el-option
                  v-for="item in appOptions"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="queryParams.status" @change="_getPermissions" size="medium">
                <el-radio-button label="1">有效</el-radio-button>
                <el-radio-button label="0">无效</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right;">
            <el-button type="primary" round style="margin-left:30px;" @click="_handleAdd">新增权限点</el-button>
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
      @remoteSelect="_remoteSelect">
    </Table>
  </el-card>
</template>

<script>
import {getAppInfos} from '@/api/appInfo.js'
import { getPermissions, savePermission, delPermission } from '@/api/permission.js'
import Table from './Table'
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
      }
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
      savePermission(param).then(res => {
        if (res.code == 0) {
          this._getPermissions()
          this.$message.success(res.msg)
        } else {
          this.$message.error('保存出现了一个问题。')
        }
      })
    },
    _getPermissions () {
      this.tableLoading = true
      getPermissions(this.queryParams).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
  },
  created () {
    this._getPermissions()
  },
  components: {
    Table
  }
}
</script>

<style lang="stylus" scoped>
.card-body
  margin: 5px;
</style>