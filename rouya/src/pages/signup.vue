<template>
  <el-row class="signup-container">
    <div class="form-container">
      <h1>注册</h1>
      <form @submit.prevent="signup">
        <el-tabs v-model="signupBy">
          <label>
            <div>用户名</div>
            <el-input type="text" v-model="form.username"></el-input>
            <div class="error" v-for="it in error" :key="it.id">{{it.username}}</div>
          </label>
          <el-tab-pane label="手机注册" name="phone">
            <label>
              <div class="title">手机</div>
              <el-input v-model="form.phone"></el-input>
              <div class="error" v-for="it in error" :key="it.id">{{it.phone}}</div>
            </label>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="mail">
            <label>
              <div class="title">邮箱</div>
              <el-input v-model="form.mail"></el-input>
              <div class="error" v-for="it in error" :key="it.id">{{it.mail}}</div>
            </label>
          </el-tab-pane>
          <label>
            <div class="title">密码</div>
            <el-input type="password" v-model="form.password"></el-input>
            <div class="error" v-for="it in error" :key="it.id">{{it.password}}</div>
          </label>
          <label>
            <div class="title">确认密码</div>
            <el-input type="password" v-model="form.rep_password"></el-input>
            <div class="error" v-for="it in error" :key="it.id">{{it.rep_password}}</div>
          </label>
          <label v-show="!hideCaptcha">
            <div class="title">验证码</div>
            <fieldset>
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
      hideCaptcha: true,
      sendCodeCountDown: 0,
      error: [],
      code: null,
      codeTimer: null
    };
  },
  methods: {
    validate() {
      let f = this.form;
      let e = (this.error = []);

      let signupBy = this.signupBy;
      //检查用户名 必填且不可短于6位
      if (f.username.length < 5) e.push({ username: "用户名不可短于5位" });
      //如果手机注册则检查手机号 必填且正则验证
      if (signupBy == "phone" && (!f.phone || !is.phone(f.phone)))
        e.push({ phone: "手机格式有误" });
      //如果邮箱注册则检查邮箱 必填且正则验证
      if (signupBy == "mail" && (!f.mail || !is.mail(f.mail)))
        e.push({ mail: "邮箱格式有误" });
      //检查密码 必填且不可短于6位
      if (f.password.length < 6) e.push({ password: "密码不可短于6位" });
      //检查二次密码是否输入一致
      if (f.rep_password) {
        if (f.rep_password != f.password)
          e.push({ rep_password: "两次输入的密码不一致" });
      } else {
        e.push({ rep_password: "请确认密码" });
      }

      if (e.length == 0) return true;
      else {
        return false;
      }
    },

    signup() {
      if (!this.validate()) return;
      let f = this.form;
      let e = (this.error = []);

      api("user/exists", {
        where: {
          and: {
            username: f.username
          }
        }
      }).then(r => {
        if (r.data == true) {
          e.push({ username: "用户名已存在" });
          return;
        } else {
          api("user/exists", {
            where: {
              and: {
                [this.signupBy]: f[this.signupBy]
              }
            }
          }).then(r => {
            if (r.data == true) {
              e.push({ [this.signupBy]: "帐号已注册" });
            } else {
              this.hideCaptcha = false;
              if (!f.code) {
                e.push({ code: "请输入验证码" });
                return;
              } else if (f.code && f.code != this.code) {
                e.push({ code: "验证码有误" });
                return;
              }
              api("user/create", this.form).then(r => {
                if (r.success) session.logIn(r.data.id, r.data);
              });
            }
          });
        }
      });
    },

    onCaptchaSend(code) {
      this.code = code;
    }
  }
};
</script>

<style scoped>
@import url("../css/signup.css");
</style>
