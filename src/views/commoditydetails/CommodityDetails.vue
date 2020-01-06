<template>
  <!-- 商品详情页 -->
  <div>
    <div class="detail">
      <div class="detail-top">
        <van-swipe @change="onChange" :stop-propagation="false" :autoplay="auto">
          <van-swipe-item class="detail-img1" v-for="index in 2" :key="index">
            <img :src="detailsList.image" alt @click="previewshow" />
          </van-swipe-item>
          <!-- <van-swipe-item class="detail-img1">
            <img :src="detailsList.image" alt  @click="previewshow"/>
          </van-swipe-item>-->
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/2</div>
        </van-swipe>
        <div class="icon" @click="back">
          <van-icon name="arrow-left" class="arrow" />
        </div>
        <van-image-preview v-model="show" @change="onChange" :images="images" @close="close">
          <template v-slot:index>第{{ current +1 }}页</template>
        </van-image-preview>
      </div>
      <!-- 价格和产品名称 -->
      <div class="detail-name">
        <div class="name">{{detailsList.name}}</div>
        <div class="price">￥{{detailsList.present_price}}</div>
      </div>
      <!-- 运费 剩余 收藏 -->
      <div class="detail-freight">
        <div class="freight">运费：{{detailsList.__v}}</div>
        <div class="remaining">剩余：{{detailsList.amount}}</div>
        <div class="collection" v-if="falg" @click="collection">
          取消收藏
          <van-icon name="like" color="red" />
        </div>
        <div class="collection" v-else @click="collection">
          收藏
          <van-icon name="like-o" />
        </div>
      </div>
      <!-- 店铺 -->
      <div class="detail-store">
        <div class="store-name">
          <van-icon name="shop-o" />
          <div class="name">都是我的店</div>
          <div class="tag">官方</div>
        </div>
        <div class="go-store">
          前往店铺
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="empty"></div>
      <!-- 详情 评论 -->
      <div class="detail-comments">
        <van-tabs v-model="active" swipeable title-active-color="red">
          <van-tab title="商品详情">
            <div v-html="detailsList.detail" v-if="detailsList"></div>
            <div v-else>
              <van-loading size="24px" vertical>加载中...</van-loading>
            </div>
          </van-tab>
          <van-tab title="商品评价">
            <div>还没评论</div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 底部 -->
      <div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" :info="info" />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="onClickJoin(detailsList.id)"
          />
          <van-goods-action-button type="danger" text="立即购买" @click="onClickBy" />
        </van-goods-action>
      </div>
      <van-popup v-model="showed" position="bottom" closeable style=" height: 37.3vh">
        <div class="commodity">
          <div class="commodity-img">
            <img :src="detailsList.image" alt />
          </div>
          <div class="commodity-name">
            <div class="name">{{detailsList.name}}</div>
            <div class="price">￥{{detailsList.present_price}}</div>
          </div>
        </div>
        <div class="number">
          <div class="count">
            <div>购买数量：</div>
            <div>剩余件数：{{this.detailsList.amount}} <span></span> </div>
          </div>
          <div class="stepper">
            <van-stepper v-model="value" />
          </div>
        </div>
        <div class="ClickBy" @click="ClickBy">立即购买</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailsList: {},
      current: 0,
      falg: false,
      active: 0,
      //存登录信息
      user: "",
      auto: 3000,
      show: false,
      // ind: 0,
      images: [],
      showed: false,
      value: 1
    };
  },
  components: {},
  methods: {
    // 获取商品数据
    getgoodsOne() {
      this.$api
        .goodOne(this.$route.query.goodsId, 1)
        .then(res => {
          this.detailsList = res.goods.goodsOne;
          this.images.push(res.goods.goodsOne.image);
        })
        .catch(err => {
          console.log(cath);
        });
    },
    onChange(index) {
      this.current = index;
    },
    //展示图片
    previewshow() {
      this.show = !this.show;
      this.auto = 0;
    },
    // 关闭浏览时接着轮播
    close() {
      this.auto = 3000;
    },
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //点击收藏或取消收藏
    collection() {
      // 收藏
      if (!this.falg && this.user) {
        this.$api
          .collection(this.detailsList)
          .then(res => {
            this.falg = true;
            this.$toast(res.msg);
            // console.log(res);
            this.getcancelCollection();
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.user === "") {
        this.$toast("您还没登录");
      }
      //取消收藏
      else {
        this.$api
          .cancelCollection({ id: this.detailsList.id })
          .then(res => {
            this.falg = false;
            this.$toast(res.msg);
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        this.getcancelCollection();
      }
    },
    //是否收藏
    getcancelCollection() {
      this.$api
        .isCollection({ id: this.$route.query.goodsId })
        .then(res => {
          // console.log(res.isCollection);
          if (res.isCollection === 1) {
            this.falg = true;
          } else if (res.isCollection === 0) {
            this.falg = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击进入购物车
    onClickIcon() {
      this.$router.push("/shoppingcart");
    },
    //点加入购物车
    onClickJoin(id) {
      if (this.user !== "") {
        this.$api
          .addShop({ id: id })
          .then(res => {
            if (res.code === 200) {
              this.$toast(res.msg);
              //获取购物车数据
              this.$api
                .getCard()
                .then(res => {
                  if (res.shopList.length > 0) {
                    this.$store.state.shoppingcart = res.shopList;
                    // console.log(res.shopList);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else this.$toast("亲！您还没有登录哟~");
    },
    // 直接购买
    onClickBy() {
      this.showed = true;
    },
    ClickBy() {
      this.detailsList.count =this.value
      this.$router.push({
        name: "settlementpage",
        params: { item: this.detailsList }
      });
    }
  },
  mounted() {
    this.getgoodsOne();
    this.getcancelCollection();
    if (localStorage.getItem("args") !== "") {
      this.user = localStorage.getItem("args");
    }

    // this.img;
  },
  watch: {},
  computed: {
    info() {
      if (this.$store.state.shoppingcart !== null) {
        if (this.$store.state.shoppingcart.length > 0) {
          let num = 0;
          this.$store.state.shoppingcart.map(item => {
            num += Number(item.count);
          });
          return num;
        } else return null;
      }
    }
  },
  filters: {},
  beforeRouteLeave(to, from, next) {
    if (
      !this.$store.state.history.some(item => item.id === this.detailsList.id)
    ) {
      this.$store.state.history.push(this.detailsList);
    }

    next();
  }
};
</script>

<style scoped lang='scss'>
.detail {
  height: 92vh;
}
.detail-top {
  margin-bottom: 1px;
  .detail-img1 {
    width: 375px;
    height: 376px;
    img {
      width: 100%;
    }
  }
}
// 价格和产品名称
.detail-name {
  width: 100vw;
  height: 50px;
  background: #fff;
  margin-bottom: 2px;
  .name {
    font-size: 16px;
    padding: 5px 10px;
  }
  .price {
    font-size: 16px;
    color: red;
    padding: 0 10px;
  }
}
// 运费 剩余 收藏
.detail-freight {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 30px;
  line-height: 30px;
  background: #fff;
  color: #b8b5b5;
  font-size: 14px;
  margin-bottom: 2px;
  .freight {
    margin-left: 10px;
  }
  .collection {
    display: flex;
    width: 70px;
    margin-right: 10px;
    .van-icon {
      line-height: 31px;
    }
  }
}
//店铺
.detail-store {
  width: 100vw;
  height: 45px;
  line-height: 45px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 2px;
  .store-name {
    display: flex;
    margin-left: 10px;
    .van-icon {
      line-height: 48px;
    }
    .name {
      padding: 0 5px;
    }
    .tag {
      background: red;
      color: #fff;
      border-radius: 1.333vw;
      height: 50%;
      margin-top: 10px;
      line-height: 20px;
      padding: 2px;
    }
  }
  .go-store {
    display: flex;
    margin-right: 10px;
    .van-icon {
      line-height: 48px;
      margin-left: 5px;
    }
  }
}
//空
.empty {
  width: 100vw;
  height: 15px;
  background: #fff;
  margin-bottom: 2px;
}
// 返回按钮
.custom-indicator {
  width: 30px;
  height: 15px;
  position: absolute;
  bottom: 8px;
  right: 2px;
  font-size: 16px;
}
.icon {
  position: fixed;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  top: 1.3%;
  left: 2%;
  text-align: center;
  line-height: 35px;
  z-index: 15;
  .arrow {
    color: #fff;
    margin-top: 9px;
    margin-left: -2px;
    font-size: 18px;
  }
}
/deep/ .van-popup {
  overflow: initial;
}
.commodity {
  display: flex;
  border-bottom: 1px solid #d3d3d4;
  .commodity-img {
    width: 100px;
    border: 1px solid #d3d3d4;
    margin: 0 10px;
    position: relative;
    top: -20px;
    img {
      width: 100%;
    }
  }
  .commodity-name {
    width: 150px;
    .name {
      font-size: 16px;
      padding: 10px;
    }
    .price {
      font-size: 14px;
      color: red;
      padding: 0 10px;
    }
  }
}
.number {
  display: flex;
  font-size: 15px;
  border-bottom: 1px solid #d3d3d4;
  padding: 20px;
  justify-content: space-between;
  .count {
    div {
      &:nth-child(1) {
        padding: 5px 0;
      }
      &:nth-child(2) {
        padding: 5px 0;
        font-size: 14px;
        color: #adadad;

      }
    }
  }
  .stepper {
  }
}
.ClickBy {
  background-color: rgb(255, 68, 68);
  padding: 20px;
  text-align: center;
  color: #fff;
}
</style>