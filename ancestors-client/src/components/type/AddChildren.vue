<template>
<div>
  <el-dialog
    :title="dialog.title" 
    :visible.sync="dialog.isshow"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
  >
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      class="demo-dynamic"
      :rules ="form_rules"
    >
      <el-form-item
        v-for="(item,value) in form.content"
        :key="value"
        :label="'类型' + (value+1)"
      >
        <el-input class="input"  v-model="form.content[value]"></el-input>
        <el-button @click.prevent="removeDomain(value)">删除</el-button>
      </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDomain">增加更新内容</el-button>
      <el-button @click="dialog.isshow = false">取 消</el-button>
      <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import {typeAddChildren} from '../../api/type'
  export default {
    data() {
      return {
        form_rules: {
          _id: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          title: [{
            required: true, message: '请输入更新标题', trigger: 'blur'
          }]
        },
        form: {
          content: ['']
        }
      }
    },
    props: {
      dialog: Object
    },
    methods: {
      // 新增更新行
      addDomain() {
        this.form.content.push('');
      },
      // 确认提交
      onSubmit() {
        this.form.id = this.dialog.id
        typeAddChildren(this.form) 
          .then(res => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.form.content = ['']
              this.dialog.isshow = false
              this.$emit("update")
            }
          })
      },

      // 删除个类型
      removeDomain(item) {
        this.form.content.splice(item,1)
      }
    },
    computed: {
      users() {
        return this.$store.getters.user;
      }
    }
  };
</script>
<style scoped>
.input {
  width: 80%;
}
</style>
