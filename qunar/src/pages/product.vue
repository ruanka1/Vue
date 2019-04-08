<template>
  <div class="container">
    <div v-if="product.title">
      <ProductHeader :product="product"/>
      <div class="recom">
        <div class="title">
          <span class="icon"></span>
          去哪儿推荐
        </div>
        <div class="item">
          <div class="left">
            <div>汤峪天潭温泉成人票</div>
            <div class="muted">可定明日</div>
          </div>
          <div class="right">
            <span>￥</span>
            <span class="num">192</span>
            <div class="btn">预定</div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <div>汤峪天潭温泉儿童票</div>
            <div class="muted">可定明日</div>
          </div>
          <div class="right">
            <span>￥</span>
            <span class="num">99</span>
            <div class="btn">预定</div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <div>汤峪天潭温泉学生票</div>
            <div class="muted">可定明日</div>
          </div>
          <div class="right">
            <span>￥</span>
            <span class="num">99</span>
            <div class="btn">预定</div>
          </div>
        </div>
      </div>

      <TicketList :list="ticketList"/>

      <GlobalFooter/>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import GlobalFooter from "../components/global_footer";
import ProductHeader from "../components/product/product_header";
import TicketList from "../components/product/product_ticketlist";
export default {
  components: { GlobalFooter, ProductHeader, TicketList },
  data() {
    return {
      product: {
        id: null
      },
      ticketList: [
        {
          title: "成人票",
          children: [
            { title: "提前一天" },
            { title: "提前两天" },
            { title: "提前三天" }
          ]
        },
        {
          title: "学生票",
          children: [
            { title: "提前一天" },
            { title: "提前两天" },
            { title: "提前三天" }
          ]
        },
        {
          title: "儿童票",
          children: [
            { title: "提前一天" },
            { title: "提前两天" },
            { title: "提前三天" }
          ]
        }
      ]
    };
  },
  mounted() {
    this.product.id = this.$route.params.id;
    this.findProduct();
  },
  methods: {
    findProduct() {
      api("recom/read", {
        where: {
          and: {
            id: this.product.id
          }
        }
      }).then(r => {
        this.product = r.data[0];
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  background-color: #eee;

  .recom {
    margin-top: 0.1rem;
    margin-bottom: 0.2rem;
    background-color: #fff;

    .title {
      position: relative;
      height: 0.88rem;
      padding: 0 0.7rem;
      font-size: 0.32rem;
      line-height: 0.88rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .icon {
      position: absolute;
      top: 0.25rem;
      left: 0.2rem;
      width: 0.36rem;
      height: 0.36rem;
      background: url('../img/product/recom.png');
      background-repeat: no-repeat;
      background-size: 0.36rem 0.36rem;
      background-position: 0 center;
    }

    .item {
      display: flex;
      margin: 0 0.2rem;
      padding: 0.2rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .left {
        width: 80%;
        line-height: 0.52rem;
        font-size: 0.3rem;

        .muted {
          height: 0.32rem;
          color: #616161;
          font-size: 0.24rem;
          line-height: 0.32rem;
          padding-top: 0.15rem;
        }
      }

      .right {
        width: 20%;
        text-align: center;
        color: #ff9800;

        .num {
          font-size: 0.4rem;
          line-height: 0.4rem;
        }

        .btn {
          height: 0.6rem;
          color: #fff;
          font-size: 0.28rem;
          line-height: 0.6rem;
          border-radius: 0.08rem;
          background-image: linear-gradient(130deg, #ffab1e 37%, #ff8c12 100%);
        }
      }
    }

    .item:last-child {
      border-bottom: 0;
    }
  }

  .loading {
    background-color: #fff;
    margin-top: 70%;
    color: #00afc7;
    font-weight: bold;
    text-align: center;
  }
}
</style>
