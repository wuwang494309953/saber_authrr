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
          prop="username"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="mail"
          label="邮箱"
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

      <div style="margin-top: 15px;">
        <el-pagination
          @size-change="_handleSizeChange"
          @current-change="_handleCurrentChange"
          :current-page="pageParam.pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="用户信息"
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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" placeholder="请输入电话"></el-input>
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
      this.$emit('edit', this.form)
    },
    _handleDelete (index, row) {
      
      this.$confirm('此操作将使该用户失效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('del', JSON.parse(JSON.stringify(row)))
      })
    },
    _handleSizeChange(size) {
      this.pageParam.pageSize = size
      this.$emit('refresh', this.pageParam)
    },
    _handleCurrentChange(index) {
      this.pageParam.pageNum = index
      this.$emit('refresh', this.pageParam)
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