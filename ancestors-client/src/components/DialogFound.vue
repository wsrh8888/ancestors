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
          :rules ="form_rules"
          label-width="120px" 
          style="margin:10px;width:auto;"
        >
          <el-form-item prop='name' label="游戏名字:">
            <el-input type="name" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item prop='size'  label="游戏大小:">
            <el-input type="size" v-model="form.size"></el-input>
          </el-form-item>

          <el-form-item prop='versions' label="游戏版本">
            <el-input type="versions" v-model="form.versions"></el-input>
          </el-form-item>

          <el-form-item prop='date' label="更新日期:">
            <el-input type="date" v-model="form.date"></el-input>
          </el-form-item>

          <el-form-item label="工作室:" prop='studio' >
            <el-input type="studio" v-model="form.studio"></el-input>
          </el-form-item>
          <el-form-item label="价格:" prop='prince'>
            <el-input type="prince" v-model="form.prince"></el-input>
          </el-form-item>
          <el-form-item label="声明:" prop='declaration'>
            <el-input type="textarea" v-model="form.declaration"></el-input>
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
import {upbasic} from '@/api/userHT'
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
          { 
            required: true,
            message: "游戏名字不能为空！", 
          },
        ],
        size: [
          {
            required: true, 
            message: "游戏大小不能为空！",
          },
          {
            pattern: /^([0-9]+)|([0-9]+\.[0-9]+)$/,
            message: '大小为数字单位默认为G'
          }
        ],
        versions: [
          { required: true, message: "游戏版本不ccc能为空！", trigger: "blur" }
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
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 表单数据验证完成之后，提交数据;
          upbasic(this.form)
            .then(res => {
              if (res) {
                this.$message({
                  message: "保存成功！",
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

