<template>
  <div class="service">
    <div class="container">
      <el-row class="icon-group">
        <el-col class="single-service" :span="6">
          <span>
            <img
              class="img"
              src="https://prod-oss.emaotai.cn/front-assets/assets/image/index2/fake.png"
            >
          </span>
          <span class="text">正品保障 假一罚十</span>
        </el-col>
        <el-col class="single-service" :span="6">
          <span>
            <img
              class="img"
              src="https://prod-oss.emaotai.cn/front-assets/assets/image/index2/fakeb.png"
            >
          </span>
          <span class="text">提供发票 正规机打</span>
        </el-col>
        <el-col class="single-service" :span="6">
          <span>
            <img
              class="img"
              src="https://prod-oss.emaotai.cn/front-assets/assets/image/index2/fakec.png"
            >
          </span>
          <span class="text">官方直供 直邮到家</span>
        </el-col>
        <el-col class="single-service" :span="6">
          <span>
            <img
              class="img"
              src="https://prod-oss.emaotai.cn/front-assets/assets/image/index2/faked.png"
            >
          </span>
          <span class="text">真诚服务 顾客至上</span>
        </el-col>
      </el-row>
      <el-row class="link-group">
        <el-col :span="16">
          <el-row>
            <el-col class="single-group" :span="6">
              <div class="title">物流配送</div>
              <a class="single-link" href="#">配送方式</a>
              <a class="single-link" href="#">配送时间</a>
              <a class="single-link" href="#">配送费用</a>
            </el-col>
            <el-col class="single-group" :span="6">
              <div class="title">商城指南</div>
              <a class="single-link" href="#">用户协议</a>
              <a class="single-link" href="#">服务协议</a>
            </el-col>
            <el-col class="single-group" :span="6">
              <div class="title">售后服务</div>
              <a class="single-link" href="#">退换货说明</a>
              <a class="single-link" href="#">购物须知</a>
              <a class="single-link" href="#">关于专票</a>
            </el-col>
            <el-col class="single-group" :span="6">
              <div class="title">关于我们</div>
              <a class="single-link" href="#">公司资质</a>
              <a class="single-link" href="#">文化理念</a>
              <a class="single-link" href="#">联系我们</a>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="contact" :span="8">
          <div class="phone">0991-3671940</div>
          <div class="text">每日9:00-22:00在线服务</div>
          <a class="btn" href="#">联系客服</a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.service {
  background-color: #fff;
  text-align: center;
}
.single-service {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.single-service:last-of-type {
  border-right: 0;
}
.icon-group,
.link-group {
  padding: 2rem 0;
}
.icon-group {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.icon-group .img {
  vertical-align: bottom;
}
.icon-group .text {
  display: inline-block;
  padding-left: 0.5rem;
  padding-bottom: 0.4rem;
}
.link-group .single-group:last-child {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.single-group .title {
  margin-bottom: 1rem;
}
.single-group .single-link {
  display: block;
  font-size: 0.8rem;
  margin-top: 0.7rem;
  color: #777;
}
.single-group .single-link:hover {
  color: #922b2f;
}
.contact .phone {
  font-size: 1.5rem;
  color: #922b2f;
  margin-bottom: 0.5rem;
}
.contact .text {
  font-size: 0.8rem;
  margin-bottom: 1.2rem;
}
.contact .btn {
  color: #922b2f;
  border: 1px solid #922b2f;
  padding: 0.5rem 1.2rem;
}
.contact .btn:hover {
  background-color: #922b2f;
  color: #fff;
}
</style>

