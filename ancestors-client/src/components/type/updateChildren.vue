<template>
  <el-dialog 
    :title="dialog.title"
    :visible.sync="dialog.isshow"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
  >
    <el-form :model="form">
      <el-form-item label="名字" label-width="80px">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.isshow=false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {typeUpdateChildren,typeAdd} from '../../api/type'
  export default {
    props: {
      dialog: Object
    },
    data() {
      return {
        form: {
          name: ''
        }
      };
    },
    methods: {
      // 修改分类发送的数据
      editType() {
        this.form.id = this.dialog.id
         typeUpdateChildren(this.form)
          .then(res => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.dialog.isshow = false
              this.form.name = ''
              this.$emit("update");
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
      },
      createType() {
        typeAdd(this.form)
          .then(res => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.form.name = ''
              this.dialog.isshow = false
              this.$emit("update");
              
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
      },
      submit() {
        if (this.dialog.title == '创建分类') {
          this.createType(this.dialog.title == '创建分类')
        } else if (this.dialog.title == '修改名字') {
          this.editType()
        }
        
      }
    }
  };
</script>