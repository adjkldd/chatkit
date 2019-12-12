<template>
  <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
      <h3 class="form-title">Log In</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="your username" />
        <p v-if="err_msg" class="error-text">{{err_msg}}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="logining"
          class="login-btn"
          type="primary"
          @click="logIn('loginForm')"
        >Log In</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "LoginForm",
  data() {
    return {
      logining: false,
      loginForm: {
        username: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      err_msg: ""
    };
  },
  methods: {
    logIn(formName) {
      let vm = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          vm.logining = true;
          let err = await store.createUser(this.loginForm.username);
          if (!err) {
            vm.logining = false;
            this.$router.push("/dashboard");
          } else {
            this.err_msg = err.info.error_description;
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 400px;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #4da6a6;
  padding: 10px;
  margin-top: 100px;
}

.form-title {
  margin-bottom: 24px;
}

.login-btn {
  width: 100%;
}

.error-text {
  color: red;
  text-align: left;
}
</style>