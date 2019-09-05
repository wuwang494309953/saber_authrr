<template>
  <el-card class="card-body">
    <div class="query-area">
      <el-row :gutter="20">
          <el-col :span="18">
            <el-form :inline="true">
              <el-form-item label="App名称:">
                  <el-input  placeholder="App名称"></el-input>
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
    _remoteSelect (query) {
      let param = {
        appName: query
      }
      getAppInfos(param).then(res => {
        this.appOptions = res.data.data
      })
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