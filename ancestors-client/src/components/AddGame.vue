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
          <el-form-item prop='name' label="游戏名字:" style="margin-bottom:70px;">
            <el-input type="name" style="width:40%;float:left;" v-model="form.name"></el-input>
            <el-upload
              style="width:35%;border: 1px dashed #d9d9d9;border-radius: 6px;margin-left:20px;position: absolute;right: 40px;52px;top:-80px;"
              class="avatar-uploader"
              :action="addlogourl"
              :show-file-list="false"
              name="logo"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="this.form.logo" :src="this.form.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          
          <el-form-item prop='author' label="游戏作者:">
            <el-input type="name" v-model="form.author"></el-input>
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
import {addgame} from '@/api/userHT'
import {addlogo} from '@/api/url'
export default {
  name: "logfound",
  props: {
    dialog: Object,
  },
  data() {
    return {
      form_rules: {
        name: [
          { required: true, message: "游戏名字不能为空！", trigger: "blur" }
        ],
        size: [
          { required: true, message: "游戏大小不能为空！"},
          {
            pattern: /^([0-9]{1-2})|([0-9]+.[0-9]+)$/,
            message: '格式不正确'
          }
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
      },
      form: {
        name: '',
        author: '',
        versions: '',
        size: '',
        studio: '',
        prince: '',
        declaration: '',
        logo: ''
      },
      addlogourl: '',
    };
  },
  created() {
    this.addlogourl = addlogo
  },
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 表单数据验证完成之后，提交数据;
          this.form.user_id = this.user.id
          addgame(this.form)
            .then(res => {
              if (res) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
              }
              this.form = {
                name: '',
                author: '',
                versions: '',
                size: '',
                studio: '',
                prince: '',
                declaration: '',
                logo: ''
              }
              this.dialog.show = false;
              this.$emit("update");
            });
          }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.logo = file.response;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item__content {
    display: flex !important;
  }
</style>
