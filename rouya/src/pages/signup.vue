<template>
  <el-row class="container">
    <div class="form-container">
      <h1>注册</h1>
      <form @submit.prevent="signup">
        <el-tabs v-model="signupBy">
          <label>用户名
            <el-input type="text" v-model="form.username"></el-input>
            <div class="error" v-for="it in error" :key="it.id">{{it.username}}</div>
          </label>
          <el-tab-pane label="手机注册" name="phone">
            <label>手机
              <el-input v-model="form.phone"></el-input>
              <div class="error" v-for="it in error" :key="it.id">{{it.phone}}</div>
            </label>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="mail">
            <label>邮箱
              <el-input v-model="form.mail"></el-input>
              <div class="error" v-for="it in error" :key="it.id">{{it.mail}}</div>
            </label>
          </el-tab-pane>
          <label>密码
            <el-input type="password" v-model="form.password"></el-input>
            <div class="error" v-for="it in error" :key="it.id">{{it.password}}</div>
          </label>
          <label>确认密码
            <el-input type="password" v-model="form.rep_password"></el-input>
            <div class="error" v-for="it in error" :key="it.id">{{it.rep_password}}</div>
          </label>
          <label>验证码
            <fieldset :disabled="usernameExist||accountExist||!this.form[this.signupBy]">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="form.code" placeholder="请输入内容"></el-input>
                  <div class="error" v-for="it in error" :key="it.id">{{it.code}}</div>
                </el-col>
                <el-col :span="10">
                  <sendCaptcha @send="onCaptchaSend" :sendBy="signupBy" :sendTo="form[signupBy]"/>
                </el-col>
              </el-row>
            </fieldset>
          </label>
          <label>
            <button type="submit">注册</button>
          </label>
        </el-tabs>
      </form>
    </div>
  </el-row>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import { is } from "../lib/validation.js";
import sendCaptcha from "../components/send_captcha";

export default {
  components: { sendCaptcha },
  data() {
    return {
      signupBy: "phone",
      form: {
        username: "",
        phone: "",
        mail: "",
        password: "",
        rep_password: "",
        code: ""
      },
      sendCodeCountDown: 0,
      error: [],
      usernameExist: false,
      accountExist: false,
      code: null,
      codeTimer: null
    };
  },
  methods: {
    validate() {
      let f = this.form;
      let e = (this.error = []);
      this.accountExist = false;
      this.usernameExist = false;

      let signupBy = this.signupBy;
      //检查用户名 必填且不可短于6位
      if (f.username.length < 5) e.push({ username: "用户名不可短于5位" });
      //如果手机注册则检查手机号 必填且正则验证
      if (signupBy == "phone" && (!f.phone || !is.phone(f.phone)))
        e.push({ phone: "手机格式有误" });
      //如果邮箱注册则检查邮箱 必填且正则验证
      if (signupBy == "mail" && (!f.mail || !is.mail(f.mail)))
        e.push({ mail: "邮箱格式有误" });
      // 检查验证码 必填且不可短于6位
      if (f.code != this.code) e.push({ code: "验证码有误" });
      //检查密码 必填且不可短于6位
      if (f.password.length < 6) e.push({ password: "密码不可短于6位" });
      //检查二次密码是否输入一致
      if (f.rep_password) {
        if (f.rep_password != f.password)
          e.push({ rep_password: "两次输入的密码不一致" });
      } else {
        e.push({ rep_password: "请确认密码" });
      }

      if (!f.username) return;
      api("user/first", {
        where: {
          and: {
            username: f.username
          }
        }
      }).then(r => {
        if (r.data) {
          e.push({ username: "用户名已存在" });
          this.usernameExist = true;
        }
      });
      if (this.usernameExist || !f[this.signupBy]) return;
      //如果username不存在 再检查phone/mail 否则直接return
      api("user/first", {
        where: {
          and: {
            [this.signupBy]: f[this.signupBy]
          }
        }
      }).then(r => {
        if (r.data) {
          e.push({ [this.signupBy]: "帐号已注册" });
          this.accountExist = true;
        }
      });

      if (e.length || this.accountExist) {
        return false;
      } else return true;
    },

    signup() {
      if (!this.validate()) return;
      api("user/create", this.form).then(r => {
        if (r.success) session.logIn(r.data.id, r.data);
      });
    },
    onCaptchaSend(code) {
      this.code = code;
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url("../img/logo.jpg");
  background-position: -5rem 2rem;
  background-repeat: no-repeat;
  margin: auto;
}
.form-container {
  float: right;
  margin: 2rem 0;
  width: 400px;
  border-radius: 4px;
  padding: 0 2rem 2rem 2rem;
  box-shadow: 0 0 2px 1px #d5d5d5;
}
label {
  display: block;
  padding-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #606266;
  line-height: 2rem;
}
.el-input {
  margin-bottom: 0.5rem;
}
.sendCodeBtn {
  width: 130px;
}
button[type="submit"] {
  margin-top: 0.5rem;
}
</style>
