<template>
<!-- 用户的注册界面 -->
  <div class="register">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">先辈在线后台管理系统</span>
        <el-form
          :model="register"
          :rules="rules"
          class="registerForm"
          ref="registerForm"
          label-width="80px"
          :validate-on-rule-change="false"
        >
          <el-form-item label="昵称" prop="name">
            <el-input type="name" v-model="register.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone" ref="registerPhone">
            <el-input type="name" v-model="register.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" >
            <el-input style="width:110px;float:left;" type="code" v-model="register.code" placeholder="输入验证码"></el-input>
            <el-button :disabled="isDisabled" style="float:right;margin-left:0;" @click="sencode('registerForm')">{{buttonName}}</el-button>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
            type="password"
            v-model="register.password"
            placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              v-model="register.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
            class="submit_btn"
            type="primary"
            @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// 接入注册api接口
import { register,sendcode } from '../api/userHT'
export default {
  name: 'register',
  data() {
    // 检测两次密码是否相同
    var checkPassword = (rule, value, callback) => {
      if (value !== this.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      register: {
        name: '',
        password: '',
        password2: '',
        email: '',
        phone: '',
        code: ''
      },
      rules: {
        // 邮箱验证
        email: [{
          required: true, 
          message: '邮箱不能为空',
          trigger: 'blur'
        },
        {
          pattern:/^\d{8,10}@qq.com$/,
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        // 名称验证
        name: [{
          required:true,  //是否必填
          message: '用户名不能为空', //规则
          trigger: 'blur' //规则     blur'是鼠标失去焦点的时候会触发验证
        }, {  //规则
          min: 2,
          max: 30,
          message: '长度在2到30个字符之间',
          trigger: 'blur'
        }],
        phone: [{
          required:true, 
          message: '电话号码不能为空'
        }, {
          min: 11,
          max: 11,
          message: '手机号码的长度为11位',
          trigger: 'blur'
        }, {
          pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
          message: '手机号码格式不正确',
          trigger: 'blur'
        }],
        code: [{
          required:true, 
          message: '验证码不能为空',
          trigger: 'blur'
        }, {
          min: 6,
          max: 6,
          message: '验证码的长度为6位',
          trigger: 'blur'
        }],
        // 密码验证
        password: [
        {
          required:true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        {
          min: 8,
          max: 30,
          message: "长度在8到20个字符之间",
          trigger: 'blur'
        },
        {
          pattern:/^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?. ]).*$/,
          message: '密码必须包含大小写字母，数字，特殊字符组成',
          trigger: 'blur'
        }],
        // 第二次密码验证
        password2: [{
          required:true,
          message: '确认密码不能为空',
          trigger: 'blur'
        },{
          validator: checkPassword,
          trigger: 'blur'
        }]
      },
      buttonName: "发送短信",
      isDisabled: false,
      time: 60
    }
  },
  methods: {
    // 点击注册按钮,向服务器发送消息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.register)
          .then(res => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push("/login")
              return;
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    // 发送请求获取验证码
    sencode(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            phone: this.register.phone
          }
          sendcode(data)
            .then(res => {
              if(res.success) {
                let me = this;
                me.isDisabled = true;
                let interval = window.setInterval(function() {
                  me.buttonName =   me.time + '秒后重新发送';
                  --me.time;
                  if(me.time < 0) {
                    me.buttonName = "重新发送";
                    me.time = 60;
                    me.isDisabled = false;
                    window.clearInterval(interval);
                  }
                }, 1000);
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 400px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

</style>
