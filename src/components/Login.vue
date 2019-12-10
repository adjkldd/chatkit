<template>
  <div>
    <el-form class="login-form">
      <h3 class="form-title">Log In</h3>
      <el-form-item>
        <el-input v-model="username" placeholder="your username" />
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="logIn">Log In</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    logIn() {
      this.$router.push("/dashboard");
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
</style>