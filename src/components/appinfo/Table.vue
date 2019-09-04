<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        stripe
      >
        <el-table-column type="index"/>
        <el-table-column
          prop="appName"
          label="应用名"
        >
        </el-table-column>
        <el-table-column
          prop="appSecret"
          label="应用秘钥"
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
        >
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.status | statusTag">{{ scope.row.status | statusType }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
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
export default {
  props: {
    tableLoading: Boolean,
    tableData: {
      data: Array,
      total: Number
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {}
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