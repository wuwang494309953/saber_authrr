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
          label="应用名"
          width="250"
        >
        </el-table-column>
        <el-table-column
          prop="appSecret"
          label="应用秘钥"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="appDesc"
          label="应用描述"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="70"
        >
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.status | statusTag">{{ scope.row.status | statusType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="_dateFormatter"
          width="150"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="_dateFormatter"
          width="150"
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
      title="App信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="padding-right:30%;">
        <el-form-item label="应用名" :label-width="formLabelWidth">
          <el-input v-model="form.appName" placeholder="请输入应用名"></el-input>
        </el-form-item>
        <el-form-item label="应用描述" :label-width="formLabelWidth">
          <el-input v-model="form.appDesc" placeholder="请输入应用描述"></el-input>
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
    _submit () {
      this.$emit('submit', this.form)
      this.dialogFormVisible = false
    },
    _handleAdd () {
      this.form = {
        appName: '',
        appDesc: '',
        status: 1
      }
      this.dialogFormVisible = true
    },
    _dateFormatter (row, column, cellValue) {
      return format(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    },
    _handleEdit (index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    _handleDelete (index, row) {
      
      this.$confirm('此操作将使该App失效, 是否继续?', '提示', {
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