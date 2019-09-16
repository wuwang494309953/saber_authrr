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
                  @change="_getGateWays">
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
              <el-button type="primary" round style="margin-left:30px;" @click="_handleAdd">新增网关配置</el-button>
          </el-col>
      </el-row>

      <Table
        :tableLoading="tableLoading"
        :tableData="tableData"
        :total="total"
        :options="appOptions"
        @submit="_submit"
        @edit="_edit"
        @del="_del"
        @refresh="_refresh"
        @remoteSelect="_remoteSelect"
        ref="table"
      >
      </Table>
    </div>
  </el-card>
</template>

<script>
import {getAppInfos} from '@/api/appInfo.js'
import { getGateWays, saveGateway, delGateWay } from '@/api/appGateway.js'
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
    _handleAdd () {
      this.$refs.table._handleAdd()
    },
    _submit (param) {
      saveGateway(param).then(res => {
        if (res.code == 0) {
          this._getGateWays()
          this.$message.success(res.msg)
        } else {
          this.$message.error('保存出现了一个问题。')
        }
      })
    },
    _edit (row) {
      this._remoteSelect()
    },
    _del (row) {
      delGateWay(row.gatewayId).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this._getGateWays()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _getGateWays () {
      this.tableLoading = true
      getGateWays(this.queryParams).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
        this.tableLoading = false
      })
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
    _refresh (pageParam) {
      this.queryParams.sortKey = pageParam.sortKey
      this.queryParams.sortValue = pageParam.sortValue
      this.queryParams.pageNum = pageParam.pageNum
      this.queryParams.pageSize = pageParam.pageSize
      this._getGateWays()
    }
  },
  created () {
    this._getGateWays()
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