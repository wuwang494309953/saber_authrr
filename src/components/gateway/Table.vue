<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        stripe>
        <el-table-column type="index"/>
        <el-table-column
          prop="appId"
          label="appId"
        >
        </el-table-column>
        <el-table-column
          prop="appServiceId"
          label="ServiceId"
        >
        </el-table-column>
        <el-table-column
          prop="gatewayPath"
          label="转发路径"
        >
        </el-table-column>
  
        <el-table-column
          prop="createTime"
          :formatter="_dateFormatter"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="_dateFormatter"
          label="更新日期">
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="_handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="_handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="网关路由配置"
      :visible.sync="dialogFormVisible"
    >
      <el-alert
        title="配置介绍"
        type="info"
        close-text="知道了"
        description="强耦合Spring Cloud，ServiceId为SpringCloud中的ServiceId，网关路径为代理的路径.
          eg: serviceId = saber-authr-service, path = /v1/saberAuth/**时，会将/v1/saberAuth/开头的请求转发到SpringCloud中的项目上"
        style="margin-bottom: 15px;">
      </el-alert>
      <el-form :model="form" style="padding-right:30%;">
        <el-form-item label="App" :label-width="formLabelWidth">
          <el-select
            v-model="form.appId"
            filterable
            remote
            :remote-method="_remoteSelect"
            @focus="_remoteSelectFocus">
            <el-option
              v-for="item in options"
              :key="item.appId"
              :label="item.appName"
              :value="item.appId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ServiceId" :label-width="formLabelWidth">
          <el-input v-model="form.appServiceId" placeholder="请输入ServiceId"></el-input>
        </el-form-item>
        <el-form-item label="网关路径" :label-width="formLabelWidth">
          <el-input v-model="form.gatewayPath" placeholder="请输入网关路径"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {format} from '@/util/DateUtil.js'
export default {
  props: {
    options: Array,
    tableLoading: Boolean,
    tableData: Array,
    total: Number
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {}
    }
  },
  methods: {
    _handleAdd () {
      this.form = {}
      this.dialogFormVisible = true
    },
    _submit () {
      this.$emit('submit', this.form)
      this.dialogFormVisible = false
    },
    _handleEdit (index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    _handleDelete(index, row) {

    },
    _remoteSelectFocus () {
      this._remoteSelect()
    },
    _remoteSelect (query) {
      this.$emit('remoteSelect', query)
    },
    _dateFormatter (row, column, cellValue) {
      return format(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>