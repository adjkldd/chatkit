<template>
  <el-row class="navbar">
    <el-col class="navbar-left" :xs="{offset: 1, span: 8}" :sm="{offset: 1, span: 4}">
      <h1>ChatKit</h1>
    </el-col>
    <el-col class="navbar-right" :xs="{offset: 6, span: 9}" :sm="{offset: 14, span: 5}">
      <!-- <span class="navbar-com navbar-com-login">Log In</span> -->
      <span class="navbar-com navbar-com-logout">Logout</span>
      <span class="navbar-com navbar-com-divider">|</span>
      <span class="navbar-com navbar-com-username">Jonh Wick</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss">
@import "../element-variables.scss";
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.navbar {
  background-color: $--color-primary;
  height: $--nav-bar-height;
  line-height: $--nav-bar-height;

  &-right-wrapper {
    text-align: center;
  }
}

.navbar-com {
  padding: 0 8px;
  float: right;

  &:after {
    content: "";
    clear: both;
  }
}
.navbar-com-username {
  white-space: nowrap;
}

.navbar-right {
  padding-right: 16px;
}
</style>