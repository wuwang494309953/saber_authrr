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
            :titles="titles"
            :props="transProps"
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
    data: Array,
    titles: Array,
    transProps: Object
  },
  data () {
    return {
      dialogFormVisible: false,
      value: [],
      form: {
        id: '',
        mappingId: ''
      }
    }
  },
  methods: {
    _handleAdd (id) {
      this.form.id = id
      this.dialogFormVisible = true
    },
    _handleEdit (val) {
      this.value = val
    },
    _handleTab(tab) {
      this.$emit('handleTab', tab)
    },
    _submit () {
      this.form.mappingId = this.value.join(',')
      this.$emit('submit', this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>