<template>
  <div class="wrap">
    <div class="main-title">设置</div>
    <div>
      <div>
        <button @click="editMode=!editMode">
          <span v-if="editMode">取消</span>编辑
        </button>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <fieldset :disabled="updatePending">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" :readonly="!editMode"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone" :readonly="!editMode"></el-input>
          </el-form-item>

          <el-form-item label="验证码" v-if="showPhoneCaptcha">
            <el-row>
              <el-col :span="18">
                <el-input v-model="tmp.phoneCaptcha"></el-input>
              </el-col>
              <el-col :span="6">
                <sendCaptcha sendBy="phone" :sendTo="form.phone"/>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="form.mail" :readonly="!editMode"></el-input>
          </el-form-item>

          <el-form-item label="验证码" v-if="showMailCaptcha">
            <el-row>
              <el-col :span="18">
                <el-input v-model="tmp.mailCaptcha"></el-input>
              </el-col>
              <el-col :span="6">
                <sendCaptcha sendBy="mail" :sendTo="form.mail"/>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" :readonly="!editMode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" v-if="editMode">提交</el-button>
          </el-form-item>
        </fieldset>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "../../lib/api";
import session from "../../lib/session";
import sendCaptcha from "../../components/send_captcha";
import { is } from "../../lib/validation";

export default {
  components: { sendCaptcha },
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value != this.formCopy.username) {
        if (value.length < 5) {
          callback(new Error("用户名不可短于5位"));
        } else if (!is.username(value)) {
          callback(new Error("用户名格式有误"));
        } else {
          api("user/exists", {
            where: { and: { username: this.form.username } }
          }).then(r => {
            if (r.data) {
              callback(new Error("用户名已存在"));
            } else callback();
          });
        }
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value != this.formCopy.phone) {
        if (!is.phone(value)) {
          callback(new Error("手机格式有误"));
        } else {
          api("user/exists", {
            where: { and: { phone: this.form.phone } }
          }).then(r => {
            if (r.data) {
              callback(new Error("手机号已存在"));
            } else {
              this.showCaptcha = true;
              callback();
            }
          });
        }
      } else {
        callback();
      }
    };
    var checkMail = (rule, value, callback) => {
      if (value != this.formCopy.mail) {
        if (!is.mail(value)) {
          callback(new Error("邮箱格式有误"));
        } else {
          api("user/exists", {
            where: { and: { mail: this.form.mail } }
          }).then(r => {
            if (r.data) {
              callback(new Error("邮箱已存在"));
            } else {
              this.showMailCaptcha = true;
              callback();
            }
          });
        }
      } else {
        callback();
      }
    };
    return {
      editMode: false,
      updatePending: false,
      showPhoneCaptcha: false,
      showMailCaptcha: false,
      form: {},
      formCopy: {},
      tmp: {},
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        mail: [{ validator: checkMail, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api("user/update", this.form).then(() => {
            this.read();
            this.copyData();
          });
        } else {
          return false;
        }
      });
    },
    read() {
      api("user/find", { id: session.user("id") }).then(r => {
        this.form = r.data;
        this.copyData();
      });
    },
    copyData() {
      this.formCopy = { ...this.form };
    }
  }
};
</script>
<style scoped>
.main-title {
  margin-bottom: 1rem;
}
form {
  padding: 1rem 0;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}
[disabled] {
  opacity: 0.5;
}

.el-form-item {
  margin-right: 100px;
}
</style>

