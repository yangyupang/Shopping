<template>
  <div class="goodsrecommend">
    <div class="recommended">
      <span>商品推荐</span>
    </div>
    <div class="core-container">
      <div class="wrapperx" ref="wrapperx">
        <div class="box">
          <div v-for="(item,index) in goodsrecommend" :key="index" class="box-item">
            <img :src="item.image" alt />
            <div class="goodsname">{{item.goodsName}}</div>
            <div class="price">
              <span>￥{{item.mallPrice}}</span>
              <span>￥{{item.price}}</span>
            </div>
            <div class="details">
              <div class="details-icon" @click="addShop(item.goodsId)">
                <van-icon name="cart" />
              </div>
              <div class="details-text" @click="details(item.goodsId)">商品详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      username: ""
    };
  },
  props: {
    goodsrecommend: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    init() {
      this.bs = new BScroll(".wrapperx", {
        scrollX: true,
        click: false,
        probeType: 3 // listening scroll hook
      });
    },
    //跳转详情
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    },
    //加入购物车
    addShop(id) {
      if (this.username !== "") {
        this.$api
          .addShop({ id: id })
          .then(res => {
            if (res.code === 200) {
              // console.log(id);
              this.$toast(res.msg);
              //获取购物车数据
              this.$api
                .getCard()
                .then(res => {
                  if (res.shopList.length > 0) {
                    this.$store.state.shoppingcart = res.shopList;
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else this.$toast("亲！您还没有登录哟~");
    }
  },
  mounted() {
    this.init();
    if (localStorage.getItem("args") !== "") {
      this.username = JSON.parse(localStorage.getItem("args"));
    }
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.goodsrecommend {
  background-color: #fff;
  height: 245px;
  .recommended {
    font-size: 16px;
    padding: 10px;
  }
  .core-container {
    .wrapperx {
      display: flex;
      overflow: hidden;
      width: 376px;
      height: 200px;
      img {
        width: 127px;
      }
    }
  }
}
.box {
  display: flex;
  white-space: nowrap;
  padding: 5px;
  .box-item {
    border-top: 1px solid rgb(233, 232, 232);
    border-right: 1px solid rgb(233, 232, 232);
    .goodsname {
      font-size: 14px;
      width: 124px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      padding: 1px;
    }
    .price {
      display: flex;
      justify-content: center;
      margin-top: 5px;
      span {
        &:nth-child(1) {
          font-size: 14px;
        }
        &:nth-child(2) {
          font-size: 12px;
          text-decoration: line-through;
          color: red;
          margin: 2px 4px;
        }
      }
    }
    .details {
      color: #fff;
      display: flex;
      font-size: 16px;
      justify-content: center;
      // padding: 5px 10px;
      .details-icon {
        background-color: rgb(250, 189, 57);
        padding: 3px;
        border-radius: 5px 0 0 5px;
      }
      .details-text {
        background-color: red;
        border-radius: 0 5px 5px 0;
        padding: 3px;
      }
    }
  }
}
</style>