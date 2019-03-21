<template>
  <div class="wrap">
    <div>
      <span class="main-title">商品管理</span>
      <span>共有{{total}}个商品</span>
    </div>
    <div class="editForm">
      <el-button-group>
        <el-button v-if="!ui.showForm" @click="ui.showForm=true">创建</el-button>
        <el-button v-if="ui.showForm" @click="cancleEdit()">取消</el-button>
      </el-button-group>
      <el-form :model="form" :rules="rules" ref="form" label-width="130px" v-if="ui.showForm">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣" prop="discount">
          <el-input v-model="form.discount"></el-input>
        </el-form-item>
        <el-form-item label="商品运费" prop="carriage">
          <el-input v-model="form.carriage"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stock">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品销量" prop="sales">
          <el-input v-model="form.sales"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="cat_id">
          <el-select v-model="form.cat_id" placeholder="请选择商品分类">
            <el-option v-for="it in catList" :key="it.id" :value="it.id" :label="it.catname"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="新品推荐" prop="new_product">
          <el-switch v-model="form.new_product" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="热卖推荐" prop="hot_product">
          <el-switch v-model="form.hot_product" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="轮播推荐" prop="slide_product">
          <el-switch v-model="form.slide_product" active-color="#13ce66"></el-switch>
        </el-form-item>

        <el-form-item label="上传轮播图片" v-if="form.slide_product" class="item" :gutter="10">
          <el-row>
            <el-row class="first-row">
              <Uploader class="uploader" @uploadSuccess="slideImgUpload" :autoUpload="true"/>
            </el-row>
            <el-col class="wrapper" :span="8">
              <img
                v-if="form.slide_img"
                :src="'https://' + form.slide_img._base_url + '/' + form.slide_img._key"
              >
              <button @click="removeSlideImg()" type="button">删除</button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="商品属性" prop="propForm">
          <input v-model="propForm.key" type="text" placeholder="属性名称">
          <input
            v-model="propForm.value"
            class="prop-value"
            type="text"
            placeholder="属性值  多个值之间用 | 隔开"
          >
          <button @click="addProp" type="button">添加</button>

          <div class="show-prop" v-for="(value,key) in form.prop" :key="(value,key)">
            <span class="show-prop-data">{{key}}</span>
            <span class="show-prop-data">{{value}}</span>
            <button @click="editProp(key,value)" type="button">编辑</button>
            <button @click="removeProp(key)" type="button">删除</button>
          </div>
        </el-form-item>

        <el-form-item class="item" label="上传商品图片" :gutter="10">
          <Uploader class="uploader" @uploadSuccess="mainImgUpload" :autoUpload="true"/>
          <el-col class="wrapper" :span="8" v-for="(it,key) in form.main_img" :key="(it,key)">
            <img :src="'https://' + it._base_url + '/' + it._key">
            <button @click="removeMainImg(key)" type="button">删除</button>
          </el-col>
        </el-form-item>

        <el-form-item class="product_detail item" label="添加详情描述">
          <el-button type="button" @click="inertDes('text')">添加描述文字</el-button>
          <el-button type="button" @click="inertDes('image')">添加描述图片</el-button>
          <div class="inertDes" v-for="(it,i) in form.detail" :key="(it,i)">
            <div class="des-text" v-if="it.type==='text'">
              <el-input type="textarea" v-model="it.value" placeholder="添加描述文字"></el-input>
            </div>
            <div v-else>
              <Uploader
                class="uploader des-img"
                @uploadSuccess="singleDesImgUpload($event,i)"
                :autoUpload="true"
              />
              <div v-if="it.value">
                <img :src="'https://' + it.value._base_url + '/' + it.value._key">
              </div>
            </div>
            <button @click="removeDes(i)" type="button">删除</button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="图片" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.main_img&&scope.row.main_img.length!=0">
              <img
                :src=" 
              'https://' + scope.row.main_img[0]._base_url + '/' + scope.row.main_img[0]._key "
              >
            </div>
            <div v-else>暂无图片</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="220"></el-table-column>
        <el-table-column prop="price" label="原价" width="80"></el-table-column>
        <el-table-column prop="carriage" label="运费" width="80"></el-table-column>
        <el-table-column prop="stock" label="库存" width="80"></el-table-column>
        <el-table-column prop="$cat.catname" label="分类" width="200"></el-table-column>
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
import Uploader from "../../components/uploader";
export default {
  components: { Uploader },
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!value) callback(new Error("请输入商品价格"));
      value = Number(value);
      if (typeof value === "number" && !isNaN(value)) {
        if (value <= 0) callback(new Error("价格不可小于零"));
        else callback();
      } else callback(new Error("格式有误"));
    };
    var checkDiscount = (rule, value, callback) => {
      if (value) {
        value = Number(value);
        if (typeof value === "number" && !isNaN(value)) {
          if (value <= 0 || value > 1)
            callback(new Error("价格不可小于0或大于1"));
          else callback();
        } else callback(new Error("格式有误"));
      } else callback();
    };
    var checkCarriage = (rule, value, callback) => {
      if (value) {
        value = Number(value);
        if (typeof value === "number" && !isNaN(value)) {
          if (value < 0) callback(new Error("运费不可小于0"));
          else callback();
        } else callback(new Error("格式有误"));
      } else callback(new Error("请输入商品运费"));
    };
    var checkInteger = (rule, value, callback) => {
      if (value) {
        value = Number(value);
        if (typeof value === "number" && !isNaN(value) && value % 1 === 0) {
          if (value < 0) callback(new Error("不可小于0"));
          else callback();
        } else callback(new Error("格式有误 请输入整数"));
      } else callback(new Error("不可为空"));
    };
    return {
      ui: {
        showForm: false
      },
      readParam: {
        limit: 10,
        page: 1,
        with: ["belongs_to:cat"]
      },
      total: 0,
      list: [],
      catList: [],
      propForm: {},
      form: {
        title: "",
        price: "",
        discount: "",
        carriage: "",
        stock: "",
        sales: "",
        slide_product: false,
        new_product: false,
        hot_product: false
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ validator: checkPrice, trigger: "blur" }],
        discount: [{ validator: checkDiscount, trigger: "change" }],
        carriage: [{ validator: checkCarriage, trigger: "change" }],
        stock: [{ validator: checkInteger, trigger: "change" }],
        sales: [{ validator: checkInteger, trigger: "change" }],
        cat_id: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ]
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
          api(`product/${action}`, this.form).then(() => {
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
    read() {
      api("product/read", this.readParam).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
      api("cat/read").then(r => {
        this.catList = r.data;
      });
    },

    addProp() {
      if (!this.propForm.key || !this.propForm.value) return;
      if (!this.form.prop) this.$set(this.form, "prop", {});
      this.$set(this.form.prop, this.propForm.key, this.propForm.value);
      this.propForm = {};
    },
    editProp(key, value) {
      this.$set(this.propForm, "key", key);
      this.$set(this.propForm, "value", value);
    },
    removeProp(key) {
      this.$delete(this.form.prop, key);
    },
    slideImgUpload(data) {
      this.form.slide_img = data;
    },
    removeSlideImg() {
      this.form.slide_img = null;
    },
    mainImgUpload(data) {
      if (!this.form.main_img) this.$set(this.form, "main_img", []);
      this.form.main_img.push(data);
    },
    removeMainImg(index) {
      this.form.main_img.splice(index, 1);
    },
    inertDes(type) {
      if (!this.form.detail) this.$set(this.form, "detail", []);
      this.form.detail.push({ type });
    },
    singleDesImgUpload(image, index) {
      this.updateDes(index, image);
    },
    updateDes(index, value) {
      this.$set(this.form.detail[index], "value", value);
    },
    removeDes(index) {
      this.form.detail.splice(index, 1);
    },
    cancleEdit() {
      this.form = {};
      this.ui.showForm = false;
    },
    fill(row) {
      this.ui.showForm = true;
      this.form = {
        ...row
      };
    },
    remove(id) {
      if (!confirm("确定要删除此项吗？")) return;

      api("product/delete", {
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
.editForm {
  margin: 1rem 0;
}
form {
  padding: 1rem 0;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.item {
  margin-bottom: 1rem;
}
.item .title {
  display: inline-block;
  width: 7rem;
  text-align: right;
  margin-right: 1rem;
}
.item input,
.item textarea {
  width: 15rem;
}
.item textarea {
  height: 5rem;
  vertical-align: middle;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.btn {
  margin-left: 9rem;
}
.prop-value {
  margin: 0 1rem;
}
.uploader,
.wrapper {
  display: inline-block;
}
.show-prop {
  margin-top: 0.5rem;
}
.show-prop > button {
  vertical-align: top;
}
.show-prop > * {
  margin-right: 1rem;
}
.show-prop-data {
  padding: 0 1rem;
  display: inline-block;
  width: 12.7rem;
  height: 38px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.wrapper {
  margin-bottom: 1rem;
}
.uploader {
  margin-left: 0.3rem;
}
.el-form-item {
  margin-right: 100px;
}
</style>