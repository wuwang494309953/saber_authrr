<template>
  <div>
    <el-dialog
      title="权限管理"
      :visible.sync="dialogFormVisible">
      <el-tabs tab-position="left" @tab-click="_handleTab">
        <el-tab-pane v-for="item in tabs" :key="item.label" :label="item.label">
          <el-transfer 
            v-model="value"
            :data="data"
            filterable
          ></el-transfer>
        </el-tab-pane>
      </el-tabs>

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
    tabs: Array,
    data: Array
  },
  data () {
    return {
      dialogFormVisible: false,
      value: []
    }
  },
  methods: {
    _handleAdd () {
      this.dialogFormVisible = true
    },
    _handleEdit (val) {
      this.value = val
    },
    _handleTab(tab) {
      this.$emit('handleTab', tab)
    },
    _submit () {
      this.$emit('submit', this.value)
      this.dialogFormVisible = false
    }
  }
}
</script>