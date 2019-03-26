<template>
  <div class="footer">
    <div class="container">
      <el-row>
        <el-col class="left" :span="18">
          <div class="link-group">
            <a class="link-item blank-link" href="#!">联系我们</a>
            <a class="link-item blank-link" href="#!">合作招商</a>
            <a class="link-item blank-link" href="#!">招贤纳士</a>
            <a class="link-item blank-link" href="#!">真伪查询</a>
            <a class="link-item blank-link" href="#!">打假维权</a>
          </div>
          <div class="meta-info">
            <p>Copyright 2018-2019 ©乌鲁木齐市玖广源商贸有限公司</p>
            <div>
              <img
                src="https://prod-oss.emaotai.cn/front-assets/assets/image/index/footer/warn.png"
              >
              新公网安备 65010402001476号
            </div>
            <p>公司地址：乌鲁木齐市新市区北京中路147号西部豪庭16号楼9楼1203</p>
            <p>购买前请确认达到法定饮酒年龄！本公司不销售任何含酒精产品给18岁以下人士！</p>
          </div>
        </el-col>
        <el-col class="right" :span="6">
          <div>
            <img class="wechat-qrcode" src="../img/wechat.jpg">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #f1f1f1;
  color: #666;
  font-size: 0.6rem;
}
.footer .container {
  padding: 2rem 0;
}
.link-item {
  margin-right: 0.8rem;
}
.link-item:hover {
  color: #922b2f;
}
.meta-info img {
  vertical-align: bottom;
  height: 15px;
  width: 15px;
}
.wechat-qrcode {
  float: right;
  width: 96px;
  height: 96px;
}
</style>

