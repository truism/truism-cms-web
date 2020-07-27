<template>
  <div class="login-container">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-with="80px"
      class="login-form"
    >
      <h2 class="login-title">Truism后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入有效账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.form.username, this.form.password).then(response => {
            const resp = response.data;
            console.log(resp);
            if (resp.flag) {
              localStorage.setItem(
                      "user-info",
                      JSON.stringify(resp.data.user)
              );
              localStorage.setItem("user-token", resp.data.token);
              this.$router.push("/");
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
  overflow: hidden;
}

.login-title {
  text-align: center;
  color: #303133;
}
</style>
