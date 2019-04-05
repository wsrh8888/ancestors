<template>
  <div>
    <el-dialog
      title="游戏下载信息数据修改" 
      :visible.sync="dialog.show"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules ="form_rules"
        style="margin:10px;width:auto;"
      >
        <el-form-item prop='name' label="游戏名字:">
          <el-input type="name" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item  prop='msg1' label="完整版说明:">
          <el-input type="textarea" v-model="form.msg1"></el-input>
        </el-form-item>
        <el-form-item prop='url1' label="完整版地址:">
          <el-input type="name" v-model="form.url1"></el-input>
        </el-form-item>
        <el-form-item prop='password1' label="完整版密码:">
          <el-input type="name" v-model="form.password1"></el-input>
        </el-form-item>
        <el-form-item prop='msg2' label="独立版说明:">
          <el-input type="textarea" v-model="form.msg2"></el-input>
        </el-form-item>
        <el-form-item prop='url2' label="独立版地址:">
          <el-input type="name" v-model="form.url2"></el-input>
        </el-form-item>
        <el-form-item prop='password2' label="独立版密码:">
          <el-input type="name" v-model="form.password2"></el-input>
        </el-form-item>
        <el-form-item  class="text_right">
          <el-button @click="dialog.show = false">取 消</el-button>
          <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {updatedown} from '@/api/userHT'
export default {
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      form_rules: {
        name: [
          { required: true, message: "游戏名字不能为空！", trigger: "blur" }
        ],
        size: [
          { required: true, message: "游戏大小不能为空！", trigger: "blur" }
        ],
        versions: [
          { required: true, message: "游戏版本不能为空！", trigger: "blur" }
        ],
        studio: [
          { required: true, message: "游戏工作室不能空！", trigger: "blur" }
        ],
        date: [
          { required: true, message: "游戏更新日期不能空！", trigger: "blur" }
        ],
        prince: [
          { required: true, message: "游戏价格不能为空", trigger: "blur" }
        ],
         declaration: [
          { required: true, message: "游戏声明不能为", trigger: "blur" }
        ],
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // console.log(this.form)
          updatedown(this.form)
            .then(res => {
              if (res.success) {
                this.$message({
                  message: "信息修改成功",
                  type: "success"
                });
              }
              this.dialog.show = false;
              this.$emit("update");
            })
        }
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>
<style scoped>

</style>
