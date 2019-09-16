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
                @focus="_remoteSelectFocus">
                <el-option
                  v-for="item in appOptions"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right;">
            <el-button type="primary" round style="margin-left:30px;" @click="_handleAdd">新增Shiro配置</el-button>
        </el-col>
      </el-row>

      <Table
        ref="table"
        :tableLoading="tableLoading"
        :tableData="tableData"
        :total="total"
        :options="appOptions"
        @submit="_submit"
        @remoteSelect="_remoteSelect"
        @edit="_edit"
        @del="_del"
        @refresh="_refresh">
      </Table>

    </div>
  </el-card>
</template>

<script>
import {getAppInfos} from '@/api/appInfo.js'
import { getShiros, saveShiro, delShiro } from '@/api/appShiro.js'
import Table from './Table'
export default {
  data () {
    return {
      tableLoading: false,
      tableData: [],
      total: 0,
      appOptions: [],
      queryParams: {
        appId: '',
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
      saveShiro(param).then(res => {
        if (res.code == 0) {
          this._getShiros()
          this.$message.success(res.msg)
        } else {
          this.$message.error('保存出现了一个问题。')
        }
      })
    },
    _getShiros () {
      this.tableLoading = true
      getShiros(this.queryParams).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    _edit (row) {
      this._remoteSelect()
    },
    _del (row) {
      delShiro(row.settingId).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this._getGateWays()
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
    }
  },
  created () {
    this._getShiros()
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