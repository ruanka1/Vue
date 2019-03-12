<template>
  <div class="wrap">
    <div>
      <span class="main-title">用户管理</span>
      <span>共有{{total}}位用户</span>
    </div>
    <div class="editForm">
      <el-button-group>
        <el-button @click="ui.showForm=!ui.showForm">创建</el-button>
      </el-button-group>
      <form @submit.prevent="createOrUpdate()" v-if="ui.showForm">
        <div class="item">
          <label>
            <span class="title">用户名</span>
            <input type="text" v-model="form.username">
            <span class="error" v-for="it in error" :key="it.id">{{it.username}}</span>
          </label>
        </div>
        <div class="item">
          <label>
            <span class="title">手机</span>
            <input type="text" v-model="form.phone">
            <span class="error" v-for="it in error" :key="it.id">{{it.phone}}</span>
          </label>
        </div>
        <div class="item">
          <label>
            <span class="title">邮箱</span>
            <input type="text" v-model="form.mail">
            <span class="error" v-for="it in error" :key="it.id">{{it.mail}}</span>
          </label>
        </div>
        <div class="item">
          <label>
            <span class="title">密码</span>
            <input type="text" v-model="form.password">
            <span class="error" v-for="it in error" :key="it.id">{{it.password}}</span>
          </label>
        </div>
        <button class="btn el-button el-button--primary" type="submit">提交</button>
        <button class="el-button el-button--text" type="button" @click="resetForm()">取消</button>
      </form>
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
    return {
      ui: {
        showForm: true
      },
      readParam: {
        limit: 10,
        page: 1
      },
      list: [],
      form: {},
      total: 0,
      updateOriginal: null,
      error: []
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    read() {
      api("user/read", this.readParam).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    },
    validateForm() {
      let f = this.form;
      let e = (this.error = []);

      if (!f.username) {
        e.push({ username: "用户名为必填项" });
      } else {
        if (f.username.length < 5) e.push({ username: "用户名不可短于5位" });
      }

      if (!f.phone && !f.mail) {
        e.push({ phone: "手机或邮箱为必填项" }, { mail: "手机或邮箱为必填项" });
      } else if (f.phone && !f.mail) {
        if (!is.phone(f.phone)) e.push({ phone: "手机格式有误" });
      } else if (!f.phone && f.mail) {
        if (!is.mail(f.mail)) e.push({ mail: "邮箱格式有误" });
      } else if (f.phone && f.mail) {
        if (!is.phone(f.phone)) {
          e.push({ phone: "手机格式有误" });
        }
        if (!is.mail(f.mail)) {
          e.push({ mail: "邮箱格式有误" });
        }
      }

      if (!f.password) {
        e.push({ password: "密码为必填项" });
      } else {
        if (f.password.length < 6) e.push({ password: "密码不可短于5位" });
      }

      if (e.length) {
        return false;
      } else {
        return true;
      }
    },

    createOrUpdate() {
      if (!this.validateForm()) return;
      let f = this.form;
      let e = (this.error = []);
      if (f !== this.updateOriginal) this.resetForm();
      else {
        api("user/exists", {
          where: {
            or: {
              username: f.username,
              phone: f.phone,
              mail: f.mail
            }
          }
        }).then(r => {
          if (!r.data) {
            let f = this.form;
            let action = "create";
            if (f.id) action = "update";
            if (this.error.length !== 0) return;

            api(`user/${action}`, f).then(() => {
              this.resetForm();
              this.read();
            });
          } else {
            e.push({ username: "账户已存在" });
          }
        });
      }
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

    resetForm() {
      this.ui.showForm = false;
      this.form = {};
      this.error = [];
    },

    makeSelect(prop) {
      return it => {
        this.form[prop] = it.id;
      };
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
</style>

