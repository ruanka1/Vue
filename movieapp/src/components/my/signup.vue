<template>
  <div class="form-container">
    <form @submit.prevent="signup">
      <div class="input-item">
        <input v-model="form.phone" placeholder="请输入手机号" class="phone" :disabled="lockPhone">
        <a :class="'send '+(disableCaptcha?'disable':'')" @click="sendCaptcha">
          <span v-if="count">{{count}}</span>
          <span v-else>发送验证码</span>
        </a>
      </div>
      <div class="input-item">
        <input v-model="form.password" placeholder="请输入密码" type="password">
      </div>
      <div class="input-item">
        <input v-model="form.rep_password" placeholder="请确认密码" type="password">
      </div>
      <div v-if="!disableCaptcha" class="input-item">
        <input v-model="form.code" placeholder="请输入验证码">
      </div>
      <div class="error" v-for="it in errorList" :key="it.index">{{it}}</div>

      <button class="btn" type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import session from "../../lib/session";
import { UserRequest } from "../../models/user";
const userRequest = new UserRequest();
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        rep_password: "",
        code: ""
      },
      errorList: [],
      code: "",
      disableCaptcha: true,
      count: 0,
      lockPhone: false
    };
  },
  methods: {
    validate() {
      let f = this.form;
      let e = (this.errorList = []);

      if (!f.phone || f.phone.length != 11) e.push("手机格式有误");

      if (!f.password || f.password.length < 6) e.push("密码不可短于6位");

      if (f.rep_password) {
        if (f.rep_password != f.password) e.push("输入的密码不一致");
      } else {
        e.push("请确认密码");
      }

      if (e.length == 0) return true;
      else {
        return false;
      }
    },

    signup() {
      if (!this.validate()) return;
      let f = this.form;
      let e = (this.errorList = []);

      userRequest
        .validateExist({
          where: {
            and: {
              phone: f.phone
            }
          }
        })
        .then(r => {
          if (r.data == true) {
            e.push("帐号已注册");
            return;
          } else {
            this.disableCaptcha = false;
            this.lockPhone = true;
            if (!f.code) {
              e.push("请输入验证码");
              return;
            } else if (f.code && f.code != this.code) {
              e.push("验证码有误");
              return;
            }
            userRequest
              .createUser({
                phone: this.form.phone,
                password: this.form.password
              })
              .then(r => {
                if (r.success) {
                  alert("注册成功");
                  delete r.data.password;
                  session.logIn(r.data.id, r.data);
                  this.reloadPage();
                } else {
                  alert("注册失败");
                }
              });
          }
        });
    },

    sendCaptcha() {
      if (this.count || this.disableCaptcha) return;
      this.count = 60;
      this.timer = setInterval(() => {
        this.count--;
        if (this.count == 0) clearInterval(this.timer);
      }, 1000);
      userRequest.sendCaptcha({ phone: this.form.phone }).then(r => {
        this.code = r;
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
  display: flex;
}

.phone {
  flex: 1;
}

.send {
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  width: 2rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  padding: 0.1rem;
  font-size: 0.32rem;
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
  text-align: center;
}

.error {
  padding-top: 0.2rem;
  color: red;
  font-size: 0.3rem;
}

.disable {
  color: #d7dce0;
}
</style>
