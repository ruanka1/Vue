<template>
  <div class="wrap">
    <div>
      <span class="main-title">用户管理</span>
      <span>共有{{total}}位用户</span>
    </div>
    <div class="editForm">
      <el-button-group>
        <el-button v-if="!ui.showForm" @click="ui.showForm=true">创建</el-button>
        <el-button v-if="ui.showForm" @click="cancleEdit()">取消</el-button>
      </el-button-group>
      <el-form
        v-if="ui.showForm"
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="mail" label="邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :page-size="readParam.limit"
        :current-page="readParam.page"
        layout="prev, pager, next"
        :total="total"
        @current-change="flip"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { is } from "../../lib/validation.js";
import api from "../../lib/api.js";
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value) {
        if (value.length < 5) {
          callback(new Error("密码不可短于5位"));
        } else if (!is.username(value)) {
          callback(new Error("用户名格式有误"));
        } else if (
          !this.form.id ||
          (this.form.id && this.form.username != this.updateOriginal.username)
        ) {
          api("user/exists", {
            where: { and: { username: this.form.username } }
          }).then(r => {
            if (r.data) {
              callback(new Error("用户名已存在"));
            } else callback();
          });
        } else callback();
      } else {
        callback(new Error("请填写用户名"));
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!this.form.phone && !this.form.mail) {
        callback(new Error("请填写手机号或邮箱"));
      } else if (value) {
        if (!is.phone(value)) {
          callback(new Error("手机号格式有误"));
        } else if (
          !this.form.id ||
          (this.form.id && this.form.phone != this.updateOriginal.phone)
        ) {
          api("user/exists", {
            where: { and: { phone: this.form.phone } }
          }).then(r => {
            if (r.data) {
              callback(new Error("手机号已注册"));
            } else callback();
          });
        } else callback();
      } else callback();
    };
    var checkMail = (rule, value, callback) => {
      if (!this.form.mail && !this.form.mail) {
        callback(new Error("请填写邮箱或邮箱"));
      } else if (value) {
        if (!is.mail(value)) {
          callback(new Error("邮箱格式有误"));
        } else if (
          !this.form.id ||
          (this.form.id && this.form.mail != this.updateOriginal.mail)
        ) {
          api("user/exists", {
            where: { and: { mail: this.form.mail } }
          }).then(r => {
            if (r.data) {
              callback(new Error("邮箱已注册"));
            } else callback();
          });
        } else callback();
      } else callback();
    };
    var checkPassword = (rule, value, callback) => {
      if (value) {
        if (value.length < 6) {
          callback(new Error("密码不可短于6位"));
        } else callback();
      } else {
        callback(new Error("请填写密码"));
      }
    };
    return {
      ui: {
        showForm: false
      },
      readParam: {
        limit: 10,
        page: 1
      },
      list: [],
      total: 0,
      form: {
        username: "",
        phone: "",
        mail: "",
        password: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        mail: [{ validator: checkMail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    submitForm(formName) {
      let action = "create";
      if (this.form.id) action = "update";
      this.$refs[formName].validate(valid => {
        if (valid) {
          api(`user/${action}`, this.form).then(() => {
            this.resetForm("form");
            this.read();
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form = {};
    },
    cancleEdit() {
      this.ui.showForm = false;
      this.form = {};
    },
    read() {
      api("user/read", this.readParam).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    },

    fill(row) {
      this.ui.showForm = true;
      this.updateOriginal = row;
      this.form = {
        ...row
      };
    },

    remove(id) {
      if (!confirm("确定要删除此项吗？")) return;

      api("user/delete", {
        id
      }).then(() => {
        this.read();
      });
    },

    flip(page) {
      this.readParam.page = page;
      this.read();
    }
  }
};
</script>
<style scoped>
@import url("../../css/admin.css");
form {
  padding: 1rem 0;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
input {
  margin-right: 1rem;
}
.el-form-item {
  margin-right: 100px;
}
</style>

