<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">先辈在线后台管理系统</span>
        <el-form
          :model="login"
          :rules="rules"
          ref="loginForm"
          class="loginForm"
          label-width="60px"
        >
          <el-form-item label="账号" prop="email">
            <el-input v-model="login.email" placeholder="请输入手机号码或邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="login.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
// 对token进行解析
import jwt_decode from "jwt-decode";
// 导入登录的接口
import { login } from "../api/userHT";
export default {
  name: "register",
  components: {},
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          },
          {
            pattern:/^(([0-9a-zA-Z_]+)@([0-9a-z]+\.(com|cn))|(((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8})$)/g,
            message: '账号格式不正确',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在8到20个字符之间",
            trigger: "blur"
          },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发送请求
          login(this.login).then(res => {
            if (!res.success) {
              this.$message({
                message: res.msg,
                type: 'error'
              })
              return;
            }
            // 登录成功
            this.$message({
              message: "登录成功",
              type: "success"
            });
            const { token } = res;

            // 将token存储到localStorage里
            localStorage.setItem("eleToken", token);
            // 解析token
            const decode = jwt_decode(token);

            // token存储到vuex中
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);

            this.$router.push("/index");
          });
        } else {
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
.login {
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
  top: 20%;
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
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
