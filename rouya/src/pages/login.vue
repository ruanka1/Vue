<template>
  <div class="signup-container">
    <div class="form-container">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <label>
          用户名/手机/邮箱
          <el-input v-model="form.loginName"></el-input>
          <div class="error" v-for="it in error" :key="it.id">{{it.loginName}}</div>
        </label>
        <label>
          密码
          <el-input v-model="form.password" type="password"></el-input>
          <div class="error" v-for="it in error" :key="it.id">{{it.password}}</div>
        </label>
        <div class="error">
          <!-- eslint-disable-next-line -->
        </div>
        <button type="submit">登录</button>
        <el-button type="text">
          <router-link to="/findback" class="forgetPassword">忘记密码？</router-link>
        </el-button>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
export default {
  data() {
    return {
      form: {
        loginName: "",
        password: ""
      },
      error: []
    };
  },
  methods: {
    login() {
      //如果未通过登陆验证则直接return
      if (this.validate() == false) return;
      //判断是否为admin登录
      if (
        this.form.loginName === "rouyaAdmin" &&
        this.form.password === "admin123"
      ) {
        session.logIn("admin", { username: "admin", IS_ADMIN: true });
        return;
      }
      //验证账号密码是否正确
      let params = {
        where: {
          or: [
            ["username", "=", this.form.loginName],
            ["phone", "=", this.form.loginName],
            ["mail", "=", this.form.loginName]
          ]
        }
      };
      api("user/first", params).then(r => {
        if (r.data) {
          if (r.data.password !== this.form.password) {
            this.error.push({ password: "密码输入有误" });
          } else {
            delete r.data.password;
            session.logIn(r.data.id, r.data);
          }
        } else {
          this.error.push({ loginName: "账户不存在" });
        }
      });
    },
    validate() {
      this.error = [];
      if (!this.form.loginName)
        this.error.push({ loginName: "请输入手机号或邮箱" });
      if (!this.form.password) this.error.push({ password: "请输入密码" });
      if (this.error.length) return false;
    }
  }
};
</script>

<style scoped>
@import url("../css/signup.css");
.signup-container {
  height: 700px;
  position: relative;
}
.form-container {
  position: absolute;
  right: 0;
  top: 11.5rem;
}
</style>


