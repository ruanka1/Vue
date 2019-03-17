<template>
  <div class="wrap">
    <div>
      <span class="main-title">分类管理</span>
      <span>共有{{total}}个分类</span>
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
        <el-form-item label="分类名称" prop="catname">
          <el-input v-model="form.catname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="catname" label="分类名称"></el-table-column>
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
import api from "../../lib/api.js";
export default {
  data() {
    var checkCatname = (rule, value, callback) => {
      if (value) {
        if (
          !this.form.id ||
          (this.form.id && this.form.catname != this.updateOriginal.catname)
        ) {
          api("cat/exists", {
            where: { and: { catname: this.form.catname } }
          }).then(r => {
            if (r.data) {
              callback(new Error("分类名已存在"));
            } else callback();
          });
        } else callback();
      } else {
        callback(new Error("请填写分类名"));
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
        catname: ""
      },
      rules: {
        catname: [{ validator: checkCatname, trigger: "blur" }]
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
          api(`cat/${action}`, this.form).then(() => {
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
      this.ui.showForm = false;
    },
    cancleEdit() {
      this.form = {};
      this.ui.showForm = false;
    },
    read() {
      api("cat/read", this.readParam).then(r => {
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
      api("cat/delete", {
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

