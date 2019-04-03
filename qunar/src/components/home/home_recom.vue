<template>
  <div class="wrap">
    <div class="container">
      <div class="title">
        <span class="iconfont hot">&#xe78a;</span>
        热门榜单
      </div>
      <ul class="recom-list" v-for="it in list" :key="it.id">
        <li class="item">
          <img class="img" :src="it.img_url">
          <div class="info">
            <div class="item-title">{{it.title}}</div>
            <div class="item-review">{{it.review}}条评论</div>
            <div class="item-price">
              <span class="price">
                ￥
                <span class="num">{{it.price}}</span>
              </span>
              起
              <span class="position">{{it.position}}</span>
            </div>
            <div class="item-desc" v-if="it.desc">
              <div class="text">{{it.desc}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: { list: Array }
};
</script>


<style lang="stylus" scoped>
.wrap {
  background-color: #eee;
  padding-top: 0.2rem;

  .container {
    background-color: #fff;

    .title {
      padding: 0.25rem 0;
      line-height: 1;
      font-size: 0.32rem;

      .hot {
        margin-left: 0.15rem;
        color: red;
      }
    }

    .recom-list {
      .item {
        display: flex;
        margin: 0 0.2rem;
        padding: 0.2rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .img {
          width: 2rem;
          height: 2rem;
        }

        .info {
          flex: 1;
          padding-left: 0.2rem;

          .item-title {
            font-size: 0.31rem;
          }

          .item-review {
            margin-top: 0.4rem;
          }

          .item-price {
            position: relative;
            margin-top: 0.45rem;

            .price {
              color: #ff8300;

              .num {
                font-size: 0.5rem;
              }
            }

            .position {
              position: absolute;
              bottom: 0.05rem;
              color: #616161;
              right: 0;
            }
          }

          .item-desc {
            max-width: 3.6rem;
            padding: 0.15rem 0.1rem;
            margin-top: 0.1rem;
            font-size: 0.2rem;
            background: #fff9f9;
            color: #f55;
            line-height: 0.3rem;

            .text {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}
</style>

