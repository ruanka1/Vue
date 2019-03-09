<template>
  <button class="el-button" type="button" @click="send" :disabled="count!=0">
    <span v-if="count">{{count}}s后重新发送</span>
    <span v-else>发送验证码</span>
  </button>
</template>

<script>
import { sendCode } from "../lib/captcha.js";
export default {
  props: ["sendBy", "sendTo", "countDown"],
  data() {
    return { timer: null, count: 0 };
  },
  methods: {
    send() {
      if (this.count) return;
      //设置验证码发送间隔时长 如果没有传则默认60
      this.count = this.countDown || 60;
      this.timer = setInterval(() => {
        this.count--;
        if (this.count == 0) clearInterval(this.timer);
      }, 1000);
      sendCode(this.sendBy, this.sendTo).then(r => {
        this.$emit("send", r);
      });
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 140px;
}
</style>

