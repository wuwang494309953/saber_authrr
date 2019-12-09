<template>
  <el-card class="card-body">
    <div class="query-area">
      <el-row :gutter="20">
          <el-col :span="18">
            <el-form :inline="true" :model="queryParams">
              <el-form-item label="App名称:">
                  <el-input v-model="queryParams.appName" placeholder="App名称" @keyup.enter.native="_getAppInfos" @blur="_getAppInfos"></el-input>
              </el-form-item>
              <el-form-item label="描述:">
                  <el-input v-model="queryParams.appDesc" placeholder="描述" @keyup.enter.native="_getAppInfos" @blur="_getAppInfos"></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                <el-radio-group v-model="queryParams.status" @change="_getAppInfos" size="medium">
                  <el-radio-button label="1">有效</el-radio-button>
                  <el-radio-button label="0">无效</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item>
                  <el-button type="primary" @click="_getAppInfos">查询</el-button>
              </el-form-item> -->
              </el-form>
          </el-col>
          <el-col :span="6" style="text-align: right;">
              <el-button type="primary" round style="margin-left:30px;" @click="_handleAdd">新增App应用</el-button>
          </el-col>
      </el-row>
      <Table
        :tableLoading="tableLoading"
        :tableData="tableData"
        :total="total"
        @submit="_submit"
        @del="_del"
        @refresh="_refresh"
        ref="table"
      >
      </Table>
    </div>
  </el-card>
</template>

<script>
import {getAppInfos, saveAppInfo, delAppInfo} from '@/api/appInfo.js'
import Table from './Table'
export default {
  name: 'AppInfo',
  data () {
    return {
      isEdit: false,
      tableLoading: false,
      tableData: [],
      total: 0,
      queryParams: {
        appName: '',
        appDesc: '',
        status: 1,
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
    _submit (form) {
      saveAppInfo(form).then(res => {
        if (res.code == 0) {
          this._getAppInfos()
          this.$message.success(res.msg)
        } else {
          this.$message.error('保存出现了一个问题。')
        }
      })
    },
    _del (row) {
      delAppInfo(row.appId).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this._getAppInfos()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _getAppInfos () {
      this.tableLoading = true
      getAppInfos(this.queryParams).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    _refresh (pageParam) {
      this.queryParams.sortKey = pageParam.sortKey
      this.queryParams.sortValue = pageParam.sortValue
      this.queryParams.pageNum = pageParam.pageNum
      this.queryParams.pageSize = pageParam.pageSize
      this._getAppInfos()
    }
  },
  created () {
    this._getAppInfos()
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