<template>
  <div class="form-container">
    <form @submit.prevent="login">
      <div class="input-item">
        <input v-model="form.phone" placeholder="请输入手机号">
      </div>
      <div class="input-item">
        <input v-model="form.password" placeholder="请输入密码" type="password">
      </div>
      <div class="error" v-for="it in errorList" :key="it.index">{{it}}</div>

      <button class="btn" type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import session from "../../lib/session";
import { UserRequest } from "../../models/user";
const userRequset = new UserRequest();
export default {
  data() {
    return {
      session,
      form: {
        phone: "",
        password: ""
      },
      errorList: []
    };
  },
  methods: {
    validate() {
      let e = (this.errorList = []);
      if (!this.form.phone) e.push("请输入手机号");
      if (!this.form.password) e.push("请输入密码");
      if (e.length == 0) return true;
      else {
        return false;
      }
    },

    login() {
      if (!this.validate()) return;
      let params = {
        where: {
          or: [["phone", "=", this.form.phone]]
        }
      };
      userRequset.loginValidate(params).then(r => {
        if (r.data) {
          if (r.data.password !== this.form.password) {
            this.errorList.push("密码输入有误");
          } else {
            delete r.data.password;
            session.logIn(r.data.id, r.data);
            this.reloadPage();
          }
        } else {
          this.errorList.push("账号不存在");
        }
      });
    },
    reloadPage() {
      location.reload();
    }
  }
};
</script>

<style scoped>
input,
button {
  font-family: sans-serif;
}
.form-container {
  margin: 0.3rem;
  background: #fff;
  font-size: 0.16rem;
}

.input-item {
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 0;
  font-size: 0.38rem;
}

.btn {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #f03d37;
  border-radius: 5px;
  border: none;
  display: block;
  color: #fff;
  font-size: 0.38rem;
  margin-top: 0.5rem;
}

.error {
  padding-top: 0.2rem;
  color: red;
  font-size: 0.3rem;
}
</style>
