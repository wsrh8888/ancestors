<template>
  <div class="logFund">
    <el-dialog 
      :title="dialog.title" 
      :visible.sync="dialog.show"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :modal-append-to-body="false">
      <div class="form">
        <el-form 
          ref="form" 
          :model="form"
          :rules="form_rules"
          label-width="120px" 
          style="margin:10px;width:auto;"
        >
          <el-form-item prop='name' label="用户名:">
            <el-input type="name" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop='email'  label="邮箱:">
            <el-input type="email" v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item prop='password' label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item prop='phone' label="电话:">
            <el-input type="phone" v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item prop='grade' label="权限等级:">
            <el-input type="grade" v-model="form.grade"></el-input>
          </el-form-item>
          <el-form-item  class="text_right">
              <el-button @click="dialog.show = false">取 消</el-button>
              <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {update} from '@/api/userHT'
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      form_rules: {
        name: [
          { required: true, message: "用户的用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
        grade: [
          { required: true, message: "用户权限不能为空", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 表单数据验证完成之后，提交数据;
          update(this.form)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
              }
              this.dialog.show = false;
              this.$emit("update");
            });
          }
      });
    }
  }
};
</script>

