<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        stripe>
        <el-table-column type="index"/>
        <el-table-column
          prop="appName"
          label="App名"
        >
        </el-table-column>
        <el-table-column
          prop="permissionName"
          label="权限名"
        >
        </el-table-column>
        <el-table-column
          prop="permissionValue"
          label="权限值"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.status | statusTag">{{ scope.row.status | statusType }}</el-tag>
          </template>
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
      title="权限点信息"
      :visible.sync="dialogFormVisible">
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
        <el-form-item label="权限名" :label-width="formLabelWidth">
          <el-input v-model="form.permissionName" placeholder="请输入权限名"></el-input>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-input v-model="form.permissionValue" placeholder="请输入权限值"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status">
            <el-radio-button label="1">有效</el-radio-button>
            <el-radio-button label="0">无效</el-radio-button>
          </el-radio-group>
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
      form: {},
      pageParam: {
        pageNum: 1,
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
      this.$emit('remoteSelect', query)
    },
    _handleAdd () {
      this.form = {}
      this.dialogFormVisible = true
    },
    _submit () {
      this.$emit('submit', this.form)
      this.dialogFormVisible = false
    },
    _dateFormatter (row, column, cellValue) {
      return format(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  filters: {
    statusType (value) {
      if (value >= 0 && value < 3) {
          let types = ['无效', '有效']
          return types[value]
      } else {
          return '状态错误'
      }
    },
    statusTag (value) {
      if (value >= 0 && value < 3) {
          let types = ['warning', '']
          return types[value]
      }
    }
  }
}
</script>