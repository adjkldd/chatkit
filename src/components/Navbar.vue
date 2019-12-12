<template>
  <el-row class="navbar">
    <el-col class="navbar-left" :xs="{offset: 1, span: 8}" :sm="{offset: 1, span: 4}">
      <h1>ChatKit</h1>
    </el-col>
    <el-col class="navbar-right" :xs="{offset: 6, span: 9}" :sm="{offset: 14, span: 5}">
      <span
        v-if="! state.currentUser"
        class="navbar-com navbar-com-login"
        @click="$router.push('/login')"
      >Log In</span>
      <template v-else>
        <span class="navbar-com navbar-com-logout" @click="logout">Logout</span>
        <span class="navbar-com navbar-com-divider">|</span>
        <span
          class="navbar-com navbar-com-username"
        >{{ state.currentUser.name || state.currentUser.id }}</span>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import store from "../store";

export default {
  name: "Navbar",
  data() {
    return {
      state: store.state
    };
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      // in Console tab, open Setting, choose 'preserve log'
      // otherwise, you cannot see the following log
      console.log(`reloading`);
      if (this.state.currentUser) {
        // hasn't log out
        console.log("set reconnect to true");
        // 得先把 state 保存到 localStorage 里
        this.state.reconnect = true;
        this.state.uid = this.state.currentUser.id;
      }
    });

    if (this.state.reconnect) {
      console.log("reconnecting...");
      store.createUser(this.state.uid);
    }
  },
  methods: {
    async logout() {
      await store.deleteUser();
      this.$router.push("/");
    }
  }
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
  cursor: pointer;

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