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
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="register.email"
              placeholder="请输入邮箱"
            ></el-input>
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
          <el-form-item label="名称" prop="name">
            <el-input type="name" v-model="register.name" placeholder="请输入用户名"></el-input>
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
import { register } from '../api/userHT'
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
        name: 'Robert',
        password: '123456',
        password2: '123456',
        email: '751135385@qq.com'
      },
      rules: {
        // 邮箱验证
        email: [{
          required: true, 
          message: '邮箱不能为空' 
        },
        {
          pattern:/^([0-9a-zA-Z]+)@([0-9a-z]+\.(com|cn)$)/g,
          message: '邮箱格式不正确'
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
        // 密码验证
        password: [
        {
          required:true,
          message: '密码不能为空',
        },
        {
          min: 8,
          max: 30,
          message: "长度在8到20个字符之间",
        },
        {
          pattern:/[a-zA-Z0-9_]{8,20}$/,
          message: '密码必须由数字字母下划线组成8-20位数'
        }],
        // 第二次密码验证
        password2: [{
          required:true,
          message: '确认密码不能为空',
        },{
          pattern:/[a-zA-Z0-9_]{8,20}$/,
          message: '密码必须由数字字母下划线组成8-20位数'
        }, {
          validator: checkPassword,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 点击注册按钮,向服务器发送消息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.register)
          .then(res => {
            if (res) {
              this.$message({
                message: '帐号注册成功',
                type: 'success'
              })
              this.$router.push("/login")
            }
          })
        } else {
          return false;
        }
      });
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
  width: 370px;
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
