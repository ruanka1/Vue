<template>
  <div class="signup-container">
    <div class="form-container">
      <h1>帐号恢复</h1>
      <form>
        <el-tabs v-if="step==1" v-model="findbackBy">
          <el-tab-pane label="通过手机恢复" name="phone">
            <label>手机
              <el-input v-model="form.phone"></el-input>
            </label>
          </el-tab-pane>
          <el-tab-pane label="通过邮箱恢复" name="mail">
            <label>邮箱
              <el-input v-model="form.mail"></el-input>
            </label>
          </el-tab-pane>
        </el-tabs>
        <label v-if="step==2">
          <div>验证码</div>
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="请输入内容" class="input-with-select"></el-input>
            </el-col>
            <el-col :span="10">
              <sendCaptcha @send="onCaptchaSend" :sendBy="findbackBy" :sendTo="form[findbackBy]"/>
            </el-col>
          </el-row>
        </label>
        <div v-if="step==3">
          <label>输入新密码
            <el-input v-model="form.password" type="password"></el-input>
          </label>
          <label>确认新密码
            <el-input v-model="form.rep_password" type="password"></el-input>
          </label>
        </div>
        <div class="error">
          <div v-for="it in error" :key="it.id">{{it}}</div>
        </div>
        <label>
          <button @click="nextStep()" type="button">确定</button>
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import { sendCode } from "../lib/captcha.js";
import sendCaptcha from "../components/send_captcha";

export default {
  components: { sendCaptcha },
  data() {
    return {
      findbackBy: "phone",
      form: {
        phone: "",
        mail: "",
        password: "",
        rep_password: "",
        code: ""
      },
      sendCodeCountDown: 0,
      error: [],
      code: null,
      codeTimer: null,
      step: 1,
      user: null
    };
  },
  methods: {
    nextStep() {
      this.error = [];
      switch (this.step) {
        case 1:
          if (!this.form[this.findbackBy]) {
            this.error.push("请输入账号");
            return;
          }
          api("user/first", {
            where: {
              and: {
                [this.findbackBy]: this.form[this.findbackBy]
              }
            }
          }).then(r => {
            if (!r.data) {
              this.error.push("账号不存在");
            } else {
              this.user = r.data;
              this.step++;
            }
          });
          break;
        case 2:
          if (this.form.code) {
            if (this.code == this.form.code) {
              this.step++;
            } else {
              this.error.push("验证码有误");
            }
          } else {
            this.error.push("请输入验证码");
          }
          break;
        case 3:
          if (this.form.password.length < 6) this.error.push("密码不可短于6位");
          if (this.form.rep_password !== this.form.password)
            this.error.push("两次输入的密码不一致");
          if (!this.error.length) {
            this.form.id = this.user.id;
            api("user/update", {
              id: this.user.id,
              password: this.form.password,
              [this.findbackBy]: this.form[this.findbackBy]
              // eslint-disable-next-line
            }).then(r => {
              alert("密码修改成功");
              this.$router.push("/login");
            });
          }
          break;
      }
    },
    onCaptchaSend(code) {
      this.code = code;
    },
    sendAuthCode() {
      sendCode(this.findbackBy, this.form[this.findbackBy], code => {
        this.code = code;
      });
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
label {
  padding-bottom: 0;
}
.error {
  padding-bottom: 0.5rem;
}
</style>


